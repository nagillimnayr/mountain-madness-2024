const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { connectToDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
let leaderboardCollection;

connectToDatabase().then(db => {
    leaderboardCollection = db.collection("players");
})
// probably add error handling for connection error



// Middleware
app.use(bodyParser.json());

// Store current positions
let player1Position = { x: 0, y: 0, z: 0 };
let player2Position = { x: 0, y: 0, z: 0 };
let ballPosition = { x: 0, y: 0, z: 0 };

// Define room state
const rooms = new Map();

// Generate a unique room ID
function generateRoomId() {
    return uuidv4();
}

// Endpoint to update positions
app.post('/update-positions', (req, res) => {
    const { player1, player2, ball } = req.body;
    player1Position = player1;
    player2Position = player2;
    ballPosition = ball;
    res.status(200).json({ message: 'Positions updated successfully.' });
});

// Endpoint to update leaderboard
app.post('/update-leaderboard', async (req, res) => {
    const winner = req.body;
    const player = await leaderboardCollection.findOne({ name: winner.name });
    if (!player) {
        await leaderboardCollection.insertOne({ name: winner.name, wins: 1});
    } else {
        await leaderboardCollection.updateOne({ name: winner.name }, {$inc: { wins: 1} });
    }

    res.status(200).json({ message: 'Leaderboard updated successfully.' });
});

// Endpoint to get leaderboard
app.get('/leaderboard', (req, res) => {
    leaderboardCollection.find({})
            .toArray()
            .then(players => res.status(200).json(players));
});

// Endpoint to join a room
app.post('/join-room', (req, res) => {
    const { roomId } = req.body;
    
    if (!rooms.has(roomId)) {
        // Room doesn't exist, create a new room
        rooms.set(roomId, { players: [] });
    }

    const room = rooms.get(roomId);
    if (room.players.length >= 2) {
        res.status(400).json({ message: 'Room is full.' });
    } else {
        // Add player to the room
        room.players.push(/* player details */);
        res.status(200).json({ message: 'Joined room successfully.' });
    }
});

// Endpoint to create a new room
app.post('/create-room', (req, res) => {
    const roomId = generateRoomId(); // Generate a new room ID
    rooms.set(roomId, { players: [] });
    res.status(200).json({ roomId });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
