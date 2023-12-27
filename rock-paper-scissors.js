let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

document.querySelector('.reset-score-button').addEventListener('click', function () {

  /*
  
  alert('are you sure you want to reset the score?')
  
  let userConfirmation = confirm("Are you sure you want to proceed?");
if (userConfirmation) {
    console.log("User confirmed");
} else {
    console.log("User cancelled");
}
*/

let modal = document.getElementById("myModal");
let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");

yesBtn.onclick = function() {
  modal.style.display = "none";
  
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  updateScoreElement();
}

noBtn.onclick = function() {
  modal.style.display = "none"; 
}

function openModal() {
  modal.style.display = "block";
}
openModal();


});



let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};

// const autoPlay = () {};

document.querySelector('.auto-play-button').addEventListener('click', function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  const buttonElement = document.querySelector('.auto-play-button');
  
  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Playing';
  } else if (buttonElement.innerText === 'Stop Playing') {
    buttonElement.innerHTML = 'Auto Play';
  }
  

});


document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  console.log(event.key);

  if (event.key === 'r'){
    playGame('rock');}
    else if (event.key === 'p'){
      playGame('paper');}
    else if (event.key === 's'){
        playGame('scissors');}
    else if (event.key === 'a'){
          document.querySelector('.auto-play-button').click();}
    else if (event.key === 'Backspace'){
            document.querySelector('.reset-score-button').click();}


          

});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="https://supersimple.dev/projects/rock-paper-scissors/images/${playerMove}-emoji.png" class="move-icon">
<img src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}