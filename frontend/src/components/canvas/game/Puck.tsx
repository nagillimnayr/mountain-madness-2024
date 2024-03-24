import { FORWARD_PUCK_BOUND, LEFT_PUCK_BOUND, PADDLE_BASE_RADIUS, PUCK_RADIUS, PUCK_SPEED, PUCK_THICKNESS, REAR_PUCK_BOUND, RIGHT_PUCK_BOUND, SHADOWS, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { socket } from '@/socket/socket';
import { GameState } from '@/state/store';
import { Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { useStore } from 'react-redux';
import { Object3D, Vector2, Vector3, Vector3Tuple } from 'three';

/* 
  Air hockey pucks
  Thickness: 7mm
  Diameter: 80mm
*/

const _puckPos = new Vector2();
const _paddlePos = new Vector2();
const _diff = new Vector2();
const _direction = new Vector2();
const _vel = new Vector2();


export const MIN_DIST = PUCK_RADIUS + PADDLE_BASE_RADIUS;

type PuckProps = {
  position?: Vector3Tuple,
}
export const Puck = ({position} : PuckProps) => {

  const puckRef = useRef<Object3D>(null!);
  // const velocityRef = useRef<Vector2>(null!);
  useEffect(()=> {
    const setInitialVelocity = () => {
      /* Randomize initial direction. */
      const velocity = new Vector2(Math.random(), Math.random());
      velocity.normalize();
      velocity.multiplyScalar(PUCK_SPEED);
      socket.emit('set puck vel', {x: velocity.x, y: velocity.y});
    }

    const updatePuck = ({x, y}: { x: number, y: number}) => {
      puckRef.current.position.set(x, 0, y);
      // console.log('update puck!', x, y);
    }

    socket.on('connect', setInitialVelocity);
    socket.on('puck pos', updatePuck);

    return () => {
      socket.off('connect', setInitialVelocity);
    }
  }, []);
  // useMemo(() => {
  //   /* Randomize initial direction. */
  //   const velocity = new Vector2(Math.random(), Math.random());
  //   velocity.normalize();
  //   velocity.multiplyScalar(PUCK_SPEED);
  //   socket.emit('set puck vel', {x: velocity.x, y: velocity.y});
  //   // velocityRef.current = velocity;
  // }, [])
  // const timer = useRef(0);

  // const getStore = useStore<GameState>().getState;

  // useFrame((state, delta) => {
    // const pos = puckRef.current.position;
    // const vel = velocityRef.current;
    // let x = pos.x + vel.x * delta;
    // let z = pos.z + vel.y * delta;
    
    // if (x < LEFT_PUCK_BOUND) {
    //     x = LEFT_PUCK_BOUND;
    //     velocityRef.current.x *= -1;
    // }
    // else if (x > RIGHT_PUCK_BOUND) {
    //   x = RIGHT_PUCK_BOUND;
    //   velocityRef.current.x *= -1;
    // }

    
    // if (z < REAR_PUCK_BOUND) {
    //     z = REAR_PUCK_BOUND;
    //     velocityRef.current.y *= -1;
    // }
    // else if (z > FORWARD_PUCK_BOUND) {
    //   z = FORWARD_PUCK_BOUND;
    //   velocityRef.current.y *= -1;
    // }
    // _puckPos.set(x, z);
    // _paddlePos.set(...getStore().players.position);
    // _diff.subVectors(_puckPos, _paddlePos);
    // const distance = _diff.length();
    // if (distance < MIN_DIST) {
    //   _direction.copy(_diff);
    //   _direction.normalize();
    //   _puckPos.copy(_paddlePos);
    //   _puckPos.addScaledVector(_direction, MIN_DIST);
    //   _vel.copy(velocityRef.current);
    //   const speed = _vel.length();
    //   _vel.copy(_direction);
    //   _vel.multiplyScalar(speed);
    //   velocityRef.current.copy(_vel);
    // }


    // puckRef.current.position.set(x, 0, z);

  // });

  useFrame((_, delta) => {
    if(socket.connected) {
      socket.emit('update puck', {delta});
    }
  });

  return (
    <object3D 
      ref={puckRef}
      position={position}>
      <Cylinder 
        args={[PUCK_RADIUS, PUCK_RADIUS, PUCK_THICKNESS]} 
        position-y={PUCK_THICKNESS / 2}
        castShadow={SHADOWS}>
        <meshStandardMaterial color={'#737373'}/>
      </Cylinder>
    </object3D>
  )
}
