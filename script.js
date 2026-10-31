
"use strict";

// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =========================
// COPYRIGHT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =========================
// TECHNOLOGY QUIZ
// =========================

const questions = [

    {
        question: "Which language is commonly used for AI development?",

        answers: [
            "HTML",
            "Python",
            "CSS",
            "SQL"
        ],

        correct: 1,

        explanation: "Python has extensive AI and machine learning libraries."
    },

    {
        question: "Which technology is commonly used for 3D graphics?",

        answers: [
            "OpenGL",
            "MySQL",
            "HTML",
            "PHP"
        ],

        correct: 0,

        explanation: "OpenGL is an API for rendering 2D and 3D graphics."
    },

    {
        question: "What does SQL stand for?",

        answers: [
            "Simple Question Language",
            "Structured Query Language",
            "System Query Logic",
            "Software Quality Language"
        ],

        correct: 1,

        explanation: "SQL means Structured Query Language."
    },

    {
        question: "Which of these is a JavaScript runtime?",

        answers: [
            "Node.js",
            "Django",
            "TensorFlow",
            "Blender"
        ],

        correct: 0,

        explanation: "Node.js allows JavaScript to run outside the browser."
    },

    {
        question: "Which technology is commonly used for deep learning?",

        answers: [
            "Bootstrap",
            "PyTorch",
            "MySQL",
            "Apache"
        ],

        correct: 1,

        explanation: "PyTorch is a popular deep learning framework."
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

function loadQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    questionElement.textContent = current.question;

    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    feedbackElement.textContent = "";

    nextButton.hidden = true;

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.classList.add("answer-btn");

        button.addEventListener("click", () => {

            checkAnswer(index);

        });

        answersElement.appendChild(button);

    });

}


function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    const buttons =
        answersElement.querySelectorAll("button");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === current.correct) {

            button.classList.add("correct");

        }

        if (
            index === selectedIndex &&
            selectedIndex !== current.correct
        ) {

            button.classList.add("incorrect");

        }

    });

    if (selectedIndex === current.correct) {

        score++;

        feedbackElement.textContent =
            "Correct! " + current.explanation;

    } else {

        feedbackElement.textContent =
            "Incorrect. " + current.explanation;

    }

    scoreElement.textContent = `Score: ${score}`;

    nextButton.hidden = false;

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "See Results";

    } else {

        nextButton.textContent = "Next Question";

    }

}


function showResults() {

    questionNumber.textContent = "Quiz Completed";

    questionElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

    answersElement.innerHTML = "";

    progressElement.style.width = "100%";

    feedbackElement.textContent =
        score === questions.length
            ? "Excellent! Perfect score!"
            : "Great work! Keep learning and practicing.";

    nextButton.textContent = "Try Again";

}


nextButton.addEventListener("click", () => {

    if (currentQuestion === questions.length - 1 && answered) {

        if (nextButton.textContent === "Try Again") {

            currentQuestion = 0;
            score = 0;

            loadQuestion();

            return;

        }

        showResults();

        nextButton.textContent = "Try Again";

        return;

    }

    currentQuestion++;

    loadQuestion();

});

loadQuestion();


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    const formStatus = document.getElementById("formStatus");

    // Replace with your real email address.

    const recipient = "your-email@example.com";

    const body = `
Name: ${name}
Email: ${email}

Message:
${message}
`;

    const mailtoLink =
        `mailto:${recipient}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    formStatus.textContent =
        "Opening your email application...";

    window.location.href = mailtoLink;

});
