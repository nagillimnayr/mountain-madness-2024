import { Canvas } from '@react-three/fiber';
import { Game } from './game/Game';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { SHADOWS } from '@/lib/constants';
import { Suspense } from 'react';



export const Scene = () => {
  return (
    <div className='w-full h-full'>
      <Canvas className='relative z-0 h-full w-full'
        gl={{
          preserveDrawingBuffer: true
        }}
        shadows={SHADOWS}
      >
        <Suspense>
        <PerspectiveCamera makeDefault position={[0, 1, 2]} />
        <CameraControls ref={(controls) => {
          if (!controls) return;
          controls.mouseButtons.right = 0;
          // controls.mouseButtons.left = 0;
          // controls.mouseButtons.middle = 0;
        }} makeDefault />
        <pointLight position={[5, 3, 2]} intensity={50} castShadow={SHADOWS}/>
        <Game />
        </Suspense>
      </Canvas>
    </div>
  )
}
