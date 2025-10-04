import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { routes } from '@/router'

import type { RouteRecordNameGeneric } from 'vue-router'

import { hsvToHex } from '@/utils/generic'

export const useScore = defineStore('score', () => {
  const player1Score = ref(0)
  const player2Score = ref(0)
  const tieScore = ref(0)

  return { player1Score, player2Score, tieScore }
})

export interface Stat {
  wins: number
  losses: number
  ties: number
}

export interface PlayerStat {
  [routeName: string]: Stat
}

export const usePlayers = defineStore('players', () => {
  const minPlayers = 2
  const maxPlayers = 9
  const numPlayers = ref<number>(3)
  const playerStats = ref<PlayerStat[]>([])
  const playerColors = getPlayerColors(maxPlayers)

  const addPlayer = () => {
    if (numPlayers.value < maxPlayers) {
      numPlayers.value++
    }
  }

  const removePlayer = () => {
    if (numPlayers.value > minPlayers) {
      numPlayers.value--
    }
  }

  watch(
    () => numPlayers.value,
    (newNumPlayers) => {
      setPlayerStats(newNumPlayers)
    },
    { immediate: true },
  )

  function setPlayerStats(numPlayers: number) {
    let newPlayerStats = []
    // Game stats
    for (let i = 0; i < numPlayers; i++) {
      // Retain exiting players info

      if (playerStats.value[i] !== undefined) {
        newPlayerStats.push(playerStats.value[i])
      } else {
        const stat: PlayerStat = {}

        for (const route of routes) {
          if (route.name && !route.ignore) {
            stat[String(route.name)] = {
              wins: 0,
              losses: 0,
              ties: 0,
            }
          }
        }
        newPlayerStats.push(stat)
      }
    }

    playerStats.value = newPlayerStats
  }

  const playerStatsTotals = computed(() =>
    playerStats.value.map((playerStat: PlayerStat, player: number) => {
      let total: Stat = {
        wins: 0,
        losses: 0,
        ties: 0,
      }

      for (const key in playerStat) {
        const stat = playerStat[key]
        total.wins += stat.wins
        total.losses += stat.losses
        total.ties += stat.ties
      }

      return total
    }),
  )

  const winningPlayer = computed(() => {
    return playerStatsTotals.value.reduce((top: Stat, current: Stat) => {
      return current.wins > top.wins ? current : top
    })
  })

  const updateScore = (winningPlayer: number | null, routeName: RouteRecordNameGeneric) => {
    if (winningPlayer === null) {
      playerStats.value.forEach((stat: PlayerStat) => {
        stat[String(routeName)].ties++
      })
    } else {
      playerStats.value.forEach((stat: PlayerStat, player: number) => {
        if (player === winningPlayer) {
          stat[String(routeName)].wins++
        } else {
          stat[String(routeName)].losses++
        }
      })
    }
  }

  const playerColor = (player: number) => {
    return playerColors[player] ?? 'black'
  }

  return {
    numPlayers,
    minPlayers,
    maxPlayers,
    addPlayer,
    removePlayer,
    playerStats,
    playerStatsTotals,
    winningPlayer,
    updateScore,
    playerColor,
  }
})

// Gives a hex color based on teh number of players, is deterministic so the same colors for teh same players come each time
function getPlayerColors(numPlayers: number) {
  return [...Array(numPlayers)].map((_, i) => hsvToHex((i * 360) / numPlayers, 0.5, 0.9))
}
