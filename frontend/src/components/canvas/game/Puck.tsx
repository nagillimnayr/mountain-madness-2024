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
  useEffect(()=> {
    const updatePuck = ({x, y}: { x: number, y: number}) => {
      puckRef.current.position.set(x, 0, y);
      // console.log({x, y});
    }

    socket.on('puck pos', updatePuck);

    return () => {
      socket.off('puck pos', updatePuck);
    }
  }, []);
  

  useFrame((_, delta) => {
    // if(socket.connected) {
      socket.emit('update puck', {delta});
    // }
    
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
