// Define the word to guess
let wordToGuess;
let flag = true;
fetch("https://random-word-api.herokuapp.com/word?number=1&length=5")
  .then(response => response.json())
  .then(data => {
    wordToGuess = data[0];
    initializeWordDisplay(wordToGuess);
  })
  .catch(error => {
    console.error("Error fetching random word:", error);
  });

async function checkWord(guess){
  await fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + guess)
  .then(response => {
    if (response.status === 200) {
      flag=true;
      guesses.push(guess);
  guessesContainer.textContent = "Guesses: " + guesses.join(", ");
    } else {
      flag=false;
      alert("Please enter a valid word.");
    }
  })
  .catch(error => console.log(error));
}

// Initialize the guesses array and the number of remaining attempts
let guesses = [];
let remainingAttempts = 6;

// Select the necessary DOM elements
const wordContainer = document.querySelector(".word");
const guessInput = document.querySelector("input[type='text']");
const guessButton = document.querySelector("button[type='submit']");
const guessesContainer = document.querySelector(".guesses");

// Function to initialize the word display
async function initializeWordDisplay(word) {
  if (flag  == true){
  for (let i = 0; i < word.length; i++) {
    const letterSpan = document.createElement("span");
    letterSpan.classList.add("letter");
    // letterSpan.textContent = "_";
    wordContainer.appendChild(letterSpan);}
  }
}

guessButton.addEventListener("click", async (event) => {
  event.preventDefault();
  
  // Get the user's guess
  const guess = guessInput.value.toLowerCase();
  if (guesses.includes(guess)) {
    alert("You've already guessed that word!");
    return;
  }

  await checkWord(guess).then(() => {
  
  // Check if the guess is valid (5 letters)
  if (guess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  let correct = false;
  if(flag){
    correct = true;
    for (let i = 0; i < wordToGuess.length; i++) {
      if (guess.includes(wordToGuess[i])) {
        wordContainer.children[i].textContent = wordToGuess[i];
      } else {
        correct = false;
      }
    }
  }
  // Check if the game is over
  if (correct) {
    alert("Congratulations, you guessed the word!");
  } else if (remainingAttempts === 1) {
    alert(`Game over. The word was "${wordToGuess}".`);
  } else if (flag===true) {
    remainingAttempts--;
    alert(`Incorrect. You have ${remainingAttempts} attempts remaining.`);
  }
  
  // Clear the input field
  guessInput.value = "";
  
  
  // Check if the guess has already been made
  
});
  
  // Add the guess to the guesses array and update the guesses display
//   if (flag == true){
//   guesses.push(guess);
//   guessesContainer.textContent = "Guesses: " + guesses.join(", ");
// }
  
  // Check if the guess is correct
  


});
