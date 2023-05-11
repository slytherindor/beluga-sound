Hello and welcome to the Bedrock AI Take-home Assessment. I hope you will find this fun. We value your time - please don’t take more than 2 hours to work on this, unless you find the questions extremely interesting :-). Clean and well documented code would be much appreciated. If you have any questions regarding the assessment, please do not hesitate to get in touch with me. Feel free to Google/Co-pilot/GPT-4 for solutions, just like you would at any job. Enjoy!


Question 1 (Javascript)

Nasrin was apoplectic. She was assigned the gruesome task of processing hundreds of thousands of long documents, each with a million lines on average. But due to her tenacity, she realized most documents need not be subject to any processing, and you could determine which ones to process and which ones to not just by checking if the 10th line of each document contains the characters ‘PPP’’ (at least one contiguous sequence of 3 Ps).
Help her build the filtering solution.
You can write JS code to
Use a random character generator to generate 10 files with 200,000 lines each, with each line containing 200 random characters. Characters can be upper case alphabets and digits only.
Find if the tenth line of each file contains a ‘PPP’’ sequence. Enumerate the number of such sequences found for each file on that line.

Solution:
Import following function and run them with arguments
```javascript
generateSampleFiles("test",10).then((res) => {
    console.log("Created sample files", res);
}).catch(e => {
    console.error("Failed to create sample files", e)
})

findFilesToProcess(["test1.txt", "test2.txt", "test1.txt", "test2.txt"], 0).then((r) => {
    console.log(r)
})
```

Questions:
What is the probability of encountering a single ‘PPP’’ sequence on the 10th line of a document?

```
To calculate the probability of encountering a single 'PPP' sequence on the 10th line of a document,
we can consider each character as an independent event.
Each character in the line can be any of the 26 uppercase English alphabets or 10 digits, so there are 36 possible characters.
We are looking for the sequence 'PPP', which has a probability of (1/36) * (1/36) * (1/36) for any given position.
Since there are 200 characters in a line, there are 198 possible positions for the 'PPP' sequence to occur.

Probability of 'PPP' sequence in a single position: (1/36) * (1/36) * (1/36)
Probability of NOT encountering 'PPP' in a single position: 1 - ((1/36) * (1/36) * (1/36))
Probability of NOT encountering 'PPP' in any of the 198 positions: (1 - ((1/36) * (1/36) * (1/36)))^198
Probability of encountering at least one 'PPP' sequence in the 10th line: 1 - (1 - ((1/36) * (1/36) * (1/36)))^198
```

Considering you have to do this filtering across millions of documents, what strategies would you use to reduce run time? This can be reflected in the code you write.
```
Parallelism: Process multiple files simultaneously by using parallel processing techniques.
Using the Promise.all() function to process multiple files concurrently. Worker threads aren't advised for I/O operations.

Early termination: Since we are only interested in the 10th line of each document, we can stop reading the file as soon
 as we reach the 10th line. This can significantly reduce the time spent on I/O operations.
```

Question 2(Python/JS)
Note: JS is preferred but Python is OK

Rilwan clenched his fist in joy and let our a war cry that he imagined would make his parents #proud. He had just finished the day’s edition of Wordle (see rules here - https://www.nytimes.com/games/wordle/index.html, click on the ? button) - a word game that had taken over the Western world by storm. Rilwan’s competitive spirit (or lack thereof) compelled him to look for automated solutions to this word game. Can you help Rilwan build an automated Wordle solver? You can take inspiration from principles and concepts in linguistics, natural language processing, information theory, phonetics, computer science and so on. The solution would be a program that would try to solve the game in the least number of turns by providing the user with words to enter at each step. You can use any library for getting the initial word lists.  (eg: NLTK)

In summary - A program that produces a 5 letter word as an initial suggestion to the user - the user can then type it in the wordle program, and enter the feedback they received in the form of an array [x1, x2, x3, x4, x5]
The values in the array can be either
0 - Grey
1- Yellow
2- Green
Based on this feedback, the program should suggest another word, and so on, until you reach the maximum number of tries or you win.

Solution:
Import WordlePlayer and call play method to proceed.
```javascript
const helper = new WordlePlayer();
helper.play()
```

=====================================================================

System Design

We will discuss this during the next interview, so you do not need to provide a very detailed solution right now. If you want to, you can add a diagram. It is not necessary though.

Plenty of dating sites exist on the market but none of them seem to be particularly beloved by the general population. Eniola sensed a market opportunity and decided to disrupt the industry with her new app. A key algorithmic decision in a dating site is determining the order of profiles to show a particular user. Eniola decided to use the following nonsensical but surprisingly well-working strategy -

The accounts are assigned ids in the order of their popularity, where popularity is defined by the number of times an account has been ‘swiped right’ on by other users. This is refreshed at the beginning of every day. For ID X, the users displayed would be the users swiped left by ids X-1, X-2, … X-50. If the users are exhausted (because of ID X swiping all of them either left or right), random users would be chosen for display next.

Consider the number of users is 1 million. How would you store this data, including the swipe decisions? Give a high-level system architecture built using tools in the AWS Ecosystem. Propose the simplest and cheapest robust solution that works. 

