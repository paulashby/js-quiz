var wrapper = document.querySelector(".wrapper");
var questions = wrapper.querySelector("#questions");
var endScreen = wrapper.querySelector("#end-screen");
var feedbackDisplay = wrapper.querySelector("#feedback");
var feedbackDuration = 1500;
var timer;

function feedback(message, end = false) {
    feedbackDisplay.textContent = message;
    feedbackDisplay.classList.remove("hide");

    // Remove feedback after feedbackDuration
    window.setTimeout(function(){
        feedbackDisplay.classList.add("hide");
        // No more questions - end the game after displaying feedback
        if (end) {
            endGame();
        }
    }, feedbackDuration);
}

function endGame(timeUp = false) {    
    var scoreDisplay = endScreen.querySelector("#final-score");

    // Stop timer
    clearInterval(timer);

    if(timeUp) {
        // If time ran out, set the countdown to reflect this
        countdown.textContent = "0";    
    } 

    scoreDisplay.textContent = score;
    questions.classList.add("hide");
    feedbackDisplay.classList.add("hide");
    endScreen.classList.remove("hide");
}