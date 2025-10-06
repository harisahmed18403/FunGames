# FunGames

## Play the game <a href='https://harisahmed18403.github.io/FunGames/'>here</a>

A TypeScript + Vue.JS project with 3 table-top games

1. Tic Tac Toe
2. Connect 4
3. Hang-Man

# Aims of the project

### Dynamic: The number of players can be changed at any time

The project is designed to stay flexible. Players can be added or removed at any point, and the system automatically updates the layout and logic to handle the current number of participants. Each game supports multiple players, with a minimum of two required to start.

### Expandable: Add new games without rewriting existing functionality

The codebase is structured so new games can be introduced independently of existing ones. The shared player store uses a TypeScript interface to manage player stats, update scores, and track performance across games. This approach keeps the project modular and allows new features or games to plug into the existing system without breaking anything.

### Mobile Friendly: Scales across devices and orientations

The interface is built to adapt to different screen sizes and orientations, from large desktop monitors to small mobile displays. I wanted to re-invent the TailwindCSS while in the simplest most minimal way possible

# How to run and build

1. Download/clone the repository
2. Open a terminal in the root directory of this project
3. Use the commands

```
npm install
npm run build
```

4. If you dont have a local server setup, use the following comman to run and view the project

```
npm run dev
```

# Adding a new game

Each game view follows the same general structure as Tic Tac Toe. Games are self-contained components that handle their own logic, rendering, and interaction, while relying on the shared player store for managing players, scores, and turn order.

1. Create a new view file
   - Add a new file inside the views directory, for example RockPaperScissors.vue.
   - This will serve as the entry point for your game’s logic and layout.

2. Import and use the player store
   - The player store handles all player-related data such as the number of players, colors, symbols, and scores. Import it into your game view and initialize it:

```ts
import { usePlayers } from '@/stores/store'

const playersStore = usePlayers()
```

3. Handle player turns and scoring

- Each game is responsible for determining its own winning conditions. Once a winner is identified, call playersStore.updateScore() with the appropriate index.
- If the game ends in a draw, you can pass null to indicate a tie.

```ts
function setCell(col: number, row: number) {
  if (board[row][col] === -1) {
    board[row][col] = currentPlayer.value
    if (checkWin()) {
      playersStore.updateScore(currentPlayer.value) // <--- Look here
      gameEnd(`Player ${currentPlayer.value + 1} wins!`)
      return
    } else if (checkTie()) {
      playersStore.updateScore(null) // <--- And here
      gameEnd(`Its a Tie!`)
      return
    }
    switchPlayer()
  }
}
```

- This automatically updates the shared player statistics and ensures scores stay consistent across all games.

4. Follow the Tic Tac Toe pattern for structure
   Your game should include:

- A reactive state to store the current board, choices, or round data.

- A reference to the current player (currentPlayer) and logic to switch turns.

- A reset or initialization method to prepare a new round or match.

```ts
// Player setup
const playersStore = usePlayers()
const currentPlayer = ref<number>(0)
const pauseInput = ref<boolean>(false)

// Board setup
const size = ref(playersStore.numPlayers + 1)
const board = reactive<number[][]>([])
```

For example, Tic Tac Toe defines:

- board for grid data

- checkWin() and checkTie() for game outcomes

- switchPlayer() to alternate turns

- gameEnd() to display a message and reset the state

The same structure can be applied to any new game—simply replace the board and rules with those relevant to your game logic.

5. Keep the interface consistent

- Since the player store and components like CurrentPlayer and ResetModal are shared, maintaining similar component structures across games helps keep the UI and behavior uniform.
