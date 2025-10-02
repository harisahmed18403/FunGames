<template>
  <div class="flex center">
    <h2 v-if="message">{{ message }}</h2>
    <h2 v-else>
      Player {{ currentPlayer + 1 }}
      <span :style="`color: ${playersStore.playerColor(currentPlayer)}`">{{
        playerSymbols[currentPlayer]
      }}</span>
      turn
    </h2>
  </div>
</template>
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
