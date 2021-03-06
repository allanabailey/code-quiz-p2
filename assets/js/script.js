const quizContainer = document.getElementById('quiz-container');

//Audio files to play on getting an answer correct / incorrect.
const correct = new Audio('assets/audio/correct.mp3');
const incorrect = new Audio('assets/audio/incorrect.mp3');

//SQL Question and Answer array
const sqlQuestions = [
    {
      question: "What does the S in SQL stand for?",
      answer: "STRUCTURED"
    },
    {
      question: "What is the keyword used to select unique/different values?",
      answer: "DISTINCT"
    },
    {
      question: "Does ORDER BY default to ASC or DESC when not specified?",
      answer: "ASC"
    },
    {
      question: "What is the wildcard used to select all columns from a table?",
      answer: "*"
    }, 
    {
      question: "What is the keyword used to specify the range of values something can be in?",
      answer: "BETWEEN"
    },  
    {
      question: "True or False: TRUNCATE TABLE deletes the whole table.",
      answer: "FALSE"
    }, 
    {
      question: "What is the keyword used to filter records through meeting a certain condition in a SELECT statement?",
      answer: "WHERE"
    },
    {
      question: "What is the keyword used to search for a particular pattern in a WHERE clause?",
      answer: "LIKE"
    },
    {
      question: "What key word must go at the end of a CASE statement?",
      answer: "END"
    },
    {
      question: "True or False: DROP TABLE only deletes the data in the table, not the table itself.",
      answer: "FALSE"
    }
];

const htmlQuestions = [
  {
    question: "What does the M in HTML stand for?",
    answer: "MARKUP"
  },
  {
    question: "What is the starting tag of an html document?",
    answer: "HTML"
  },
  {
    question: "What is the tag of the first subheading?",
    answer: "H2"
  },
  {
    question: "What is the attribute that defines the URL in an anchor tag?",
    answer: "HREF"
  }, 
  {
    question: "What is the tag for creating an unordered list?",
    answer: "UL"
  },  
  {
    question: "Is the attribute 'ID' or 'Class' used for unique elements?",
    answer: "ID"
  }, 
  {
    question: "What is the tag for images?",
    answer: "IMG"
  },
  {
    question: "What letter is used to declare a paragraph element?",
    answer: "P"
  },
  {
    question: "True or False: 'Text' is a valid input type in a form.",
    answer: "TRUE"
  },
  {
    question: "What attribute can be used to alter the appearance of elements rather than using CSS?",
    answer: "STYLE"
  }
];

const cssQuestions = [
  {
    question: "What does the C in CSS stand for?",
    answer: "CASCADING"
  },
  {
    question: "Does .active or #active refer to the element(s) with a class of active?",
    answer: ".ACTIVE"
  },
  {
    question: "What is the three letter word to describe the #rrggbb colour format?",
    answer: "HEX"
  },
  {
    question: "What is used to create space around an element outside of its borders?",
    answer: "MARGIN"
  }, 
  {
    question: "What type of element does not start a new line and only takes up as much space as it needs (e.g span)?",
    answer: "INLINE"
  },  
  {
    question: "What type of element starts a new line and takes up the full width (e.g div)?",
    answer: "BLOCK"
  }, 
  {
    question: "Which property specifies what elements can float beside a cleared element?",
    answer: "CLEAR"
  },
  {
    question: "In the box model, which property clears a space around the content, within the border?",
    answer: "PADDING"
  },
  {
    question: "What type of class can be used to define a special state of an element (e.g btn:active)?",
    answer: "PSEUDO"
  },
  {
    question: "What can you set the box-sizing property to ensure that all padding and borders are included in the total size?",
    answer: "BORDER-BOX"
  }
];

const jsQuestions = [
  {
    question: "True or False: JavaScript accepts both double and single quotes.",
    answer: "TRUE"
  },
  {
    question: "What is the HTML element that contains javascript code?",
    answer: "SCRIPT"
  },
  {
    question: "What is the container for storing data called?",
    answer: "VARIABLE"
  },
  {
    question: "What is the assignment operator?",
    answer: "="
  }, 
  {
    question: "True or False: JavaScript types are static.",
    answer: "FALSE"
  },  
  {
    question: "What can be used to store a list of values which can be accessed via an index?",
    answer: "ARRAY"
  }, 
  {
    question: "What function returns a random number between 0 and 1(exclusive)?",
    answer: "MATH.RANDOM"
  },
  {
    question: "What type of loop loops through a block of code a specific number of time?",
    answer: "FOR"
  },
  {
    question: "What data type only takes the values of 'true' or 'false'?",
    answer: "BOOLEAN"
  },
  {
    question: "What is the comparison operator for checking that something is not equal?",
    answer: "!="
  }
];

// Wait for the DOM to completely finish loading
// before running the game
document.addEventListener('DOMContentLoaded', function() {

    let buttons = document.getElementsByTagName('button');

    //Create slide down version of the rules using JQuery
    $("#rules-header").click(function(e){
      e.preventDefault();
      $("#rules").slideToggle(1000);
    });

    //Allow the user to click enter to submit their answer.
    document.getElementById('answer-box').addEventListener('keydown', function(event) {

        if(event.key === 'Enter') {
            checkAnswer();
        }
    });

    for (var button of buttons) {
      button.addEventListener("click", function() {

        if (this.getAttribute("data-type") === "submit") {
            checkAnswer();
        } else {

            let codingLang = this.getAttribute("data-type");

            //make the background colour white so the user knows which coding languages they have done.
            $(this).addClass("clicked");
            //disable the button to prevent the user from accidentally completing the quiz.
            this.disabled = true;
            runQuiz(codingLang);
        }
    });
    }
});


/**
 * Main function that runs the game and calls the other
 * functions to display one of the questions
 */
function runQuiz(codingLang) {
    //Clears input for user each time a new question is loaded.
    document.getElementById('answer-box').value = '';
    //Place the cursor in the answer box automatically.
    document.getElementById('answer-box').focus();

    //Declare the div containing the question to input a congratulations message later
    let finishMsg = document.getElementById('question');
    //Declare the 2 divs that store the coding language and question number to update below
    let qDiv = document.getElementById('qNumber');
    let langDiv = document.getElementById('langDiv');
    let numDiv = document.getElementById('numDiv');

    let htmlButton = document.getElementById('html-btn');
    let cssButton = document.getElementById('css-btn');
    let jsButton = document.getElementById('js-btn');
    let sqlButton = document.getElementById('sql-btn');

    //SQL
    if(codingLang === "sql") {

      $(sqlButton).addClass('active');
      htmlButton.disabled = false;
      $(htmlButton).removeClass('active');
      cssButton.disabled = false;
      $(cssButton).removeClass('active');
      jsButton.disabled = false;
      $(jsButton).removeClass('active');

      if(sqlQuestions.length === 0) {
          //Check if the user has completed the quiz and display a congratulations message
          //and clear the quiz area if so.
          finishMsg.textContent = "Quiz complete! Refresh the page to try again or choose a new one to try!";
      } else {
          //If not completed, build and run the SQL quiz.
          //Choose a random question and store the question number in a hidden div.
          let qNumber = Math.floor(Math.random() * sqlQuestions.length);
          numDiv.textContent = qNumber;
          qDiv.textContent = sqlQuestions[qNumber].answer;
          //Store the coding language chosen in a hidden div.
          langDiv.textContent = 'sql';
          //Display and build the SQL questions and remove the question and answer from the array.
          displaySQLQuestion(qNumber);
      }

      // HTML Quiz
    } else if(codingLang === "html") {

      $(htmlButton).addClass('active');
      cssButton.disabled = false;
      $(cssButton).removeClass('active');
      jsButton.disabled = false;
      $(jsButton).removeClass('active');
      sqlButton.disabled = false;
      $(sqlButton).removeClass('active');

      if(htmlQuestions.length === 0) {
          //Check if the user has completed the quiz and display a congratulations message
          //and clear the quiz area if so.
          finishMsg.textContent = "Quiz complete! Refresh the page to try again!";
      } else {
          //If not completed, build and run the HTML quiz.
          //Choose a random question and store the question number in a hidden div.
          let qNumber = Math.floor(Math.random() * htmlQuestions.length);
          numDiv.textContent = qNumber;
          qDiv.textContent = htmlQuestions[qNumber].answer;
           //Store the coding language chosen in a hidden div.
          langDiv.textContent = 'html';
          //Display and build the HTML questions and remove the question and answer from the array.
          displayHTMLQuestion(qNumber);
      }

    //CSS Quiz
    } else if(codingLang === "css") {

      $(cssButton).addClass('active');
      htmlButton.disabled = false;
      $(htmlButton).removeClass('active');
      jsButton.disabled = false;
      $(jsButton).removeClass('active');
      sqlButton.disabled = false;
      $(sqlButton).removeClass('active');

      if(cssQuestions.length === 0) {
          //Check if the user has completed the quiz and display a congratulations message
          //and clear the quiz area if so.
          finishMsg.textContent = "Quiz complete! Refresh the page to try again!";
      } else {
          //If not completed, build and run the CSS quiz.
          //Choose a random question and store the question number in a hidden div.
          let qNumber = Math.floor(Math.random() * cssQuestions.length);
          numDiv.textContent = qNumber;
          qDiv.textContent = cssQuestions[qNumber].answer;
           //Store the coding language chosen in a hidden div.
          langDiv.textContent = 'css';
          //Display and build the CSS questions and remove the question and answer from the array.
          displayCSSQuestion(qNumber);
      }

    //JS Quiz
    } else if(codingLang === "js") {

      $(jsButton).addClass('active');
      htmlButton.disabled = false;
      $(htmlButton).removeClass('active');
      cssButton.disabled = false;
      $(cssButton).removeClass('active');
      sqlButton.disabled = false;
      $(sqlButton).removeClass('active');

      if(jsQuestions.length === 0) {
          //Check if the user has completed the quiz and display a congratulations message
          //and clear the quiz area if so.
          finishMsg.textContent = "Quiz complete! Refresh the page to try again!";
      } else {
          //If not completed, build and run the JS quiz.
          //Choose a random question and store the question number in a hidden div.
          let qNumber = Math.floor(Math.random() * jsQuestions.length);
          numDiv.textContent = qNumber;
          qDiv.textContent = jsQuestions[qNumber].answer;
           //Store the coding language chosen in a hidden div.
          langDiv.textContent = 'js';
          //Display and build the JS questions and remove the question and answer from the array.
          displayJSQuestion(qNumber);
      }
    } 
}


/**
 * Function that displays the next SQL question in the quiz area
 * by taking qNumber as a parameter and displaying the question
 * in that index of the array.
 * @param {*} qNumber 
 */
function displaySQLQuestion(qNumber) {

    let q = document.getElementById('question');
    q.innerHTML = sqlQuestions[qNumber].question;
}

/**
 * Function that displays the next HTML question in the quiz area
 * by taking qNumber as a parameter and displaying the question
 * in that index of the array.
 * @param {*} qNumber 
 */
 function displayHTMLQuestion(qNumber) {

  let q = document.getElementById('question');
  q.innerHTML = htmlQuestions[qNumber].question;
}

/**
 * Function that displays the next CSS question in the quiz area
 * by taking qNumber as a parameter and displaying the question
 * in that index of the array.
 * @param {*} qNumber 
 */
 function displayCSSQuestion(qNumber) {

  let q = document.getElementById('question');
  q.innerHTML = cssQuestions[qNumber].question;
}

/**
 * Function that displays the next JS question in the quiz area
 * by taking qNumber as a parameter and displaying the question
 * in that index of the array.
 * @param {*} qNumber 
 */
 function displayJSQuestion(qNumber) {

  let q = document.getElementById('question');
  q.innerHTML = jsQuestions[qNumber].question;
}

/**
 * Function that checks the user's inputted answer against the correct answer
 * stored in the array ignoring case and leading/trailing white spaces.
 */
function checkAnswer() {

    //Ignore any leading/trailing white spaces and the case of the user's input.
    let userAnswer = document.getElementById('answer-box').value.trim().toUpperCase();
    let correctAnswer = document.getElementById('qNumber').innerHTML;
    let codingLang = document.getElementById('langDiv').innerHTML;
    let numDiv = document.getElementById('numDiv').innerHTML;
    if(userAnswer === correctAnswer && userAnswer !== '') {
        correct.play();
        addScore();
    } else {
        incorrect.play();
        alert(`Unlucky! You answered: ${userAnswer}. The correct answer was ${correctAnswer}!`);
        addWrong();
    }
    if(codingLang === 'html') {
      htmlQuestions.splice(numDiv, 1);
    } else if(codingLang === 'css') {
      cssQuestions.splice(numDiv, 1);
    } else if(codingLang === 'js') {
      jsQuestions.splice(numDiv, 1);
    } else if(codingLang === 'sql') {
      sqlQuestions.splice(numDiv, 1);
    }
    runQuiz(codingLang);
}


/**
 * Function to increment the users score on getting an answer correct.
 */
function addScore() {

    let currentScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++currentScore;

    //Alert the user with congratulations every 10 correct answers.
    if(currentScore == 10) {
        alert('Congratulations you have reached 10 points!');
    }
    if(currentScore == 20) {
      alert('Congratulations you have reached 20 points!');
    }
    if(currentScore == 30) {
      alert('Congratulations you have reached 30 points!');
    }
    //If the user has answered every single question correctly, change the background colour
    // to a lighter blue and alert them.
    if(currentScore == 40) {
      alert('Congratulations you answered every single question correctly!');
      quizContainer.style.backgroundColor = '#2A4494';
    }
}


/**
 * Function to increment the 'incorrect' score if the user gets an answer wrong.
 */
function addWrong() {

    let currentWrong = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++currentWrong;
}
