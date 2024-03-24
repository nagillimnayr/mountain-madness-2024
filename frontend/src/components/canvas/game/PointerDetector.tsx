import { PADDLE_Z_OFFSET, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { useAppDispatch } from '@/state/hooks';
import { movePaddle, setPaddlePos } from '@/state/playersSlice';
import { Box, MeshDiscardMaterial, Wireframe } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';

const WIDTH = TABLE_WIDTH;
const LENGTH = TABLE_LENGTH / 4;
const HEIGHT = 0.01;


export const PointerDetector = () => {
  const dispatch = useAppDispatch();

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    dispatch(setPaddlePos([event.point.x, event.point.z]));
  }, [dispatch]);

  return (
    <object3D position={[0, 0, LENGTH * 1.5]}>
      <Box args={[WIDTH, HEIGHT, LENGTH]} position-y={HEIGHT/2}
        onPointerMove={handlePointerMove}>
        <MeshDiscardMaterial />
        {/* <Wireframe /> */}
      </Box>
    </object3D>
  )
}
