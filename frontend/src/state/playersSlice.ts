import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameState } from './store';
import { PADDLE_BASE_RADIUS, TABLE_WIDTH } from '@/lib/constants';

const RIGHT_BOUND = (TABLE_WIDTH / 2) - PADDLE_BASE_RADIUS;
const LEFT_BOUND = -RIGHT_BOUND;

export type PlayerState = {
  name: string,
  score: number,
  /* X position of player paddle. */
  xPosition: number,
}

const playerInitialState: PlayerState = {
    name: "",
    score: 0,
    xPosition: 0
};


export const playersSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    movePaddle: (state, action: PayloadAction<number>) => {
      let x = state.xPosition;
      x += action.payload;
      if (x < LEFT_BOUND) x = LEFT_BOUND;
      else if (x > RIGHT_BOUND) x = RIGHT_BOUND;
      state.xPosition = x;
    },
  }
});

/* Export actions. */
export const { incrementScore, movePaddle } = playersSlice.actions;


/* Export selectors. */
export const selectName = (state: GameState) => state.players.name;
export const selectScore = (state: GameState) => state.players.score;
export const selectPosition = (state: GameState) => state.players.xPosition;
