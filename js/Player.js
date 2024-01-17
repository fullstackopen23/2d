import { collides } from './utils.js'
import { scale } from './app.js'
import { sprites } from './sprites.js'
const aBtn = document.querySelector('#a')
const dBtn = document.querySelector('#d')
const spaceBtn = document.querySelector('#space')

export default class Player {
  constructor(canvas) {
    this.x = 0
    this.y = 50
    this.deltatime
    this.height = 60
    this.width = 60
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
      x: this.x + 20,
      y: this.y + 12,
      width: this.width - 40,
      height: this.height - 25,
    }
    this.frameX = 0
    this.frameY = 0
    this.fpsCounter = 0
    this.intervall = 50
    this.lastDir = 'right'
    this.take = false
    this.char = sprites.char1
    this.currentSprite = sprites.idleRight
  }

  updateHitbox() {
    this.hitbox.x = this.x + 20
    this.hitbox.y = this.y + 12
  }

  restart() {
    this.x = 5
    this.y = 40
    this.vy = 0
    this.vx = 0
  }

  handleJump(e) {
    e.preventDefault()
    if (!this.isJumping) {
      this.vy = this.vy - 16.8
      this.isJumping = true
      spaceBtn.src = 'img/controls/SPACEb.png'
    }
  }

  handleJumpKeyup(e) {
    e.preventDefault()
    spaceBtn.src = 'img/controls/SPACE.png'
  }

  handleMoveRight(e) {
    e.preventDefault()
    this.right = true
    dBtn.src = 'img/controls/Db.png'
  }

  handleMoveRightUp(e) {
    e.preventDefault()
    this.right = false
    dBtn.src = 'img/controls/D.png'
  }

  handleMoveLeft(e) {
    e.preventDefault()
    aBtn.src = 'img/controls/Ab.png'
    this.left = true
  }

  handleMoveLeftUp(e) {
    e.preventDefault()
    this.left = false
    aBtn.src = 'img/controls/A.png'
  }

  setupMovement() {
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') {
        this.handleMoveRight(e)
      } else if (
        e.key.toLowerCase() === 'a' ||
        e.key === 'ArrowLeft'
      ) {
        this.handleMoveLeft(e)
      } else if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key.toLowerCase() === 'w'
      ) {
        this.handleJump(e)
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') {
        this.handleMoveRightUp(e)
      } else if (
        e.key.toLowerCase() === 'a' ||
        e.key === 'ArrowLeft'
      ) {
        this.handleMoveLeftUp(e)
      } else if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key.toLowerCase() === 'w'
      ) {
        this.handleJumpKeyup(e)
      }
    })

    //jumping
    spaceBtn.addEventListener('touchstart', (e) => {
      this.handleJump(e)
    })
    spaceBtn.addEventListener('touchend', (e) => {
      this.handleJumpKeyup(e)
    })
    spaceBtn.addEventListener('mousedown', (e) => {
      this.handleJump(e)
    })
    spaceBtn.addEventListener('mouseup', (e) => {
      this.handleJumpKeyup(e)
    })

    //move right
    dBtn.addEventListener('touchstart', (e) => {
      this.handleMoveRight(e)
    })
    dBtn.addEventListener('touchend', (e) => {
      this.handleMoveRightUp(e)
    })
    dBtn.addEventListener('mousedown', (e) => {
      this.handleMoveRight(e)
    })
    dBtn.addEventListener('mouseup', (e) => {
      this.handleMoveRightUp(e)
    })

    //move left
    aBtn.addEventListener('touchstart', (e) => {
      this.handleMoveLeft(e)
    })
    aBtn.addEventListener('touchend', (e) => {
      this.handleMoveLeftUp(e)
    })
    aBtn.addEventListener('mousedown', (e) => {
      this.handleMoveLeft(e)
    })
    aBtn.addEventListener('mouseup', (e) => {
      this.handleMoveLeftUp(e)
    })
  }

  draw() {
    /*  this.ctx.fillStyle = 'rgba(15, 165, 0, 0.8)'
    this.ctx.fillRect(
      this.hitbox.x,
      this.hitbox.y,
      this.hitbox.width,
      this.hitbox.height
    ) */

    this.ctx.drawImage(
      this.char.image,
      this.spriteWidth * this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
    /* this.ctx.fillStyle = 'rgba(15, 165, 0, 0.2)'
    this.ctx.fillRect(this.x, this.y, this.width, this.height) */
  }

  update(tiles, deltatime) {
    this.deltatime = deltatime
    this.ctx.save()
    this.ctx.scale(scale, scale)
    this.draw()
    this.ctx.restore()

    this.applyGravity(deltatime)

    // going right
    if (this.right) {
      this.vx = 0.19 * deltatime
      this.lastDir = 'right'
      if (!this.take) {
        this.currentSprite = sprites.runRight
        this.frameY = this.currentSprite.frameY
      }
      if (!this.take) this.currentSprite = sprites.runRight
    }
    // going left
    else if (this.left) {
      this.vx = -0.19 * deltatime
      this.lastDir = 'left'
      if (!this.take) {
        this.currentSprite = sprites.runLeft
        this.frameY = this.currentSprite.frameY
      }
    } else {
      // idle Left
      if (this.lastDir === 'left' && !this.isJumping && !this.take) {
        this.currentSprite = sprites.idleLeft
        this.frameY = this.currentSprite.frameY
      } else if (
        // jumping left
        this.lastDir === 'left' &&
        this.isJumping &&
        !this.take &&
        this.vy <= 0
      ) {
        this.currentSprite = sprites.jumpLeft
        this.frameY = this.currentSprite.frameY
      } else if (
        // falling left
        this.lastDir === 'left' &&
        this.isJumping &&
        !this.take &&
        this.vy > 0
      ) {
        this.currentSprite = sprites.fallLeft
        this.frameY = this.currentSprite.frameY
        // idle Right
      } else if (
        this.lastDir === 'right' &&
        !this.isJumping &&
        !this.take
      ) {
        this.currentSprite = sprites.idleRight
        this.frameY = this.currentSprite.frameY
      } else if (
        // jump right
        this.lastDir === 'right' &&
        this.isJumping &&
        !this.take &&
        this.vy <= 0
      ) {
        this.currentSprite = sprites.jumpRight
        this.frameY = this.currentSprite.frameY
      } else if (
        // falling right
        this.lastDir === 'right' &&
        this.isJumping &&
        !this.take &&
        this.vy > 0
      ) {
        this.currentSprite = sprites.fallRight
        this.frameY = this.currentSprite.frameY
      } else {
        this.currentSprite = sprites.idleRight
        this.frameY = this.currentSprite.frameY
      }
      this.vx = 0
    }

    if (this.take) {
      if (this.lastDir === 'left') {
        this.currentSprite = sprites.hitLeft
        this.frameY = this.currentSprite.frameY
      } else {
        this.currentSprite = sprites.hitRight
        this.frameY = this.currentSprite.frameY
      }
      setTimeout(() => {
        this.take = false
      }, 700)
    }
    this.updateHitbox()

    let verticalRext = {
      x: this.hitbox.x,
      y: this.hitbox.y + this.vy * deltatime * (1 / 16),
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
          //console.log('collides on the right')
          const offset =
            this.x + this.width - this.hitbox.x - this.hitbox.width
          this.x = tile.x - this.width + offset - 0.01
        } else if (this.vx < 0) {
          const offset = this.hitbox.x - this.x
          this.x = tile.x + tile.width - offset + 0.01
          //console.log('collides on the left ')
        }
        this.vx = 0
      }
    })

    for (let index = 0; index < tiles.length; index++) {
      const tile = tiles[index]

      if (collides(verticalRext, tile)) {
        if (this.vy > 0) {
          //console.log('collides: top of tile')
          this.vy = 0
          this.isJumping = false
          const offset = this.hitbox.y - this.y + this.hitbox.height
          this.y = tile.y - offset - 0.01
        }
        if (this.vy < 0) {
          //console.log('collides: bottom of tile')
          this.vy = 0
          const offset = this.hitbox.y - this.y
          this.y = tile.y + tile.height - offset + 0.01
        }
      }
    }

    if (this.hitbox.y < 0) {
      console.log('hu')
    }

    this.x += this.vx
    this.y += this.vy * deltatime * (1 / 16)
    this.updateHitbox()

    if (this.fpsCounter > this.intervall) {
      this.fpsCounter = 0
      if (this.frameX >= this.currentSprite.maxFrames - 1) {
        this.frameX = 0
      } else {
        this.frameX++
      }
    } else {
      this.fpsCounter += deltatime
    }
  }

  applyGravity(deltatime) {
    this.vy += this.weight * deltatime * 0.072
  }
}
