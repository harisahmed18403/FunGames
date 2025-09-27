<template>
  <div>
    <div class="cell-container flex column center">
      <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="flex">
        <div v-for="(cell, colIndex) in row" :key="`cell-${colIndex}`" class="cell">
          <div
            v-if="cell > -1"
            class="piece"
            :style="`background-color: ${playersStore.playerColor(cell)}`"
          >
            <p>{{ uppercaseLetters[cell] }}</p>
          </div>
          <div
            v-else-if="colIndex == hoverCol"
            :class="`piece ${hoverClass(rowIndex, colIndex)}`"
          ></div>
        </div>
      </div>
      <div class="flex mt-1">
        <div v-for="col in cols" :key="`col-${col}`" class="flex column center">
          <div class="cell controls">
            <button
              @click="emit('columnClicked', col - 1)"
              @mouseover="hoverCol = col - 1"
              @mouseleave="hoverCol = null"
            >
              {{ col }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cell:hover {
  background-color: var(--other-color);
}
.piece {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--other-color);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.piece.hover-col {
  background-color: var(--b-color);
  opacity: 0.4;
}

.cell.controls {
  background-color: var(--b-color);
}

button {
  width: 4rem;
  height: 4rem;
  font-weight: bold;
}
</style>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { usePlayers } from '@/stores/store'
import { uppercaseLetters } from '@/utils/generic'

const playersStore = usePlayers()

const hoverCol = ref<number | null>(null)

const props = defineProps<{
  board: number[][]

  pauseInput: boolean
}>()

const cols = computed(() => {
  return props.board.length > 0 ? props.board[0].length : 0
})

const emit = defineEmits<{
  (e: 'columnClicked', col: number): void
}>()

const hoverClass = (row: number, col: number) => {
  if (props.pauseInput == true) {
    return ''
  }
  if (
    props.board[row][col] == -1 &&
    (row == props.board.length - 1 || props.board[row + 1][col] !== -1)
  ) {
    return 'hover-col'
  }
  return ''
}
</script>
