<template>
  <div class="flex column center gap-3 w-100">
    <div class="flex row between first-baseline gap-1 scroll-x w-100">
      <div
        v-for="(tries, player) in triesLeft"
        class="hangman"
        :style="`color: ${playersStore.playerColor(player)}`"
      >
        <p>{{ player + 1 }}: {{ tries }} attempts</p>
        <div class="flex row" v-for="i in hman.length" :key="i">
          <span
            v-for="j in hman[0].length"
            :key="j"
            :style="`visibility: ${i <= hmanStages[player] ? 'visible' : 'hidden'}`"
            >{{ hman[i - 1][j - 1] }}</span
          >
        </div>
      </div>
    </div>
    <div class="flex gap-2">
      <template v-if="props.guess.length == 0">
        <div class="letter">
          <h2>Loading</h2>
        </div>
      </template>
      <template v-else>
        <div v-for="(letter, i) in props.guess" class="letter">
          <h2>{{ letter }}</h2>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.letter {
  font-size: large;
  border-bottom: thin solid black;
  text-transform: uppercase;
}

.hangman {
  display: flex;
  flex-direction: column;
  border: thin solid var(--primary-color);
  padding: 1rem;
  width: 10rem;
}

.hangman.active {
  background-color: white;
}

.hangman span {
  font-size: large;
  padding: 0%;
  margin: 0;
  width: 1ch;
  height: 2ch;
  font-weight: 900;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlayers } from '@/stores/store'

const playersStore = usePlayers()

const props = defineProps<{
  guess: string[]
  triesLeft: number[]
  maxTries: number
}>()

// Char array representing hang man
// Each index is a 'stage'
const hman = [
  ['_', '_', '_', '_', '', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '', 'O', '', '', ''],
  ['|', '', '/', '|', '\\', '', ''],
  ['|', '', '', '|', '', '', ''],
  ['|', '', '/', '', '\\', '', ''],
  ['_', '_', '_', '_', '_', '_', '_'],
]

const hmanStages = computed(() => {
  return props.triesLeft.map((tries, player) => getHmanStage(tries))
})

// Return the 'stage' at which the hman is at
function getHmanStage(triesLeft: number) {
  let percent = triesLeft / props.maxTries
  let hmanStage = hman.length - Math.floor((triesLeft * hman.length) / props.maxTries)
  console.log(triesLeft, percent, hman.length, hmanStage)
  return hmanStage
}
</script>
