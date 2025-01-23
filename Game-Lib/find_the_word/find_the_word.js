let wordList = ["apple", "banana", "cherry", "grape", "orange"];
let word = '';
let score = 0;
let currentLetterIndex = 0;

function startGame() {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    currentLetterIndex = 0;
    score = 0;

    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('game-over').style.display = 'none'; // Hide the game over message
    generateLetterBoard();
}

function generateLetterBoard() {
    let letterBoard = document.getElementById('letter-board');
    letterBoard.innerHTML = ''; // Clear previous board

    // Split the word into an array of letters, shuffle the array, then display the buttons
    let shuffledLetters = shuffle(word.split(''));

    shuffledLetters.forEach(letter => {
        let letterButton = document.createElement('button');
        letterButton.innerText = letter;
        letterButton.onclick = () => checkLetter(letterButton);
        letterBoard.appendChild(letterButton);
    });
}

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function checkLetter(button) {
    if (button.innerText === word[currentLetterIndex]) {
        score++;
        currentLetterIndex++;
        button.style.backgroundColor = "#28a745"; // Green when correct
        button.style.pointerEvents = "none"; // Disable further clicks

        document.getElementById('score').innerText = 'Score: ' + score;

        if (currentLetterIndex === word.length) {
            endGame();
        }
    } else {
        button.style.backgroundColor = "#dc3545"; // Red when incorrect
        setTimeout(() => button.style.backgroundColor = "", 500); // Reset color after 0.5s
    }
}

function endGame() {
    document.getElementById('game-over').style.display = 'block'; // Show the game over message
    document.getElementById('final-score').innerText = score;
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);
