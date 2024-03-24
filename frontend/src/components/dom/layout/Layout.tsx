import { PropsWithChildren } from 'react';
import { Providers } from './Providers';


export const Layout = ({children} : PropsWithChildren) => {

  return (
    <div className='w-full h-screen relative flex flex-col place-items-center'>
      <Providers>
      {children}
      </Providers>
    </div>
  )
}
