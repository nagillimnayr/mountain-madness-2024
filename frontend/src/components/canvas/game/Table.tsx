import { SHADOWS, TABLE_HEIGHT, TABLE_LENGTH, TABLE_WIDTH } from '@/lib/constants';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Table = () => {
  
  return (
    <object3D >
      {/* <RigidBody> */}
      <Box args={[TABLE_WIDTH, TABLE_HEIGHT, TABLE_LENGTH]}
        position-y={-TABLE_HEIGHT / 2}
        castShadow={SHADOWS}
        receiveShadow={SHADOWS}>
        <meshStandardMaterial color={'#ffffff'} />
      </Box>
      {/* </RigidBody> */}
    </object3D>
  )
}
