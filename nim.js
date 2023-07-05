// Get the required elements from the DOM
const cubesContainer = document.getElementById('cubes-container');
const removeBtn = document.getElementById('remove-btn');
const startPopup = document.getElementById('start-popup');

// Number of cubes remaining
let cubesRemaining = 21;

// Enable the remove button
removeBtn.disabled = false;

// Track the selected cubes by the player
let selectedCubes = [];

// Track the current player's turn
let currentPlayer;

// Add event listeners to the cubes for selection
const cubes = cubesContainer.getElementsByClassName('cube');
for (let i = 0; i < cubes.length; i++) {
  cubes[i].addEventListener('click', handleCubeSelection);
}

// Add event listener to the remove button
removeBtn.addEventListener('click', handleRemoveCubes);

// Function to handle cube selection
function handleCubeSelection() {
  // Check if it's the player's turn
  if (currentPlayer !== 'player') {
    return;
  }

  // Check if the cube is already selected
  const isSelected = this.classList.contains('selected');

  // If already selected, remove the selection
  if (isSelected) {
    this.classList.remove('selected');
    selectedCubes = selectedCubes.filter(cube => cube !== this);
  } else {
    // If not selected, add the selection
    if (selectedCubes.length < 3) {
      this.classList.add('selected');
      selectedCubes.push(this);
    }
  }
}

function handleRemoveCubes() {
  // Check if it's the player's turn
  if (currentPlayer !== 'player') {
    return;
  }

  // Check if the player has selected at least 1 cube
  if (selectedCubes.length === 0) {
    alert('Please select at least 1 cube to remove.');
    return;
  }

  // Get the number of cubes to remove based on the player's selection
  const cubesToRemove = selectedCubes.length;

  // Remove the cubes visually
  for (let i = 0; i < cubesToRemove; i++) {
    const cube = selectedCubes[i];
    cubesContainer.removeChild(cube);
  }

  // Update the cubes remaining
  cubesRemaining -= cubesToRemove;

  // Clear the selected cubes array
  selectedCubes = [];

  // Disable the remove button if no cubes remaining
  if (cubesRemaining === 0) {
    removeBtn.disabled = true;
    alert('You lost! The computer took the last cube.');
  } else {
    // Switch to the computer's turn
    currentPlayer = 'computer';

    // Disable the remove button to prevent further moves by the player
    removeBtn.disabled = true;

    // Wait for 1 second before the computer makes its move
    setTimeout(() => {
      // Computer's turn - generate its move
      const computerMove = Math.min(cubesRemaining, Math.floor(Math.random() * 3) + 1);

      // Remove the cubes visually for the computer's move
      for (let i = 0; i < computerMove; i++) {
        const cube = cubesContainer.lastElementChild;
        cubesContainer.removeChild(cube);
      }

      // Update the cubes remaining after the computer's move
      cubesRemaining -= computerMove;

      // Enable the remove button for the player's turn
      removeBtn.disabled = false;

      // Switch back to the player's turn
      currentPlayer = 'player';

      // Check if the player wins after their move
      if (cubesRemaining === 0) {
        removeBtn.disabled = true;
        alert('You won! You took the last cube.');
      }
    }, 1000); // Delay for 1 second (1000 milliseconds)
  }
}

// Function to start the game based on the selected starting player
function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  startPopup.style.display = 'none';

  if (currentPlayer === 'computer') {
    // Wait for 1 second before the computer makes its first move
    setTimeout(() => {
      // Computer's turn - generate its move
      const computerMove = Math.min(cubesRemaining, Math.floor(Math.random() * 3) + 1);

      // Update the cubes remaining after the computer's move
      cubesRemaining -= computerMove;

      // Remove the cubes visually for the computer's move
      for (let i = 0; i < computerMove; i++) {
        const cube = cubesContainer.lastElementChild;
        cubesContainer.removeChild(cube);
      }

      // Enable the remove button for the player's turn
      removeBtn.disabled = false;

      // Switch to the player's turn
      currentPlayer = 'player';
    }, 1000); // Delay for 1 second (1000 milliseconds)
  } else {
    // Enable the remove button for the player's turn
    removeBtn.disabled = false;
  }
}