export default class Tiles {
  constructor(x, y, width, height) {
    this.height = height
    this.width = width
    this.x = x
    this.y = y
    this.ctx = canvas.getContext('2d')
  }
}
