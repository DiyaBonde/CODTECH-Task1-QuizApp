const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");
const scoreText = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyperlinks Text Management Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: false },
      { text: "IBM", correct: false }
    ]
  },
  {
    question: "Which of the following is not a JS data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "String", correct: false }
    ]
  }
];

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  startQuiz();
});

restartButton.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    nextButton.classList.add("hidden");
    submitButton.classList.remove("hidden");
  }
});

submitButton.addEventListener("click", showResult);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  submitButton.classList.add("hidden");
  nextButton.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.classList.add("btn");
    if (a.correct) btn.dataset.correct = a.correct;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";
  if (correct) score++;
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    else btn.classList.add("wrong");
  });
  nextButton.classList.remove("hidden");
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}
