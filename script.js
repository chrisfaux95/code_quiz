const questions = [
    {question: "Which of the following is a correct way to format comments in Javascript?",
    answers: [
        "//This is a comment.",
        "<!-- This is a comment. -->",
        "#This is a comment.",
        "\"This is a comment.\""
    ]},
    {question: "How would you create a variable with the value of 5?", answers: [
        "var x = 5;",
        "x === 5;",
        "variable x = 5;",
        "v x == 5;"
    ]}
]

function printQuestion(q){
    $("#question").text(q.question);
    var qList = $("#answers-list");
    qList.text("");
    q.answers.forEach(ans => {
        let currentAns = $("<li>");
        currentAns.text(ans);
        qList.append(currentAns);
        console.log(ans);
    });
}

var currentQuestion = 0;
printQuestion(questions[0]);

$("#next-question").on("click", function(){
    currentQuestion++;
    if(currentQuestion >= questions.length){
        currentQuestion = 0;
    }
    // console.log(currentQuestion);
    printQuestion(questions[currentQuestion]);
})
//function to shuffle the questions:
//from: https://stackoverflow.com/a/12646864/13871979
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
