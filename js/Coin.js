import { collides } from './utils.js'

const coinImg = document.getElementById('coin')

export default class Coin {
  constructor() {
    this.width = 16
    this.height = 16
    this.x = 100
    this.y = 100
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
}
