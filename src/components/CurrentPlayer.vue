<template>
  <div class="flex gap-1">
    <h2 v-if="message">{{ message }}</h2>
    <template v-else>
      <div>
        <h2>Player {{ currentPlayer + 1 }}</h2>
      </div>
      <div
        class="character char-shadow"
        :style="`color: ${playersStore.playerColor(currentPlayer)}`"
      >
        {{ playerSymbols[currentPlayer] }}
      </div>
      <div>
        <h2>turn</h2>
      </div>
    </template>
  </div>
</template>
<style scoped>
.character {
  font-size: var(--font-size-heading);
  width: 2ch;
  height: 2ch;
  text-align: center;
}
</style>
<script setup lang="ts">
import { defineProps } from 'vue'
import { playerSymbols } from '@/utils/generic'
import { usePlayers } from '@/stores/store'

const playersStore = usePlayers()
const props = defineProps<{
  currentPlayer: number
  message: string
}>()
</script>
