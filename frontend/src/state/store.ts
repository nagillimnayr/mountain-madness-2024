import { configureStore } from '@reduxjs/toolkit';
import { playersSlice } from './playersSlice';

const store = configureStore({
  reducer: {
    players: playersSlice.reducer
  }
})
export default store;

/* Export TypeScript typings. */
export type GameState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
