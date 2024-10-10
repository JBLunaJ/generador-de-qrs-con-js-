// routes/qrRoutes.js
const express = require('express');
const QRCode = require('qrcode');

const router = express.Router();
let accounts = {}; // Almacenamiento temporal de cuentas y saldos

// Generar QR
router.post('/generate-qr', async (req, res) => {
    const { account_id, amount } = req.body;
    const qrData = { account_id, amount };
    try {
        const qr_code = await QRCode.toDataURL(JSON.stringify(qrData));
        res.json({ qr_code });
    } catch (err) {
        res.status(500).json({ error: 'Error generating QR code' });
    }
});


// Recargar saldo
router.post('/recharge', (req, res) => {
    const { account_id, amount } = req.body;
    if (!accounts[account_id]) accounts[account_id] = { balance: 0 };
    accounts[account_id].balance += amount;
    res.json({ new_balance: accounts[account_id].balance });
});


// Consultar saldo
router.get('/balance/:account_id', (req, res) => {
    const account_id = req.params.account_id;
    const balance = accounts[account_id] ? accounts[account_id].balance : 0;
    res.json({ balance });
});

module.exports = router;
