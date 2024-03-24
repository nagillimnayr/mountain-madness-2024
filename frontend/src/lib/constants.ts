export const SHADOWS = false;

/* Units in meters. */
export const TABLE_WIDTH = 1.2192;
export const TABLE_LENGTH = 2.1336;
export const TABLE_HEIGHT = 0.07;

export const PUCK_THICKNESS = 0.007;
export const PUCK_RADIUS = 0.040;

export const RIGHT_PUCK_BOUND = (TABLE_WIDTH / 2) - PUCK_RADIUS;
export const LEFT_PUCK_BOUND = - RIGHT_PUCK_BOUND;
export const FORWARD_PUCK_BOUND = (TABLE_LENGTH / 2) - PUCK_RADIUS;
export const REAR_PUCK_BOUND = -FORWARD_PUCK_BOUND;
export const PUCK_SPEED = 0.75;


export const PADDLE_BASE_RADIUS = 0.048;
export const PADDLE_BASE_THICKNESS = 0.019;
export const PADDLE_HANDLE_RADIUS = PADDLE_BASE_RADIUS / 3;
export const PADDLE_HANDLE_HEIGHT = 0.060;
export const PADDLE_Z_OFFSET = TABLE_LENGTH * 1.2/3;


export const PADDLE_RIGHT_BOUND = (TABLE_WIDTH / 2) - PADDLE_BASE_RADIUS;
export const PADDLE_LEFT_BOUND = -PADDLE_RIGHT_BOUND;
export const PADDLE_FORWARD_BOUND = ((TABLE_LENGTH / 4) * 1.5) + (TABLE_LENGTH / 8) - PADDLE_BASE_RADIUS;
export const PADDLE_REAR_BOUND = ((TABLE_LENGTH / 4) * 1.5) - (TABLE_LENGTH / 8) + PADDLE_BASE_RADIUS;


export const PLAYER_OFFSET = PADDLE_Z_OFFSET;


export const SERVER = 'localhost:3000'
