import { PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS, PADDLE_HANDLE_HEIGHT, PADDLE_HANDLE_RADIUS, PADDLE_Z_OFFSET, TABLE_LENGTH } from '@/lib/constants';
import { useAppSelector } from '@/state/hooks';
import { selectPosition } from '@/state/playersSlice';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useEffect, useRef } from 'react';
import { Color, Object3D, Vector2 } from 'three'


type PaddleProps = {
  color: Color;
}
export const Paddle = forwardRef<Object3D, PaddleProps>(({color} : PaddleProps, fwdRef) => {
  // const paddleRef = useRef<Object3D>(null!);

  // const position = useAppSelector(selectPosition);

  return (
    // <object3D ref={fwdRef} position-z={position[1]} position-x={position[0]}>
    <object3D ref={fwdRef}>
      <group position-y={PADDLE_BASE_THICKNESS / 2}>
        <Cylinder args={[PADDLE_BASE_RADIUS, PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS]}>
          <meshStandardMaterial color={color}/>
        </Cylinder>
        <Cylinder args={[PADDLE_HANDLE_RADIUS, PADDLE_HANDLE_RADIUS, PADDLE_HANDLE_HEIGHT]} position-y={PADDLE_HANDLE_HEIGHT / 2}>
          <meshStandardMaterial color={color}/>
        </Cylinder>
      </group>
    </object3D>
  )
});
