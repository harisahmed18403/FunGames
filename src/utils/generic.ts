export const randomInteger = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const lowercaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(97 + i))

export const uppercaseLetters = [...Array(13)].map((_, i) => String.fromCharCode(90 - 2 * i))
