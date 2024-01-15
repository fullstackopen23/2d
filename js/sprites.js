const idleImg = document.getElementById('idle')
const idleLeftImg = document.getElementById('idleLeft')
const runImg = document.getElementById('run')
const runLeftImg = document.getElementById('runLeft')
const jumpImg = document.getElementById('jump')
const jumpLeftImg = document.getElementById('jumpLeft')
const takeImg = document.getElementById('take')
const takeLeftImg = document.getElementById('takeLeft')
const fallImg = document.getElementById('fall')
const fallLeftImg = document.getElementById('fallLeft')

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
  take: {
    image: takeImg,
    frames: 4,
  },
  takeLeft: {
    image: takeLeftImg,
    frames: 4,
  },
  fallRight: {
    image: fallImg,
    frames: 2,
  },
  fallLeft: {
    image: fallLeftImg,
    frames: 2,
  },
}
