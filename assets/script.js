//set common variables
var questionNumber = document.getElementById("questionNumber");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var buttonA = document.getElementById("optionA");
var buttonB = document.getElementById("optionB");
var buttonC = document.getElementById("optionC");
var buttonD = document.getElementById("optionD");
var rightWrong = document.getElementById("rightWrong");

//RNG function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//array of questions
var questionsArray = [
    question1 = [
        "Question01",
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D",
        buttonA
    ],
    question2 = [
        "Question02",
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D",
        buttonB
    ],
];

rightAnswer=0;
usedQuestions=[];
function newQuestion() {
    //RNG to select question from questionArray
    questionSelector = getRandomInt(questionsArray.length); 
    
    //check if the question has been shown before
    if (usedQuestions.includes(questionSelector)) {
        //if there are questions remaining, pick another...
        if (usedQuestions.length<15) {
            newQuestion();
        }
        //...otherwise, show results
        else {

        }
    }
    //else set it as the current question and add to usedQuestions
    else{
        currentQuestion = questionsArray[questionSelector];
        usedQuestions.push(questionSelector)
        loadQuestion();
        }
    console.log(usedQuestions);
}

//insert start button here
newQuestion();

function loadQuestion() {
    //display question and answers
    question.textContent = currentQuestion[0];
    optionA.textContent = currentQuestion[1];
    optionB.textContent = currentQuestion[2];
    optionC.textContent = currentQuestion[3];
    optionD.textContent = currentQuestion[4];
    //set answer for the current question
    rightAnswer = currentQuestion[5];
}

//click button, check answer
answers.addEventListener("click", function(event) {
    var chosenAnswer = event.target;
    if (rightAnswer == chosenAnswer) {
        //right answer behavior
        console.log("right!");
        newQuestion();
    }
    else {
        //wrong answer behavior
        console.log("WRONG");
    }
});

//end game and show results function
function endGame() {
    
}
