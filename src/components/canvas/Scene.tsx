import { Canvas } from '@react-three/fiber';
import { Game } from './Game';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';


export const Scene = () => {
  return (
    <div className='w-full h-full'>
      <Canvas className='relative z-0 h-full w-full'
        gl={{
          preserveDrawingBuffer: true
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 10, 10]} />
        <CameraControls makeDefault />
        <Game />
      </Canvas>
    </div>
  )
}
