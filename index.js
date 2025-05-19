const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

const FILE = './leaderboard.json';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.post('/save-score', (req, res) => {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') return res.status(400).send('Invalid data');

    let data = [];
    if (fs.existsSync(FILE)) {
        data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
    }

    data.push({ name, score });
    data.sort((a, b) => b.score - a.score);
    data = data.slice(0, 10);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
