import { Box } from '@react-three/drei';

const TABLE_WIDTH = 4;
const TABLE_LENGTH = 7;
const TABLE_HEIGHT = 0.2;

export const Table = () => {
  
  return (
    <Box args={[TABLE_WIDTH, TABLE_HEIGHT, TABLE_LENGTH]}>
      <meshStandardMaterial color={'red'} />
    </Box>
  )
}
