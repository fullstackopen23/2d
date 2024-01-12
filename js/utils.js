import Tiles from './Tiles.js'

export function makeArray2D(input) {
  let newArray = []
  for (let i = 0; i < input.length; i += 20) {
    newArray.push(input.slice(i, i + 20))
  }
  return newArray
}

export function collides(r1, r2) {
  if (r1.y + r1.height <= r2.y) {
    return false
  } else if (r1.y >= r2.y + r2.height) {
    return false
  } else if (r1.x + r1.width <= r2.x) {
    return false
  } else if (r1.x >= r2.x + r2.width) {
    return false
  } else {
    return true
  }
}

export function createTiles(input, tiles) {
  input.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol != 1) {
        const tile = new Tiles(j * 16, i * 16, 16, 16)
        tiles.push(tile)
      }
    })
  })
}
