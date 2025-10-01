<template>
  <div v-if="props.modalVisible" id="modalBg">
    <div class="modal">
      <div class="inner">
        <h2>Are you sure?</h2>
        <div class="flex between w-100">
          <button @click="emit('close')">Cancel</button>
          <button @click="emit('submit')">Yes</button>
        </div>
      </div>
    </div>
  </div>
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
  border-radius: var(--b-radius);
  width: 50vw;
  height: 40vh;
  animation: slideIn 0.4s forwards;
}

@keyframes slideIn {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modalVisible: Boolean
}>()

const emit = defineEmits(['close', 'submit'])
</script>
