import { Canvas } from '@react-three/fiber';
import { Game } from './game/Game';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { SHADOWS } from '@/lib/constants';


export const Scene = () => {
  return (
    <div className='w-full h-full'>
      <Canvas className='relative z-0 h-full w-full'
        gl={{
          preserveDrawingBuffer: true
        }}
        shadows={SHADOWS}
      >
        <PerspectiveCamera makeDefault position={[0, 10, 10]} />
        <CameraControls ref={(controls) => {
          if (!controls) return;
          controls.mouseButtons.right = 1;
        }} makeDefault />
        <pointLight position={[5, 3, 2]} intensity={50} castShadow={SHADOWS}/>
        <Game />
      </Canvas>
    </div>
  )
}
