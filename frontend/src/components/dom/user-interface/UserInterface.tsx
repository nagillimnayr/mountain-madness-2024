import { useCallback, useRef } from 'react';
import { MainMenu } from './main-menu/MainMenu';

export const UserInterface = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const handleClick = useCallback(() => {
    containerRef.current.dataset.blend = "false";
  }, []);

  return (
    <div 
      className='absolute top-0 left-0 w-full h-screen border-8 border-red-500 pointer-events-none justify-center items-center'
      >
       <MainMenu />
    </div>
  )
}
