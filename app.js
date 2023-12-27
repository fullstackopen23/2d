const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 400
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

class Player {
  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.height = 40
    this.width = 20
    this.x = 0
    this.y = canvas.height - this.height
    this.vx = 0
    this.vy = 0
    this.weight = 1
  }

  #move() {
    //horizontal

    if (input.keys.indexOf('d') !== -1) {
      this.vx = 10
    } else if (input.keys.indexOf('a') !== -1) {
      this.vx = -10
    } else {
      this.vx = 0
    }

    if (this.x + this.vx <= 0) {
      this.x = 0
    } else if (this.x + this.vx > canvas.width - this.width) {
      this.x = canvas.width - this.width
    } else {
      this.x += this.vx
    }

    //verical
    if (input.keys.indexOf(' ') !== -1 && this.#onGround()) {
      this.vy -= 27
    }
    this.y += this.vy
    if (!this.#onGround()) this.vy += this.weight
    else this.vy = 0

    if (this.y <= 0) {
      this.y = 0
    } else if (this.y >= canvas.height - this.height) {
      this.y = canvas.height - this.height
    }
  }

  update(input) {
    this.#move(input)
  }
  render() {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  #onGround() {
    return this.y >= canvas.height - this.height
  }
}

class Coin {
  constructor() {
    this.width = 20
    this.height = 20
    this.x = Math.random() * (canvas.width * 0.9)
    this.y = Math.random() * (canvas.height * 0.9)
    this.markedForDeletion = false
    this.timer = 0
  }
  update(player) {
    if (
      this.x >= player.x + this.width ||
      this.x + this.width < player.x ||
      this.y > player.y + this.height ||
      this.y + this.height < player.y
    ) {
    } else {
      // got hit by player
      this.markedForDeletion = true
      score++
      addCoin()
    }
  }
  render() {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class displayText {
  constructor() {}
  renderScore() {
    ctx.font = '30px sans-serif'
    ctx.fillText('Score: ' + score, 10, 40)
  }
}

const player1 = new Player()
const input = new InputHandler()
const text = new displayText()
let lastTime = 0

function addCoin() {
  coins.push(new Coin())
}
addCoin()

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp

  coins.forEach((coins) => {
    if (!coins.markedForDeletion) {
      coins.render()
      coins.update(player1)
    }
  })
  player1.update(input)
  player1.render()
  text.renderScore()

  window.requestAnimationFrame(animate)
}

animate(0)
