export const playerSymbols = [
  '♠',
  '♣',
  '♥',
  '♦',
  '✦',
  '✿',
  '✚',
  '⚑',
  '⚙',
  '⬢',
  '■',
  '●',
  '☯',
  '▲',
  '✖',
  '◆',
  '⬟',
  '☀',
  '☁',
  '☂',
  '☉',
  '⬤',
  '⬧',
  '▣',
  '▤',
  '▥',
  '◈',
  '◍',
  '⧫',
]

export const themes = [
  {
    name: 'Original',
    '--primary-color': '#f8fdff',
    '--secondary-color': '#aab3c4',
    '--tertiary-color': '#2b2d42',
    '--quaternary-color': '#ef233c',
    '--quinary-color': '#d90429',
  },
  {
    name: 'Calm & Minimal',
    '--primary-color': '#f0f4f8',
    '--secondary-color': '#c1c8d4',
    '--tertiary-color': '#3b3e5b',
    '--quaternary-color': '#ff6b6b',
    '--quinary-color': '#ff3b3b',
  },
  {
    name: 'Dark & Moody',
    '--primary-color': '#1e1e2f',
    '--secondary-color': '#7d8ca3',
    '--tertiary-color': '#e0e1dd',
    '--quaternary-color': '#ff5f5f',
    '--quinary-color': '#ff1e1e',
  },
  {
    name: 'Vibrant & Playful',
    '--primary-color': '#fffbe6',
    '--secondary-color': '#ffd166',
    '--tertiary-color': '#073b4c',
    '--quaternary-color': '#ef476f',
    '--quinary-color': '#06d6a0',
  },
  {
    name: 'Classic Game Feel',
    '--primary-color': '#ffffff',
    '--secondary-color': '#cccccc',
    '--tertiary-color': '#222222',
    '--quaternary-color': '#ff3c38',
    '--quinary-color': '#0077ff',
  },
  {
    name: 'Neon Arcade',
    '--primary-color': '#0f0f1a',
    '--secondary-color': '#1a1a2e',
    '--tertiary-color': '#e0e0e0',
    '--quaternary-color': '#39ff14',
    '--quinary-color': '#ff073a',
  },
  {
    name: 'Soft & Friendly',
    '--primary-color': '#f5f5f5',
    '--secondary-color': '#d9e3f0',
    '--tertiary-color': '#1f2a38',
    '--quaternary-color': '#ff7f50',
    '--quinary-color': '#4caf50',
  },
]

export const randomInteger = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const lowercaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(97 + i))

// Formula converted from https://www.rapidtables.com/convert/color/hsv-to-rgb.html
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
