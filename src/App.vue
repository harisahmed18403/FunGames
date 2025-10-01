<template>
  <TheHeader />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Transition } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
</script>
