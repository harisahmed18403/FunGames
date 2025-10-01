<template>
  <main>
    <div class="flex column center gap-3 w-100">
      <p v-if="message">{{ message }}</p>
      <p v-else>Player {{ currentPlayer + 1 }}'s turn</p>

      <HMBoard :guess="currentGuess" :tries-left="triesLeft" :max-tries="maxTries" />

      <div class="letters">
        <button
          @click="guessLetter(letter)"
          class="letter"
          v-for="letter in lowercaseLetters"
          :disabled="attemptedLetters[letter]"
        >
          {{ letter }}
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
.letters {
  display: flex;
  gap: 1rem;
  max-width: 40vw;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.letter {
  text-transform: uppercase;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useScore, usePlayers } from '@/stores/store'
import { getRandomWord } from '@/utils/api'
import { randomInteger, lowercaseLetters } from '@/utils/generic'

import HMBoard from '@/components/HM/HMBoard.vue'

// Game Settings
const wordLength = ref<{ minLen: number; maxLen: number }>({
  minLen: 3,
  maxLen: 7,
})
const maxTries = ref<number>(10)
const triesLeft = ref<number[]>([])
const currentWord = ref<string[]>([])
const currentGuess = ref<string[]>([])
const attemptedLetters = ref<Record<string, boolean>>({})
const message = ref<string>('')

// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const scoreStore = useScore()

onMounted(() => {
  setTries()
  setRandomWord()
})

function setTries() {
  triesLeft.value = [...Array(playersStore.numPlayers)].map((_, i) => maxTries.value)
}

async function setRandomWord() {
  const length = randomInteger(wordLength.value.minLen, wordLength.value.maxLen)
  const response = await getRandomWord(length)
  console.log(response)
  if (response && response.data) {
    currentWord.value = []
    currentGuess.value = []
    attemptedLetters.value = {}

    let word = response.data[0]

    for (const letter of word) {
      currentWord.value.push(letter)
      currentGuess.value.push('?')
    }
  }
}

function guessLetter(guessLetter: string) {
  attemptedLetters.value[guessLetter] = true
  let found = false
  currentWord.value.forEach((letter, i) => {
    if (letter == guessLetter) {
      currentGuess.value[i] = letter
      found = true
    }
  })

  let gameOver = checkWin()

  if (gameOver === true) {
    return
  }

  if (found === false) {
    triesLeft.value[currentPlayer.value] -= 1
    switchPlayer()
  }
}

function checkWin() {
  if (triesLeft.value[0] <= 0 && triesLeft.value[1] <= 0) {
    scoreStore.tieScore += 1
    displayMessage('Tie!')
    return true
  }

  let allMatch = true
  currentGuess.value.forEach((letter, index) => {
    if (letter !== currentWord.value[index]) {
      allMatch = false
    }
  })

  if (allMatch === true) {
    if (currentPlayer.value == 0) {
      scoreStore.player1Score += 1
      displayMessage('Player 1 wins!')
    } else {
      scoreStore.player2Score += 1
      displayMessage('Player 2 wins!')
    }
    return true
  }

  return false
}

function displayMessage(msg: string) {
  message.value = msg
  setTimeout(() => {
    message.value = ''
    setTries()
    setRandomWord()
  }, 2000)
}

function switchPlayer() {
  currentPlayer.value = (currentPlayer.value + 1) % playersStore.numPlayers
  // If player has no attempts left switch to the other
  while (triesLeft.value[currentPlayer.value] <= 0) {
    currentPlayer.value = (currentPlayer.value + 1) % playersStore.numPlayers
  }
}
</script>
