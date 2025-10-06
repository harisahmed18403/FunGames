<template>
  <div id="board" :style="`--cols: ${props.board?.[0]?.length ?? 7};`">
    <template v-for="(row, rowIndex) in props.board">
      <div v-for="(cell, colIndex) in row" :key="`row-${rowIndex}-cell-${colIndex}`" class="cell">
        <p
          v-if="cell > -1"
          class="piece"
          :style="`background-color: ${playersStore.playerColor(cell)}`"
        >
          {{ playerSymbols[cell] }}
        </p>
        <div v-else-if="colIndex == hoverCol" :class="`${hoverClass(rowIndex, colIndex)}`"></div>
      </div>
    </template>
    <template v-for="col in cols">
      <div class="cell controls">
        <button
          @click="emit('columnClicked', col - 1)"
          @mouseover="hoverCol = col - 1"
          @mouseleave="hoverCol = null"
        >
          {{ col }}
        </button>
      </div>
    </template>
  </div>
</template>
<style scoped>
.piece {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  border: thin solid var(--tertiary-color);
  border-radius: 50%;
  width: 85%;
  height: 85%;
}

.piece.hover-col {
  background-color: var(--secondary-color);
  opacity: 0.4;
}

.cell.controls {
  background-color: var(--secondary-color);
}

.cell:hover {
  background-color: var(--primary-color);
}

button {
  padding: 0;
  margin: 0;
  min-width: 0px;
  border-radius: 0;
  width: 100%;
  height: 100%;
  font-weight: bold;
}
</style>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { usePlayers } from '@/stores/store'
import { playerSymbols } from '@/utils/generic'

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
    return 'piece hover-col'
  }
  return ''
}
</script>
