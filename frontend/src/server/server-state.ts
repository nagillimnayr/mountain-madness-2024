import { PLAYER_OFFSET } from '@/lib/constants';
import { Vector2 } from 'three'



export type PlayerState = {
  position: Vector2;
  score: number;
}

export type PuckState = {
  position: Vector2;
  velocity: Vector2;
}


export type ServerState = {
  player1: PlayerState;
  player2: PlayerState;
  puck: PuckState;
}


const initialPlayer1State = {
  position: new Vector2(0, PLAYER_OFFSET),
  score: 0
}

const initialPlayer2State = {
  position: new Vector2(0, -PLAYER_OFFSET),
  score: 0
}
const initialPuckState = {
  position: new Vector2(0, 0),
  velocity: new Vector2(0, 0)
}

export const serverState: ServerState = {
  player1: {
    ...initialPlayer1State
  },
  player2: {
    ...initialPlayer2State
  },
  puck: {
    ...initialPuckState
  }
}
