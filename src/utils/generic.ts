export const randomInteger = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const lowercaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(97 + i))

// export const playerSymbols = [...Array(13)].map((_, i) => String.fromCharCode(90 - 2 * i))

export function mapRangeFromRangeTo(val1: number, max1: number, val2: number) {
  return Math.floor((1 - val1 / max1) * val2)
}
// Formula taken from https://www.rapidtables.com/convert/color/hsv-to-rgb.html
export function hsvToHex(h: number, s: number, v: number) {
  if (h < 0 || h >= 360 || s < 0 || s > 1 || v < 0 || v > 1) {
    return '#000000'
  }

  let c = v * s

  let x = c * (1 - Math.abs(((h / 60) % 2) - 1))

  let m = v - c

  let rgb_ = null
  if (h >= 0 && h < 60) {
    rgb_ = [c, x, 0]
  } else if (h >= 60 && h < 120) {
    rgb_ = [x, c, 0]
  } else if (h >= 120 && h < 180) {
    rgb_ = [0, c, x]
  } else if (h >= 180 && h < 240) {
    rgb_ = [0, x, c]
  } else if (h >= 240 && h < 300) {
    rgb_ = [x, 0, c]
  } else {
    rgb_ = [c, 0, x]
  }

  let rgb = {
    r: (rgb_[0] + m) * 255,
    g: (rgb_[1] + m) * 255,
    b: (rgb_[2] + m) * 255,
  }

  // RGB to Hexadecimal
  return '#' + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b)
}

function componentToHex(c: number) {
  var hex = Math.floor(c).toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const playerSymbols = [
  '◆',
  '■',
  '●',
  '▲',
  '✖',
  '⬟',
  '☀',
  '☁',
  '☂',
  '☉',
  '☯',
  '✿',
  '✚',
  '♠',
  '♣',
  '♥',
  '♦',
  '✦',
  '⚑',
  '⚙',
  '⬢',
  '⬤',
  '⬧',
  '▣',
  '▤',
  '▥',
  '◈',
  '◍',
  '⧫',
]
