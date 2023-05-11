const readline = require('node:readline');
const wordleHelper = require("./wordleHelper");
const words = require('an-array-of-english-words');
const {wrongInput, exhaustedTurns, exitMessage, intro, inputPrompt} = require("./constants");
const fiveLetterWords = words.filter(w => w.length === 5);

/**
 * Validates the input for the Wordle game. The function checks if the input is an array of five integers,
 * where each integer is 0, 1, or 2, representing a rejected character, a wrongly placed character,
 * or a correctly placed character respectively.
 *
 * @param {Array} parsedValue - The input to validate. Expected to be an array of five integers (0, 1, or 2).
 * @returns {boolean} Returns true if the input is valid, false otherwise.
 **/
function validateInput(parsedValue) {
    return (parsedValue &&
        Array.isArray(parsedValue) &&
        parsedValue.length === 5 &&
        parsedValue.every(Number.isInteger) &&
        parsedValue.every(num => [0, 1, 2].includes(num))
        )
}

/**
 * Class representing a player for the Wordle game.
 */
class WordlePlayer {
    constructor() {
        this.helper = new wordleHelper(fiveLetterWords);
        this.chances_left = 6;
    }

    /**
     * Initiates and manages the Wordle game play. Interacts with the player through the console,
     * asking for feedback and providing new guesses based on that feedback. The game continues until
     * the player has won, no possible guesses are left, or the player has exhausted their turns.
     */
    play() {
        console.log(intro);
        console.log("Here is your initial word to start game:\n", this.helper.initial_guess());
        this.chances_left -= 1

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: inputPrompt,
        });

        rl.prompt();


        rl.on('line', (line) => {
            let parsedValue = null
            try {
                parsedValue = JSON.parse(line.trim());
            } catch (e) {
                console.log(wrongInput);
            }

            if (validateInput(parsedValue)) {
                if (new Set(parsedValue).size === 1 && new Set(parsedValue).has(2)) {
                    console.log(`You won in ${6 - this.chances_left} turns!`);
                    rl.close()
                }

                try {
                    let guess = this.helper.play(parsedValue)
                    console.log("Here is you next guess: \n", guess);
                    this.chances_left -= 1;
                } catch (e) {
                    console.log(e.message);
                    rl.close();
                    return;
                }
            }

            if (this.chances_left) {
                rl.prompt();
            } else {
                console.log(exhaustedTurns);
                rl.close();
            }

        }).on('close', () => {
            console.log(exitMessage);
            process.exit(0);
        });
    }
}

module.exports = WordlePlayer
