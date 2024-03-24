import { Puck } from './Puck';
import { Table } from './Table';

export const Game = () => {

  return (
    <>
      <Table />
      <Puck position={[0, 0.1, 0]}/>
    </>
  )
}
