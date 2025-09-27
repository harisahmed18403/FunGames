<template>
  <main>
    <div class="">
      <table id="overView">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stat, index) in sortedStats" :key="stat.id">
            <td>#{{ index + 1 }}</td>
            <td :style="`color: ${playerStore.playerColor(stat.id)}`">{{ stat.id + 1 }}</td>
            <td>{{ stat.wins }}</td>
            <td>{{ stat.losses }}</td>
            <td>{{ stat.ties }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<style scoped>
#overView {
  table-layout: fixed;
  border-collapse: collapse;
  text-align: center;
  font-size: 2rem;
}

#overView th,
#overView td {
  padding: 1rem;
  border: thin solid var(--other-color);
}

#overView td {
  background-color: var(--other-color);
  border: thin solid var(--b-color);
  color: var(--b-color);
}

#overView tr:last-of-type td:first-child {
  border-bottom-left-radius: 1rem;
}

#overView tr:last-of-type td:last-child {
  border-bottom-right-radius: 1rem;
}
</style>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlayers } from '@/stores/store'
const playerStore = usePlayers()

const sortedStats = computed(() => {
  return Object.entries(playerStore.playerStatsTotals)
    .map(([id, stats]) => ({ id: Number(id), ...stats }))
    .sort((a, b) => b.wins - a.wins) // descending by wins
})
</script>
