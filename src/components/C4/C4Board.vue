<template>
  <div>
    <div class="board">
      <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="row">
        <div v-for="(cell, colIndex) in row" :key="`cell-${colIndex}`" class="cell">
          <div v-if="cell == '1'" class="piece piece-1"></div>
          <div v-else-if="cell == '2'" class="piece piece-2"></div>
        </div>
      </div>
    </div>
    <div class="controls">
      <div
        v-for="col in cols"
        :key="`col-${col}`"
        class="control"
        @click="emit('columnClicked', col - 1)"
      >
        <p>{{ col }}</p>
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
}

.piece {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.piece-1 {
  background-color: var(--p1-color);
}

.piece-2 {
  background-color: var(--p2-color);
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.control {
  width: 50px;
  height: 40px;
  border: 1px solid black;
  text-align: center;
  font-weight: bold;
  align-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  board: Array<Array<string>>
}>()

const cols = computed(() => {
  return props.board[0]?.length || 0
})

const emit = defineEmits<{
  (e: 'columnClicked', col: number): void
}>()
</script>
