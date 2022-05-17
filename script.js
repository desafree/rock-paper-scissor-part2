const player1 = new Player("player1");
const computer = new Player("computer");
const game = createGame();
const displayCommand = display();

const paper = document.querySelector(".paper");
paper.addEventListener("click", () => {
  gameLogic("paper");
});

const rock = document.querySelector(".rock");
rock.addEventListener("click", () => {
  gameLogic("rock");
});

const scissor = document.querySelector(".scissor");
scissor.addEventListener("click", () => {
  gameLogic("scissor");
});

function gameLogic(choice) {
  player1.setChoice(choice);
  computer.setRandomChoice();
  if (game.checkVictory(player1.getChoice(), computer.getChoice()) == 1) {
    player1.updateScore();
    displayCommand.updateScore("player1", player1.getScore());
    game.updateHighScore(player1.getScore(), computer.getScore());
    if (game.getHighScore() === 5) {
      player1.resetScore();
      computer.resetScore();
      alert(game.getVictoryPlayer());
      displayCommand.updateScore("player2", computer.getScore());
      displayCommand.updateScore("player1", player1.getScore());
    }
  } else if (
    game.checkVictory(player1.getChoice(), computer.getChoice()) == 2
  ) {
    computer.updateScore();
    displayCommand.updateScore("player2", computer.getScore());
    game.updateHighScore(player1.getScore(), computer.getScore());
    if (game.getHighScore() === 5) {
      player1.resetScore();
      computer.resetScore();
      alert(game.getVictoryPlayer());
      displayCommand.updateScore("player2", computer.getScore());
      displayCommand.updateScore("player1", player1.getScore());
    }
  }
}

function Player(name = "player1") {
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
  let choices = ["paper", "scissor", "rock"];
  this.choice = choices[Math.floor(Math.random() * 3)];
  console.log(this, this.choice);
};

function createGame() {
  let game = {};
  highScore = {
    score: 0,
    player: "player1",
  };
  game.checkVictory = function (choice1, choice2) {
    if (
      (choice1 === "paper" && choice2 == "rock") ||
      (choice1 === "rock" && choice2 == "scissor") ||
      (choice1 === "scissor" && choice2 == "paper")
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
      ? (highScore = { score: score1, player: "player1" })
      : (highScore = { score: score2, player: "player2" });
  };

  return game;
}

function display() {
  const display = {};

  display.updateScore = function (player, score) {
    const scorePlayer = document.querySelector(`.${player}`);
    scorePlayer.textContent = score;
  };

  display.playAgain = function (winPlayer) {
    alert(`${winPlayer} has won the gamedis`);
  };

  return display;
}
