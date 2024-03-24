import { PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS, PADDLE_HANDLE_HEIGHT, PADDLE_HANDLE_RADIUS } from '@/lib/constants';
import { Cylinder } from '@react-three/drei';
import { useRef } from 'react';
import { Object3D, Vector3Tuple } from 'three'



type PaddleProps = {
  position?: Vector3Tuple,
}
export const Paddle = ({position}: PaddleProps) => {
  const paddleRef = useRef<Object3D>(null!);

  return (
    <object3D ref={paddleRef} position={position}>
      <group position-y={PADDLE_BASE_THICKNESS / 2}>
        <Cylinder args={[PADDLE_BASE_RADIUS, PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS]}>
          <meshStandardMaterial color={'red'}/>
        </Cylinder>
        <Cylinder args={[PADDLE_HANDLE_RADIUS, PADDLE_HANDLE_RADIUS, PADDLE_HANDLE_HEIGHT]} position-y={PADDLE_HANDLE_HEIGHT / 2}>
          <meshStandardMaterial color={'red'}/>
        </Cylinder>
      </group>
    </object3D>
  )
}
