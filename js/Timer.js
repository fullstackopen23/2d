export class Timer {
  constructor() {
    this.startTime = 0
  }

  getTime() {
    return ((Date.now() - this.startTime) / 1000).toFixed(1)
  }

  start() {
    this.startTime = Date.now()
  }
}
