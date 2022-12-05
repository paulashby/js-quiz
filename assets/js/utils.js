// Set vars globally rather than in feedback func so we're not re-creating them for every call
var feedbackDisplay = document.querySelector("#feedback");
// Set duration of feedback display
var feedbackDuration = 1500;

function feedback(message) {
    feedbackDisplay.textContent = message;
    feedbackDisplay.classList.remove("hide");

    // Remove feedback after feedbackDuration
    window.setTimeout(function(){
        feedbackDisplay.classList.add("hide");
    }, feedbackDuration);
}