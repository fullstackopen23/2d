import { Timer } from './Timer.js'

export default class Text {
  constructor() {
    this.ctx = canvas.getContext('2d')
    this.timer = new Timer()
  }
  render(text, x, y) {
    this.ctx.fillStyle = 'black'
    const fontSize = 15
    this.ctx.font = `${fontSize}px  Poppins`
    this.ctx.fillText(text, x, y)
  }
}
