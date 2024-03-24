import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameState } from './store';
import { Vector2, Vector2Tuple } from 'three';
import { FORWARD_PUCK_BOUND, LEFT_PUCK_BOUND, PADDLE_BASE_RADIUS, PUCK_RADIUS, REAR_PUCK_BOUND, RIGHT_PUCK_BOUND } from '@/lib/constants';

export const MIN_DIST = PUCK_RADIUS + PADDLE_BASE_RADIUS;

const _puckPos = new Vector2();
const _paddlePos = new Vector2();
const _diff = new Vector2();
const _direction = new Vector2();
const _vel = new Vector2();

export type PuckState = {
  position: Vector2Tuple,
  velocity: Vector2Tuple,
}

const puckInitialState: PuckState = {
  position: [0, 0],
  velocity: [0, 0]
}

export const puckSlice = createSlice({
  name: "puck",
  initialState: puckInitialState,
  reducers: {
    setPosition: (state, action: PayloadAction<Vector2Tuple>) => {
      let [x, y] = action.payload;
      let [velX, velY] = state.velocity;

      if (x < LEFT_PUCK_BOUND) {
        x = LEFT_PUCK_BOUND;
        velX *= -1;
    }
    else if (x > RIGHT_PUCK_BOUND) {
      x = RIGHT_PUCK_BOUND;
      velX *= -1;
    }
    
    if (y < REAR_PUCK_BOUND) {
        y = REAR_PUCK_BOUND;
        velY *= -1;
    }
    else if (y > FORWARD_PUCK_BOUND) {
      y = FORWARD_PUCK_BOUND;
      velY *= -1;
    }

    // _puckPos.set(x, y);
    // _paddlePos.set(...getStore().players.position);
    // _diff.subVectors(_puckPos, _paddlePos);
    // const distance = _diff.length();
    // if (distance < MIN_DIST) {
    //   _direction.copy(_diff);
    //   _direction.normalize();
    //   _puckPos.copy(_paddlePos);
    //   _puckPos.addScaledVector(_direction, MIN_DIST);
    //   _vel.set(velX, velY);
    //   const speed = _vel.length();
    //   _vel.copy(_direction);
    //   _vel.multiplyScalar(speed);
    //   state.velocity = _vel.toArray();
    // }

    }
  }
})
