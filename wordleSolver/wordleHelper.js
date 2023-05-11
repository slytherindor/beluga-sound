/**
 * Builds a list of words from the initial list where each word has the same frequency of characters
 * and less than three distinct non-vowel characters.
 *
 * @param {string[]} words - An array of words to filter based on the specified criteria.
 * @returns {string[]} Returns an array of words from the initial list where each word has the same frequency of characters
 * and less than three distinct non-vowel characters.
 *
 * @example
 *
 * buildInitialWordList(["apple", "banana", "mango", "grape"]);
 * // Output: ["apple"]
 *
 */
function buildInitialWordList(words) {
    const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
    const firstOptimalGuessList = [];

    for (let w of words) {
        const c = new Map();
        for (let ch of w) {
            c.set(ch, (c.get(ch) || 0) + 1);
        }

        if (new Set(c.values()).size === 1 && new Set([...c.keys()].filter(ch => !vowelSet.has(ch))).size < 3) {
            firstOptimalGuessList.push(w);
        }
    }

    return firstOptimalGuessList;
}

/**
 * Builds a map where each key is a character and the value is a set of words that contain the character.
 *
 * @param {string[]} words - An array of words to process.
 * @returns {Map<string, Set<string>>} Returns a Map object where each key is a character from the words array
 * and the corresponding value is a Set object containing all words from the initial array that include the key character.
 *
 * @example
 *
 * buildCharInWordMap(["apple", "banana", "mango"]);
 * // Output: Map {
 * //          'a' => Set { 'apple', 'banana', 'mango' },
 * //          'p' => Set { 'apple' },
 * //          'l' => Set { 'apple' },
 * //          'e' => Set { 'apple' },
 * //          'b' => Set { 'banana' },
 * //          'n' => Set { 'banana' },
 * //          'm' => Set { 'mango' },
 * //          'g' => Set { 'mango' },
 * //          'o' => Set { 'mango' }
 * //         }
 */
function buildCharInWordMap(words) {
    const charInWordMap = new Map();

    for (let w of words) {
        for (let c of w.split('')) {
            if (!charInWordMap.has(c)) {
                charInWordMap.set(c, new Set());
            }

            charInWordMap.get(c).add(w);
        }
    }
    return charInWordMap;
}

/**
 * Class representing a helper for Wordle game.
 */
class WordleHelper {
    /**
     * Creates a WordleHelper instance.
     *
     * @param {string[]} wordList - An array of words used for the game.
     */
    constructor(wordList) {
        this.initial_word_list = buildInitialWordList(wordList);
        this.char_in_word_map = buildCharInWordMap(wordList);
        this.all_words = new Set(wordList);
        this.rejected_words = [];
        this.wrongly_placed_words = [];
        this.correctly_placed_words = [];
        this.previous_guesses = [];
        this.last_guess = null;
        this.play = this.play.bind(this);
        this.filter_words = this.filter_words.bind(this);
        this.initial_guess = this.initial_guess.bind(this);
    }

    /**
     * Plays the Wordle game given the current state of the game.
     * It will throw an error if no more possible guesses can be made.
     *
     * @param {number[]} state - An array representing the state of the game.
     * Each element can be 0, 1, or 2, representing a rejected character, a wrongly placed character,
     * or a correctly placed character respectively.
     * @returns {string} Returns a string representing the next guess.
     * @throws {Error} Throws an error if the word list has no more possible guesses.
     */
    play(state) {
        for (let idx = 0; idx < state.length; idx++) {
            if (state[idx] === 2) {
                this.correctly_placed_words.push([this.last_guess[idx], idx]);
            } else if (state[idx] === 1) {
                this.wrongly_placed_words.push([this.last_guess[idx], idx]);
            } else if (state[idx] === 0) {
                this.rejected_words.push(this.last_guess[idx]);
            }
        }

        this.filter_words();

        if (!this.all_words.size) {
            throw new Error("Cannot provide another guess. Word list has no more possible guesses.");
        }

        this.last_guess = [...this.all_words][Math.floor(Math.random() * this.all_words.size)];
        this.all_words.delete(this.last_guess);
        this.previous_guesses.push(this.last_guess);
        return this.last_guess;
    }

    /**
     * Filters the current word list based on the game's state (rejected words, wrongly placed words,
     * correctly placed words, and previous guesses).
     */
    filter_words() {
        let filtered_words = this.all_words;

        for (const word of this.rejected_words) {
            const words_to_remove = this.char_in_word_map.get(word);
            for (const w of [...words_to_remove]) {
                filtered_words.delete(w);
            }
        }

        for (let w of this.correctly_placed_words) {
            const [ch, idx] = w;
            const words_with_chat_at_idx = new Set([...this.char_in_word_map.get(ch)].filter(word => word[idx] === ch));
            for (let w of filtered_words) {
                if (!words_with_chat_at_idx.has(w)) {
                    filtered_words.delete(w);
                }
            }
        }

        for (let w of this.wrongly_placed_words) {
            const [ch, idx] = w;
            const words_with_char_not_at_idx = new Set([...this.char_in_word_map.get(ch)].filter(word => word[idx] !== ch));
            for (let w of filtered_words) {
                if (!words_with_char_not_at_idx.has(w)) {
                    filtered_words.delete(w);
                }
            }
        }

        for (let w of this.previous_guesses) {
            if (filtered_words.has(w)) {
                filtered_words.delete(w);
            }
        }

        this.all_words = filtered_words;
    }

    /**
     * Generates an initial guess from the initial word list.
     *
     * @returns {string} Returns a string representing the initial guess.
     */
    initial_guess() {
        const guess = this.initial_word_list[Math.floor(Math.random() * this.initial_word_list.length)];
        this.last_guess = guess;
        this.previous_guesses.push(guess);
        return guess;
    }
}

module.exports = WordleHelper;
