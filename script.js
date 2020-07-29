/* here is the array of quiz questions */
const questions = [
    {
        question: "Which of the following is a correct way to format comments in Javascript?",
        answers: [
            "//This is a comment.",
            "<!-- This is a comment. -->",
            "#This is a comment.",
            "\"This is a comment.\""
        ]
    },
    {
        question: "How would you create a variable with the value of 5?", answers: [
            "var x = 5;",
            "x === 5;",
            "variable x = 5;",
            "v x == 5;"]
    },
    {
        question: "What would \"alphabet[5]\" result in?",
        answers: ["b",
            "a",
            "NULL",
            "e"]
    },
    {
        question: "Which of these is not a valid way to generate a random integer between 1-10?",
        answers: ["Math.ceil(Math.random() * 11);",
            "Math.floor(Math.random() * 10 + 1);",
            "Math.ceil(Math.random() * 10);",
            "Math.floor(Math.random() * 11);"]
    },
    {
        question: "Which operator returns the remainder after division?",
        answers: ["%",
            "&",
            "/",
            "!"
        ]
    },
    {
        question: "Which of the following is the symbol for OR?",
        answers: ["||",
            "&&",
            "~~",
            "!!"]
    },
    {
        question: "Which of the following is not equivalent to a Boolean value of True?",
        answers: ["\"\"", "-1", "[]", "{}"]
    },
    {
        question: "How would you print \"Hello World!\" to the console?",
        answers: ["console.log(\"Hello World!\");",
            "print (\"Hello World!\")",
            "printToConsole(\"Hello World!\");",
            "console(\"Hello World!\");"
        ]
    },
    {
        question: "Which of the following methods would turn the string str into an array of characters?",
        answers: ["str.split(\"\");",
            "str.toArray();",
            "str.slice();",
            "[str];"]
    },
    {
        question: "What would the result of \"pizza\".indexOf(\"z\") be?",
        answers: [
            "2", "3", "4", "-1"
        ]
    }

]
//setup variables:
var score = 0;
//time in seconds
var maxTime = 100;


//FUNCTIONS:
/*
Prints the given question to the question box,
and creates the buttons for the possible answers.
*/
function printQuestion(q, qList) {
    //set the current question to the header
    let currentQ = $("#question")
    currentQ.text(q.question);
    //grab the list destination and empty it
    var qListDiv = $("#answers-list");
    qListDiv.empty();
    //create a copy of list of possible answers and randomize the order
    let answersList = [...q.answers];
    shuffleArray(answersList);
    /*creates a button for each answer with
    with bootstrap classes and appends it to the answers list*/
    answersList.forEach(ans => {
        let currentAns = $("<button>");
        currentAns.text(ans);
        currentAns.addClass("btn btn-primary btn-block answer-button");
        currentAns.appendTo(qListDiv);
    });
    //creates event listeners for each button with the ability to check their answer.
    $(".answer-button").on("click", function () {
        var isCorrect = checkAnswer(q, $(this).text());
        console.log(isCorrect);
        if (isCorrect){
            score++;
        } else {
            score--;
        }
        setScore();
        nextQuestion(q, qList);
    });
}
//setting up initial question
// var currentQuestion = 0;
// printQuestion(questions[0]);
//Creating an Event Listener to go through all of the questions.


//checks if the answer is correct
function checkAnswer(q, a) {
    return q.answers[0] === a;
}

function nextQuestion(q, qList){
    let currentIndex = qList.indexOf(q) + 1;
    console.log(currentIndex);
    if(currentIndex >= qList.length){
        endQuiz();
    } else {
        printQuestion(qList[currentIndex], qList);
    }
}

//creates the intial state for the quiz
function initializeQuiz(qList) {
    createQuizElements();
    //Make a copy of the list of questions and shuffle it.
    var mixedQList = qList;
    shuffleArray(mixedQList);
    //Makes the question box visible
    // $("#question-box").removeClass("invisible")
    //sets the current index to 0
    var currentQIndex = 0;
    //prints the first question
    printQuestion(mixedQList[currentQIndex], mixedQList);
    //creates event listener on the next question button
    //to cycle through the different questions.
    $("#next-question").on("click", function () {
        currentQIndex++;
        if (currentQIndex >= questions.length) {
            shuffleArray(mixedQList);
            currentQIndex = 0;
        }
        // console.log(currentQuestion);
        printQuestion(questions[currentQIndex], mixedQList);
    });
}

/*function to shuffle the questions:
from: https://stackoverflow.com/a/12646864/13871979 */
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function runQuiz(qList){
    score = 0;
    var time = maxTime;
    //create inital state:
    initializeQuiz(qList);
    // startTimer(time);

}

function createQuizElements(){
    //select the main div and empty it
    let mainDiv = $("main");
    mainDiv.empty();
    //add the question box to the main div
    let questionBox = $("<div>")
    questionBox.addClass("mx-auto questionBox");
    mainDiv.append(questionBox);
    //Add the header to the question box
    let questionHeader = $("<h2>");
    questionHeader.attr("id", "question");
    questionBox.append(questionHeader);
    questionBox.append($("<hr>"));
    //add the questions list to the question box
    let answersBox = $("<div>");
    answersBox.attr("id","answers-list")
    questionBox.append(answersBox);
}

// Ends the quiz and displays the score.
function endQuiz(){
    $("main").empty();
    displayScore();
}

function setScore(){
    $("#score").text("Score: " + score);
    console.log("Current Score: " + score);
}


$("#quiz-start").on("click",function(){
    runQuiz(questions);
});

