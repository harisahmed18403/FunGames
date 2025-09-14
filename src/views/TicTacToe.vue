<template>
  <div>
    <div class="header">
      <h2>Player {{ players[currentPlayer] }} turn</h2>
      <h2>{{ message }}</h2>
    </div>
    <div class="settings">
      <button @click="decrementSize">-</button>
      <span>Size: {{ size }}</span>
      <button @click="incrementSize">+</button>
    </div>
    <TTTBoard :board="board" @cellClicked="setCell" />
    <button @click="resetBoard">Reset</button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
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
const currentPlayer = ref(0)
const scoreStore = useScore()

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
}

function setCell(col: number, row: number) {
  if (board[row][col] === '') {
    board[row][col] = players[currentPlayer.value]
    if (checkWin()) {
      displayMessage(`Player ${currentPlayer.value} wins!`)
      resetBoard()
      if (currentPlayer.value === 0) {
        scoreStore.player1Score++
      } else {
        scoreStore.player2Score++
      }
      return
    } else if (checkTie()) {
      displayMessage(`Its a Tie!`)
      resetBoard()
      scoreStore.tieScore++
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

function displayMessage(msg: string) {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 2000)
  resetBoard()
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
