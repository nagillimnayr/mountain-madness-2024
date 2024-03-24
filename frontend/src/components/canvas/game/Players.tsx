import { useCallback, useEffect, useRef } from 'react'
import { Paddle } from './Paddle'
import { Object3D } from 'three'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SERVER } from '@/lib/constants';
import { z } from 'zod';
import { serverStateSchema, playersSchema } from '@/server/server-types';
import { useFrame } from '@react-three/fiber';
import { socket } from '@/socket/socket';

// const fetchPlayers = async () => {
//   const res = await fetch("http://localhost:3000/players", {
//     method: "GET", 
//   });
  
//   // console.log('res: ', res);
//   const json = await res.json();
//   // console.log('res.json(): ', json);
//   const parsed = await playersSchema.safeParseAsync(json);
//   if (!parsed.success) {
//     console.log(parsed.error);
//     return;
//   }
//   return parsed.data;
// }

export const Players = () => {

  const paddle1 = useRef<Object3D>(null!);
  const paddle2 = useRef<Object3D>(null!);
  // const queryClient = useQueryClient();
  // const query = useQuery({
  //   queryKey: ['fetchPlayers'],
  //   queryFn: fetchPlayers
  // })

  // const updatePlayers = useCallback(async () => {
  //   const players = await fetchPlayers();
  //   if (!players) return;
  //   const {player1, player2} = players;
  //   paddle1.current.position.set(player1.position.x, 0, player1.position.y);
  //   paddle2.current.position.set(player2.position.x, 0, player2.position.y);
  // }, []);

  // useFrame(() => {
  //   // updatePlayers();
  // });

  useEffect(() => {
    const onUpdatePos1 = ({x, y}: { x: number, y: number}) => {
        paddle1.current.position.set(x, 0, y);
    }
    const onUpdatePos2 = ({x, y}: { x: number, y: number}) => {
        paddle2.current.position.set(x, 0, y);
    }

    socket.on('player1 pos', onUpdatePos1);
    socket.on('player2 pos', onUpdatePos2);

    return () => {
      socket.off('player1 pos', onUpdatePos1);
      socket.off('player2 pos', onUpdatePos2);
    }

  }, []);

  return (
    <>
    <Paddle ref={paddle1} color={'red'}/>
    <Paddle ref={paddle2} color={'blue'}/>
    </>
  )
}
