<template>
  <main>
    <h1>2 Player Games</h1>

    <div class="flex center column gap-1">
      <template v-for="route in routes">
        <button v-if="route.name != 'Home'">
          <RouterLink :to="route.path" class="route">{{ route.name }}</RouterLink>
        </button>
      </template>
    </div>
  </main>
</template>
<style scoped></style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { routes } from '@/router'
</script>
