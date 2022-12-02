var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var countdown = document.querySelector("#time");
var endscreen = document.querySelector("#end-screen");


/*

var questionNum;
var currQuestion;
var score;

-- in init()?
    add click listener to #start button
    add click listener to #choices

start handler

    questionNum = 0;
    score = 0;

    Start timer - 75 seconds
        - this is a setInterval (1000)
            callback should               
                - check whether time is up
                    if so
                        endGame()
                    else
                        Update content of countdown

    loadQuestion()



choice handler
    get the data-index of the event target and compare to currQuestion.correctAnswer
        if correct
            play correct sound fx
            increment score
        else 
            play incorrect sound fx
            decrement time

        displayMessage - need to add this element to the HTML, I think - you can see it on the demo
        - says "Wrong!" or "Correct!"
        loadQuestion()





function loadQuestion() {
    // Should this go in questions.js? - Don't think so
    if no more questions
        endGame()
    else
        currQuestion = questionsArray[questionNum]
        updateQuestion()
}   

function updateQuestion() {
    questions.classList.remove("hide");
    // The current question will be updated every time an answer is given
    var currQuestion = questionsArray[1];
    questionTitle.textContent = currQuestion.question;

    for (var i = 0; i < currQuestion.answers.length; i++) {
        choice = document.querySelector("[data-index='" + i + "']");
        choice.textContent = currQuestion.answers[i];
    }
}

function endGame() {
    hide questions
    show end-screen
}
*/