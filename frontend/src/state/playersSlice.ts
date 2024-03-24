import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameState } from './store';
import { PADDLE_BASE_RADIUS, PADDLE_Z_OFFSET, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { Vector2Tuple } from 'three';

const RIGHT_BOUND = (TABLE_WIDTH / 2) - PADDLE_BASE_RADIUS;
const LEFT_BOUND = -RIGHT_BOUND;
const FORWARD_BOUND = ((TABLE_LENGTH / 4) * 1.5) + (TABLE_LENGTH / 8) - PADDLE_BASE_RADIUS;
const REAR_BOUND = ((TABLE_LENGTH / 4) * 1.5) - (TABLE_LENGTH / 8) + PADDLE_BASE_RADIUS;

export type PlayerState = {
  name: string,
  score: number,
  /* X position of player paddle. */
  position: Vector2Tuple,
}

const playerInitialState: PlayerState = {
    name: "",
    score: 0,
    position: [0, PADDLE_Z_OFFSET]
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
      let x = state.position[0];
      x += action.payload;
      if (x < LEFT_BOUND) x = LEFT_BOUND;
      else if (x > RIGHT_BOUND) x = RIGHT_BOUND;
      state.position[0] = x;
    },
    setPaddlePos: (state, action: PayloadAction<Vector2Tuple>) => {
      let [x, y] = action.payload;
      if (x < LEFT_BOUND) x = LEFT_BOUND;
      else if (x > RIGHT_BOUND) x = RIGHT_BOUND;
      if (y < REAR_BOUND) y = REAR_BOUND;
      if (y > FORWARD_BOUND) y = FORWARD_BOUND;
      state.position = [x, y];
    }
  }
});

/* Export actions. */
export const { incrementScore, movePaddle, setPaddlePos } = playersSlice.actions;


/* Export selectors. */
export const selectName = (state: GameState) => state.players.name;
export const selectScore = (state: GameState) => state.players.score;
export const selectPosition = (state: GameState) => state.players.position;
