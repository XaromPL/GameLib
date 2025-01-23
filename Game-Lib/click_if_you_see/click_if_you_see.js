const grid = document.getElementById('grid');
const result = document.getElementById('result');

// Generate random colors
function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize the game
function initializeGame() {
  const squares = [];
  const targetColor = getRandomColor();
  const totalSquares = 20;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = Math.random() > 0.5 ? targetColor : getRandomColor();
    square.dataset.color = square.style.backgroundColor;

    square.addEventListener('click', () => handleSquareClick(square, targetColor, squares));
    squares.push(square);
    grid.appendChild(square);
  }
}

// Handle square click
function handleSquareClick(square, targetColor, squares) {
  if (square.dataset.color === targetColor) {
    createParticles(square, square.style.backgroundColor);
    square.style.visibility = 'hidden';  // Zamiast usuwania elementu, ukrywamy go
  }

  // Check if all target squares are clicked
  const remaining = squares.filter(s => s.dataset.color === targetColor && s.style.visibility !== 'hidden');
  if (remaining.length === 0) {
    result.hidden = false;
  }
}

// Function to create particles
function createParticles(element, color) {
  const particleCount = 10; // Number of particles
  const rect = element.getBoundingClientRect();
  const container = document.body; // Append particles to the body

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.backgroundColor = color;

    // Set particle position
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Set random direction for the particle
    const angle = Math.random() * 2 * Math.PI; // Random angle
    const distance = Math.random() * 50 + 30; // Random distance
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    particle.style.setProperty('--x', `${xOffset}px`);
    particle.style.setProperty('--y', `${yOffset}px`);

    // Append the particle to the container
    container.appendChild(particle);

    // Remove the particle after animation
    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  }
}

// Start the game
initializeGame();
