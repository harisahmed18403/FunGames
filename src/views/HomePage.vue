<template>
  <main>
    <div id="title" class="flex column center gap-3">
      <div class="flex column center">
        <div class="flex center gap-1">
          <button
            @click="playersStore.removePlayer"
            :disabled="playersStore.numPlayers <= playersStore.minPlayers"
          >
            -
          </button>
          <h1>{{ playersStore.numPlayers }}</h1>
          <button
            @click="playersStore.addPlayer"
            :disabled="playersStore.numPlayers >= playersStore.maxPlayers"
          >
            +
          </button>
        </div>
        <h2>Player Games</h2>
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
import { routes } from '@/router'
import { usePlayers } from '@/stores/store'

const playersStore = usePlayers()
</script>
