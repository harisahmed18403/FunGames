<template>
  <div class="flex column center gap-3">
    <div class="flex row between first-baseline gap-3">
      <div class="hangman flex column center p1">
        <p>Player 1: {{ triesLeftP1 }} attempts left</p>
        <div class="flex row" v-for="i in p1HmanStage" :key="i">
          <span v-for="j in hman[0].length" :key="j">{{ hman[i - 1][j - 1] }}</span>
        </div>
      </div>
      <div class="hangman flex column center p2">
        <p>Player 2: {{ triesLeftP2 }} attempts left</p>
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
  border: thin solid #ddd;
  padding: 5rem;
  background-color: #ddd;
}

.hangman.active {
  background-color: white;
}

.hangman span {
  padding: 0%;
  margin: 0;
  width: 1ch;
  height: 2ch;
  font-weight: 900;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

// Char array representing hang man
// Each index is a 'stage'
const hman = ref<Array<Array<String>>>([
  ['_', '_', '_', '_', '', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '', 'O', '', '', ''],
  ['|', '', '/', '|', '\\', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '/', '', '\\', '', ''],
  ['_', '_', '_', '_', '_', '_', '_'],
])

const p1HmanStage = computed(() => {
  return getHmanStage(props.triesLeftP1)
})

const p2HmanStage = computed(() => {
  return getHmanStage(props.triesLeftP2)
})

// Return the 'stage' at which the hman is at
function getHmanStage(triesLeft: number) {
  let percent = triesLeft / props.maxTries
  let hmanStage = Math.floor((1 - percent) * hman.value.length)
  return hmanStage
}
</script>
