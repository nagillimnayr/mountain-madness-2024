import { PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS, PADDLE_HANDLE_HEIGHT, PADDLE_HANDLE_RADIUS, TABLE_LENGTH } from '@/lib/constants';
import { useAppSelector } from '@/state/hooks';
import { selectPosition } from '@/state/playersSlice';
import { Cylinder } from '@react-three/drei';
import { useRef } from 'react';
import { Object3D } from 'three'




export const Paddle = () => {
  const paddleRef = useRef<Object3D>(null!);

  const xPosition = useAppSelector(selectPosition);

  return (
    <object3D ref={paddleRef} position-z={TABLE_LENGTH * 1.2/3} position-x={xPosition}>
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
