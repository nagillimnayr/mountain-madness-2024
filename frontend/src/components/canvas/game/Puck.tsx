import { PUCK_RADIUS, PUCK_THICKNESS } from '@/lib/constants';
import { Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Object3D, Vector3Tuple } from 'three';

/* 
  Air hockey pucks
  Thickness: 7mm
  Diameter: 80mm
*/


type PuckProps = {
  position?: Vector3Tuple,

}
export const Puck = ({position} : PuckProps) => {

  const puckRef = useRef<Object3D>(null!);

  const timer = useRef(0);

  useFrame((state, delta) => {
    timer.current += delta;
    const x = Math.cos(timer.current);
    const z = Math.sin(timer.current);
    puckRef.current.position.set(x, 0, z);

  });

  return (
    <object3D ref={puckRef}>
      <Cylinder 
        args={[PUCK_RADIUS, PUCK_RADIUS, PUCK_THICKNESS]} 
        position={position}>
        <meshStandardMaterial color={'gray'} />
      </Cylinder>
    </object3D>
  )
}
