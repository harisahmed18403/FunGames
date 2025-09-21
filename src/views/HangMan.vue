<template>
  <main>
    <div class="flex column center gap-3">
      <h1 v-if="message">{{ message }}</h1>
      <h1 v-else>Player {{ currentPlayer + 1 }}'s turn</h1>

      <HMBoard
        :guess="currentGuess"
        :tries-left-p1="triesLeft[0]"
        :tries-left-p2="triesLeft[1]"
        :max-tries="maxTries"
      />

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
  font-size: large;
  text-transform: capitalize;
  background-color: var(--other-color);
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useScore } from '@/stores/store'
import { getRandomWord } from '@/utils/api'
import { randomInteger, lowercaseLetters } from '@/utils/generic'

import HMBoard from '@/components/HM/HMBoard.vue'

// Game Settings
const wordLength = ref<{ minLen: number; maxLen: number }>({
  minLen: 3,
  maxLen: 7,
})
const maxTries = ref<number>(10)
const triesLeft = ref<number[]>([maxTries.value, maxTries.value])
const currentWord = ref<string[]>([])
const currentGuess = ref<string[]>([])
const attemptedLetters = ref<Record<string, boolean>>({})
const message = ref<string>('')

// Player setup
const players = ['1', '2']
const currentPlayer = ref<number>(0)
const scoreStore = useScore()

onMounted(() => {
  setRandomWord()
})

function setTries() {
  triesLeft.value = [maxTries.value, maxTries.value]
}

async function setRandomWord() {
  const length = randomInteger(wordLength.value.minLen, wordLength.value.maxLen)
  const response = await getRandomWord(length)
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
  currentPlayer.value = (currentPlayer.value + 1) % players.length
}
</script>
