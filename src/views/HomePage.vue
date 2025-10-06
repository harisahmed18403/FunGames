<template>
  <main>
    <div class="flex column center gap-3 mt-3 w-100">
      <div class="flex column center">
        <div class="flex center gap-1">
          <button
            @click="playersStore.removePlayer"
            :disabled="playersStore.numPlayers <= playersStore.minPlayers"
          >
            -
          </button>
          <FunHeader :text="String(playersStore.numPlayers)" />
          <button
            @click="playersStore.addPlayer"
            :disabled="playersStore.numPlayers >= playersStore.maxPlayers"
          >
            +
          </button>
        </div>
        <FunHeader text="Player Games" />
      </div>
      <div class="flex center column row gap-1 h-100">
        <RouterLink to="/tictactoe">Tic Tac Toe</RouterLink>
        <RouterLink to="/connect4">Connect4</RouterLink>
        <RouterLink to="/hangman">Hang-Man</RouterLink>
        <RouterLink to="/playerstats">Player Stats</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePlayers } from '@/stores/store'
import { playerSymbols } from '@/utils/generic'

import FunHeader from '@/components/FunHeader.vue'

const playersStore = usePlayers()
</script>
