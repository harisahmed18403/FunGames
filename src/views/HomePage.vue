<template>
  <main>
    <div class="flex center row gap-1">
      <button @click="playersStore.numPlayers--">-</button>
      <h1>{{ playersStore.numPlayers }}</h1>
      <button @click="playersStore.numPlayers++">+</button>
      <h1>Player Games</h1>
    </div>

    <div class="flex center column gap-1">
      <template v-for="route in routes">
        <RouterLink v-if="route.ignore !== true" :to="route.path">{{ route.name }}</RouterLink>
      </template>
    </div>
  </main>
</template>
<style scoped></style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { routes } from '@/router'
import { usePlayers } from '@/stores/store'

const playersStore = usePlayers()
</script>
