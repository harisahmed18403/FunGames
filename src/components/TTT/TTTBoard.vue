<template>
  <div class="cell-container">
    <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="flex">
      <div
        v-for="(cell, colIndex) in row"
        :key="`cell-${colIndex}`"
        :class="`cell ${cellClass(cell)}`"
        @click="cellClicked(colIndex, rowIndex)"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  board: Array<Array<string>>
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
const cellClass = (cell: string) => {
  console.log(cell)
  if (cell == 'X') {
    return 'p1'
  } else if (cell == 'O') {
    return 'p2'
  }
  return ''
}
</script>
