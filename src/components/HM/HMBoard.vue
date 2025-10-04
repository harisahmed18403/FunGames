<template>
  <div class="flex column center h-100 w-100">
    <div class="flex column center">
      <h3>{{ playerSymbols[currentPlayer] }} {{ triesLeft[currentPlayer] }} attempts left</h3>
      <div class="hangman">
        <div class="inner" v-for="i in hman.length" :key="i">
          <span v-for="j in hman[0].length" :key="j" :style="getHmanCellStyle(i, currentPlayer)">
            {{ hman[i - 1][j - 1] }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex gap-2 mt-1">
      <template v-if="guess.length == 0">
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
  font-size: var(--font-size-heading);
  border-bottom: thin solid black;
  text-transform: uppercase;
}

.hangman {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--font-size-heading);
  gap: 0.6ch;
}

.inner {
  display: flex;
}

.hangman span {
  padding: 0%;
  margin: 0;
  width: 1ch;
  height: 1ch;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayers } from '@/stores/store'
import { playerSymbols } from '@/utils/generic'

const playersStore = usePlayers()

const props = defineProps<{
  guess: string[]
  triesLeft: number[]
  maxTries: number
  currentPlayer: number
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
  let hmanStage = hman.length - Math.floor((triesLeft * hman.length) / props.maxTries)
  return hmanStage
}

const getCarouselStyle = (currentPlayer: number) => {
  const rotation = currentPlayer * (-360 / playersStore.numPlayers)
  return {
    transform: `rotateY(${rotation}deg)`,
    WebkitTransform: `rotateY(${rotation}deg)`,
    MozTransform: `rotateY(${rotation}deg)`,
    OTransform: `rotateY(${rotation}deg)`,
  }
}

const getItemStyle = (player: number) => {
  const rotation = (360 / playersStore.numPlayers) * player
  const radius = 0
  return {
    color: playersStore.playerColor(player),
    transform: `rotateY(${rotation}deg) translateZ(${radius}px) translate(-50%, -50%)`,
  }
}

const getHmanCellStyle = (i: number, player: number) => {
  return i <= hmanStages.value[player] ? 'visibility: visible;' : 'visibility: hidden;'
}
</script>
