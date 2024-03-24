import { Box } from '@react-three/drei';

export const Table = () => {
  
  return (
    <Box args={[4, 0.2, 7]}>
      <meshStandardMaterial color={'red'} />
    </Box>
  )
}
