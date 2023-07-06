const marblesContainer = document.getElementById('marbles-container');
const removeBtn = document.getElementById('remove-btn');
const popupContainer = document.getElementById('popup-background');
const countElement = document.getElementById('count');

function updateCounter() {
  countElement.textContent = marblesRemaining;
}

function returnMarbles() {
  // Clear the cubes container
  marblesContainer.innerHTML = '';

  // Create and append the cubes back to the container
  for (let i = 0; i < 21; i++) {
    const marble = document.createElement('div');
    marble.classList.add('marble');
    marblesContainer.appendChild(marble);
  }

  // Reattach event listeners to the cubes for selection
  const marbles = marblesContainer.getElementsByClassName('marble');
  for (let i = 0; i < marbles.length; i++) {
    marbles[i].addEventListener('click', handleMarbleSelection);
  }
  marblesRemaining = 21;
  updateCounter();

  setTimeout(() => {
    popupContainer.style.display = 'block';
  }, 500)
}

// Number of cubes remaining
let marblesRemaining = 21;

updateCounter();

// Enable the remove button
removeBtn.disabled = true;

// Track the selected cubes by the player
let selectedMarbles = [];

// Track the current player's turn
let currentPlayer;

popupContainer.style.display = 'block';

// Add event listeners to the cubes for selection
const marbles = marblesContainer.getElementsByClassName('marble');
for (let i = 0; i < marbles.length; i++) {
  marbles[i].addEventListener('click', handleMarbleSelection);
}

// Add event listener to the remove button
removeBtn.addEventListener('click', handleRemoveMarbles);

// Function to handle cube selection
function handleMarbleSelection() {
  // Check if it's the player's turn
  if (currentPlayer !== 'player') {
    return;
  }

  // Check if the cube is already selected
  const isSelected = this.classList.contains('selected');

  // If already selected, remove the selection
  if (isSelected) {
    this.classList.remove('selected');
    selectedMarbles = selectedMarbles.filter(cube => cube !== this);
  } else {
    // If not selected, add the selection
    if (selectedMarbles.length < 3) {
      this.classList.add('selected');
      selectedMarbles.push(this);
    }
  }
}

function handleRemoveMarbles() {
  if (currentPlayer === 'player') {
    // Check if the player has selected at least 1 cube
    if (selectedMarbles.length === 0) {
      alert('Please select at least 1 marble to remove.');
      return;
    }

    // Get the number of cubes to remove based on the player's selection
    const marbleToRemove = selectedMarbles.length;

    // Remove the cubes visually
    for (let i = 0; i < marbleToRemove; i++) {
      const cube = selectedMarbles[i];
      marblesContainer.removeChild(cube);
    }

    // Update the cubes remaining
    marblesRemaining -= marbleToRemove;
    updateCounter();

    // Clear the selected cubes array
    selectedMarbles = [];
    currentPlayer = 'computer';
    // Disable the remove button to prevent further moves by the player
    removeBtn.disabled = true;

    // Check if the player wins after their move
    if (marblesRemaining === 0) {
      removeBtn.disabled = true;
      alert('You won! You took the last marble.');
      returnMarbles();
    }
  }

  if (currentPlayer === 'computer') {
    // Wait for 1 second before the computer makes its move
    setTimeout(() => {
      // Computer's turn - generate its move
      const computerMove = marblesRemaining === 20 ? Math.floor(
          Math.random() * 3 + 1) : marblesRemaining % 4;

      // Remove the cubes visually for the computer's move
      for (let i = 0; i < computerMove; i++) {
        const cube = marblesContainer.lastElementChild;
        marblesContainer.removeChild(cube);
      }

      // Update the cubes remaining after the computer's move
      marblesRemaining -= computerMove;
      updateCounter();

      // Enable the remove button for the player's turn
      removeBtn.disabled = false;

      // Switch back to the player's turn
      currentPlayer = 'player';

      // Check if the computer took the last cube
      if (marblesRemaining <= 0) {
        removeBtn.disabled = true;
        setTimeout(() => {
          alert('You lost! The computer took the last marble.');
          returnMarbles();
        }, 500);
      }
    }, 1000);
  }
}

function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  popupContainer.style.display = 'none';

  if (currentPlayer === 'computer') {
    setTimeout(() => {
      const computerMove = marblesRemaining % 4;

      // Remove the cubes visually for the computer's move
      for (let i = 0; i < computerMove; i++) {
        const cube = marblesContainer.lastElementChild;
        marblesContainer.removeChild(cube);
      }

      // Update the cubes remaining after the computer's move
      marblesRemaining -= computerMove;
      updateCounter();

      // Enable the remove button for the player's turn
      removeBtn.disabled = false;

      // Switch to the player's turn
      currentPlayer = 'player';
    }, 1000);
  } else {
    // Enable the remove button for the player's turn
    removeBtn.disabled = false;
  }
}