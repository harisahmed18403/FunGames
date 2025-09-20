<template>
  <main>
    <h1>2 Player Games</h1>

    <div class="flex center column gap-1">
      <RouterLink v-for="route in routes" :to="route.path">{{ route.name }}</RouterLink>
    </div>
  </main>
</template>
<style scoped></style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { routes } from '@/router'
</script>
