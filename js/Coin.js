export default class Coin {
  constructor() {
    this.x = 400;
    this.y = 100;
    this.height = 20;
    this.width = 20;
    this.ctx = canvas.getContext("2d");
  }
  draw() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x = (canvas.width - this.width) * Math.random();
    this.y = (canvas.height - this.height) * Math.random();
  }
}
