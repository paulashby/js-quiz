
var wrapper = document.querySelector(".wrapper");
var highscores = wrapper.querySelector("#highscores");
var clearBttn = wrapper.querySelector("#clear");
var feedbackDisplay = document.querySelector("#feedback");
var scoreMessage = window.localStorage.getItem("feedback");
window.localStorage.removeItem("feedback");

clearBttn.addEventListener("click", onClear);

if (scoreMessage) {
    feedback(scoreMessage);
}

// Iterate over items in localStorage and add to the list of scores
var highscoreData = window.localStorage.getItem("highscores");

if (highscoreData) {
    // Convert to object
    highscoreData = JSON.parse(highscoreData);

    for (var [key, value] of Object.entries(highscoreData)) {
        // Set value to zero if not already in localStorage
        var entry = document.createElement("li");
        entry.textContent = key + ": " + value;
        highscores.appendChild(entry);
    }
}

function onClear() {
    window.localStorage.removeItem("highscores");
    highscores.innerHTML = "";
    feedback("Highscores cleared.");
}