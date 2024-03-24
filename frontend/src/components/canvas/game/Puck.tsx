import { PUCK_RADIUS, PUCK_THICKNESS, SHADOWS } from '@/lib/constants';
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

  // const timer = useRef(0);

  // useFrame((state, delta) => {
  //   timer.current += delta;
  //   const radius = 0.5;
  //   const x = radius * Math.cos(timer.current);
  //   const z = radius * Math.sin(timer.current);
  //   puckRef.current.position.set(x, 0, z);

  // });

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
