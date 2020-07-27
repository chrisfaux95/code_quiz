const questions = [
    {question: "Which of the following is a correct way to format comments in Javascript?",
    answers: [
        "//This is a comment.",
        "<!-- This is a comment. -->",
        "#This is a comment.",
        "\"This is a comment.\""
    ]}
]

function printQuestion(q){
    $("#question").text(q.question);
    let qList = $("#answers-list");
    q.answers.forEach(ans => {
        let currentAns = $("<li>");
        currentAns.text(ans);
        qList.append(currentAns);
        console.log(ans);
    });
}

printQuestion(questions[0])

//function to shuffle the questions:
//from: https://stackoverflow.com/a/12646864/13871979
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
