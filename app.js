const canvas = document.getElementById('canvas')
const canvas2 = document.getElementById('canvas2')
/** @type {CanvasRenderingContext2D} */
canvas.width = 400
canvas.height = 400
canvas2.width = 400
canvas2.height = 400
const ctx = canvas.getContext('2d')
const ctx2 = canvas2.getContext('2d')
let possibleCoordinates = []
let coins = []
let score = 0
let key

for (let index = 0; index < canvas2.width; index += 20) {
  possibleCoordinates.push(index)
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function displayText() {
  ctx.fillStyle = 'black'
  ctx.font = '25px Helvetica'
  ctx.fillText('Score: ' + score, 20, 40)
}

class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 20
    this.height = 20
    this.xspeed = 20
    this.yspeed = 20
  }
  update(key, coins) {
    if (key === 'd') {
      this.x += this.xspeed
    } else if (key === 'a') {
      this.x -= this.xspeed
    } else if (key === 'w') {
      this.y -= this.yspeed
    } else if (key === 's') {
      this.y += this.yspeed
    }

    coins.forEach((coin) => {
      if (coin.x === this.x && coin.y === this.y) {
        coin.markedForDeletion = true
        coin.x = -1
        score++
        return
      }
    })

    // horizontal border
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width
    } else if (this.x < 0) {
      this.x = 0
    }

    //vertical border
    if (this.y < 0) {
      this.y = 0
    } else if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height
    }
  }
  draw() {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  render() {}
}

class Coin {
  constructor(deltaTime) {
    this.width = 20
    this.height = 20
    this.deltaTime = deltaTime
    this.x = this.calculateCoordinate()
    this.y = this.calculateCoordinate()
    this.duration = 10000
    this.markedForDeletion = false
  }
  update() {
    this.duration = this.duration - this.deltaTime
    if (this.duration < 0) {
      this.markedForDeletion = true
    }
  }
  draw() {
    if (!this.markedForDeletion) {
      ctx.fillStyle = 'yellow'
      ctx.fillRect(this.x, this.y, this.width, this.width)
    }
  }
  calculateCoordinate() {
    return possibleCoordinates[
      getRandomArbitrary(0, possibleCoordinates.length)
    ]
  }
}

const player1 = new Player(0, 0)

window.addEventListener('keydown', (e) => {
  player1.update(e.key, coins)
})

const coinIntervall = 5000
let coinTimer = 0
let lastTime = 0

coins.push(new Coin(16))

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  displayText()
  player1.update(key, coins)
  player1.draw()

  coinTimer += 1

  if (coinTimer > coinIntervall) {
    coins = coins.filter((coin) => !coin.markedForDeletion)
    coins.push(new Coin(deltaTime))
    coinTimer = 0
  } else {
    coinTimer += deltaTime
  }

  coins
    .filter((coin) => !coin.markedForDeletion)
    .forEach((coin) => {
      coin.draw()
      coin.update()
    })

  window.requestAnimationFrame(animate)
}

animate(0)
