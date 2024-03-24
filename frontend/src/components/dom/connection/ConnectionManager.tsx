
import { Button } from '@/components/ui/button';
import {socket} from '@/socket/socket';
import { useAppDispatch } from '@/state/hooks';
import { connectSocket, disconnectSocket, selectIsConnected } from '@/state/socketSlice';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';

export const ConnectionManager = () => {
  const store = useStore();
  const dispatch = useAppDispatch();
  const isConnected = useSelector(selectIsConnected);
  useEffect(()=>{
    const onConnect = () => {
      dispatch(connectSocket());
    }
    const onDisconnect = () => {
      dispatch(disconnectSocket());
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {

    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    }
  }, [dispatch])
  return (
    <div>
    <div className='flex flex-row gap-4 justify-center items-center pointer-events-auto'>
      <Button className='w-46 hover:bg-indigo-500 transition-colors' onClick={() => {socket.connect()}}>connect</Button>
      <Button className='w-46 hover:bg-indigo-500 transition-colors' onClick={() => {socket.disconnect()}}>disconnect</Button>
    </div>
    <div className='flex items-center justify-center'>
    <h2 className='text-3xl' >{isConnected ? "connected!" : "X"}</h2>
    </div>
  </div>
  )
}
