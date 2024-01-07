export default class Tiles {
  constructor(x, y, width, height) {
    this.height = height
    this.width = width
    this.x = x
    this.y = y
    this.ctx = canvas.getContext('2d')
  }
  draw() {
    this.ctx.fillStyle = 'rgba(15, 165, 0, 0.2)'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
