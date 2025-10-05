<template>
  <Transition name="slide-right">
    <div v-if="menuVisible" id="menuContainer" @click="handleCLickOutsideMenu">
      <div id="menu">
        <div class="flex" id="settings" style="justify-content: flex-end">
          <button @click="$emit('close')" class="small">X</button>
        </div>
        <h3>Select Theme:</h3>

        <div class="theme-options">
          <select v-model="selectedThemeIndex" @change="setTheme()">
            <option v-for="(theme, index) in themes" :value="index" :key="index">
              {{ theme.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
#menuContainer {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

#menu {
  width: 60vw;
  background: var(--primary-color, #fff);
  border-left: var(--s01) solid var(--tertiary-color);
  border-bottom-left-radius: var(--s01);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 0 var(--s01) 0 var(--s01);
}

#settings {
  display: flex;
  height: var(--s2);
  align-items: center;
}

.theme-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--tertiary-color);
}
</style>
<script setup lang="ts">
import { themes } from '@/utils/generic'
import { ref } from 'vue'

defineProps({
  menuVisible: Boolean,
})

const emit = defineEmits(['close'])

const selectedThemeIndex = ref(null)

const setTheme = () => {
  if (selectedThemeIndex.value == null) {
    return
  }
  const theme = (themes as any[])[selectedThemeIndex.value]
  const root = document.documentElement
  for (const key in theme) {
    if (key !== 'name') root.style.setProperty(key, theme[key])
  }
}

function handleCLickOutsideMenu(event: Event) {
  if (event.target == event.currentTarget) {
    emit('close')
  }
}
</script>
