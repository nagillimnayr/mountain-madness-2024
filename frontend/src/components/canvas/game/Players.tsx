import { useCallback, useEffect, useRef } from 'react'
import { Paddle } from './Paddle'
import { Object3D } from 'three'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SERVER } from '@/lib/constants';
import { z } from 'zod';
import { serverStateSchema, playersSchema } from '@/server/server-types';
import { useFrame } from '@react-three/fiber';
import { socket } from '@/socket/socket';



export const Players = () => {
  return (
    <>
    <Paddle  color={'red'} id={1}/>
    <Paddle  color={'blue'} id={2}/>
    </>
  )
}
