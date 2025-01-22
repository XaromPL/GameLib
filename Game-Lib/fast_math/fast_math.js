let score = 0;
let time = 0;
let timer;
let currentEquation;
let correctAnswer;
let gameOver = false;

const equationElement = document.getElementById("equation");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit-answer");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");

function startGame() {
    score = 0;
    time = 0;
    gameOver = false;
    updateStats();

    timer = setInterval(() => {
        if (!gameOver) {
            time++;
            timeDisplay.textContent = `Time: ${time}s`;
        }
    }, 1000);

    generateEquation();
}

function generateEquation() {
    if (gameOver) return;

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? "+" : "-";

    if (operator === "+") {
        correctAnswer = num1 + num2;
    } else {
        correctAnswer = num1 - num2;
    }

    currentEquation = `${num1} ${operator} ${num2} = ?`;
    equationElement.textContent = currentEquation;
}

submitButton.addEventListener("click", () => {
    if (gameOver) return;

    const userAnswer = parseInt(answerInput.value);

    if (userAnswer === correctAnswer) {
        score++;
        generateEquation();
        updateStats();
    } else {
        gameOverScreen.style.display = "block";
        finalScoreDisplay.textContent = score;
        gameOver = true;
        clearInterval(timer);
    }

    answerInput.value = "";
});

function updateStats() {
    scoreDisplay.textContent = `Score: ${score}`;
}

document.addEventListener("DOMContentLoaded", startGame);
