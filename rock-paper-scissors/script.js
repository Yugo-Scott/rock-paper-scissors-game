import { startConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'グー', defeats: 'scissors' },
  paper: { name: 'パー', defeats: 'rock' },
  scissors: { name: 'チョキ', defeats: 'paper' },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let consecutiveWins = 0;
let computerChoice = ''; // computer choice

// console.log(allGameIcons);

// reset all 'selected' icons
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  removeConfetti();
}

function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = ' --- 出した目';
  computerChoiceEl.textContent = ' --- 出た目';
  resultText.textContent = '人間 VS 機械';
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.ceil( Math.random()*3);
  if (computerChoiceNumber === 1) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber === 2) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  // console.log(computerChoice);
}

// Check result, increase scores, update resultText
function updateScore(playerChoice) {
  // console.log(playerChoice, computerChoice);
  if (playerChoice === computerChoice) {
    resultText.textContent = '引き分けです';
    consecutiveWins = 0; // reset consecutive wins
  } else {
    const choice = choices[playerChoice];
    // console.log(choice.defeats);
    if (choice.defeats === computerChoice) {
      consecutiveWins++;
      startConfetti();
      if (consecutiveWins>1) {
        resultText.textContent = ` ${consecutiveWins} 連勝中！🥳`;
      } else {
      resultText.textContent = 'あなたの勝ちです';
      }
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'あなたの負けです';
      computerScoreNumber++;
      consecutiveWins = 0; // reset consecutive wins
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
  // console.log(playerChoice);
  checkResult(playerChoice);
  // add 'selected' and update playerChoice text
  switch (playerChoice) {
    case 'rock':
        playerRock.classList.add('selected');
        playerChoiceEl.textContent = ' --- グー';
        break;
    case 'paper':
        playerPaper.classList.add('selected');
        playerChoiceEl.textContent = ' --- パー';
        break;
    case 'scissors':
        playerScissors.classList.add('selected');
        playerChoiceEl.textContent = ' --- チョキ';
        break;
      default:
        break;
    }
}
window.select = select;

// add 'selected' and update the computerChoice
function displayComputerChoice() {
  // console.log(computerChoice);
  // remove 'selected'
  resetSelected();
  // add 'selected' and update the computerChoice text
  switch (computerChoice) {
    case 'rock':
        computerRock.classList.add('selected');
        computerChoiceEl.textContent = ' --- グー';
        break;
    case 'paper':
        computerPaper.classList.add('selected');
        computerChoiceEl.textContent = ' --- パー';
        break;
    case 'scissors':
        computerScissors.classList.add('selected');
        computerChoiceEl.textContent = ' --- チョキ';
        break;
      default:
        break;
    }
}

resetAll();
// startConfetti();