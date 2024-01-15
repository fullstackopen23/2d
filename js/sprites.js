const char2 = document.getElementById('char2')
const char1 = document.getElementById('char1')
export const sprites = {
  char1: {
    image: char1,
  },
  char2: {
    image: char2,
  },
  idleRight: {
    frameY: 0,
    maxFrames: 4,
  },
  idleLeft: {
    frameY: 1,
    maxFrames: 4,
  },
  jumpRight: {
    frameY: 2,
    maxFrames: 2,
  },
  jumpLeft: {
    frameY: 3,
    maxFrames: 2,
  },
  runRight: {
    frameY: 4,
    maxFrames: 6,
  },
  runLeft: {
    frameY: 5,
    maxFrames: 6,
  },
  hitRight: {
    frameY: 6,
    maxFrames: 4,
  },
  hitLeft: {
    frameY: 7,
    maxFrames: 4,
  },
  fallRight: {
    frameY: 8,
    maxFrames: 2,
  },
  fallLeft: {
    frameY: 9,
    maxFrames: 2,
  },
}
