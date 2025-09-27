import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TicTacToe from '@/views/TicTacToe.vue'
import Connect4 from '@/views/Connect4.vue'
import HangMan from '@/views/HangMan.vue'
import PlayerStats from '@/views/PlayerStats.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    ignore: true,
  },
  // Games
  {
    path: '/tictactoe',
    name: 'Tic Tac Toe',
    component: TicTacToe,
  },
  {
    path: '/connect4',
    name: 'Connect4',
    component: Connect4,
  },
  {
    path: '/hangman',
    name: 'Hang-Man',
    component: HangMan,
  },
  {
    path: '/playerstats',
    name: 'Player Stats',
    component: PlayerStats,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
