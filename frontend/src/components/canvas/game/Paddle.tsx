import { PADDLE_BASE_RADIUS, PADDLE_BASE_THICKNESS, PADDLE_HANDLE_HEIGHT, PADDLE_HANDLE_RADIUS, PADDLE_Z_OFFSET, TABLE_LENGTH } from '@/lib/constants';
import { socket } from '@/socket/socket';
import { useAppSelector } from '@/state/hooks';
import { selectPosition } from '@/state/playersSlice';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useEffect, useRef } from 'react';
import { Color, Object3D, Vector2 } from 'three'


type PaddleProps = {
  id: 1 | 2,
  color: Color;
}
export const Paddle = ({id, color} : PaddleProps) => {
  const paddleRef = useRef<Object3D>(null!);
  useEffect(() => {
    const onUpdatePos = ({x, y}: { x: number, y: number}) => {
        paddleRef.current.position.set(x, 0, y);
    }
    socket.on(`player${id} pos`, onUpdatePos);

    return () => {
      socket.off(`player${id} pos`, onUpdatePos);
    }

  }, [id]);

  useFrame((_, delta)=>{
    if(id === 2) {
      socket.emit('player2 move', {delta});
    }
  });

  return (
    <object3D ref={paddleRef}>
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
};
