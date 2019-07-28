/*
function interviewQuestion(job) {
    
    var q = 'What do you '
    
    if (job === 'hacker') {
        return function(name) {
            console.log(q + 'hack, ' + name + '?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(q + 'teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log(q + 'do, ' + name + '?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var hackerQuestion = interviewQuestion('hacker');


hackerQuestion('Sal');
teacherQuestion('Alba');
interviewQuestion('baby')('Mateo');

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}
*/


/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

function loopGame(quizQuestions) {
    
    var result, score;
    
    score = 0;

    while (true){
        
        console.log('Current score: ' + score);
        result = answerRandomQuestion(quizQuestions);  
        
        if (result === 'exit'){
            break;
        } else if (result === 'Correct!') {
            score += 1
        }
    }
}

function answerRandomQuestion(quizQuestions) {

    var questionNumber = Math.floor(Math.random() * quizQuestions.length);

    quizQuestions[questionNumber].askQuestion();

    var selectedAnswer = prompt('Select your answer by number, or type \'exit\' to quit.');

    var result = quizQuestions[questionNumber].checkAnswer(selectedAnswer); 
    
    if (result !== 'exit'){
        console.log(result);
    }
    
    return result 
}


var Question = function(questionItself, answerOptions, correctAnswer) {
    this.questionItself = questionItself;
    this.answerOptions = answerOptions;
    this.correctAnswer = correctAnswer;
}

Question.prototype.askQuestion  = function() {
    
    console.log(this.questionItself);
    
    for (var i = 0; i <= this.answerOptions.length-1; i += 1) {
    console.log(i + ' - ' +this.answerOptions[i]);
    }
};

Question.prototype.checkAnswer  = function(selectedAnswer) {
    
    //var isCorrect = selectedAnswer == this.correctAnswer ? 'Correct' : 'Incorrect';
    //console.log(isCorrect);
    
    if (selectedAnswer == 'exit'){
        return 'exit';
    } else if (selectedAnswer == this.correctAnswer) {
        return 'Correct!';   
    } else {
        return 'Incorrect.';
    }

    
};


var engineer = new Question('Who is the best engineer?', 
                            ['Bruce Banner', 'Peter Parker', 'Tony Stark', 'Thor Odinson'], 
                            2);

var superman = new Question('What is superman\'s birth name?', 
                            ['Bruce Wayne', 'Kal-El', 'Clark Kent', 'Kakarot'], 
                            1);

var ikal = new Question('What does Ikal mean?', 
                        ['Spirit', 'Circle', 'Light', 'Ancestor'],
                        0);

quizQuestions = [engineer, superman, ikal];

loopGame(quizQuestions);



