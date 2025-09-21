<template>
  <div class="flex center head">
    <RouterLink to="/" class="route">Home</RouterLink>

    <p class="p1">Player 1 wins: {{ scoreStore.player1Score }}</p>
    <p class="p2">Player 2 wins: {{ scoreStore.player2Score }}</p>
    <p>Ties: {{ scoreStore.tieScore }}</p>
  </div>
</template>
<style scoped>
.head {
  justify-content: space-around;
  background-color: var(--other-color);
  color: var(--b-color);
  height: 4rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useScore } from '@/stores/store'

const scoreStore = useScore()
</script>
