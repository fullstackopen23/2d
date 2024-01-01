export default class Tiles {
  constructor() {
    this.canvas = canvas
    this.height = 25
    this.width = 100
    this.x = 200
    this.y = 50
    this.ctx = canvas.getContext('2d')
  }

  draw() {
    this.ctx.fillStyle = 'blue  '
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
