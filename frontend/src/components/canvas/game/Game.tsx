import { Paddle } from './Paddle';
import { PointerDetector } from './PointerDetector';
import { Puck } from './Puck';
import { Table } from './Table';
import { useKeyboardControls } from './useKeyboardControls';

export const Game = () => {
  useKeyboardControls();
  return (
    <>
      <Table />
      <Puck />
      <Paddle  />
      <PointerDetector />
    </>
  )
}
