import { PropsWithChildren } from 'react';


export const Layout = ({children} : PropsWithChildren) => {

  return (
    <div className='w-full h-screen relative flex flex-col place-items-center'>
      {children}
    </div>
  )
}
