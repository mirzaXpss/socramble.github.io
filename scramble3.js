const userGuess = document.getElementById("user-guess");
const submitBtn = document.getElementById("submit");
const usersWord = document.getElementById("scrambled-word");
const info = document.getElementById("info");
const levelOutput = document.getElementById("level");
const scoreOutput = document.getElementById("score");
const attemptsOutput = document.getElementById("attempts");
const gameContainer = document.getElementById("game-container");
const guessContainer = document.getElementById("guess-container");
const rules = document.getElementById("rules");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");

let level = 1;
let score = 0;
let word;
let attempts = 0;
let correct = 0;

const lvlOneWords = [
    "twint",
    "social analyzer"
];

const lvlTwoWords = [
    "osintgram",
    "spiderfoot" 
];

const lvlThreeWords = [
    "instaloader",
    "holehe osint"
];

const lvlFourWords = [
    "photon",
    "metasploit"
];

const lvlFiveWords = [
    "insight",
    "google"
];

const lvlSixWords = [
    "maltego",
    "jigsaw"
];

const lvlSevenWords = [
    "nmap",
    "webshag"
];

const lvlEightWords = [
    "wappalyzer",
    "social engineer toolkit"
];

function reset() {
  level = 1;
  score = 0;
  correct = 0;
  attempts = 0;
  word = "";
  updateBoard();
  info.innerHTML = "";
  userGuess.value = "";
}

function randomWord(lvl) {
  word = lvl[Math.floor(Math.random() * lvl.length + 1) - 1];
  return word;
}

function scrambleWord(word) {
  let letters = word.split("");
  let currentIndex = letters.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = letters[currentIndex];
    letters[currentIndex] = letters[randomIndex];
    letters[randomIndex] = temporaryValue;
  }

  return letters.join(" ");
}
function updateBoard() {
  scoreOutput.innerHTML = score;
  levelOutput.innerHTML = level;
  attemptsOutput.innerHTML = attempts;
}

function checkAnswer(guess) {
  console.log(`<h2>Correct</h2>: ${correct}`);
  if (correct == 1) {
    level += 1;
    correct = 0;
  }

  if (attempts == 3) {
    guessContainer.classList.toggle("hidden");
    info.innerHTML =
      "<p class='retry'>Sorry. You are out of chances. <button id='retry-button'>Retry</button> </p>";
    reset();
  }

  if (guess === word) {
    info.innerHTML = "<span class='correct'>CORRECT</span>";
    score += 1;
    correct += 1;
    attempts = 0;
    setLevel();
  } else {
    info.innerHTML = "<span class='incorrect'>Bzzzt! That's not right!</span>";
    score -= 1;
    attempts += 1;
  }

  updateBoard();
}

function setLevel() {
  if (level == 1) {
    randomWord(lvlOneWords);
  } else if (level == 2) {
    randomWord(lvlTwoWords);
  } else if (level == 3) {
    randomWord(lvlThreeWords);
  } else if (level == 4) {
    randomWord(lvlFourWords);
  } else if (level == 5) {
    randomWord(lvlFiveWords);
  } else if (level == 6) {
    randomWord(lvlSixWords);
  } else if (level == 7) {
    randomWord(lvlSevenWords);
  } else if (level == 8) {
    randomWord(lvlEightWords);
  } else if (level == 9) {
    info.innerHTML =
      "<span class='win'>You Win! Great job! </br> You can reset or keep playing.</span>";
  }

  console.log(`Word: ${word}`);
  usersWord.innerHTML = scrambleWord(word);
}

playBtn.addEventListener("click", function(e) {
  rules.classList.toggle("hidden");
  gameContainer.classList.remove("hidden");
});

submitBtn.addEventListener("click", function(e) {
  checkAnswer(userGuess.value.toLowerCase());
  userGuess.value = "";
});

window.addEventListener(
  "keypress",
  function(e) {
    if (e.keyCode == 13) {
      checkAnswer(userGuess.value.toLowerCase());
      userGuess.value = "";
    }
  },
  false
);

resetBtn.addEventListener("click", function(e) {
  reset();
  setLevel();
  guessContainer.classList.remove("hidden");
  userGuess.value = "";
});

setLevel();
