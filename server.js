const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/openings', (req, res) => {
    //res.send('<h1>Hello from Express</h1>');
    //res.json();
    //res.sendStatus(400);
    res.status(200).json({ success: true, msg: 'Show all openings' });
});

app.get('/api/v1/openings/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Get opening ${req.params.id}` });
});

app.post('/api/v1/openings', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new opening' });
});

app.put('/api/v1/openings/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update opening ${req.params.id}` });
});

app.delete('/api/v1/openings/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete opening ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));