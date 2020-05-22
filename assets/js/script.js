// Question Variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answer-buttons');
const highscores = document.getElementById('highscores');
const mainEl = document.getElementById('main-container');
const scores = document.getElementById('view-score');
var shuffledQuestions, currentQuestion;
var answered = 0;
var score = 0;
var hasEnded = false;

//Timer Variables
const timerEl = document.getElementById('timer');
var startTime = 0;
var counter = 0;
var currentTime = startTime * 60;

//Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestion++;
    setNextQuestion();
});
scores.addEventListener('click', viewScore);

// Question Function Start
function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    questionContainerEl.classList.remove('hide');
    var timer = setInterval(updateTimer, 1000);
    resetTimer();
    setNextQuestion();
};

function setNextQuestion() {
    resetQuestion();
    showQuestion(shuffledQuestions[currentQuestion]);
};

function showQuestion(question) {
    if (answered === 5 && hasEnded === false) {
        timerEl.classList.add('hide');
        setTimeout(endQuiz, 100);
    }
    answered++;
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonEl.appendChild(button);
    });
};

function resetQuestion() {
    nextButton.classList.add('hide');
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    };
};

function selectAnswer(e) {
    const selectedAnswer = e.target;
    const correct = selectedAnswer.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    };
    if (!correct) {
        currentTime--;
        currentTime--;
        currentTime--;
    } else {
        score++;
        console.log(score);
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    };
};
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};
function endQuiz() {
    hasEnded = true;
    var userName = prompt("Enter your name to save your score!");
    while (userName === null) {
        alert('Invalid input! Try again!');
        userName = prompt("Enter your name to save your score!");
    }
    var saveScore = userName + ":" + score;
    highscores.classList.remove('hide');
    mainEl.classList.add('hide');
    document.getElementById('top-ten').innerHTML = `Score ` + saveScore;
    let myScores = localStorage.getItem('highscores');
    window.localStorage.setItem('highscores', myScores + '_' + saveScore);
};
function viewScore() {
    let myScoresStr = localStorage.getItem('highscores');
    let myScoresArr = myScoresStr.split("_");
    console.log(myScoresArr);
    highscores.classList.remove('hide');
    mainEl.classList.add('hide');
    timerEl.classList.add('hide');
    document.getElementById('top-ten').innerHTML = '';
    myScoresArr.shift();
    for (var i = myScoresArr.length - 10; i < myScoresArr.length; i++) {
        if (i < 0) {
            i = 0;
        };

        var li = document.createElement('li');
        var text = document.createTextNode(myScoresArr[i]);
        li.appendChild(text);
        document.getElementById('top-ten').appendChild(li);
    }
};
// Timer Functions Start
function updateTimer() {
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `Time ${minutes}: ${seconds}`;
    currentTime--;
    if (minutes <= 0 && seconds <= 0 && hasEnded === false) {
        timerEl.classList.add('hide');
        setTimeout(endQuiz, 100);
    };
};
function resetTimer(duration, display) {
    startTime = .50;
    currentTime = startTime * 60;
    hasEnded = false;
};
//QUESTIONS ARRAY START
const questions = [{
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: [{
                text: '<script src="xxx.js">',
                correct: true
            },
            {
                text: '<script name="xxx.js">',
                correct: false
            },
            {
                text: '<script href="xxx.js">',
                correct: false
            },
            {
                text: '<script code="xxx.js">',
                correct: false
            }
        ]
    },
    {
        question: 'What must the external Javascript file contain as a tag?',
        answers: [{
                text: '<script src="xxx.js">',
                correct: false
            },
            {
                text: '<html>',
                correct: false
            },
            {
                text: '<script>',
                correct: false
            },
            {
                text: 'None of the Above',
                correct: true
            }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [{
                text: 'alert("Hello World");',
                correct: true
            },
            {
                text: 'alertBox("Hello World");',
                correct: false
            },
            {
                text: 'msgBox("Hello World");',
                correct: false
            },
            {
                text: 'msg("Hello World");',
                correct: false
            }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [{
                text: 'function.myFunction()',
                correct: false
            },
            {
                text: 'function:myFunction()',
                correct: false
            },
            {
                text: 'function myFunction()',
                correct: true
            },
            {
                text: 'function = myFunction()',
                correct: false
            }
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [{
                text: 'call.function.myFunction()',
                correct: false
            },
            {
                text: 'myFunction()',
                correct: true
            },
            {
                text: 'call myFunction()',
                correct: false
            },
            {
                text: 'function.call = myFunction()',
                correct: false
            }
        ]
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [{
                text: 'if (condition){execute}',
                correct: true
            },
            {
                text: 'if {execute}(condition)',
                correct: false
            },
            {
                text: '(condition)if{execute}',
                correct: false
            },
            {
                text: '(condition){execute}if',
                correct: false
            }
        ]
    },
    {
        question: 'How does a WHILE loop start?',
        answers: [{
                text: 'while "i <= 10"',
                correct: false
            },
            {
                text: 'while (i <= 10)',
                correct: true
            },
            {
                text: 'while.i <= 10',
                correct: false
            },
            {
                text: 'while (i is 10)',
                correct: false
            }
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [{
                text: 'for (i <= 5; i++)',
                correct: false
            },
            {
                text: 'for (i = 0;)',
                correct: false
            },
            {
                text: 'for (i++)',
                correct: false
            },
            {
                text: 'for (i = 0; i <= 5; i++)',
                correct: true
            }
        ]
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [{
                text: '// This is a comment.',
                correct: true
            },
            {
                text: 'comment = This is a comment.',
                correct: false
            },
            {
                text: '<!--This is a comment-->.',
                correct: false
            },
            {
                text: '##This is a comment.',
                correct: false
            }
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [{
                text: 'var colors = ["red", "green", "blue"]',
                correct: true
            },
            {
                text: 'Array colors = "red", "green", "blue"',
                correct: false
            },
            {
                text: 'var colors = {"red", "green", "blue"}',
                correct: false
            },
            {
                text: 'var colors = "red" + "green" + "blue"',
                correct: false
            }
        ]
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        answers: [{
                text: 'Math.nearest(7.25)',
                correct: false
            },
            {
                text: 'round(7.25)',
                correct: false
            },
            {
                text: 'Math.round(7.25)',
                correct: true
            },
            {
                text: 'Math.rnd(7.25)',
                correct: false
            }
        ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: [{
                text: 'onmouseover',
                correct: false
            },
            {
                text: 'onchange',
                correct: false
            },
            {
                text: 'onclick',
                correct: true
            },
            {
                text: 'onmouseclick',
                correct: false
            }
        ]
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [{
                text: 'variable carName;',
                correct: false
            },
            {
                text: 'v carName;',
                correct: false
            },
            {
                text: 'var = carName;',
                correct: false
            },
            {
                text: 'var carName;',
                correct: true
            }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [{
                text: '=',
                correct: true
            },
            {
                text: '-',
                correct: false
            },
            {
                text: '+',
                correct: false
            },
            {
                text: '*',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the BEST Teachers Assistant in the UofU coding bootcamp?',
        answers: [{
                text: 'Dave V.',
                correct: true
            },
            {
                text: 'David M.',
                correct: true
            },
            {
                text: 'Isaac P. ',
                correct: true
            },
            {
                text: 'Tamar A.',
                correct: true
            }
        ]
    },
];