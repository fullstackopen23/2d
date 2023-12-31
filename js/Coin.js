import { collides } from './utils.js'
import { scale } from './app.js'

const coinImg = document.getElementById('coin')

export default class Coin {
  constructor() {
    this.width = 16 * scale
    this.height = 16 * scale
    this.x = -100
    this.y = -100
    this.ctx = canvas.getContext('2d')
    this.frameX = 0
    this.fpsCounter = 0
  }
  draw() {
    this.ctx.drawImage(
      coinImg,
      16 * this.frameX,
      0,
      16,
      16,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update() {
    this.fpsCounter++
    if (this.fpsCounter % 8 === 0) {
      this.fpsCounter = 0
      this.frameX++
      if (this.frameX >= 5) {
        this.frameX = 0
      }
    }
  }

  randomCoordinates(tiles) {
    const tempCoin = {
      height: this.height,
      width: this.width,
      x: Math.random() * (canvas.width - this.width),
      y: Math.random() * (canvas.height - this.height),
    }

    for (let i = 0; i < tiles.length; i++) {
      if (collides(tempCoin, tiles[i])) {
        console.log('Coin collides with a tile!')
        this.randomCoordinates(tiles)
        break
      } else {
        this.x = tempCoin.x
        this.y = tempCoin.y
      }
    }
  }
}
