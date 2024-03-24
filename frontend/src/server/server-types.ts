
import { z } from 'zod';

export const vector2Schema = z.object({
  x: z.number(),
  y: z.number(),
})

export const playerSchema = z.object({
  position: vector2Schema,
  score: z.number()
})

export const puckSchema = z.object({
  position: vector2Schema,
  velocity: vector2Schema
})

export const playersSchema = z.object({
  player1: playerSchema,
  player2: playerSchema,
})

export const serverStateSchema = z.object({
  player1: playerSchema,
  player2: playerSchema,
  puck: puckSchema
})
