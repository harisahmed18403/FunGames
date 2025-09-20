<template>
  <div class="flex column center gap-3">
    <div class="flex row between first-baseline">
      <div class="hangman flex column">
        <p>{{ triesLeftP1 }}</p>
        <div class="flex row" v-for="i in p1HmanStage" :key="i">
          <span v-for="j in hman[0].length" :key="j">{{ hman[i - 1][j - 1] }}</span>
        </div>
      </div>
      <div class="hangman flex column">
        <p>{{ triesLeftP2 }}</p>
        <div class="flex row" v-for="i in p2HmanStage" :key="i">
          <span v-for="j in hman[0].length" :key="j">{{ hman[i - 1][j - 1] }}</span>
        </div>
      </div>
    </div>
    <div class="flex gap-2">
      <div v-for="(letter, i) in props.guess" class="letter">
        <p>{{ letter }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.letter {
  font-size: large;
  border-bottom: thin solid black;
}

.hangman {
  font-size: large;
}

.hangman span {
  padding: 0%;
  margin: 0;
  width: 1ch;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  guess: {
    type: Array<String>,
    required: true,
  },
  triesLeftP1: {
    type: Number,
    required: true,
  },
  triesLeftP2: {
    type: Number,
    required: true,
  },
  maxTries: {
    type: Number,
    required: true,
  },
})

const hman = ref<Array<Array<String>>>([
  ['_', '_', '_', '_', '', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '', 'O', '', '', ''],
  ['|', '', '/', '|', '\\', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '/', '', '\\', '', ''],
  ['_', '_', '_', '_', '_', '_', '_'],
])

const p1HmanStage = ref<number>(0)
const p2HmanStage = ref<number>(0)

watch(
  () => props.triesLeftP1,
  (newTriesLeft) => {
    p1HmanStage.value = getHmanStage(newTriesLeft)
  },
  { immediate: true },
)

watch(
  () => props.triesLeftP2,
  (newTriesLeft) => {
    p2HmanStage.value = getHmanStage(newTriesLeft)
  },
  { immediate: true },
)

// Return the 'stage' at which teh hman is at
function getHmanStage(triesLeft: number) {
  let result = props.maxTries / triesLeft
  result = Math.max(0, Math.min(hman.value.length - 1, result))
  return Math.floor(result)
}
</script>
