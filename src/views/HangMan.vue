<template>
  <main>
    <p>hangman</p>
    <button @click="setRandomWord">Get</button>
    <p>{{ currentWord }}</p>

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
  </main>
</template>
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
const maxTries = ref<number>(7)
const triesLeft = ref<number[]>([maxTries.value, maxTries.value])
const currentWord = ref<string[]>([])
const currentGuess = ref<string[]>([])
const attemptedLetters = ref<Record<string, boolean>>({})

// Player setup
const players = ['1', '2']
const currentPlayer = ref<number>(0)
const scoreStore = useScore()

onMounted(() => {
  setRandomWord()
})

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

  if (found === false) {
    triesLeft.value[currentPlayer.value] -= 1
    switchPlayer()
  }
}

function switchPlayer() {
  currentPlayer.value = (currentPlayer.value + 1) % players.length
}
</script>
