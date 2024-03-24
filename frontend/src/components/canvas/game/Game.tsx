import { Paddle } from './Paddle';
import { Puck } from './Puck';
import { Table } from './Table';
import { useKeyboardControls } from './useKeyboardControls';

export const Game = () => {
  useKeyboardControls();
  return (
    <>
      <Table />
      <Puck position={[0, 0.1, 0]}/>
      <Paddle  />
    </>
  )
}
