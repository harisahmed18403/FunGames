<template>
  <div id="board" :style="`--cols: ${props.board?.[0]?.length ?? 4}`">
    <template v-for="(row, rowIndex) in props.board" :key="rowIndex">
      <div
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}`"
        class="cell"
        @click="cellClicked(colIndex, rowIndex)"
      >
        <p v-if="cell > -1" :style="`color: ${playersStore.playerColor(cell)}`">
          {{ playerSymbols[cell] }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { usePlayers } from '@/stores/store'
import { playerSymbols } from '@/utils/generic'
const playersStore = usePlayers()

const props = defineProps<{
  board: number[][]
  pauseInput: boolean
}>()

const emit = defineEmits<{
  (e: 'cellClicked', col: number, row: number): void
}>()

const cellClicked = (col: number, row: number) => {
  if (props.pauseInput == true) {
    return
  }
  emit('cellClicked', col, row)
}
</script>
