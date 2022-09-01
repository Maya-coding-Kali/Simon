//You need to find out why the second level has a subscript input is 1 higher than index on line 22
let turn = 1;
let myButtons = document.querySelectorAll(".grid div");
let turnHeaderCount = document.querySelector("span");
let counter = 0;
let previous = 0;
let userClickCounter = 0;
const selectedArr = [];
let PlayAgain = document.querySelector(".Play-Again-Container");
let StartButton = document.querySelector(".start");
let choose = document.querySelectorAll(".playagain-button");
//---------------------------------------------------------Events
StartButton.addEventListener("click", () => {
  StartButton.style.display = "none";
  MainGameLoop();
});
document.querySelector(".green").addEventListener("click", () => {
  UserGuessConditions(0);
});
document.querySelector(".red").addEventListener("click", () => {
  UserGuessConditions(1);
});
document.querySelector(".yellow").addEventListener("click", () => {
  UserGuessConditions(2);
});
document.querySelector(".blue").addEventListener("click", () => {
  UserGuessConditions(3);
});
choose[0].addEventListener("click", () => {
  PlayAgain.style.display = "none";
  MainGameLoop();
});
//----------------------------------------PlayAgainFunct
function PlayAgainFunct() {
  PlayAgain.style.display = "flex";
}
//-------------------------------------------Main game loop
function MainGameLoop() {
  let interval = setInterval(() => {
    SelectSquare();
    if (counter >= turn) {
      ClearColorToCopy();
      clearInterval(interval);
    }
    ++counter;
  }, 500);
}
//-------------------------------------------UserGuessConditions
function UserGuessConditions(index) {
  if (selectedArr[userClickCounter] === index) {
    myButtons[selectedArr[userClickCounter]].style.background = "orange";
    ClearColorToCopy();
    userClickCounter++;
  } else {
    BackgroungFlash(false);
    userClickCounter = 0;
    turn = 1;
    turnHeaderCount.textContent = turn;
    counter = 0;
    selectedArr.splice(0, selectedArr.length);
    PlayAgainFunct(); //play agian
  }
}
function BackgroungFlash(nextLevel) {
  let FlashCounter = 0;
  let interval = setInterval(() => {
    if (FlashCounter == 10 && nextLevel == false) {
      FlashCounter = 0;
      clearInterval(interval);
    }
    if (FlashCounter == 5 && nextLevel == true) {
      FlashCounter = 0;
      clearInterval(interval);
      return;
    }
    if (FlashCounter % 2 == 0) {
      document.querySelector("body").style.background = "rgb(30, 45, 106)";
    } else if (FlashCounter % 2 != 0 && nextLevel === false) {
      document.querySelector("body").style.background = "red";
    } else if (FlashCounter % 2 != 0 && nextLevel === true){
      document.querySelector("body").style.background = "green";
    }
    FlashCounter++;
  }, 100);
}
//-------------------------------------------ClearColorToCopy
function ClearColorToCopy() {
  setTimeout(() => {
    for (let index = 0; index < myButtons.length; index++) {
      //change index to previous, this way you can go O(1) rather than O(n), then change the players click so it works with it
      myButtons[index].style.background = "";
    }
    if (userClickCounter === turn + 1) {
      BackgroungFlash(true);
      userClickCounter = 0;
      turnHeaderCount.textContent = ++turn;
      selectedArr.splice(0, selectedArr.length);
      counter = 0;
      MainGameLoop();
    }
  }, 250);
}
//--------------------------------------------SelectSquare
function SelectSquare() {
  let randomSelector = Math.floor(Math.random() * 4);
  console.log(randomSelector);
  if (previous === randomSelector && previous > 0) {
    randomSelector -= 1;
  } else if (previous === randomSelector && previous < 3) {
    randomSelector += 1;
  } else if (previous === randomSelector && previous === 0) {
    randomSelector = 3;
  } else if (previous === randomSelector && previous === 3) {
    randomSelector = 0;
  }
  selectedArr.push(randomSelector);
  console.log(selectedArr);
  myButtons[randomSelector].style.background = "orange";
  myButtons[previous].style.background = "";
  previous = randomSelector;
}
