import { Canvas } from '@react-three/fiber';
import { Game } from './game/Game';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';


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
        <directionalLight position={[5, 2, 2]} intensity={1} />
        <Game />
      </Canvas>
    </div>
  )
}
