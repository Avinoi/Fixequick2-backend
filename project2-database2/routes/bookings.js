const express = require('express');
const router = express.Router();
const { sql, poolConnect, pool } = require('../db');

router.post('/', async (req, res) => {
    const { customerId, workerId, serviceDate } = req.body;
    await poolConnect;
    try {
        await pool.request()
            .input('customerId', sql.Int, customerId)
            .input('workerId', sql.Int, workerId)
            .input('serviceDate', sql.DateTime, serviceDate)
            .query('INSERT INTO BOOKINGS (customer_id, worker_id, service_date) VALUES (@customerId, @workerId, @serviceDate)');
        res.json({ success: true, message: 'Booking successful' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    await poolConnect;
    try {
        const result = await pool.request()
            .input('customerId', sql.Int, customerId)
            .query('SELECT * FROM BOOKINGS WHERE customer_id=@customerId');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
