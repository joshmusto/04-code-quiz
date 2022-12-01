//set common variables
var game = document.getElementById("game");
var buttonStart = document.getElementById("buttonStart");
var questionNumber = document.getElementById("questionNumber");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var buttonA = document.getElementById("optionA");
var buttonB = document.getElementById("optionB");
var buttonC = document.getElementById("optionC");
var buttonD = document.getElementById("optionD");
var rightWrong = document.getElementById("rightWrong");
var flagRight = document.getElementById("flagRight");
var flagLeft = document.getElementById("flagLeft");

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

//the game
rightAnswer=0;
usedQuestions=[];
function newQuestion() {
    //RNG to select question from questionArray
    questionSelector = getRandomInt(questionsArray.length); 
    
    //check if the question has been shown before
    if (usedQuestions.includes(questionSelector)) {
        //if there are questions remaining, pick another...
        if (usedQuestions.length<2) {
            newQuestion();
        }
        //...otherwise, show results
        else {
            endGame();
        }
    }
    //else set it as the current question and add to usedQuestions
    else{
        currentQuestion = questionsArray[questionSelector];
        usedQuestions.push(questionSelector)
        questionNumber.textContent = "Question " + usedQuestions.length;
        loadQuestion();
        }
    console.log(usedQuestions);
}

//insert start button here
function newGame() {
    //clear variables
    
    //hide start button, show game
    buttonStart.style.display="none";
    game.style.display="inherit";
    newQuestion();
}
buttonStart.addEventListener("click", newGame);

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
        flagRight.style.display="inherit";
        newQuestion();
    }
    else {
        //wrong answer behavior
        flagWrong.style.display="inherit";
    }
});

//end game and show results function
function endGame() {
    //hide game
    game.style.display = "none";
    //show results
}
