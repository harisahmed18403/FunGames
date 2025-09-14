<template>
  <main>
    <h1>Hello</h1>

    <div class="games">
      <RouterLink to="/tictactoe">Tic Tac Toe</RouterLink>
      <RouterLink to="/connect4">Connect 4</RouterLink>
    </div>
  </main>
</template>
<style scoped>
.games {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
