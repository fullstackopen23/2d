export default class Player {
  constructor(canvas) {
    this.x = 100
    this.height = 25
    this.width = 25
    this.y = canvas.height - this.height
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.vy = 0
    this.vx = 0
    this.weight = 1
  }

  draw() {
    this.ctx.fillStyle = 'black  '

    this.ctx.fillRect(this.x, this.y, this.height, this.width)
  }

  render() {
    this.draw()
    this.y += this.vy
    // gravity
    if (this.y + this.height + this.vy <= this.canvas.height) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }
    this.x += this.vx
  }
}
