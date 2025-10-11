<template>
  <main>
    <div class="table-wrapper">
      <table id="overview">
        <thead>
          <tr>
            <th class="td-player">Player</th>
            <th class="td-game">Game</th>
            <th class="td-wins">Wins</th>
            <th class="td-losses">Losses</th>
            <th class="td-ties">Ties</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(player, index) in sortedStats" :key="player.id">
            <tr>
              <td
                rowspan="1 + Object.keys(player.playerStats).length"
                class="player-cell td-player"
                :style="`background-color: ${playerStore.playerColor(player.id)}`"
              >
                Player {{ player.id + 1 }}
              </td>
              <td class="td-game">Total</td>
              <td class="td-wins">{{ player.total.wins }}</td>
              <td class="td-losses">{{ player.total.losses }}</td>
              <td class="td-ties">{{ player.total.ties }}</td>
            </tr>

            <tr v-for="(gameStats, gameName) in player.playerStats" :key="gameName">
              <td class="td-player"></td>
              <td class="td-game">{{ gameName }}</td>
              <td class="td-wins">{{ gameStats.wins }}</td>
              <td class="td-losses">{{ gameStats.losses }}</td>
              <td class="td-ties">{{ gameStats.ties }}</td>
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
  height: 70vh;
  border: thin solid var(--tertiary-color);
}

#overview {
  border-collapse: collapse;
  font-family: var(--font-family, 'Roboto Mono', monospace);
  text-align: center;
}

.td-player {
  width: var(--s5);
}

.td-game {
  width: var(--s5);
}

.td-wins {
  width: var(--s5);
}

.td-losses {
  width: var(--s5);
}

.td-ties {
  width: var(--s5);
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
