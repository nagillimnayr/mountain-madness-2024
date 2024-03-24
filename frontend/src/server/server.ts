
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Server } from "socket.io";
import { createServer } from 'node:http';

import { ServerState, serverState } from './server-state';
import { serverStateSchema, playerSchema, vector2Schema } from './server-types';

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
  socket.on('player1 pos', ({x, y}: { x: number, y: number}) => {
    // console.log('update pos1: ', x, y);
    serverState.player1.position.set(x, y);
    io.emit('player1 pos', {x, y});
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('player2 pos', ({x, y}: { x: number, y: number}) => {
    console.log('update pos2: ', x, y);
    serverState.player2.position.set(x, y);
    io.emit('player2 pos', {x, y});
  });
  socket.on('disconnect', () => {
    console.log("user disconnected");
  })
});

io.on('player1 pos', ({x, y}: { x: number, y: number}) => {
  console.log('update pos1');
  serverState.player1.position.set(x, y);
 
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
