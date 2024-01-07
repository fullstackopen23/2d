import Player from './Player.js'
import Tiles from './Tiles.js'
import Text from './Text.js'
import Coin from './Coin.js'
import { makeArray2D, collides, addTilesFromArray } from './utils.js'
import { level } from './maps.js'
const restartContainer = document.querySelector('.restart')
const timeText = document.querySelector('#time')
import { Timer } from './Timer.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('#canvas')
)
export let scale = 1

window.onload = () => {
  const width = window.innerWidth
  if (width > 1000) {
    scale = 2
  } else if (width > 600) {
    scale = 1.4
  } else if (width > 400) {
    scale = 1.2
  }

  if (width < 400) {
    scale = 0.8
  }

  canvas.width = 320 * scale
  canvas.height = 320 * scale
  const ctx = canvas.getContext('2d')

  // init
  let score = 0
  let gameover = false
  const player = new Player(canvas)
  player.setupMovement()
  const coin = new Coin()
  const text = new Text()
  const timer = new Timer()
  const border = [
    new Tiles(0, -10, canvas.width, 10),
    new Tiles(0, canvas.height, canvas.width, 10),
    new Tiles(-10, 0, 10, canvas.height),
    new Tiles(canvas.width, 0, 10, canvas.height),
  ]
  let tiles = [...border]
  let currentBackground

  // init level1
  addTilesFromArray(makeArray2D(level.levelOne.map), tiles)
  currentBackground = level.levelOne.image
  coin.randomCoordinates(tiles)

  const restartBtn = document.getElementById('restartBtn')
  restartBtn.addEventListener('click', () => {
    gameover = false
    score = 0
    restartContainer.classList.remove('active')
    player.restart()
    timer.start()
    tiles = [...border]

    addTilesFromArray(makeArray2D(level.levelOne.map), tiles)
    currentBackground = level.levelOne.image
    coin.randomCoordinates(tiles)
    animate()
  })

  timer.start()

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    text.render('Score: ' + score, 10, 50)
    text.render('Time: ' + timer.getTime() + 's', 10, 25)

    if (score >= 5 && !level.levelTwo.loaded) {
      tiles = [...border]
      addTilesFromArray(makeArray2D(level.levelTwo.map), tiles)
      currentBackground = level.levelTwo.image
      level.levelTwo.loaded = true
    } else if (score >= 10 && !level.levelThree.loaded) {
      tiles = [...border]
      addTilesFromArray(makeArray2D(level.levelThree.map), tiles)
      currentBackground = level.levelThree.image
      level.levelThree.loaded = true
    } else if (score >= 15) {
      gameover = true
    }

    player.draw()
    coin.draw()
    coin.update()

    if (collides(player.hitbox, coin)) {
      score++
      coin.randomCoordinates(tiles)
      player.take = true
    }

    player.update(tiles)

    ctx.save()
    ctx.scale(scale, scale)
    ctx.drawImage(currentBackground, 0, 0)
    ctx.restore()

    if (!gameover) {
      requestAnimationFrame(animate)
    } else {
      timeText.innerHTML = 'Your time was: ' + timer.getTime() + 's'
      restartContainer.classList.add('active')
    }
  }
  animate()
}
