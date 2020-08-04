let scores, roundScores, activePlayer, dice, lastRoll;

scores = [0, 0];
roundScores = 0;
activePlayer = 0;
dice = 0;
lastRoll = 0;

// [SET UP]
document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", rollDice);
document
  .querySelector(".btn-hold")
  .addEventListener("click", holdCurrentRoundScores);
document.querySelector(".btn-new").addEventListener("click", triggerNewGame);

// [METHODS]
// This method renders the dice image & calls the setDiceImage function, then updates the current score.
function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  triggerImages(true);
  setDiceImage(dice);
  if (lastRoll !== 6) {
    if (dice !== 1) {
      accumulate();
    } else {
      roundScores = 0;
      updateRoundScores();
      switchActivePlayer();
    }
  } else if (dice == lastRoll) {
    roundScores = 0;
    updateRoundScores();
    scores[activePlayer] = 0;
    updateGlobalScores();
    switchActivePlayer();
  } else {
    accumulate();
  }
}

// This method takes the current roundScores and applies them to the player's global score, then switches player after points clean up.
function holdCurrentRoundScores() {
  scores[activePlayer] += roundScores;
  roundScores = 0;
  updateGlobalScores();
  updateRoundScores();
  checkGameOver();
  console.log(scores);
}

// This method essentially resets the game.
function triggerNewGame() {
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  activePlayer = 1;
  switchActivePlayer();
  scores = [0, 0];
  document.querySelector(".btn-hold").style.display = null;
  document.querySelector(".btn-roll").style.display = null;
  triggerImages(false);
}

// This method updates the dice image.
function setDiceImage(dice) {
  document.querySelector(".dice").src = "dice-" + dice + ".png";
}
// This method renders or un-renders the dice image.
function triggerImages(bool) {
  if (bool) {
    document.querySelector(".dice").style.display = null;
  } else document.querySelector(".dice").style.display = "none";
}
// This method can be called to update the roundScores variable.
function updateRoundScores() {
  document.querySelector("#current-" + activePlayer).textContent = roundScores;
}
// This method can be called to update the global scores.
function updateGlobalScores() {
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
}
// This function checks if the game is over, if not then it switches the player.
function checkGameOver() {
  if (scores[activePlayer] >= 100) {
    gameOver();
  } else switchActivePlayer();
}
// This method is the 'win state' aka game over.
function gameOver() {
  document.querySelector(".btn-hold").style.display = "none";
  document.querySelector(".btn-roll").style.display = "none";
  triggerImages(false);
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
}
// This method takes the current accumulation of dice rolls and updates the page, as well as setting the lastRoll var to the current role for next time.
function accumulate() {
  roundScores += dice;
  updateRoundScores();
  lastRoll = dice;
}
// This method takes the active player and switches it to the other player, as well as setting the lastRoll to 0.
function switchActivePlayer() {
  lastRoll = 0;
  if (activePlayer == 0) {
    activePlayer = 1;
    document.querySelector("#player-0-panel").className = "player-0-panel";
    document.querySelector("#player-1-panel").className += " active";
  } else {
    activePlayer = 0;
    document.querySelector("#player-0-panel").className += " active";
    document.querySelector("#player-1-panel").className = "player-1-panel";
  }
}
