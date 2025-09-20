import axios from 'axios'

export const getRandomWord = (length = 5) => {
  return axios.get(`${import.meta.env.VITE_RANDOM_WORD_API}/word`, {
    params: { length: length },
  })
}
