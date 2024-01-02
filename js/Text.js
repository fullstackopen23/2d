export default class Text {
  constructor() {
    this.ctx = canvas.getContext("2d");
  }
  render(text, x, y) {
    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, x, y);
  }
}
