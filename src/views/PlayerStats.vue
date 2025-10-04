<template>
  <main>
    <div class="table-wrapper">
      <table id="overview">
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
            <td
              class="player-cell"
              :style="`background-color: ${playerStore.playerColor(stat.id)}`"
            >
              {{ stat.id + 1 }}
            </td>
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
.table-wrapper {
  padding: var(--s2);
  overflow-x: auto;
  max-width: 100%;
}

#overview {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-heading);
  text-align: center;
  box-shadow: 0 0 var(--s05) rgba(0, 0, 0, 0.1);
  border-radius: var(--s1);
  overflow: hidden;
  background-color: var(--background-color);
}

#overview th {
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  padding: 1 var(--s2);
  font-weight: bold;
  border-bottom: 2px solid var(--tertiary-color);
}

#overview td {
  padding: 1 var(--s2);
  background-color: var(--primary-color);
  border-bottom: 1px solid var(--tertiary-color);
  color: var(--tertiary-color);
}

#overview tr:last-child td {
  border-bottom: none;
}

.player-cell {
  color: var(--primary-color);
  font-weight: bold;
  border-radius: 0.4rem;
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
