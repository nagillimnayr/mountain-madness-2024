
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Server } from "socket.io";
import { createServer } from 'node:http';

import { ServerState, serverState } from './server-state';
import { serverStateSchema, playerSchema, vector2Schema } from './server-types';
import { Vector2 } from 'three';
import { PADDLE_LEFT_BOUND, PADDLE_RIGHT_BOUND, PUCK_SPEED } from '@/lib/constants';

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;
const server = createServer(app);



// Middleware
app.use(bodyParser.json());
app.use(cors());


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('player1 pos', serverState.player1.position);
  io.emit('player2 pos', serverState.player2.position);
  io.emit('puck pos', serverState.puck.position);
  serverState.puck.velocity = new Vector2(Math.random(), Math.random());
  serverState.puck.velocity.normalize();
  serverState.puck.velocity.multiplyScalar(PUCK_SPEED);
  // console.log('velocity: ', ...serverState.puck.velocity);

  socket.on('player1 pos', ({x, y}: { x: number, y: number}) => {
    serverState.player1.position.set(x, y);
    io.emit('player1 pos', {x, y});
  });
  socket.on('player2 pos', ({x, y}: { x: number, y: number}) => {
    serverState.player2.position.set(x, y);
    io.emit('player2 pos', {x, y});
  });

  socket.on('player2 move', ({delta}:{ delta: number}) => {
    let vel = serverState.player2.velocity;
    let x = serverState.player2.position.x;
    x = x + vel * delta;
    if (x < PADDLE_LEFT_BOUND) {
      x = PADDLE_LEFT_BOUND;
      vel *= -1;
    }
    else if (x > PADDLE_RIGHT_BOUND) {
      x = PADDLE_RIGHT_BOUND;
      vel *= -1;
    }

    serverState.player2.position.setX(x);
    serverState.player2.velocity = vel;
    io.emit('player2 pos', serverState.player2.position);
  })

  socket.on('set puck vel', ({x, y}: { x: number, y: number}) => {
    serverState.puck.velocity.set(x, y);
  });

  socket.on('update puck', ({delta}: { delta: number}) => {
    serverState.updatePuck(delta);
    const {x, y} = serverState.puck.position;
    io.emit('puck pos', {x, y});
  });

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })
});





app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!");
});

app.get("/players", (req: Request, res: Response) => {
  res.status(200).json({
    player1: serverState.player1,
    player2: serverState.player2
  });
});

app.post("/player1", async (req: Request, res: Response) => {
  const parsed = await vector2Schema.safeParseAsync(req.body);
  if (!parsed.success) {
    res.status(400);
    res.end();
    return;
  }
  const {x, y} = parsed.data;
  serverState.player1.position.set(x, y);
  res.status(200);
});

app.post("/player2", (req: Request, res: Response) => {

});


server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
