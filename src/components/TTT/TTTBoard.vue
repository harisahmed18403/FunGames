<template>
  <div>
    <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="row">
      <div
        v-for="(cell, colIndex) in row"
        :key="`cell-${colIndex}`"
        class="cell"
        @click="emit('cellClicked', colIndex, rowIndex)"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.row {
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
}

.cell:hover {
  background-color: #f0f0f0;
}
</style>
<script setup lang="ts">
const props = defineProps<{
  board: Array<Array<string>>
}>()

const emit = defineEmits<{
  (e: 'cellClicked', col: number, row: number): void
}>()
</script>
