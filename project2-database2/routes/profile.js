const express = require('express');
const router = express.Router();
const { sql, poolConnect, pool } = require('../db');

router.get('/:role/:id', async (req, res) => {
    const { role, id } = req.params;
    const table = role === 'worker' ? 'WORKER' : 'CUSTOMER';
    await poolConnect;
    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * FROM ${table} WHERE id=@id`);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:role/:id', async (req, res) => {
    const { role, id } = req.params;
    const { name, email, phone } = req.body;
    const table = role === 'worker' ? 'WORKER' : 'CUSTOMER';
    await poolConnect;
    try {
        await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone', sql.VarChar, phone)
            .query(`UPDATE ${table} SET name=@name, email=@email, phone=@phone WHERE id=@id`);
        res.json({ success: true, message: 'Profile updated' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
