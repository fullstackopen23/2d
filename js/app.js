// imports
import Player from './Player.js'
import Tiles from './Tiles.js'
import Text from './Text.js'
import Coin from './Coin.js'
import { makeArray2D, collides, createTiles } from './utils.js'
import { level } from './maps.js'
import { sprites } from './sprites.js'

// fetching the DOM
const restartContainer = document.querySelector('.restart')
const timeText = document.querySelector('#time')
const canvasContainer = document.querySelector('.canvasContainer')
const highScoreText = document.querySelector('#highscore')
const restartBtn = document.getElementById('restartBtn')
const volumeBtn = document.getElementById('volume')
const char2Select = document.getElementById('char2Select')
const char1Select = document.getElementById('char1Select')
const canvasSize = document.querySelector('.canvasBorder')
const pauseBtn = document.getElementById('pauseBtn')
const menu = document.querySelector('.menu')
const playBtn = document.getElementById('playBtn')

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('#canvas')
)
const ctx = canvas.getContext('2d')
canvas.width = 320
canvas.height = 320

// scales the canvas and all the elements inside
export let scale = 1

window.addEventListener('resize', resize)
window.addEventListener('load', resize)

function resize() {
  if (window.innerWidth < 250) {
    scale = 0.5
  } else if (window.innerWidth < 350) {
    scale = 0.8
  } else if (window.innerWidth < 550) {
    scale = 1
  } else if (window.innerWidth < 750) {
    scale = 1.3
  } else if (window.innerWidth < 950) {
    scale = 1.5
  } else {
    scale = 1.6
  }
  canvas.width = 320 * scale
  canvas.height = 320 * scale
  canvas.style.width = 320 * scale + 'px'
  canvas.style.height = 320 * scale + 'px'
  canvasContainer.style.width = canvas.width + 'px'
  canvasSize.style.height = canvas.height + 'px'
  canvasSize.style.width = canvas.width + 'px'
}

// init && loads highscore from local storage
let score = 0
let storage = {
  highscore: 0,
}
let lasttime = 0
if (localStorage.getItem('highscore')) {
  storage.highscore = Number(
    JSON.parse(localStorage.getItem('highscore'))
  )
  highScoreText.innerHTML =
    'Your Highscore: ' + storage.highscore + 's'
}
let gameover = false
let pause = false
const coinAudio = new Audio('sounds/coin.mp3')
coinAudio.volume = 0.6
const player = new Player(canvas)
player.setupMovement()
const coin = new Coin()
const text = new Text()
const border = [
  new Tiles(320, 0, 15, canvas.height),
  new Tiles(0, -10, canvas.width, 10),
  new Tiles(-10, 0, 10, canvas.height),
]
let tiles = [...border]
let currentBackground
let timeRef = null
let timePaused = 0

restartBtn.addEventListener('click', () => {
  score = 0
  startTime = Date.now()
  restartContainer.classList.remove('active')
  lasttime = 0
  tiles = [...border]
  level.levelTwo.loaded = false
  level.levelThree.loaded = false
  level.levelFour.loaded = false
  createTiles(makeArray2D(level.levelOne.map), tiles)
  currentBackground = level.levelOne.image
  coin.randomCoordinates(tiles)
  gameover = false
  player.restart()
  animate(0)
})

volumeBtn.addEventListener('click', (e) => {
  if (volumeBtn.innerHTML.trim() === 'volume_up') {
    volumeBtn.innerHTML = 'volume_off'
    coinAudio.muted = true
  } else {
    volumeBtn.innerHTML = 'volume_up'
    coinAudio.muted = false
    coinAudio.volume = 0.6
  }
})

char2Select.addEventListener('click', () => {
  player.char = sprites.char2
  char2Select.classList.add('selected')
  char1Select.classList.remove('selected')
})
char1Select.addEventListener('click', () => {
  player.char = sprites.char1
  char1Select.classList.add('selected')
  char2Select.classList.remove('selected')
})

// init level1
createTiles(makeArray2D(level.levelOne.map), tiles)
currentBackground = level.levelOne.image
coin.randomCoordinates(tiles)

pauseBtn.addEventListener('click', (e) => {
  if (gameover) return

  if (pause) {
    pause = false
    lasttime = 0
    animate(0)
    timePaused = Date.now() - timeRef
    startTime = startTime + timePaused
    menu.classList.remove('active')
  } else {
    pause = true
    timeRef = Date.now()
    menu.classList.add('active')
  }
})

playBtn.addEventListener('click', () => {
  pause = false
  lasttime = 0
  animate(0)
  timePaused = Date.now() - timeRef
  startTime = startTime + timePaused
  menu.classList.remove('active')
})

let startTime = Date.now()
startTime = Date.now()
animate(0)

function animate(timestamp = 0) {
  let deltatime = timestamp - lasttime
  if (deltatime > 200) deltatime = 16
  lasttime = timestamp
  let seconds = ((Date.now() - startTime) / 1000).toFixed(1)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.update(tiles, deltatime)

  ctx.save()
  ctx.scale(scale, scale)
  text.render('Score: ' + score, 240, 20)
  text.render('Time: ' + seconds + 's', 120, 20)
  ctx.drawImage(currentBackground, 0, 0)
  coin.update(deltatime)
  ctx.restore()

  if (score >= 5 && !level.levelTwo.loaded) {
    tiles = [...border]
    createTiles(makeArray2D(level.levelTwo.map), tiles)
    currentBackground = level.levelTwo.image
    level.levelTwo.loaded = true
    coin.randomCoordinates(tiles)
    player.restart()
  } else if (score >= 10 && !level.levelThree.loaded) {
    tiles = [...border]
    createTiles(makeArray2D(level.levelThree.map), tiles)
    currentBackground = level.levelThree.image
    level.levelThree.loaded = true
    coin.randomCoordinates(tiles)
    player.restart()
  } else if (score >= 15 && !level.levelFour.loaded) {
    tiles = [...border]
    createTiles(makeArray2D(level.levelFour.map), tiles)
    currentBackground = level.levelFour.image
    level.levelFour.loaded = true
    coin.randomCoordinates(tiles)
    player.restart()
  } else if (score >= 20) {
    gameover = true
  }

  if (collides(player.hitbox, coin)) {
    score++
    coin.randomCoordinates(tiles)
    player.take = true
    coinAudio.play().catch((err) => console.log(err))
    if (coinAudio.paused) {
      coinAudio.play().catch((err) => console.log(err))
    } else {
      coinAudio.currentTime = 0
    }
  }

  if (!gameover && !pause) {
    requestAnimationFrame(animate)
  } else if (pause) {
    console.log({ pause })
  } else {
    let endtime = ((Date.now() - startTime) / 1000).toFixed(1)
    timeText.innerHTML = 'Your time was: ' + endtime + 's'

    if (endtime < storage.highscore || !storage.highscore) {
      storage.highscore = endtime
      localStorage.setItem(
        'highscore',
        JSON.stringify(storage.highscore)
      )
    }
    highScoreText.innerHTML =
      'Your Highscore: ' + storage.highscore + 's'
    restartContainer.classList.add('active')
  }
}
