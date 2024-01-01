export default class Movement {
  constructor(player1) {
    this.keys = {
      right: false,
      left: false,
      isJumping: false,
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'd') {
        this.keys.right = true
      } else if (e.key === 'a') {
        this.keys.left = true
      } else if (e.key === ' ') {
        if (!this.keys.isJumping) {
          player1.vy -= 18
          this.keys.isJumping = true
        }
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'd') {
        this.keys.right = false
      } else if (e.key === 'a') {
        this.keys.left = false
      }
    })
  }
}
