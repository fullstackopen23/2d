import Player from "./Player.js";
import Movement from "./Movement.js";
import Tiles from "./Tiles.js";
import Text from "./Text.js";
import Coin from "./Coin.js";

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector("#canvas")
);
canvas.width = innerWidth / 1.2;
canvas.height = innerHeight / 1.2;
const ctx = canvas.getContext("2d");

// init
let score = 0;
const player = new Player(canvas);
const movement = new Movement(player);
const border = [
  new Tiles(0, 0, canvas.width, 10),
  new Tiles(0, canvas.height - 10, canvas.width, 10),
  new Tiles(0, 0, 10, canvas.height),
  new Tiles(canvas.width - 10, 0, 10, canvas.height),
];
let tiles = [...border];
const coin = new Coin();
const text = new Text();

const level2 = 1;
const level3 = 3;
const level4 = 5;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  text.render("Score: " + score, 20, 30);

  // horizontal movement
  if (movement.keys.right) {
    player.vx = 5;
  } else if (movement.keys.left) {
    player.vx = -5;
  } else {
    player.vx = 0;
  }

  if (collides(player, coin)) {
    score++;
    coin.update();
    coin.draw();
  }
  tiles.forEach((tile) => {
    tile.draw();

    // vertical collision top to bottom
    if (
      player.y + player.height + player.vy >= tile.y &&
      player.y + player.height <= tile.y &&
      player.x <= tile.x + tile.width &&
      player.x + player.width >= tile.x
    ) {
      movement.keys.isJumping = false;
      player.y = tile.y - player.height - 0.01;
      player.vy = 0;
    }
    // vertical collision bottom to top
    if (
      player.y + player.vy <= tile.y + tile.height &&
      player.y >= tile.y &&
      player.x <= tile.x + tile.width &&
      player.x + player.width >= tile.x
    ) {
      player.y = tile.y + tile.height + 0.01;
      player.vy = 0;
    }

    if (collides(player, tile)) {
      if (player.vx > 0) {
        player.x = tile.x - player.width - 0.01;
        player.vx = 0;
      } else if (player.vx < 0) {
        player.vx = 0;
        player.x = tile.x + tile.width + 0.01;
      }
    }
  });
  player.render();
  coin.draw();

  tiles.forEach((tile) => {
    if (collides(tile, coin)) {
      coin.update();
      coin.draw();
    }
  });

  // changes the levels dependet on score
  if (score > 3) {
    tiles.splice(4, tiles.length);
    tiles = [
      ...tiles,
      new Tiles(100, 100, 300, 30),
      new Tiles(100, 100, 30, 180),
      new Tiles(200, 40, 30, 60),
    ];
  } else if (score > 2) {
    tiles.splice(4, tiles.length);
    tiles = [
      ...tiles,
      new Tiles(100, 100, 300, 30),
      new Tiles(100, 100, 30, 180),
    ];
  } else if (score >= 1) {
    text.render("Level 1", 20, 50);

    tiles.splice(4, tiles.length);
    tiles = [...tiles, new Tiles(100, 100, 300, 30)];
  }

  requestAnimationFrame(animate);
}

animate();

function collides(obj1, obj2) {
  if (!obj1.vx) {
    obj1.vx = 0;
  }
  if (
    obj1.x + obj1.vx + obj1.width >= obj2.x &&
    obj1.x + obj1.vx <= obj2.x + obj2.width &&
    obj1.y + obj1.height >= obj2.y &&
    obj1.y <= obj2.y + obj2.height
  ) {
    return true;
  }
}
