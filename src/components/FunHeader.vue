<template>
  <div class="flex">
    <h2 v-for="letter in text" class="funHeader" v-html="getLetter(letter)"></h2>
  </div>
</template>
<style scoped>
.funHeader {
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}
.funHeader:hover {
  color: var(--quinary-color);
  transform: translateY(calc(-1 * var(--s05)));
}
</style>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  text: string
}>()

function getLetter(letter: string) {
  if (letter == ' ') {
    return '&nbsp;'
  }
  return letter
}
</script>
