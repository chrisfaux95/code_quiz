const questions = [
    {question: "Which of the following is a correct way to format comments in Javascript?",
    answers: [
        "//This is a comment.",
        "<!-- This is a comment. -->",
        "#This is a comment.",
        "\"This is a comment.\""
    ]}
]



//function to shuffle the questions:
//from: https://stackoverflow.com/a/12646864/13871979
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}