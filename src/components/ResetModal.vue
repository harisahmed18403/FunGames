<template>
  <transition name="fade" mode="out-in">
    <div v-if="props.modalVisible" id="modalBg">
      <div class="modal">
        <div class="flex column gap-1">
          <h2>Are you sure?</h2>
          <div class="flex between w-100">
            <button @click="emit('close')">Cancel</button>
            <button @click="emit('submit')">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
#modalBg {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: var(--s01) solid var(--tertiary-color);
  border-radius: var(--b-radius);
  width: 80vw;
  height: 30vh;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
</style>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modalVisible: Boolean
}>()

const emit = defineEmits(['close', 'submit'])
</script>
