<template>
  <div class="head flex center pad-x-1 between">
    <RouterLink to="/" class="small">Home</RouterLink>

    <button @click="showSideMenu" class="small">Settings</button>
    <SideMenu :menu-visible="menuVisible" @close="hideSideMenu" />
  </div>
</template>
<style scoped>
.head {
  gap: var(--s05);
  background-color: var(--primary-color);
  color: var(--primary-color);
  height: var(--s2);
  border: var(--s01) solid var(--tertiary-color);
  border-top: none;
  border-bottom-left-radius: var(--s05);
  border-bottom-right-radius: var(--s05);
  box-shadow: 0 var(--s01) black;
}

.playerStat {
  font-size: var(--font-size-small);
  background-color: var(--primary-color);
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import SideMenu from './SideMenu.vue'

const menuVisible = ref<boolean>(false)
const menuRef = ref<HTMLElement | null>(null)

function showSideMenu() {
  menuVisible.value = true
}

function hideSideMenu() {
  menuVisible.value = false
}
</script>
