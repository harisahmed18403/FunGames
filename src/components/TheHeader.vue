<template>
  <div class="flex center head pad-x-1 between">
    <RouterLink to="/">Home</RouterLink>

    <div class="flex row gap-2 no-wrap scroll-x">
      <p
        v-for="(stat, index) in playerStore.playerStatsTotals"
        :style="`color: ${playerStore.playerColor(index)};`"
        class="playerStat"
      >
        Player {{ index + 1 }} wins: {{ stat.wins }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.head {
  justify-content: space-around;
  background-color: var(--primary-color);
  color: var(--primary-color);
  height: 4rem;
  border: 0.1rem solid var(--tertiary-color);
  border-top: none;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0 0.1rem black;
}

.playerStat {
  font-size: small;
  background-color: var(--primary-color);
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePlayers } from '@/stores/store'

const playerStore = usePlayers()
</script>
