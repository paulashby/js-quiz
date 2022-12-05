var startBttn = document.querySelector("#start");
var countdown = document.querySelector("#time");
var startScreen = wrapper.querySelector("#start-screen");
var highScoreBttn = endScreen.querySelector("#submit");
var questionTitle = questions.querySelector("#question-title");
var choices = questions.querySelector("#choices");
var questionNum;
var currQuestion;
var score;
var correctfx = new Audio('./assets/sfx/correct.wav');
var incorrectfx = new Audio('./assets/sfx/incorrect.wav');
var tick = 1000; // Every second
var timeLeft;
var penalty = tick * 10;
var pointsPerQuestion = 10;

startBttn.addEventListener("click", onStart);
choices.addEventListener("click", onChoose);
highScoreBttn.addEventListener("click", onSave);

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
    currQuestion = questionsArray[questionNum];
    
    // The current question will be updated when answer status is shown
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
}

function showAnswerStatus(correct) {
    // Use ternary operator to set message 
    var message = correct ? "Correct!" : "Wrong!";

    questionNum++;

    if (questionNum >= questionsArray.length) {
        // No more questions - pass second arg so feedback calls endGame() after showing message
        feedback(message, true);
    } else {
        // Show feedback and load next question
        feedback(message);
        loadQuestion();
    }
}

function onSave() {
    var initials = endScreen.querySelector("#initials").value;
    var highscoreData = window.localStorage.getItem("highscores");

    if (highscoreData === null) {
        highscoreData = {};
    }  else {
        highscoreData = JSON.parse(highscoreData);
    }
    
    // If previousBest is null, calling parseInt on it will return NaN, Which is fine 
    // as the remaining conditionals will still give us the correct behaviour
    var previousBest = parseInt(highscoreData[initials]);

    if (score < previousBest) {
        // Score not updated as not personal best 
        window.localStorage.setItem("feedback", "Pretty good, but not a personal best.");
    } else if (score === previousBest) {
        // Score not updated as not better than personal best  
        window.localStorage.setItem("feedback", "You've equalled your personal best.");
    } else {
        // Personal best - update score
        highscoreData[initials] = score;
        // Update record in localStorage
        window.localStorage.setItem("highscores", JSON.stringify(highscoreData)); 
        window.localStorage.setItem("feedback", "Nice going " + initials + ", that was a personal best!");
    }  
    // Load highscores page
    window.location = "./highscores.html";  
}
