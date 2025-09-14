import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TicTacToe from '@/views/TicTacToe.vue'
import Connect4 from '@/views/Connect4.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/tictactoe',
      name: 'tictactoe',
      component: TicTacToe,
    },
    {
      path: '/connect4',
      name: 'connect4',
      component: Connect4,
    },
  ],
})

export default router
