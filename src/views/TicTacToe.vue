<template>
  <main>
    <div class="flex column center w-100 h-100">
      <CurrentPlayer :current-player="currentPlayer" :message="message" />
      <TTTBoard :board="board" :pause-input="pauseInput" @cellClicked="setCell" />
    </div>
    <div class="flex column center w-100 h-100 gap-1 mt-3">
      <div class="flex center gap-1">
        <button @click="decrementSize">-</button>
        <h4>Size: {{ size }}</h4>
        <button @click="incrementSize">+</button>
      </div>
      <button @click="openModal">Reset</button>
    </div>
    <ResetModal :modalVisible="modalVisible" @close="closeModal" @submit="submitModal" />
  </main>
</template>
<style scoped>
.grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  text-align: center;
}
</style>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

import { usePlayers } from '@/stores/store'
import CurrentPlayer from '@/components/CurrentPlayer.vue'
import TTTBoard from '@/components/TTT/TTTBoard.vue'
import ResetModal from '@/components/ResetModal.vue'

// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const pauseInput = ref<boolean>(false)

// Board setup
const size = ref(playersStore.numPlayers + 1)
const board = reactive<number[][]>([])

// Win/Tie message
const message = ref('')

const modalVisible = ref<boolean>(false)

onMounted(() => {
  resetBoard()
})

function openModal() {
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
}

function submitModal() {
  resetBoard()
  modalVisible.value = false
}
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
      playersStore.updateScore(currentPlayer.value)
      gameEnd(`Player ${currentPlayer.value + 1} wins!`)
      return
    } else if (checkTie()) {
      playersStore.updateScore(null)
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
  if (size.value < playersStore.maxPlayers + 1) {
    size.value++
    resetBoard()
  }
}

function decrementSize() {
  if (size.value > 3) {
    size.value--
    resetBoard()
  }
}
</script>
