//set common variables
var questionNumber = document.getElementById("questionNumber");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
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
        "Answer D"
    ],
    question2 = [
        "Question02",
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D"
    ],
];

usedQuestions=[];
function newQuestion() {
    //RNG to select question from questionArray
    questionSelector = getRandomInt(questionsArray.length); 
    
    //check if the question has been shown before
    if (usedQuestions.includes(questionSelector)) {
        newQuestion();
    }
    //else set it as the current question and add to usedQuestions
    else{
        currentQuestion = questionsArray[questionSelector];
        usedQuestions.push(questionSelector)
        loadQuestion();
    }
}

newQuestion();
function loadQuestion() {
    //display question and answers
    question.textContent = currentQuestion[0];
    optionA.textContent = currentQuestion[1];
    optionB.textContent = currentQuestion[2];
    optionC.textContent = currentQuestion[3];
    optionD.textContent = currentQuestion[4];
}
