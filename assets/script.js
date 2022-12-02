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
var timer = document.getElementById("timer");
var results = document.getElementById("results");

//RNG function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//timer function
secondsLeft=60;
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent=secondsLeft;
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        endGame();
      }
  
    }, 1000);
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
function newQuestion() {
    //RNG to select question from questionArray
    questionSelector = getRandomInt(questionsArray.length); 
    
    //check if the question has been shown before
    if (usedQuestions.includes(questionSelector)) {
        //if there are questions remaining, pick another...
        if (usedQuestions.length<questionsArray.length) {
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
    rightAnswer=0;
    usedQuestions=[];
    rightAnswers=0;
    //hide start button, show game
    buttonStart.style.display="none";
    game.style.display="inherit";
    timer.textContent=60;
    setTime();
    newQuestion();
}
buttonStart.addEventListener("click", newGame);

function loadQuestion() {
    //display question and answers
    question.textContent = currentQuestion[0];
    optionA.textContent = "A. " + currentQuestion[1];
    optionB.textContent = "B. " + currentQuestion[2];
    optionC.textContent = "C. " + currentQuestion[3];
    optionD.textContent = "D. " + currentQuestion[4];
    //set answer for the current question
    rightAnswer = currentQuestion[5];
}

//click button, check answer
answers.addEventListener("click", function(event) {
    var chosenAnswer = event.target;
    //seemingly redundant check so that clicking anywhere in the 'answers' section isn't detected as a wrong answer
    if (chosenAnswer != answers){
        if (rightAnswer == chosenAnswer) {
            //right answer behavior
            flagRight.style.display="initial";
            rightAnswers++;
            newQuestion();
        }
        else {
            //wrong answer behavior
            flagWrong.style.display="initial";
        }
    }
});

//end game and show results function
function endGame() {
    //hide game
    game.style.display = "none";
    //show results
    results.style.display = "inherit"
    results.textContent="You answered " + rightAnswers + " out of " + usedQuestions.length + " questions correctly!";
}
