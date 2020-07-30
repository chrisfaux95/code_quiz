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
// Setup variables:
var score = 0;
// Time in seconds
var maxTime = 30;
var timeLeft;
var interval;

var mainDiv = $("main");

//FUNCTIONS:
/*
Prints the given question to the question box,
and creates the buttons for the possible answers.
*/
function printQuestion(q, qList) {
    // Set the current question to the header
    let currentQ = $("#question")
    currentQ.text(q.question);
    // Grab the list destination and empty it
    var qListDiv = $("#answers-list");
    qListDiv.empty();
    // Create a copy of list of possible answers and randomize the order
    let answersList = [...q.answers];
    shuffleArray(answersList);
    /* Creates a button for each answer with
    with bootstrap classes and appends it to the answers list*/
    answersList.forEach(ans => {
        let currentAns = $("<button>");
        currentAns.text(ans);
        currentAns.addClass("btn btn-primary btn-block answer-button");
        currentAns.appendTo(qListDiv);
    });
    // Creates event listeners for each button with the ability to check their answer.
    $(".answer-button").on("click", function () {
        var isCorrect = checkAnswer(q, $(this).text());
        // console.log(isCorrect);
        answerResults(isCorrect);
        // setScore();
        nextQuestion(q, qList);
    });
}


// Checks if the answer is correct
function checkAnswer(q, a) {
    return q.answers[0] === a;
}

//Function for answer results
function answerResults(correct) {
    if (correct) {
        // If answer is correct
        // Increase Score
        score += 10;
    } else {
        // If answer is incorrect
        // Reduce score
        score -= 10;
        // Decrease remaining time
        timeLeft -= 5;
    }
}


/* Sets the next asked question to
the next question in the list */
function nextQuestion(q, qList) {
    let currentIndex = qList.indexOf(q) + 1;
    // console.log(currentIndex);
    if (currentIndex >= qList.length) {
        endQuiz();
    } else {
        printQuestion(qList[currentIndex], qList);
    }
}


// Creates the intial state for the quiz
function initializeQuiz(qList) {
    score = 0;
    //creates the HTML elements for the quiz.
    createQuizElements();
    //Make a copy of the list of questions and shuffle it.
    var mixedQList = qList;
    shuffleArray(mixedQList);
    //sets the current index to 0
    var currentQIndex = 0;
    //Prints the first question in the shuffled list
    printQuestion(mixedQList[currentQIndex], mixedQList);
    startTimer();
}


// Creates the HTML elements for the quiz to display.
function createQuizElements() {
    // Selects the main div and empty it
    mainDiv.empty();

    // Add the question box to the main div
    let questionBox = $("<div>")
    questionBox.addClass("mx-auto questionBox text-center");
    mainDiv.append(questionBox);

    // Add the header to the question box
    let questionHeader = $("<h2>");
    questionHeader.attr("id", "question");
    questionBox.append(questionHeader);
    questionBox.append($("<hr>"));

    // Add the questions list to the question box
    let answersBox = $("<div>");
    answersBox.attr("id", "answers-list")
    questionBox.append(answersBox);

    //Add the timer to the question box
    questionBox.append($("<hr>"));
    let timerHeader = $("<h3>");
    timerHeader.attr("id", "timer");
    questionBox.append(timerHeader);

}


/* Function to create the HTML elements
for The High Score Input */
function createScoreBox(){
    //Create the Div containing the score inputs
    let scoreDiv = $("<div>");
    scoreDiv.addClass("mx-auto");
    scoreDiv.attr("id", "score-box");
    scoreDiv.appendTo(mainDiv);
    //create the header
    let scoreHeader = $("<h2>");
    scoreHeader.html("You Scored " + score + " points!");
    scoreHeader.appendTo(scoreDiv);
    //create the paragraph
    let scoreP = $("<p>");
    scoreP.text("Would you like to save your score?");
    scoreP.appendTo(scoreDiv);
    //create the score input
    let scoreInput = $("<input>");
    scoreInput.attr("id", "initials");
    scoreInput.attr("name", "initials");
    scoreInput.attr("type", "text");
    scoreInput.appendTo(scoreDiv);
    //create the submit button
    let scoreButton = $("<button>");
    scoreButton.attr("id", "score-button");
    scoreButton.addClass("btn btn-dark");
    scoreButton.text("Submit Score");
    scoreButton.on("click", function(){
        saveScore(scoreInput.val());
    });
    scoreButton.appendTo(scoreDiv);
}



// Ends the quiz and displays the score.
function endQuiz() {
    $("main").empty();
    score += timeLeft;
    // displayScore();
    clearInterval(interval);
    $("#final-score").text(score);
    createScoreBox();
}

// Sets the score to display in the Header.
function setScore() {
    $("#score").text("Score: " + score);
    // console.log("Current Score: " + score);
}


// Save score to local storage.
function saveScore(s) {
    finalScore = s + ": " + score;
    localStorage.setItem("high_score", finalScore);
}

// Get saved score from local storage.
function getScore() {
    return localStorage.getItem("high_score");
}

// Function to start the timer
function startTimer() {
    //Set time left to the max time.
    timeLeft = maxTime;
    //create the timer
    console.log("Time Started");
    interval = setInterval(function () {
        displayTimeLeft();
        timeLeft--;
        // console.log(timeLeft);
        if(timeLeft < 0){
            endQuiz();
            console.log("Time Elapsed");
        }
    }, 1000);
}

// Function to write timer to HTML;
function displayTimeLeft() {
    $("#timer").text("Seconds Remaining: "+timeLeft);
}


/* Function to shuffle the questions:
From: https://stackoverflow.com/a/12646864/13871979 */
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Allows user to save score on button press.
$("#score-button").on("click", function () { 
    saveScore($("#initials").val());
});

// Allows user to run quiz on button press.
$("#quiz-start").on("click", function () {
    initializeQuiz(questions);
});