const intro =`Welcome to Wordle Helper. This program will help you play the game.
After initial word provided, you can enter feedback in form of an array with values 0, 1, or 2
0 - Grey - Character not in word
1- Yellow - Character in word but this is wrong place
2- Green - Character in word in right place\n`;

const inputPrompt = 'Please enter Wordle output in format of array [1,2,0,0,2]\n';

const wrongInput = `Entry made by you looks bad. Please enter in correct format.\n`;

const exhaustedTurns = "You have exhausted your turns. Did the last guess work?\n";

const exitMessage = 'Exiting program. Have a great day!'

module.exports = {
    intro, inputPrompt, wrongInput, exhaustedTurns, exitMessage
}
