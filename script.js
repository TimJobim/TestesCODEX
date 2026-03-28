// Observação: a lista original de questões enviada veio truncada em alguns pontos.
// Mantive aqui a estrutura separada por arquivo para facilitar manutenção.
const questions = [
  {
    q: "Na frase 'O professor que saiu da sala esqueceu o diário', o termo 'que' exerce a função morfológica de:",
    options: [
      "Conjunção integrante.",
      "Pronome relativo.",
      "Preposição.",
      "Advérbio de modo.",
      "Partícula expletiva."
    ],
    a: 1
  },
  {
    q: "O conectivo 'destarte' possui valor semântico predominante de:",
    options: ["Oposição.", "Adição.", "Concessão.", "Conclusão.", "Explicação."],
    a: 3
  },
  {
    q: "Os marcadores usuais termodinâmicos para esterilização em autoclave gravitacional (calor úmido) giram em:",
    options: [
      "100°C sem pressão por 30 minutos.",
      "121°C com pressão de 1.0 a 1.5 atmosferas, mantidos de 15 a 20 minutos.",
      "170°C a 180°C a seco por longas horas.",
      "Flashes ultravioletas em vácuo por 60 segundos.",
      "50°C estabilizados por duas horas em caldeira elétrica."
    ],
    a: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionCounterEl = document.getElementById("question-counter");
const currentScoreEl = document.getElementById("current-score");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz-section");
const scoreContainer = document.getElementById("score-container");

function loadQuestion() {
  if (!questions.length) {
    questionText.textContent = "Nenhuma questão carregada. Cole sua lista completa no script.js.";
    return;
  }

  nextBtn.style.display = "none";
  const q = questions[currentQuestionIndex];

  questionCounterEl.textContent = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

  questionText.textContent = q.q;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    const letter = String.fromCharCode(65 + index);
    btn.innerHTML = `<strong>${letter})</strong> ${option}`;
    btn.onclick = () => selectAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnElement) {
  const q = questions[currentQuestionIndex];
  const allOptions = document.querySelectorAll(".option-btn");

  allOptions.forEach((btn) => {
    btn.disabled = true;
  });

  if (selectedIndex === q.a) {
    btnElement.classList.add("correct");
    score++;
    currentScoreEl.textContent = score;
  } else {
    btnElement.classList.add("wrong");
    if (allOptions[q.a]) allOptions[q.a].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizSection.style.display = "none";
  scoreContainer.style.display = "block";

  const percent = ((score / questions.length) * 100).toFixed(1);

  document.getElementById("final-correct").textContent = score;
  document.getElementById("final-wrong").textContent = questions.length - score;
  document.getElementById("final-percent").textContent = `${percent}%`;
  progressBar.style.width = "100%";
}

loadQuestion();
