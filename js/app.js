import Player from "./Player.js";
import Movement from "./Movement.js";
import Tiles from "./Tiles.js";

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector("#canvas")
);
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;
const ctx = canvas.getContext("2d");

// init
const player = new Player(canvas);
const movement = new Movement(player);
const tiles = [
  new Tiles(0, 0, canvas.width, 10),
  new Tiles(0, canvas.height - 10, canvas.width, 10),
  new Tiles(0, 0, 10, canvas.height),
  new Tiles(canvas.width - 10, 0, 10, canvas.height),
];
tiles.push(new Tiles(100, 50, 20, 20));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // horizontal movement
  if (movement.keys.right) {
    player.vx = 5;
  } else if (movement.keys.left) {
    player.vx = -5;
  } else {
    player.vx = 0;
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
  requestAnimationFrame(animate);
}

animate();

function collides(obj1, obj2) {
  if (
    obj1.x + obj1.vx + obj1.width >= obj2.x &&
    obj1.x + obj1.vx <= obj2.x + obj2.width &&
    obj1.y + obj1.height >= obj2.y &&
    obj1.y <= obj2.y + obj2.height
  ) {
    return true;
  }
}
