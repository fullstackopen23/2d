import Player from './Player.js'
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
let score = 0

// init

const player = new Player(canvas)
player.setupMovement()
const coin = new Coin()
const text = new Text()
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
coin.randomCoordinates(tiles)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  text.render('Score: ' + score, 10, 20)

  player.draw()
  coin.draw()
  coin.update()
  if (collides(player.hitbox, coin)) {
    score++
    coin.randomCoordinates(tiles)
  }
  player.update(tiles)

  ctx.drawImage(currentBackground, 0, 0)
  requestAnimationFrame(animate)
}

animate()
