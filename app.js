const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
canvas.width = 400
canvas.height = 400
const ctx = canvas.getContext('2d')
let coins = []
let score = 0

class InputHandler {
  constructor() {
    this.keys = []
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'a' || e.key === 'd' || e.key === ' ') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key)
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'a' || e.key === 'd' || e.key === ' ') {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
    })
  }
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
    this.width = 25
    this.height = 25
    this.vx = 0
    this.vy = 0
    this.weight = 1
  }
  update(coins, input) {
    if (input.keys.indexOf('a') !== -1) {
      this.vx = -10
    } else if (input.keys.indexOf('d') !== -1) {
      this.vx = 10
    } else {
      this.vx = 0
    }

    if (
      input.keys.indexOf(' ') !== -1 &&
      this.y == canvas.height - this.height
    ) {
      this.vy = -27
    }

    this.x += this.vx
    this.y += this.vy

    if (!(this.y == canvas.height - this.height)) {
      this.vy += this.weight
    }

    coins.forEach((coin) => {
      const dx = coin.x - this.x
      const dy = coin.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < this.width / 2 + coin.width / 2) {
        coin.markedForDeletion = true
        coin.x = -100
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
    this.x = getRandomArbitrary(0, canvas.width - this.width)
    this.y = getRandomArbitrary(0, canvas.height - this.height)
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
}

const player1 = new Player(0, canvas.height)
const input = new InputHandler()

const coinIntervall = 5000
let coinTimer = 0
let lastTime = 0

coins.push(new Coin(16))

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp

  displayText()
  player1.update(coins, input)
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
