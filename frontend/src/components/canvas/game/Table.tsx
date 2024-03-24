import { TABLE_HEIGHT, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { Box } from '@react-three/drei';


export const Table = () => {
  
  return (
    <Box args={[TABLE_WIDTH, TABLE_HEIGHT, TABLE_LENGTH]}>
      <meshStandardMaterial color={'red'} />
    </Box>
  )
}
