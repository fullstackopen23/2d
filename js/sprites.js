const idleImg = document.getElementById('idle')
const idleLeftImg = document.getElementById('idleLeft')
const runImg = document.getElementById('run')
const runLeftImg = document.getElementById('runLeft')
const jumpImg = document.getElementById('jump')
const jumpLeftImg = document.getElementById('jumpLeft')

export const sprites = {
  idleRight: {
    image: idleImg,
    frames: 4,
  },
  idleLeft: {
    image: idleLeftImg,
    frames: 4,
  },
  runRight: {
    image: runImg,
    frames: 6,
  },
  runLeft: {
    image: runLeftImg,
    frames: 6,
  },
  jumpRight: {
    image: jumpImg,
    frames: 2,
  },
  jumpLeft: {
    image: jumpLeftImg,
    frames: 2,
  },
}
