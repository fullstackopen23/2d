import Player from './Player.js'
import Movement from './Movement.js'
import Tiles from './Tiles.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('#canvas')
)
canvas.width = innerWidth / 2
canvas.height = innerHeight / 2
const ctx = canvas.getContext('2d')

// init
const player = new Player(canvas)
const movement = new Movement(player)
const tile = new Tiles(canvas)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  tile.draw()
  player.render()

  // horizontal movement
  if (movement.keys.right && !collides(player, tile)) {
    player.vx = 5
  } else if (movement.keys.left && !collides(player, tile)) {
    player.vx = -5
  } else {
    player.vx = 0
  }

  // vertical collision top to bottom
  if (
    player.y + player.height + player.vy >= tile.y &&
    player.y + player.height <= tile.y &&
    player.x <= tile.x + tile.width &&
    player.x + player.width >= tile.x
  ) {
    movement.keys.isJumping = false
    player.y = tile.y - player.height - 0.01
    player.vy = 0
  }
  // vertical collision bottom to top
  if (
    player.y + player.vy <= tile.y + tile.height &&
    player.y >= tile.y + tile.height &&
    player.x <= tile.x + tile.width &&
    player.x + player.width >= tile.x
  ) {
    movement.keys.isJumping = false
    player.y = tile.y + player.height + 0.01
    player.vy = 0
  }

  if (collides(player, tile)) {
    movement.keys.isJumping = false
  } else if (player.y + player.height >= canvas.height) {
    movement.keys.isJumping = false
  }

  console.log(movement.keys)
  requestAnimationFrame(animate)
}

animate()

function collides(obj1, obj2) {
  if (
    obj1.x + obj1.width >= obj2.x &&
    obj1.x <= obj2.x + obj2.width &&
    obj1.y + obj1.height >= obj2.y &&
    obj1.y <= obj2.y + obj2.height
  ) {
    return true
  }
}
