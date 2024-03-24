import { TABLE_LENGTH } from '@/lib/constants';
import { Paddle } from './Paddle';
import { Puck } from './Puck';
import { Table } from './Table';

export const Game = () => {

  return (
    <>
      <Table />
      <Puck position={[0, 0.1, 0]}/>
      <Paddle position={[0, 0,  TABLE_LENGTH * 1.2/3]} />
    </>
  )
}
