<template>
  <main class="flex gap-2">
    <div class="flex between center">
      <h2 v-if="message">{{ message }}</h2>
      <h2 v-else>Player {{ currentPlayer + 1 }} turn</h2>
    </div>
    <div class="flex gap-1 center">
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
import { useRouter } from 'vue-router'

import { usePlayers } from '@/stores/store'
import TTTBoard from '@/components/TTT/TTTBoard.vue'

// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const pauseInput = ref<boolean>(false)

// Board setup
const minSize = 3
const size = ref(playersStore.numPlayers + 1)
const board = reactive<number[][]>([])

// Win/Tie message
const message = ref('')

const router = useRouter()

onMounted(() => {
  resetBoard()
  console.log(playersStore.playerStats)
})

function resetBoard() {
  board.length = 0
  for (let r = 0; r < size.value; r++) {
    const row: number[] = []
    for (let c = 0; c < size.value; c++) {
      row.push(-1)
    }
    board.push(row)
  }
  pauseInput.value = false
}

function setCell(col: number, row: number) {
  if (board[row][col] === -1) {
    board[row][col] = currentPlayer.value
    if (checkWin()) {
      playersStore.updateScore(currentPlayer.value, router.currentRoute.value.name)
      gameEnd(`Player ${currentPlayer.value + 1} wins!`)
      return
    } else if (checkTie()) {
      playersStore.updateScore(null, router.currentRoute.value.name)
      gameEnd(`Its a Tie!`)
      return
    }
    switchPlayer()
  }
}

function checkWin() {
  // Check rows
  for (let r = 0; r < size.value; r++) {
    if (board[r].every((cell) => cell === currentPlayer.value)) {
      return true
    }
  }

  // Check columns
  for (let c = 0; c < size.value; c++) {
    if (board.every((row) => row[c] === currentPlayer.value)) {
      return true
    }
  }

  // Check diagonals
  if (board.every((row, idx) => row[idx] === currentPlayer.value)) {
    return true
  }
  if (board.every((row, idx) => row[size.value - 1 - idx] === currentPlayer.value)) {
    return true
  }

  return false
}

function checkTie() {
  return board.flat().every((cell) => cell !== -1)
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
  currentPlayer.value = (currentPlayer.value + 1) % playersStore.numPlayers
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
