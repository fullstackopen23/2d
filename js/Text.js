export default class Text {
  constructor() {
    this.ctx = canvas.getContext('2d')
  }
  render(text, x, y) {
    this.ctx.fillStyle = 'black'
    const fontSize = 15
    this.ctx.font = `bold ${fontSize}px  Poppins`
    this.ctx.fillText(text, x, y)
  }
}
