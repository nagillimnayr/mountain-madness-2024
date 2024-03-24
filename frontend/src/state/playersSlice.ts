import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Vector3Tuple, Vector3 } from 'three';
import { GameState } from './store';

const _position: Vector3 = new Vector3();
const _translation: Vector3 = new Vector3();

export type PlayerState = {
  name: string,
  score: number,
  /* Position of player paddle. */
  position: Vector3Tuple,
}

const playerInitialState: PlayerState = {
    name: "",
    score: 0,
    position: [0, 0, 0]
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
    updatePosition: (state, action: PayloadAction<Vector3Tuple>) => {
      _position.set(...state.position);
      _translation.set(...action.payload);
      _position.add(_translation);
      state.position = _position.toArray();
    }
  }
});

/* Export actions. */
export const { incrementScore, updatePosition } = playersSlice.actions;


/* Export selectors. */
export const selectName = (state: GameState) => state.players.name;
export const selectScore = (state: GameState) => state.players.score;
export const selectPosition = (state: GameState) => state.players.position;
