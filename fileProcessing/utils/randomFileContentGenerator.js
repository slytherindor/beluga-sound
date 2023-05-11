const fs = require("fs");

/**
 * Generates a random uppercase alphanumeric character.
 * @returns {string} A random uppercase alphanumeric character.
 */
function generateRandomCharacter() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
}

/**
 * Generates a string of random characters with a specified length and a newline character at the end.
 * @param {number} length - The length of the string to generate.
 * @returns {string} A string of random characters with a newline character at the end.
 */
function generateRandomLine(length) {
    let charArray = [];
    for (let x = 0; x <= length; x++) {
        charArray.push(generateRandomCharacter());
    }
    charArray.push("\n");
    return charArray.join("");
}

/**
 * Generates a file with random content.
 * @async
 * @param {string} fileName - The name of the file to generate.
 * @param {number} lines - The number of lines to generate.
 * @param {number} charsPerLine - The number of characters per line.
 * @returns {Promise<string>} A promise that resolves to the file name of the generated file.
 */
function generateRandomFileContent(fileName, lines, charsPerLine) {
    return new Promise((resolve, reject) => {
        try {
            const writeStream = fs.createWriteStream(fileName, {flags: 'w'});
            for (let x= 1; x <= lines; x++) {
                writeStream.write(generateRandomLine(charsPerLine));
            }
            writeStream.close();
            resolve(fileName);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = generateRandomFileContent
