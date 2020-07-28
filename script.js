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
/*
Prints the given question to the question box,
and creates the buttons for the possible answers.
*/
function printQuestion(q) {
    let currentQ = $("#question")
    currentQ.text(q.question);
    currentQ.attr("data-question", q.question);
    console.log(currentQ.attr("data-question"));
    var qList = $("#answers-list");
    qList.empty();
    let answersList = [...q.answers];
    shuffleArray(answersList);
        let currentAns = $("<button>");
        currentAns.text(ans);
        currentAns.addClass("btn btn-primary btn-block answer-button");
        currentAns.appendTo(qList);
    });
    $(".answer-button").on("click",function(){
        console.log(checkAnswer(q, $(this).text()));
    });
}
//setting up initial question
var currentQuestion = 0;
printQuestion(questions[0]);

$("#next-question").on("click", function () {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }
    // console.log(currentQuestion);
    printQuestion(questions[currentQuestion]);
});






//function to shuffle the questions:
//from: https://stackoverflow.com/a/12646864/13871979
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
