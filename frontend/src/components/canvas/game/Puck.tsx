import { PUCK_RADIUS, PUCK_THICKNESS } from '@/lib/constants';
import { Cylinder } from '@react-three/drei'
import { Vector3Tuple } from 'three';

/* 
  Air hockey pucks
  Thickness: 7mm
  Diameter: 80mm
*/


type PuckProps = {
  position?: Vector3Tuple,

}
export const Puck = ({position} : PuckProps) => {
  return (
    <Cylinder 
      args={[PUCK_RADIUS, PUCK_RADIUS, PUCK_THICKNESS]} 
      position={position}>
      <meshStandardMaterial color={'gray'} />
    </Cylinder>
  )
}
