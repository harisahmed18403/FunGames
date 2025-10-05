<template>
  <main>
    <div id="mygrid">
      <div class="flex column center">
        <CurrentPlayer :current-player="currentPlayer" :message="message" />
      </div>

      <div class="flex column center">
        <HMBoard
          :guess="currentGuess"
          :tries-left="triesLeft"
          :max-tries="maxTries"
          :current-player="currentPlayer"
        />
      </div>

      <div class="flex column center">
        <div id="keyboard">
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
    </div>
  </main>
</template>
<style scoped>
#mygrid {
  display: grid;
  grid-template-rows: 1fr 3fr 2fr;
  width: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { usePlayers } from '@/stores/store'
import { getRandomWord } from '@/utils/api'
import { randomInteger, lowercaseLetters } from '@/utils/generic'

import HMBoard from '@/components/HM/HMBoard.vue'
import CurrentPlayer from '@/components/CurrentPlayer.vue'

// Game Settings
const wordLength = ref<{ minLen: number; maxLen: number }>({
  minLen: 3,
  maxLen: 7,
})
const maxTries = ref<number>(5)
const triesLeft = ref<number[]>([])
const currentWord = ref<string[]>([])
const currentGuess = ref<string[]>([])
const attemptedLetters = ref<Record<string, boolean>>({})

// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const message = ref<string>('')

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

  if (checkWin() === true) {
    return
  }

  if (found === false) {
    triesLeft.value[currentPlayer.value] -= 1
    switchPlayer()
  }
}

// Return true is the game has ended, false otherwise
function checkWin() {
  const total = triesLeft.value.reduce((a, b) => a + b, 0)
  if (total <= 0) {
    playersStore.updateScore(null)
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
    playersStore.updateScore(currentPlayer.value)
    displayMessage(`Player ${currentPlayer.value + 1} wins!`)
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
  let nextPlayer = (currentPlayer.value + 1) % playersStore.numPlayers
  // If player has no attempts left switch to the other
  while (triesLeft.value[nextPlayer] <= 0) {
    if ((nextPlayer = currentPlayer.value)) {
      return
    }
    nextPlayer = (currentPlayer.value + 1) % playersStore.numPlayers
  }

  currentPlayer.value = nextPlayer
}
</script>
