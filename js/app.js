// imports
import Player from "./Player.js";
import Tiles from "./Tiles.js";
import Text from "./Text.js";
import Coin from "./Coin.js";
import { makeArray2D, collides, createTiles } from "./utils.js";
import { level } from "./maps.js";
import { Timer } from "./Timer.js";

// fetching the DOM
const restartContainer = document.querySelector(".restart");
const timeText = document.querySelector("#time");
const canvasContainer = document.querySelector(".canvasContainer");

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector("#canvas")
);
const ctx = canvas.getContext("2d");
export let scale = 1;
canvas.width = 320;
canvas.height = 320;

window.addEventListener("resize", resize);
window.addEventListener("load", resize);

function resize() {
  if (window.innerWidth < 400) {
    scale = 0.8;
  } else if (window.innerWidth < 600) {
    scale = 0.9;
  } else {
    scale = 1;
  }

  canvas.width = 320 * scale;
  canvas.height = 320 * scale;
  canvas.style.width = 320 * scale + "px";
  canvas.style.height = 320 * scale + "px";
  canvasContainer.style.width = canvas.width + "px";
}

// init
let score = 0;
const coinAudio = new Audio("sounds/coin.mp3");
let gameover = false;
const player = new Player(canvas);
player.setupMovement();
const coin = new Coin();
const text = new Text();
const timer = new Timer();
const border = [
  new Tiles(320, 0, 15, canvas.height),
  new Tiles(0, -10, canvas.width, 10),
  new Tiles(-10, 0, 10, canvas.height),
];
let tiles = [...border];
let currentBackground;

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  gameover = false;
  score = 0;
  restartContainer.classList.remove("active");
  player.restart();
  timer.start();
  tiles = [...border];

  level.levelTwo.loaded = false;
  level.levelThree.loaded = false;

  createTiles(makeArray2D(level.levelOne.map), tiles);
  currentBackground = level.levelOne.image;
  coin.randomCoordinates(tiles);
  animate();
});

// init level1
createTiles(makeArray2D(level.levelOne.map), tiles);
currentBackground = level.levelOne.image;
coin.randomCoordinates(tiles);
timer.start();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(scale, scale);
  text.render("Score: " + score, 240, 20);
  text.render("Time: " + timer.getTime() + "s", 10, 20);
  tiles.forEach((tile) => tile.draw());
  ctx.drawImage(currentBackground, 0, 0);
  coin.update();
  ctx.restore();

  if (score >= 5 && !level.levelTwo.loaded) {
    tiles = [...border];
    createTiles(makeArray2D(level.levelTwo.map), tiles);
    currentBackground = level.levelTwo.image;
    level.levelTwo.loaded = true;
    coin.randomCoordinates(tiles);
    player.restart();
  } else if (score >= 10 && !level.levelThree.loaded) {
    tiles = [...border];
    createTiles(makeArray2D(level.levelThree.map), tiles);
    currentBackground = level.levelThree.image;
    level.levelThree.loaded = true;
    coin.randomCoordinates(tiles);
    player.restart();
  } else if (score >= 15) {
    gameover = true;
  }

  if (collides(player.hitbox, coin)) {
    score++;
    coin.randomCoordinates(tiles);
    player.take = true;
    coinAudio.play();
  }

  player.update(tiles);

  if (!gameover) {
    requestAnimationFrame(animate);
  } else {
    timeText.innerHTML = "Your time was: " + timer.getTime() + "s";
    restartContainer.classList.add("active");
  }
}
animate();
