import { collides } from './utils.js'
import { sprites } from './sprites.js'

export default class Player {
  constructor(canvas) {
    this.x = 10
    this.y = 10
    this.height = 40
    this.width = 40
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.vy = 0
    this.vx = 0
    this.weight = 1
    this.spriteWidth = 50
    this.spriteHeight = 50
    this.left = false
    this.right = false
    this.isJumping = false
    this.hitbox = {
      x: this.x,
      y: this.y,
      width: this.width - 30,
      height: this.height - 15,
    }
    this.frameX = 0
    this.fpsCounter = 0
    this.currentSprite = sprites.idleRight
    this.lastDir
    this.take = false
  }

  updateHitbox() {
    this.hitbox.x = this.x + 16
    this.hitbox.y = this.y + 8
  }

  setupMovement() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'd') {
        this.right = true
      } else if (e.key === 'a') {
        this.left = true
      } else if (e.key === ' ') {
        if (!this.isJumping) {
          this.vy -= 17
          this.isJumping = true
        }
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.key === 'd') {
        this.right = false
      } else if (e.key === 'a') {
        this.left = false
      }
    })
  }

  draw() {
    /* this.ctx.fillStyle = 'rgba(15, 165, 0, 0.8)'
    this.ctx.fillRect(
      this.hitbox.x,
      this.hitbox.y,
      this.hitbox.width,
      this.hitbox.height
    ) */
    this.ctx.drawImage(
      this.currentSprite.image,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.ctx.fillStyle = 'rgba(15, 165, 0, 0.2)'
    /*     this.ctx.fillRect(this.x, this.y, this.width, this.height)
     */
  }

  update(tiles) {
    this.updateHitbox()
    this.applyGravity()
    if (this.right) {
      this.vx = 3
      this.lastDir = 'right'
      if (!this.take) this.currentSprite = sprites.runRight
    } else if (this.left) {
      this.vx = -3
      this.lastDir = 'left'
      if (!this.take) this.currentSprite = sprites.runLeft
    } else {
      if (this.lastDir === 'left' && !this.isJumping && !this.take) {
        this.currentSprite = sprites.idleLeft
      } else if (
        this.lastDir === 'left' &&
        this.isJumping &&
        !this.take
      ) {
        this.currentSprite = sprites.jumpLeft
      } else if (
        this.lastDir === 'right' &&
        !this.isJumping &&
        !this.take
      ) {
        this.currentSprite = sprites.idleRight
      } else if (
        this.lastDir === 'right' &&
        this.isJumping &&
        !this.take
      ) {
        this.currentSprite = sprites.jumpRight
      }
      this.vx = 0
    }

    if (this.take) {
      if (this.lastDir === 'left') {
        this.currentSprite = sprites.takeLeft
      } else {
        this.currentSprite = sprites.take
      }
    }

    let verticalRext = {
      x: this.hitbox.x,
      y: this.hitbox.y + this.vy,
      width: this.hitbox.width,
      height: this.hitbox.height,
    }
    let horizontalRext = {
      x: this.hitbox.x + this.vx,
      y: this.hitbox.y,
      width: this.hitbox.width,
      height: this.hitbox.height,
    }

    tiles.forEach((tile) => {
      if (collides(horizontalRext, tile)) {
        if (this.vx > 0) {
          console.log('collides on the right')
          const offset =
            this.x + this.width - this.hitbox.x - this.hitbox.width
          this.x = tile.x - this.width + offset - 0.01
        } else if (this.vx < 0) {
          const offset = this.hitbox.x - this.x
          this.x = tile.x + tile.width - offset + 0.01
          console.log('collides on the left ')
        }
        this.vx = 0
      }
    })

    this.updateHitbox()

    for (let index = 0; index < tiles.length; index++) {
      const tile = tiles[index]

      if (collides(verticalRext, tile)) {
        if (this.vy > 0) {
          this.vy = 0
          this.isJumping = false
          //console.log('collides: top of tile')
          const offset = this.hitbox.y - this.y + this.hitbox.height
          this.y = tile.y - offset - 0.01
        }
        if (this.vy < 0) {
          this.vy = 0
          const offset = this.hitbox.y - this.y
          console.log('collides: bottom of tile')
          this.y = tile.y + tile.height - offset + 0.01
        }
      }
    }

    this.x += this.vx
    this.y += this.vy
    this.updateHitbox()
    this.fpsCounter++
    if (this.fpsCounter % 5 === 0) {
      this.fpsCounter = 0
      this.frameX++
      if (this.frameX >= this.currentSprite.frames) {
        this.frameX = 0
      }
    }
  }

  applyGravity() {
    this.vy += this.weight
  }
}
