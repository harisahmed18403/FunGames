<template>
  <div>
    <div class="cell-container flex column center">
      <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="flex">
        <div v-for="(cell, colIndex) in row" :key="`cell-${colIndex}`" class="cell">
          <div v-if="cell == '1'" class="piece piece-1"></div>
          <div v-else-if="cell == '2'" class="piece piece-2"></div>
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
  opacity: 1;
}
.piece {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.piece.hover-col {
  background-color: var(--b-color);
  opacity: 0.4;
}

.piece-1 {
  background-color: var(--p1-color);
}

.piece-2 {
  background-color: var(--p2-color);
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

const hoverCol = ref<number | null>(null)

const props = defineProps<{
  board: Array<Array<string>>

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
    props.board[row][col] == '' &&
    (row == props.board.length - 1 || props.board[row + 1][col] !== '')
  ) {
    return 'hover-col'
  }
  return ''
}
</script>
