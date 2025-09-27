import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { routes } from '@/router'

import type { RouteRecordNameGeneric } from 'vue-router'

import { hsvToHex, mapRangeFromRangeTo } from '@/utils/generic'

export const useScore = defineStore('score', () => {
  const player1Score = ref(0)
  const player2Score = ref(0)
  const tieScore = ref(0)

  return { player1Score, player2Score, tieScore }
})

interface Stat {
  wins: number
  losses: number
  ties: number
}

interface PlayerStat {
  [routeName: string]: Stat
}

export const usePlayers = defineStore('players', () => {
  const numPlayers = ref<number>(2)
  const playerStats = ref<PlayerStat[]>([])
  const playerColors = ref<Array<string>>([])

  const playerStatsTotals = computed(() =>
    playerStats.value.map((playerStat: PlayerStat) => {
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

  watch(
    () => numPlayers.value,
    (newNumPlayers) => {
      playerStats.value = []
      for (let i = 0; i < newNumPlayers; i++) {
        const stat: PlayerStat = {}

        for (const route of routes) {
          if (route.name) {
            stat[String(route.name)] = {
              wins: 0,
              losses: 0,
              ties: 0,
            }
          }
        }

        playerStats.value.push(stat)
      }

      playerColors.value = getPlayerColors(newNumPlayers)
    },
    { immediate: true },
  )

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
    return playerColors.value[player]
  }

  return { numPlayers, playerStats, playerStatsTotals, winningPlayer, updateScore, playerColor }
})

function getPlayerColors(numPlayers: number) {
  return [...Array(numPlayers)].map((_, i) => hsvToHex((i * 360) / numPlayers, 0.5, 0.6))
}
