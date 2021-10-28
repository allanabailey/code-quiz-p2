const quizContainer = document.getElementById('quiz-container');
const scoresResults = document.getElementById('score-area');
const submitButton = document.getElementById('submit-button');

const sqlQuestions = new Array (
    "What does the S in SQL stand for?",
    "What is the keyword used to select unique/different values?",
    "Does ORDER BY default to ASC or DESC when not specified?",
    "What is the wildcard used to select all columns from a table?",
    "What is the keyword used to specify the range of values something can be in?",
    "True or False: TRUNCATE TABLE deletes the whole table.",
    "What is the keyword used to filter records through meeting a certain condition in a SELECT statement?",
    "What is the keyword used to search for a particular pattern in a WHERE clause?",
    "What key word must go at the end of a CASE statement?",
    "True or False: DROP TABLE only deletes the data in the table, not the table itself."
);

const sqlAnswers = new Array (
    "STRUCTURED",
    "DISTINCT",
    "ASC",
    "*",
    "BETWEEN",
    "FALSE",
    "WHERE",
    "LIKE",
    "END",
    "FALSE"
);



// Wait for the DOM to completely finish loading
// before running the game
document.addEventListener('DOMContentLoaded', function() {
    //Allow the user to click enter to submit their answer.
    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if(event.key === 'Enter') {
            checkAnswer();
        }
    });
    submitButton.addEventListener('click', checkAnswer);
    runQuiz();
});


/**
 * Main function that runs the game and calls the other
 * functions to display one of the questions
 */
function runQuiz() {
    //Clears input for user each time a new question is loaded.
    document.getElementById('answer-box').value = '';
    //Place the cursor in the answer box automatically.
    document.getElementById('answer-box').focus();

    //Randomly choose a question from the array
    let qNumber = Math.floor(Math.random() * sqlQuestions.length);
    if(sqlQuestions.length === 0) {
        let finishMsg = document.getElementById('question');
        finishMsg.textContent = "Congratulations you have finished the quiz! Refresh for more!";
    } else {
        let qDiv = document.getElementById('qNumber');
        qDiv.textContent = qNumber;
        console.log(sqlQuestions);
        displaySQLQuestion(qNumber);
        sqlQuestions.splice(qNumber, 1);
    }
}


function generateNewQNum() {
    let newQNumber = Math.floor(Math.random() * 10);
    if(qNumbersUsed.includes(newQNumber)) {
        generateNewQNum();
    } else {
        return newQNumber;
    }
}


function displaySQLQuestion(qNumber) {
    let q = document.getElementById('question');
    q.innerHTML = sqlQuestions[qNumber];
}

function checkAnswer() {
    let userAnswer = document.getElementById('answer-box').value.trim().toUpperCase();
    let correctAnswer = sqlAnswers[document.getElementById('qNumber').innerHTML];
    if(userAnswer === correctAnswer) {
        alert("yay!");
        addScore();
    } else {
        alert("NO!");
        addWrong();
    }

    runQuiz();
}

function addScore() {
    let currentScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++currentScore;
    if(currentScore == 10) {
        alert('Congratulations you have reached 10 points!');
        quizContainer.style.backgroundColor = 'green';
    }
}

function addWrong() {
    let currentWrong = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++currentWrong;
}