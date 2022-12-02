// The idea here is that we can give each answer button a data-index attribute
// Then we check whether that matches correctAnswer.
// I'll vary the index of the correct answer, so I don't need to worry about shuffling them
var questionsArray = [
    {
        question: "Which of the following is not a logical operator?",        
        answers: [
            ["||"],
            ["="],
            ["&&"],
            ["!"]
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following evaluates to true?",
        answers: [
            ["1 == true"],
            ["1 === '1'"],            
            ["true == false"],
            ["1 === true"]
        ],
        correctAnswer: 0
    }
]