<template>
  <main>
    <div class="header">
      <h2>Player {{ currentPlayer }} turn</h2>
      <h2>{{ message }}</h2>
    </div>
    <C4Board :board="board" @column-clicked="addPiece" />
    <button @click="resetBoard">Reset Board</button>
  </main>
</template>
<style scoped></style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScore } from '@/stores/store'
import C4Board from '@/components/C4/C4Board.vue'

// Board setup
const minRows = 6
const minCols = 7

const rows = ref(minRows)
const cols = ref(minCols)
const board = ref<string[][]>([])

// Player setup
const currentPlayer = ref(0)
const scoreStore = useScore()
const message = ref('')

onMounted(() => {
  resetBoard()
})

function resetBoard() {
  board.value = []
  for (let r = 0; r < rows.value; r++) {
    const row: string[] = []
    for (let c = 0; c < cols.value; c++) {
      row.push('')
    }
    board.value.push(row)
  }
}

function addPiece(col: number) {
  for (let r = rows.value - 1; r >= 0; r--) {
    if (board.value[r][col] === '') {
      board.value[r][col] = currentPlayer.value === 0 ? '1' : '2'
      if (checkWin(r, col)) {
        displayMessage(`Player ${currentPlayer.value} wins!`)
        if (currentPlayer.value === 0) {
          scoreStore.player1Score++
        } else {
          scoreStore.player2Score++
        }
        resetBoard()
      } else if (isBoardFull()) {
        displayMessage("It's a tie!")
        scoreStore.tieScore++
        resetBoard()
      } else {
        currentPlayer.value = 1 - currentPlayer.value
      }
      return
    }
  }
}

function isBoardFull() {
  return board.value.every((row) => row.every((cell) => cell !== ''))
}

function checkWin(row: number, col: number) {
  const directions = [
    { dr: 0, dc: 1 }, // Horizontal
    { dr: 1, dc: 0 }, // Vertical
    { dr: 1, dc: 1 }, // Diagonal /
    { dr: 1, dc: -1 }, // Diagonal \
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

function displayMessage(msg: string) {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 2000)
  resetBoard()
}
</script>
