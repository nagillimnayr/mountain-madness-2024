import { Plane } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';

export const Game = () => {
  return (
    <>
      <Plane args={[4, 7, 1]} rotation={[degToRad(-90), 0, 0]} >
        <meshBasicMaterial color={'red'} />
      </Plane>
    </>
  )
}
