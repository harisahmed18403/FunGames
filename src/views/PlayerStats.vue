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

<style scoped></style>

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
