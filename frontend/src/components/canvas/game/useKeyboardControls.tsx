import { useAppDispatch } from '@/state/hooks';
import { movePaddle } from '@/state/playersSlice';
import { useEffect } from 'react';

const MOVE_SPEED = 0.01;

export function useKeyboardControls() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      console.log(event.key);
      switch (event.key) {
        case "ArrowLeft": 
          dispatch(movePaddle(-MOVE_SPEED));
          console.log('left');
          break;

        case "ArrowRight":
          dispatch(movePaddle(MOVE_SPEED));
          console.log('right');
          break;
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
}
