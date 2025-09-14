import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScore = defineStore('score', () => {
  const player1Score = ref(0)
  const player2Score = ref(0)
  const tieScore = ref(0)

  return { player1Score, player2Score, tieScore }
})
