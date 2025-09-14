<template>
  <div class="head">
    <RouterLink to="/">Home</RouterLink>
    <p>Player 1 wins: {{ scoreStore.player1Score }}</p>
    <p>Player 2 wins: {{ scoreStore.player2Score }}</p>
    <p>Ties: {{ scoreStore.tieScore }}</p>
  </div>
</template>
<style scoped>
.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useScore } from '@/stores/store'

const scoreStore = useScore()
</script>
