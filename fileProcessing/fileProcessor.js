const fs = require("fs");
const {createInterface} = require("readline");
const splitToNChunks = require("./utils/array.utils");
const generateRandomFileContent = require("./utils/randomFileContentGenerator");

/**
 * Generates sample files with random content.
 * @async
 * @param {string} filePrefix - The prefix to use for the generated file names.
 * @param {number} k - The number of files to generate.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of strings, representing the content of the generated files.
 */
async function generateSampleFiles(filePrefix, k) {
    let filePromises = [];
    for (let x = 1; x <= k; x++) {
        filePromises.push(generateRandomFileContent(`${filePrefix}${x}.txt`, 200000, 200, {line: 10, keyword: "PPP"}));
    }
    return await Promise.all(filePromises);
}

/**
 * Counts the number of occurrences of the 'PPP' sequence in the 10th line of a file.
 * @async
 * @param {string} fileName - The name of the file to read.
 * @returns {Promise<{fileName: string, count: number}>} A promise that resolves to an object containing the file name and the count of 'PPP' sequences on the 10th line.
 */
async function countSequenceOnLine(fileName) {
    try {
        const fileStream = fs.createReadStream(fileName);
        const rl = createInterface({
            input: fileStream,
        });

        let lineNumber = 0;
        let count = 0;

        for await (const line of rl) {
            lineNumber++;
            if (lineNumber === 10) {
                count = (line.match(/PPP/g) || []).length;
                break;
            }
        }
        return { fileName, count };
    } catch (e) {
        console.error(`There was an error reading ${fileName}`);
        return { fileName, count: 0 };
    }

}
/**
 * Finds files containing the 'PPP' sequence in their 10th line and returns an array of their file names and the count of 'PPP' sequences.
 * @async
 * @param {Array<string>} fileNames - An array of file names to process.
 * @param {number} [batchSize] - An optional parameter specifying the number of files to process in a batch. If not specified, all files are processed at once.
 * @returns {Promise<Array<{fileName: string, count: number}>>} A promise that resolves to an array of objects containing the file names and the count of 'PPP' sequences for each file that contains them.
 */
async function findFilesToProcess(fileNames, batchSize) {
    console.log(`Processing files ${fileNames}`);

    const allPromises = fileNames.map((filename) => {
        return countSequenceOnLine(filename);
    });
    let result = [];

    if (batchSize) {
        const chunkedPromises = splitToNChunks(allPromises, batchSize)
        for (let k of chunkedPromises) {
            const res = await Promise.all(k);
            result.push(...res.filter(r => r.count > 0));
        }
    } else {
        const resolvedPromises =  await Promise.all(allPromises);
        result = resolvedPromises.filter(r => r.count > 0);
    }
    return result;
}


module.exports = {
    generateSampleFiles,
    findFilesToProcess
};
