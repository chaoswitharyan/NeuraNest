
const questions = [
    {
        question: "What does AI stand for?",
        answers: [
            "Automated Internet",
            "Artificial Intelligence",
            "Advanced Information",
            "Artificial Integration"
        ],
        correct: 1
    },
    {
        question: "Which technology allows computers to learn from data?",
        answers: [
            "HTML",
            "CSS",
            "Machine Learning",
            "Networking"
        ],
        correct: 2
    },
    {
        question: "What is a neural network inspired by?",
        answers: [
            "The human brain",
            "The internet",
            "A computer screen",
            "A database"
        ],
        correct: 0
    },
    {
        question: "Which company develops the Nemotron family of AI models?",
        answers: [
            "Microsoft",
            "NVIDIA",
            "Apple",
            "Amazon"
        ],
        correct: 1
    },
    {
        question: "What is ChatGPT?",
        answers: [
            "A programming language",
            "A computer processor",
            "An AI conversational assistant",
            "An operating system"
        ],
        correct: 2
    },
    {
        question: "What does GPT stand for?",
        answers: [
            "General Processing Technology",
            "Generative Pre-trained Transformer",
            "Global Programming Tool",
            "Generated Personal Technology"
        ],
        correct: 1
    },
    {
        question: "What is the main purpose of a GPU in AI?",
        answers: [
            "Displaying documents",
            "Playing audio",
            "Performing parallel computations",
            "Storing passwords"
        ],
        correct: 2
    },
    {
        question: "What can an AI agent do?",
        answers: [
            "Only display images",
            "Plan tasks and use tools",
            "Only calculate numbers",
            "Replace the internet"
        ],
        correct: 1
    },
    {
        question: "Which language adds interactivity to websites?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },
    {
        question: "What is Generative AI designed to do?",
        answers: [
            "Create new content",
            "Only store files",
            "Repair computer hardware",
            "Increase screen brightness"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const countElement = document.getElementById("question-count");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    countElement.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.hidden = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answersElement.querySelectorAll("button");

    if (selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct! Excellent work! 🎉";
    } else {
        feedbackElement.textContent =
            "Not quite! The correct answer is: " +
            questions[currentQuestion].answers[correctIndex];
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.style.borderColor = "#56d99a";
        } else if (index === selectedIndex) {
            button.style.borderColor = "#f17ab8";
        }
    });

    nextButton.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "View Results →";
    }
}

function showResults() {
    questionElement.hidden = true;
    countElement.hidden = true;
    answersElement.hidden = true;
    feedbackElement.hidden = true;
    nextButton.hidden = true;

    resultElement.hidden = false;// Save quiz statistics for the dashboard
const previousBest = Number(
    localStorage.getItem("neuralnestBestQuizScore") || 0
);

localStorage.setItem(
    "neuralnestLastQuizScore",
    String(score)
);

const attempts = Number(
    localStorage.getItem("neuralnestQuizAttempts") || 0
);

localStorage.setItem(
    "neuralnestQuizAttempts",
    String(attempts + 1)
);

if (score > previousBest) {
    localStorage.setItem(
        "neuralnestBestQuizScore",
        String(score)
    );
}

    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

    if (score === 10) {
        messageElement.textContent = "Perfect score! You're an AI expert! 🏆";
    } else if (score >= 7) {
        messageElement.textContent = "Great job! You understand AI really well!";
    } else if (score >= 4) {
        messageElement.textContent = "Good effort! Keep exploring AI!";
    } else {
        messageElement.textContent = "Keep learning! Every expert starts somewhere.";
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    questionElement.hidden = false;
    countElement.hidden = false;
    answersElement.hidden = false;
    feedbackElement.hidden = false;

    resultElement.hidden = true;

    loadQuestion();
});

loadQuestion();
