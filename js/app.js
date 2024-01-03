import Player from './Player.js'
import Movement from './Movement.js'
import Tiles from './Tiles.js'
import Text from './Text.js'
import Coin from './Coin.js'
import { makeArray2D, collides, addTilesFromArray } from './utils.js'
import { level } from './maps.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('#canvas')
)
canvas.width = 320
canvas.height = 320
const ctx = canvas.getContext('2d')

// init
let score = 3
const player = new Player(canvas)
const coin = new Coin()
const text = new Text()
const movement = new Movement(player)
const border = [
  new Tiles(0, -10, canvas.width, 10),
  new Tiles(0, canvas.height, canvas.width, 10),
  new Tiles(-10, 0, 10, canvas.height),
  new Tiles(canvas.width, 0, 10, canvas.height),
]
let tiles = [...border]
let currentBackground = level.levelOne.image

// init level1
addTilesFromArray(makeArray2D(level.levelOne.map), tiles)
currentBackground = level.levelOne.image

function animate() {
  if (score > 1) {
    tiles = [...border]
    addTilesFromArray(makeArray2D(level.levelThree.map), tiles)
    currentBackground = level.levelThree.image
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  coin.draw()
  coin.update()
  text.render('Score: ' + score, 20, 30)

  // horizontal movement
  if (movement.keys.right) {
    player.vx = 5
  } else if (movement.keys.left) {
    player.vx = -5
  } else {
    player.vx = 0
  }

  // collection a coin
  if (collides(player, coin)) {
    score++
    console.log('coin collected')
  }

  tiles.forEach((tile) => {
    tile.draw()
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
      player.y >= tile.y &&
      player.x <= tile.x + tile.width &&
      player.x + player.width >= tile.x
    ) {
      player.y = tile.y + tile.height + 0.01
      player.vy = 0
    }
    // horizontal collision with tiles
    if (collides(player, tile)) {
      if (player.vx > 0) {
        player.x = tile.x - player.width - 0.01
        player.vx = 0
      } else if (player.vx < 0) {
        player.vx = 0
        player.x = tile.x + tile.width + 0.01
      }
    }
  })

  player.render()

  ctx.drawImage(currentBackground, 0, 0)
  requestAnimationFrame(animate)
}

animate()
