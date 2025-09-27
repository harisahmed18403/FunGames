<template>
  <div class="flex center head pad-x-1 between">
    <RouterLink to="/">Home</RouterLink>

    <div class="flex row gap-2 no-wrap scroll-x">
      <p
        v-for="(stat, index) in playerStore.playerStatsTotals"
        :style="`color: ${playerStore.playerColor(index)}`"
      >
        Player {{ index + 1 }} wins: {{ stat.wins }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.head {
  justify-content: space-around;
  background-color: var(--other-color);
  color: var(--b-color);
  height: 4rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePlayers } from '@/stores/store'

const playerStore = usePlayers()
</script>
