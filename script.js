const player = document.querySelector(".player");

const player1 = document.querySelector("#name--0");
const player2 = document.querySelector("#name--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const playerScore1 = document.querySelector("#score--0");
const playerScore2 = document.querySelector("#score--1");

const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");

const dice = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

playerScore1.textContent = 0;
playerScore2.textContent = 0;

const scores = [0, 0];
let score1 = 0;
let score2 = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore1.textContent = 0;
  score1 = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    dice.classList.remove("hidden");
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      score1 = score1 + randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = score1;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += score1;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
      document.querySelector(`#name--${activePlayer}`).textContent =
        "Player Wins!";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", function () {
  score1 = 0;
  playerScore1.textContent = 0;
  playerScore2.textContent = 0;

  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  activePlayer = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  score1 = 0;
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  document.querySelector(`#name--0`).textContent = "Player 1";
  document.querySelector(`#name--1`).textContent = "Player 2";
});
