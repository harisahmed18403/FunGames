<template>
  <div class="flex center head pad-x-1 between">
    <RouterLink to="/" class="small">Home</RouterLink>

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
  justify-content: space-between;
  gap: var(--s05);
  background-color: var(--primary-color);
  color: var(--primary-color);
  height: var(--s2);
  border: var(--s01) solid var(--tertiary-color);
  border-top: none;
  border-bottom-left-radius: var(--s05);
  border-bottom-right-radius: var(--s05);
  box-shadow: 0 var(--s01) black;
}

.playerStat {
  font-size: var(--font-size-small);
  background-color: var(--primary-color);
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePlayers } from '@/stores/store'

const playerStore = usePlayers()
</script>
