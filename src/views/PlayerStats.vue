<template>
  <main>
    <div class="table-wrapper">
      <table id="overview">
        <thead>
          <tr>
            <th>Player</th>
            <th>Game</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(player, index) in sortedStats" :key="player.id">
            <tr>
              <td
                rowspan="1 + Object.keys(player.playerStats).length"
                class="player-cell"
                :style="`background-color: ${playerStore.playerColor(player.id)}`"
              >
                Player {{ player.id + 1 }}
              </td>
              <td>Total</td>
              <td>{{ player.total.wins }}</td>
              <td>{{ player.total.losses }}</td>
              <td>{{ player.total.ties }}</td>
            </tr>

            <tr v-for="(gameStats, gameName) in player.playerStats" :key="gameName">
              <td></td>
              <td>{{ gameName }}</td>
              <td>{{ gameStats.wins }}</td>
              <td>{{ gameStats.losses }}</td>
              <td>{{ gameStats.ties }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </main>
</template>
<style scoped>
.table-wrapper {
  display: flex;
  overflow-y: auto;
}

#overview {
  border-collapse: collapse;
  font-family: var(--font-family, 'Roboto Mono', monospace);
  text-align: center;
}

#overview th,
#overview td {
  padding: var(--s05);
  border: var(--s01) solid var(--tertiary-color);
}

#overview th {
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  text-transform: uppercase;
}

#overview td {
  color: var(--tertiary-color);
  background-color: var(--primary-color);
}

.player-cell {
  font-weight: bold;
  color: var(--primary-color);
  border-radius: var(--b-radius);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayers } from '@/stores/store'

const playerStore = usePlayers()

const sortedStats = computed(() => {
  return Object.entries(playerStore.playerStats)
    .map(([id, stats]) => {
      const playerStats = stats // object with per-game stats
      const total = Object.values(stats).reduce(
        (acc, s) => ({
          wins: acc.wins + s.wins,
          losses: acc.losses + s.losses,
          ties: acc.ties + s.ties,
        }),
        { wins: 0, losses: 0, ties: 0 },
      )

      return {
        id: Number(id),
        playerStats,
        total,
      }
    })
    .sort((a, b) => b.total.wins - a.total.wins)
})
</script>
