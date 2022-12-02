var startBttn = document.querySelector("#start");
var tick = 1000; // Every second
var timeLeft;
var timer;
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var countdown = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var scoreDisplay = document.querySelector("#final-score");
var answerStatusDisplay = document.querySelector("#answer-status");
var questionNum;
var currQuestion;
var score;
var correctfx = new Audio('./assets/sfx/correct.wav');
var incorrectfx = new Audio('./assets/sfx/incorrect.wav');
var pointsPerQuestion = 10;
var penalty = tick * 10;

startBttn.addEventListener("click", onStart);
choices.addEventListener("click", onChoose);

function onStart() {
    questionNum = 0;
    score = 0;
    timeLeft = tick * 75;
    updateCountdown();
    timer = setInterval(onTick, tick);
    startScreen.classList.add("hide");
    questions.classList.remove("hide");
    loadQuestion();
}

function onTick() {
    timeLeft -= tick;

    // Check if time is up
    if (timeLeft <= 0) {
        return endGame();
    }
    updateCountdown();
}

function updateCountdown() {
    // Make sure non-zero before dividing
    timerVal = timeLeft ? timeLeft/1000 : 0;
    countdown.textContent = timerVal;
}

function loadQuestion() {

    if (questionNum >= questionsArray.length) {
        // No more questions 
        return endGame();
    }
    currQuestion = questionsArray[questionNum];
    updateQuestion();
}   

function updateQuestion() {
    // The current question will be updated every time an answer is given
    questionTitle.textContent = currQuestion.question;

    for (var i = 0; i < currQuestion.answers.length; i++) {
        choice = document.querySelector("[data-index='" + i + "']");
        choice.textContent = currQuestion.answers[i];
    }
}

function onChoose(e) {
    // Compare data-index of clicked choice to correctAnswer (whose value is the index of the correct answer)
    
    var choice = parseInt(e.target.dataset.index, 10);
    var correct = choice === currQuestion.correctAnswer;

    if (correct) {
        correctfx.play();
        score += pointsPerQuestion;
    } else {
        incorrectfx.play();
        // Reduce time remaining, but no less than 0
        countdown = Math.max(0, countdown - penalty);
    }

    showAnswerStatus(correct);
    questionNum++;
    loadQuestion();
}

function showAnswerStatus(isCorrect) {
    // Use ternary operator to set message 
    var message = isCorrect ? "Correct!" : "Wrong!";
    answerStatusDisplay.textContent = message;
}

function endGame() {
    scoreDisplay.textContent = score;
    questions.classList.add("hide");
    endScreen.classList.remove("hide");
    clearInterval(timer);
}
