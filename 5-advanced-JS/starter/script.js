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



(function(){ // using IIFE to hide variables/funtions from global environment and prevent interference

    var Question = function(questionItself, answerOptions, correctAnswer) {  // function constructor
        this.questionItself = questionItself;
        this.answerOptions = answerOptions;
        this.correctAnswer = correctAnswer;
    }

    
    Question.prototype.askQuestion  = function() { // method inherited through prototype, not instance

        console.log(this.questionItself);

        for (var i = 0; i <= this.answerOptions.length-1; i++) {
            console.log(i + ' - ' +this.answerOptions[i]);
        }  
    }
    
    
    Question.prototype.displayScore  = function(score) { // method inherited through prototype, not instance
        console.log('\n------------------------------');
        console.log('Current score: ' + score);
        console.log('------------------------------\n');
    }
    

    Question.prototype.checkAnswer  = function(selectedAnswer, scoreCallback) { // method inherited through prototype, not instance
         
        //var sc; // not necessary to declare vairable?

        if (parseInt(selectedAnswer) === this.correctAnswer) { // use parseInt and === instead of ==
            console.log('\nCorrect!\n');   
            sc = scoreCallback(true);
        } else {
            console.log('\nIncorrect.\n');
            sc = scoreCallback(false);
        } 
        
        this.displayScore(sc);
    }
    
    
    /* 
    score () defined outside playGame to prevent re-run with recursion
    running score() returns the inner function and sets the sc variable to 0 only once
    the inner function adds 1 to sc but does not reset it to zero
    sc variable is still available to other functions through closure?
    */
    
    function score() {
        
    var sc = 0;
        
    return function(correct) {
        if (correct) {sc++}
        return sc; // need to return sc to pass it to displayScore()?
        }
    }
    
    var keepScore = score(); 
    

    function playGame(quizQuestions) {

        var questionNumber = Math.floor(Math.random() * quizQuestions.length);

        quizQuestions[questionNumber].askQuestion();

        var selectedAnswer = prompt('Select your answer by number, or type \'exit\' to quit.');

        if (selectedAnswer !== 'exit'){
            quizQuestions[questionNumber].checkAnswer(selectedAnswer, keepScore); // keepScore is scoreCallback
            playGame(quizQuestions); // using recursion
        }
    }
    

    var engineer = new Question('Who is the best engineer?', 
                                ['Bruce Banner', 'Peter Parker', 'Tony Stark'], 
                                2);

    var superman = new Question('What is superman\'s birth name?', 
                                ['Bruce Wayne', 'Kal-El', 'Clark Kent', 'Kakarot'], 
                                1);

    var ikal = new Question('What does Ikal mean?', 
                            ['Spirit', 'Circle', 'Light', 'Ancestor', 'Unique'],
                            0);

    quizQuestions = [engineer, superman, ikal];

    playGame(quizQuestions);
    
})(); // IIFE
