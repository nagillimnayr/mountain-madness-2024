import { PADDLE_Z_OFFSET, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { socket } from '@/socket/socket';
import { useAppDispatch } from '@/state/hooks';
import { movePaddle, setPaddlePos } from '@/state/playersSlice';
import { GameState } from '@/state/store';
import { Box, MeshDiscardMaterial, Wireframe } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import { useStore } from 'react-redux';

const WIDTH = TABLE_WIDTH;
const LENGTH = TABLE_LENGTH / 4;
const HEIGHT = 0.01;

const postPlayerPos = async () => {

}

export const PointerDetector = () => {
  const dispatch = useAppDispatch();

  // const postPlayerPos = useCallback(async (x: number, y: number) => {
  //   const res = await fetch("http://localhost:3000/player1", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({x, y}),
  //   });

  //   console.log("res: ", res);
  // }, [])

  const store = useStore<GameState>();

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    const x = event.point.x;
    const y = event.point.z;
    // dispatch(setPaddlePos([event.point.x, event.point.z]));
    if (!store.getState().socket.isConnected) {
      // console.log('not connected!');
      return;}
    socket.emit('player1 pos', {x, y});
    // postPlayerPos(x, y);
  }, [store]);

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
