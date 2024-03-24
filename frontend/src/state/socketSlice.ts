import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameState } from './store';

export type SocketState = {
  isConnected: boolean
}

const initialSocketState: SocketState = {
  isConnected: false
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connectSocket: (state) => {
      state.isConnected = true;
    },
    disconnectSocket: (state) => {
      state.isConnected = false;
    }
  }
});


/* Export actions. */
export const { connectSocket, disconnectSocket } = socketSlice.actions;


/* Export selectors. */
export const selectIsConnected = (state: GameState) => state.socket.isConnected;
