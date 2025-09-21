<template>
  <div>
    <div class="flex column center">
      <div v-for="(row, rowIndex) in props.board" :key="`row-${rowIndex}`" class="flex">
        <div v-for="(cell, colIndex) in row" :key="`cell-${colIndex}`" class="cell">
          <div v-if="cell == '1'" class="piece piece-1"></div>
          <div v-else-if="cell == '2'" class="piece piece-2"></div>
        </div>
      </div>
      <div class="flex">
        <div v-for="col in cols" :key="`col-${col}`" class="flex column center">
          <div class="cell" style="border-color: white">
            <button @click="emit('columnClicked', col - 1)">{{ col }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cell {
  width: 4rem;
  height: 4rem;
  border: 1px solid black;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 0%;
}

.piece {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.piece-1 {
  background-color: var(--p1-color);
}

.piece-2 {
  background-color: var(--p2-color);
}

button {
  width: 4rem;
  height: 4rem;
  font-weight: bold;
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
