<template>
  <div class="flex center column">
    <div class="container" :style="getContainerStyle()">
      <div class="carousel" :style="getCarouselStyle(currentPlayer)">
        <div class="item" v-for="(tries, player) in triesLeft" :style="getItemStyle(player)">
          <p>
            <span :style="`color: ${playersStore.playerColor(player)}`">{{
              playerSymbols[player]
            }}</span>
            {{ tries }} attempts
          </p>
          <div class="hangman">
            <div class="inner" v-for="i in hman.length" :key="i">
              <span v-for="j in hman[0].length" :key="j" :style="getHmanCellStyle(i, player)">
                {{ hman[i - 1][j - 1] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2 mt-3">
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
:root {
  --carousel-height: 5rem;
}
.letter {
  font-size: large;
  border-bottom: thin solid black;
  text-transform: uppercase;
}

.container {
  margin: 0 auto;
  position: relative;
  perspective: 1000px;
}

.carousel {
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.item {
  display: block;
  position: absolute;
  background: var(--primary-color);
  border: 0.1rem solid var(--tertiary-color);
  text-align: center;
  border-radius: 10px;
  box-shadow: 0rem 0.1rem 1px black;
}

.item p {
  color: var(--tertiary-color);
}

.hangman {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;
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

const getContainerStyle = () => {
  const widthRem = Math.max(playersStore.numPlayers + 2, 10)
  return {
    width: `${widthRem}rem`,
    height: '150px',
  }
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
  const widthRem = Math.max(playersStore.numPlayers + 2, 10)
  const rotation = (360 / playersStore.numPlayers) * player
  return {
    width: `${widthRem}rem`,
    height: '150px',
    color: playersStore.playerColor(player),
    transform: `rotateY(${rotation}deg) translateZ(250px)`,
  }
}

const getHmanCellStyle = (i: number, player: number) => {
  return i <= hmanStages.value[player] ? 'visibility: visible;' : 'visibility: hidden;'
}
</script>
