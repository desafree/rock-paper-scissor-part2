for (let i = 5; i > 0; i--) {
  console.log(i);
}

// function count(n) {
//   if (n == 0) return 0;
//   console.log(n);
//   return count(n - 1);
// }

function count(n) {
  if (n == 0) return 0;
  console.log(5 - n);
  return count(n - 1);
}

function even(n) {
  if (n == 0) return true;
  if (n == 1) return false;
  return even(n - 2);
}

function reverse(string) {
  if (string.length == 1) return string;
  return string[string.length - 1] + reverse(string.slice(0, -1));
}

function timesInString(string, char) {
  if (string.length == 0) return 0;
  let count = string[string.length - 1] == char ? 1 : 0;
  return count + timesInString(string.slice(0, -1), char);
}

function factorial(n) {
  if (n == 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n == 2) return 1;
  if (n == 1) return 0;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

function sum(array) {
  if (array.length == 1) return array[0];
  return array[array.length - 1] + sum(array.splice(0, array.length - 1));
}

function sumBelow(n) {
  if (n == 0) return 0;
  return n - 1 + sumBelow(n - 1);
}

function range(x, y) {
  if (x == y) return [];
  return [x].concat(range(x + 1, y));
}

function palindrome(string) {
  if (string.length == 2) return string[0] == string[1] ? true : false;
  let check = string[0] == string[string.length - 1];
  console.log(check, string[0], string[string.length - 1]);
  return check && palindrome(string.slice(1, -1));
}

function fizzBuzz(n) {
  if (n == 0) return [0];
  let value = n;
  if (!(n % 3) && !(n % 5)) {
    value = 'fizzBuzz';
  } else if (!(n % 5)) {
    value = 'buzz';
  } else if (!(n % 3)) {
    value = 'fizz';
  }
  return fizzBuzz(n - 1).concat([value]);
}

console.log(fizzBuzz(30));

// reverse('prova');

even(6);
const player1 = new Player('player1');
const computer = new Player('computer');
const game = createGame();
const displayCommand = display();

const playAgainBtn = document.querySelector('.play-again button');
playAgainBtn.addEventListener('click', () => {
  const box = document.querySelector('.play-again');
  box.classList.toggle('invisible');
});

//trigger round when a player click one of the button
const paper = document.querySelector('.paper');
paper.addEventListener('click', () => {
  gameLogic('paper');
});

const rock = document.querySelector('.rock');
rock.addEventListener('click', () => {
  gameLogic('rock');
});

const scissor = document.querySelector('.scissor');
scissor.addEventListener('click', () => {
  gameLogic('scissor');
});

//class player
function Player(name = 'player1') {
  this.name = name;
  this.score = 0;
  this.choice;
}

Player.prototype.updateScore = function () {
  this.score++;
};

Player.prototype.getScore = function () {
  return this.score;
};

Player.prototype.resetScore = function () {
  this.score = 0;
};

Player.prototype.setChoice = function (choice) {
  this.choice = choice;
  console.log(this, this.choice);
};

Player.prototype.getChoice = function () {
  return this.choice;
};

Player.prototype.setRandomChoice = function () {
  let choices = ['paper', 'scissor', 'rock'];
  this.choice = choices[Math.floor(Math.random() * 3)];
  console.log(this, this.choice);
};

//create the game obj
function createGame() {
  let game = {};
  highScore = {
    score: 0,
    player: 'player1',
  };
  game.checkVictory = function (choice1, choice2) {
    if (
      (choice1 === 'paper' && choice2 == 'rock') ||
      (choice1 === 'rock' && choice2 == 'scissor') ||
      (choice1 === 'scissor' && choice2 == 'paper')
    ) {
      return 1;
    } else if (choice1 === choice2) {
      return 0;
    } else {
      return 2;
    }
  };

  game.getVictoryPlayer = function () {
    return highScore.player;
  };
  game.getHighScore = function () {
    return highScore.score;
  };
  game.resetHighScore = function () {
    highScore = 0;
  };
  game.updateHighScore = function (score1, score2) {
    score1 > score2
      ? (highScore = { score: score1, player: 'player1' })
      : (highScore = { score: score2, player: 'player2' });
  };

  return game;
}

//manage the display of state
function display() {
  const display = {};

  display.updateScore = function (player, score) {
    const scorePlayer = document.querySelector(`.${player}`);
    scorePlayer.textContent = score;
  };

  display.playAgain = function (winPlayer) {
    const text = document.querySelector('.play-again h3');
    const box = document.querySelector('.play-again');
    text.textContent = `${winPlayer} has won the game`;
    box.classList.toggle('invisible');
  };

  return display;
}

//game logic
function gameLogic(choice) {
  player1.setChoice(choice);
  computer.setRandomChoice();
  if (game.checkVictory(player1.getChoice(), computer.getChoice()) == 1) {
    player1.updateScore();
    displayCommand.updateScore('player1', player1.getScore());
    game.updateHighScore(player1.getScore(), computer.getScore());
    if (game.getHighScore() === 5) {
      resetGame();
    }
  } else if (
    game.checkVictory(player1.getChoice(), computer.getChoice()) == 2
  ) {
    computer.updateScore();
    displayCommand.updateScore('player2', computer.getScore());
    game.updateHighScore(player1.getScore(), computer.getScore());
    if (game.getHighScore() === 5) {
      resetGame();
    }
  }
}

function resetGame() {
  player1.resetScore();
  computer.resetScore();
  displayCommand.playAgain(game.getVictoryPlayer());
  displayCommand.updateScore('player2', computer.getScore());
  displayCommand.updateScore('player1', player1.getScore());
}
