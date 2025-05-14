const express = require('express');
const router = express.Router();
const { sql, poolConnect, pool } = require('../db');

router.get('/', async (req, res) => {
    const { category, subcategory } = req.query;

    if (!category || !subcategory) {
        return res.status(400).send('Category and Subcategory are required.');
    }

    await poolConnect;  // Make sure the connection is established

    try {
        const result = await pool.request()
            .input('category', sql.VarChar, category)
            .input('subcategory', sql.VarChar, subcategory)
            .query('SELECT * FROM worker WHERE category = @category AND subcategory = @subcategory');

        // If no results, return a message
        if (result.recordset.length === 0) {
            return res.status(404).send('No workers found with the specified category and subcategory.');
        }

        res.json(result.recordset);  // Send the found workers
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching workers.');
    }
});

module.exports = router;
