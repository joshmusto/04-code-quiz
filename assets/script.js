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
var resultScore = document.getElementById("resultScore");
var highScores = document.getElementById("highScores");
var highScore1 = document.getElementById("highScore1");
var highScore2 = document.getElementById("highScore2");
var highScore3 = document.getElementById("highScore3");
var highScore4 = document.getElementById("highScore4");
var highScore5 = document.getElementById("highScore5");
var answerKey = document.getElementById("answerKey");
var inputNameLabel = document.getElementById("inputNameLabel");
var inputName = document.getElementById("inputName");
var submitName = document.getElementById("submitName");

//RNG function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//timer function
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent="Time: " + secondsLeft;
      timer.style.color = "black";
      flagRight.style.display="none";
      flagWrong.style.display="none";
      if (secondsLeft < 1) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // ends game
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
            secondsLeft=0;
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
    //reset variables
    rightAnswer=0;
    usedQuestions=[];
    rightAnswers=0;
    secondsLeft=60;
    //hide start button, show game
    buttonStart.style.display="none";
    game.style.display="inherit";
    timer.textContent="Time: " + 60;
    setTime();
    newQuestion();
}
buttonStart.addEventListener("click", newGame);

function loadQuestion() {
    //display question and answers
    question.textContent = currentQuestion[0];
    buttonA.textContent = "A. " + currentQuestion[1];
    buttonB.textContent = "B. " + currentQuestion[2];
    buttonC.textContent = "C. " + currentQuestion[3];
    buttonD.textContent = "D. " + currentQuestion[4];
    //set answer for the current question
    rightAnswer = currentQuestion[5];
    //reset button styles
    buttonA.setAttribute("id","optionA");
    buttonB.setAttribute("id","optionB");
    buttonC.setAttribute("id","optionC");
    buttonD.setAttribute("id","optionD");
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
            //gray out incorrect answer
            event.target.setAttribute("id", "buttonIncorrect");
            //subtract from timer, need to manually change the timer.textContent because otherwise it doesn't update until the second is up and the timer sets itself
            timer.style.color= "red";
            var newTimer = secondsLeft - 5;
            secondsLeft = newTimer;
            timer.textContent = "Time: " + newTimer;
        }
    }
});


//default empty highScoreData
highScoreData = [
    "Not yet set", 
    0, 
    "Not yet set", 
    0, 
    "Not yet set", 
    0, 
    "Not yet set", 
    0, 
    "Not yet set", 
    0,
];
//get highScoreData from local storage
//if !null check used to make sure the highScoreData isn't null the first time the person plays the game, making it impossible to add a new high score
if (localStorage.highScoreData != null)
{
    highScoreData = JSON.parse(localStorage.getItem("highScoreData"));
}
//update textContent
function updateLeaderboard() {
    highScore1.textContent= highScoreData[0] + ": " + highScoreData[1];
    highScore2.textContent= highScoreData[2] + ": " + highScoreData[3];
    highScore3.textContent= highScoreData[4] + ": " + highScoreData[5];
    highScore4.textContent= highScoreData[6] + ": " + highScoreData[7];
    highScore5.textContent= highScoreData[8] + ": " + highScoreData[9];
}
updateLeaderboard();
//function for updating leaderboard on name submission
function newHighScore() {
    //check rank of new high score
    if (rightAnswers >= highScoreData[9]) {
        if (rightAnswers >= highScoreData[7]) {
            //4th to 5th
            highScoreData[9] = highScoreData[7];
            highScoreData[8] = highScoreData[6];
            if (rightAnswers >= highScoreData[5]) {
                //3rd to 4th
                highScoreData[7] = highScoreData[5];
                highScoreData[6] = highScoreData[4];
                if (rightAnswers >= highScoreData[3]) {
                    //2nd to 3rd
                    highScoreData[5] = highScoreData[3];
                    highScoreData[4] = highScoreData[2];
                    if (rightAnswers >= highScoreData[1]) {
                        //1st to 2nd
                        highScoreData[3] = highScoreData[1];
                        highScoreData[2] = highScoreData[0];
                        //new 1st
                        highScoreData[0] = inputName.value;
                        highScoreData[1] = rightAnswers;
                    }
                    else {
                        //new 2nd
                        highScoreData[2] = inputName.value;
                        highScoreData[3] = rightAnswers;
                    }
                }
                else {
                    //new 3rd
                    highScoreData[4] = inputName.value;
                    highScoreData[5] = rightAnswers;
                }
            }
            else {
                //new 4th
                highScoreData[6] = inputName.value;
                highScoreData[7] = rightAnswers;
            }
        }
        else {
            //new 5th
            highScoreData[8] = inputName.value;
            highScoreData[9] = rightAnswers;
        }
        
    }
    //update highScoreData in local storage for next time
    localStorage.setItem("highScoreData", JSON.stringify(highScoreData));
    //update visual leaderboard
    updateLeaderboard();
    //hide name input form
    inputNameLabel.style.display="none";
    inputName.style.display="none";
    submitName.style.display = "none";
}
submitName.addEventListener("click", newHighScore);




//end game and show results function
function endGame() {
    //hide game
    game.style.display = "none";
    //show results
    results.style.display = "inherit"
    resultScore.textContent="You answered " + rightAnswers + " out of " + usedQuestions.length + " questions correctly!";
    //create answer key
    for (let i = 0; i < questionsArray.length; i++) {
        //grab question info
        var keyCurrent = usedQuestions[i];
        var keyRef = questionsArray[keyCurrent];
        var keyQ = keyRef[0];
        var keyA = keyRef[5];
        if (keyA == buttonA) keyA=keyRef[1]
        else if (keyA == buttonB) keyA=keyRef[2]
        else if (keyA == buttonC) keyA=keyRef[3]
        else if (keyA == buttonD) keyA=keyRef[4];
        //write question info
        var keyLineQ = document.createElement("li");
        keyLineQ.setAttribute("id","answerKeyQ");
        var keyContentQ = document.createTextNode("Q: " + keyQ);
        keyLineQ.appendChild(keyContentQ);
        answerKey.appendChild(keyLineQ);
        var keyLineA = document.createElement("li");
        keyLineA.setAttribute("id","answerKeyA");
        var keyContentA = document.createTextNode("A: " + keyA);
        keyLineA.appendChild(keyContentA);
        answerKey.appendChild(keyLineA);
    }
}
