<template>
  <main>
    <div>
      <div class="flex center column">
        <CurrentPlayer :current-player="currentPlayer" :message="message" />
        <C4Board :board="board" :pause-input="pauseInput" @column-clicked="addPiece" />
        <button @click="resetBoard">Reset Board</button>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayers } from '@/stores/store'
import C4Board from '@/components/C4/C4Board.vue'
import CurrentPlayer from '@/components/CurrentPlayer.vue'

// Board setup
const minRows = 6
const minCols = 7
const rows = ref<number>(minRows)
const cols = ref<number>(minCols)
const board = ref<number[][]>([])

// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const pauseInput = ref<boolean>(false)
const message = ref('')

const router = useRouter()

onMounted(() => {
  resetBoard()
})

function resetBoard() {
  board.value = []
  for (let r = 0; r < rows.value; r++) {
    const row: number[] = []
    for (let c = 0; c < cols.value; c++) {
      row.push(-1)
    }
    board.value.push(row)
  }
  pauseInput.value = false
}

function addPiece(col: number) {
  if (pauseInput.value == true) {
    return
  }
  for (let r = rows.value - 1; r >= 0; r--) {
    if (board.value[r][col] === -1) {
      board.value[r][col] = currentPlayer.value
      if (checkWin(r, col)) {
        playersStore.updateScore(currentPlayer.value, router.currentRoute.value.name)
        displayMessage(`Player ${currentPlayer.value + 1} wins!`)
      } else if (isBoardFull()) {
        playersStore.updateScore(null, router.currentRoute.value.name)
        displayMessage("It's a tie!")
      } else {
        switchPlayer()
      }
      return
    }
  }
}

function isBoardFull() {
  return board.value.every((row) => row.every((cell) => cell !== -1))
}

function checkWin(row: number, col: number) {
  const directions = [
    { dr: 0, dc: 1 }, // Horizontal
    { dr: 1, dc: 0 }, // Vertical
    { dr: 1, dc: 1 }, // Diagonal
    { dr: 1, dc: -1 }, // Diagonal
  ]
  const playerSymbol = board.value[row][col]

  for (const { dr, dc } of directions) {
    let count = 1

    // Check in the positive direction
    for (let step = 1; step < 4; step++) {
      const r = row + dr * step
      const c = col + dc * step
      if (
        r < 0 ||
        r >= rows.value ||
        c < 0 ||
        c >= cols.value ||
        board.value[r][c] !== playerSymbol
      ) {
        break
      }
      count++
    }

    // Check in the negative direction
    for (let step = 1; step < 4; step++) {
      const r = row - dr * step
      const c = col - dc * step
      if (
        r < 0 ||
        r >= rows.value ||
        c < 0 ||
        c >= cols.value ||
        board.value[r][c] !== playerSymbol
      ) {
        break
      }
      count++
    }

    if (count >= 4) {
      return true
    }
  }
  return false
}

function switchPlayer() {
  currentPlayer.value = (currentPlayer.value + 1) % playersStore.numPlayers
}

function displayMessage(msg: string) {
  message.value = msg
  pauseInput.value = true
  setTimeout(() => {
    message.value = ''
    resetBoard()
  }, 3000)
}
</script>
