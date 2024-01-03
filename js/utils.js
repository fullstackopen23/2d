import Tiles from './Tiles.js'

export function makeArray2D(input) {
  let newArray = []
  for (let i = 0; i < input.length; i += 20) {
    newArray.push(input.slice(i, i + 20))
  }
  return newArray
}

export function collides(obj1, obj2) {
  if (!obj1.vx) {
    obj1.vx = 0
  }
  if (
    obj1.x + obj1.vx + obj1.width >= obj2.x &&
    obj1.x + obj1.vx <= obj2.x + obj2.width &&
    obj1.y + obj1.height >= obj2.y &&
    obj1.y <= obj2.y + obj2.height
  ) {
    return true
  }
}

export function addTilesFromArray(input, tiles) {
  input.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol != 2) {
        tiles.push(new Tiles(j * 16, i * 16, 16, 16))
      }
    })
  })
}
