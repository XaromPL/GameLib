const cards = [
    "🍎", "🍎", "🍌", "🍌",
    "🍇", "🍇", "🍒", "🍒",
    "🍉", "🍉", "🍓", "🍓",
];

let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let timer = 0;
let timerInterval;
let isChecking = false;

const gameBoard = document.getElementById("game-board");
const timeDisplay = document.getElementById("time");
const movesDisplay = document.getElementById("moves");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    shuffle(cards);
    gameBoard.innerHTML = "";
    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.value = card;
        cardElement.innerHTML = "?";
        cardElement.addEventListener("click", handleCardClick);
        gameBoard.appendChild(cardElement);
    });

    moves = 0;
    matchedPairs = 0;
    timer = 0;
    updateStats();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timeDisplay.textContent = timer;
    }, 1000);
}

function handleCardClick(event) {
    if (isChecking) return;

    const clickedCard = event.target;

    if (clickedCard.classList.contains("matched") || clickedCard === firstCard) {
        return;
    }

    clickedCard.textContent = clickedCard.dataset.value;

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        moves++;
        movesDisplay.textContent = moves;

        isChecking = true;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            matchedPairs++;

            if (matchedPairs === cards.length / 2) {
                clearInterval(timerInterval);
                alert(`You won! Time: ${timer}s, Moves: ${moves}`);
            }

            isChecking = false;
        } else {
            setTimeout(() => {
                firstCard.textContent = "?";
                secondCard.textContent = "?";
                firstCard = null;
                secondCard = null;
                isChecking = false;
            }, 1000);
        }
    }
}

function updateStats() {
    timeDisplay.textContent = timer;
    movesDisplay.textContent = moves;
}

document.addEventListener("DOMContentLoaded", startGame);
