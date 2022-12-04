var startBttn = document.querySelector("#start");
var countdown = document.querySelector("#time");
var wrapper = document.querySelector(".wrapper");
var startScreen = wrapper.querySelector("#start-screen");
var endScreen = wrapper.querySelector("#end-screen");
var hiScoreBttn = endScreen.querySelector("#submit");
var feedbackDisplay = wrapper.querySelector("#feedback");
var questions = wrapper.querySelector("#questions");
var questionTitle = questions.querySelector("#question-title");
var choices = questions.querySelector("#choices");
var scoreDisplay = endScreen.querySelector("#final-score");
var questionNum;
var currQuestion;
var score;
var correctfx = new Audio('./assets/sfx/correct.wav');
var incorrectfx = new Audio('./assets/sfx/incorrect.wav');
var tick = 1000; // Every second
var timeLeft;
var timer;
var feedbackDuration = tick;
var penalty = tick * 10;
var pointsPerQuestion = 10;

startBttn.addEventListener("click", onStart);
choices.addEventListener("click", onChoose);
hiScoreBttn.addEventListener("click", onSave);

function onStart() {
    questionNum = 0;
    score = 0;
    // timeLeft = tick * 75;
    timeLeft = tick * 10;
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
        return endGame(true);
    }
    updateCountdown();
}

function updateCountdown() {
    // Make sure non-zero before dividing
    timerVal = timeLeft ? timeLeft/1000 : 0;
    countdown.textContent = timerVal;
}

function loadQuestion() {
    // Hide feedback
    window.setTimeout(function(){
        feedbackDisplay.classList.add("hide");
    }, feedbackDuration);

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
        choice.textContent = (i + 1) + ". " + currQuestion.answers[i];
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
        timeLeft = Math.max(0, timeLeft - penalty);
    }

    showAnswerStatus(correct);
    questionNum++;
    loadQuestion();
}

function showAnswerStatus(correct) {
    // Use ternary operator to set message 
    var message = correct ? "Correct!" : "Wrong!";
    feedbackDisplay.textContent = message;
    feedbackDisplay.classList.remove("hide");
}

function endGame(timeUp = false) {
    scoreDisplay.textContent = score;
    questions.classList.add("hide");
    endScreen.classList.remove("hide");
    clearInterval(timer);

    if(timeUp) {
        countdown.textContent = "0";    
    }
}

function onSave() {
    var initials = endScreen.querySelector("#initials").value;
    var previousBest = window.localStorage.getItem(initials);

    if (score < previousBest && prompt("This is not your all time best. OK to replace the higher value with your current score?") == null) {
        return;
    }

    window.localStorage.setItem(initials, score);
    window.location = "./highscores.html";     
}
