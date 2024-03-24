import { FORWARD_PUCK_BOUND, LEFT_PUCK_BOUND, PLAYER_OFFSET, REAR_PUCK_BOUND, RIGHT_PUCK_BOUND } from '@/lib/constants';
import { MIN_DIST } from '@/state/puckSlice';
import { Vector2 } from 'three'



const _puckPos = new Vector2();
const _paddlePos1 = new Vector2();
const _paddlePos2 = new Vector2();
const _diff = new Vector2();
const _direction = new Vector2();
const _vel = new Vector2();

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
  updatePuck(delta: number): void;
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
  },

  
  updatePuck(delta: number) {
    const pos = this.puck.position;
    const vel = this.puck.velocity;
    let x = pos.x + vel.x * delta;
    let y = pos.y + vel.y * delta;
    
    if (x < LEFT_PUCK_BOUND) {
        x = LEFT_PUCK_BOUND;
        vel.x *= -1;
    }
    else if (x > RIGHT_PUCK_BOUND) {
      x = RIGHT_PUCK_BOUND;
      vel.x *= -1;
    }

    
    if (y < REAR_PUCK_BOUND) {
        y = REAR_PUCK_BOUND;
        vel.y *= -1;
    }
    else if (y > FORWARD_PUCK_BOUND) {
      y = FORWARD_PUCK_BOUND;
      vel.y *= -1;
    }
    
    _puckPos.set(x, y);
    _paddlePos1.copy(this.player1.position);
    _paddlePos2.copy(this.player2.position);

    const checkPaddleCollision = (paddlePos: Vector2) => {
      _diff.subVectors(_puckPos, paddlePos);
      const distance = _diff.length();
      if (distance < MIN_DIST) {
        _direction.copy(_diff);
        _direction.normalize();
        _puckPos.copy(paddlePos);
        _puckPos.addScaledVector(_direction, MIN_DIST);
        this.puck.position.copy(_puckPos);
        _vel.copy(vel);
        const speed = _vel.length();
        _vel.copy(_direction);
        _vel.multiplyScalar(speed);
        vel.copy(_vel);
        this.puck.velocity.copy(vel);
      }
    }
    
    checkPaddleCollision(_paddlePos1);
    checkPaddleCollision(_paddlePos2);

    this.puck.velocity.copy(vel);
    // this.puck.position.set(x, y);
  }
}
