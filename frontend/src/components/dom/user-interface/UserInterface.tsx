import { useCallback, useRef } from 'react';

export const UserInterface = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const handleClick = useCallback(() => {
    containerRef.current.dataset.blend = "false";
  }, []);

  return (
    <div 
      className='absolute top-0 left-0 w-full h-screen border-8 border-red-500 pointer-events-none'
      >
        {/* <div 
        ref={containerRef}
        data-blend="true"
        onClick={handleClick}
        className='w-full h-full bg-transparent data-[blend=true]:bg-gray-300 data-[blend=true]:pointer-events-auto pointer-events-none'>
          
        </div> */}
    </div>
  )
}
