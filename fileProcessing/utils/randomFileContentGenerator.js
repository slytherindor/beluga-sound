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
 * Generates a random string of characters with an optional keyword inserted at random positions while keeping the string length unchanged.
 * The maximum number of keyword insertions is limited to 10.
 *
 * @param {number} length - The desired length of the generated string.
 * @param {string} [keyword] - The optional keyword to be inserted. If not provided, a random string will be generated without the keyword.
 * @returns {string} The generated random string with or without the keyword inserted.
 */
function generateRandomLine(length, keyword) {
    let charArray = [];
    let keywordLength = keyword ? keyword.length : 0;
    let maxInsertions = Math.min(Math.floor(length / keywordLength), 10);
    let insertions = keyword ? Math.floor(Math.random() * (maxInsertions + 1)) : 0;
    let remainingSpace = length - insertions * keywordLength;

    for (let x = 0; x < remainingSpace; x++) {
        charArray.push(generateRandomCharacter());
    }

    if (keyword) {
        for (let i = 0; i < insertions; i++) {
            let randomPosition = Math.floor(Math.random() * charArray.length);
            charArray.splice(randomPosition, 0, ...keyword);
        }
    }

    charArray.push("\n");
    return charArray.join("");
}

/**
 * Generates a random file content with the specified number of lines and characters per line.
 * The keyword can be injected at a specific line in the file.
 *
 * @param {string} fileName - The name of the file to be generated.
 * @param {number} lines - The number of lines in the file.
 * @param {number} charsPerLine - The number of characters per line.
 * @param {Object} injectKeywordAtLine - The object specifying the line number and keyword injection details.
 * @param {number} injectKeywordAtLine.line - The line number at which the keyword should be injected.
 * @param {string} [injectKeywordAtLine.keyword] - The keyword to be injected. If not provided, a random line will be generated without the keyword.
 * @returns {Promise<string>} A promise that resolves with the generated file name if the file is successfully created, or rejects with an error if an error occurs.
 */
function generateRandomFileContent(fileName, lines, charsPerLine, injectKeywordAtLine) {
    return new Promise((resolve, reject) => {
        try {
            const writeStream = fs.createWriteStream(fileName, {flags: 'w'});
            for (let x= 1; x <= lines; x++) {
                if (x === injectKeywordAtLine.line && injectKeywordAtLine.keyword) {
                    writeStream.write(generateRandomLine(charsPerLine, injectKeywordAtLine.keyword));
                } else {
                    writeStream.write(generateRandomLine(charsPerLine));
                }

            }
            writeStream.close();
            resolve(fileName);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = generateRandomFileContent
