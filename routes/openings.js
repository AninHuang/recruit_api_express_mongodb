const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.send('<h1>Hello from Express</h1>');
    //res.json();
    //res.sendStatus(400);
    res.status(200).json({ success: true, msg: 'Show all openings' });
});

router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Get opening ${req.params.id}` });
});

router.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new opening' });
});

router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update opening ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete opening ${req.params.id}` });
});

module.exports = router;