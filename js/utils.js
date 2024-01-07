import Tiles from './Tiles.js'
import { scale } from './app.js'
const progessBar = document.getElementById('progessBar')

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

export function addTilesFromArray(input, tiles) {
  input.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol != 2) {
        const tile = new Tiles(
          j * 16 * scale,
          i * 16 * scale,
          16 * scale,
          16 * scale
        )
        tile.draw()
        tiles.push(tile)
      }
    })
  })
}
