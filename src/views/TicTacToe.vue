<template>
  <main class="flex gap-2">
    <div class="flex between center">
      <h2 v-if="message">{{ message }}</h2>
      <h2 v-else>Player {{ players[currentPlayer] }} turn</h2>
    </div>
    <div class="flex gap-1">
      <button @click="decrementSize">-</button>
      <span>Size: {{ size }}</span>
      <button @click="incrementSize">+</button>
    </div>
    <TTTBoard :board="board" :pause-input="pauseInput" @cellClicked="setCell" />
    <button @click="resetBoard">Reset</button>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

import { useScore } from '@/stores/store'
import TTTBoard from '@/components/TTT/TTTBoard.vue'

// Board setup
const minSize = 3
const size = ref(minSize)
const board = reactive<string[][]>([])

// Player setup
const players = ['X', 'O']
const currentPlayer = ref<number>(0)
const scoreStore = useScore()
const pauseInput = ref<boolean>(false)

// Win/Tie message
const message = ref('')

onMounted(() => {
  resetBoard()
})

function resetBoard() {
  board.length = 0
  for (let r = 0; r < size.value; r++) {
    const row: string[] = []
    for (let c = 0; c < size.value; c++) {
      row.push('')
    }
    board.push(row)
  }
  pauseInput.value = false
}

function setCell(col: number, row: number) {
  if (board[row][col] === '') {
    board[row][col] = players[currentPlayer.value]
    if (checkWin()) {
      if (currentPlayer.value === 0) {
        scoreStore.player1Score++
      } else {
        scoreStore.player2Score++
      }
      gameEnd(`Player ${currentPlayer.value} wins!`)
      return
    } else if (checkTie()) {
      scoreStore.tieScore++
      gameEnd(`Its a Tie!`)
      return
    }
    switchPlayer()
  }
}

function checkWin() {
  // Check rows
  for (let r = 0; r < size.value; r++) {
    if (board[r].every((cell) => cell === players[currentPlayer.value])) {
      return true
    }
  }

  // Check columns
  for (let c = 0; c < size.value; c++) {
    if (board.every((row) => row[c] === players[currentPlayer.value])) {
      return true
    }
  }

  // Check diagonals
  if (board.every((row, idx) => row[idx] === players[currentPlayer.value])) {
    return true
  }
  if (board.every((row, idx) => row[size.value - 1 - idx] === players[currentPlayer.value])) {
    return true
  }

  return false
}

function checkTie() {
  return board.flat().every((cell) => cell !== '')
}

function gameEnd(msg: string) {
  message.value = msg
  pauseInput.value = true
  setTimeout(() => {
    message.value = ''
    resetBoard()
  }, 3000)
}

function switchPlayer() {
  currentPlayer.value = (currentPlayer.value + 1) % players.length
}

function incrementSize() {
  size.value++
  resetBoard()
}

function decrementSize() {
  if (size.value > minSize) {
    size.value--
    resetBoard()
  }
}
</script>
