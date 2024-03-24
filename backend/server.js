// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Store current positions
let player1Position = { x: 0, y: 0, z: 0 };
let player2Position = { x: 0, y: 0, z: 0 };
let ballPosition = { x: 0, y: 0, z: 0 };

// Update positions endpoint
app.post('/update-positions', (req, res) => {
    const { player1, player2, ball } = req.body;
    player1Position = player1;
    player2Position = player2;
    ballPosition = ball;
    res.status(200).json({ message: 'Positions updated successfully.' });
});

// Leaderboard data (mock data for demonstration)
let leaderboard = [
    { name: 'Player 1', wins: 2 },
    { name: 'Player 2', wins: 1 }
];

// Update leaderboard endpoint
app.post('/update-leaderboard', (req, res) => {
    const { winner } = req.body;
    const index = leaderboard.findIndex(player => player.name === winner);
    if (index !== -1) {
        leaderboard[index].wins++;
    } else {
        leaderboard.push({ name: winner, wins: 1 });
    }
    res.status(200).json({ message: 'Leaderboard updated successfully.' });
});

// Get leaderboard endpoint
app.get('/leaderboard', (req, res) => {
    res.status(200).json(leaderboard);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
