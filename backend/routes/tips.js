const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer les conseils
router.get('/', async (req, res) => {
    if (!global.ACCOUNT_TOKEN) {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      const result = await pool.query('SELECT * FROM tips');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Endpoint pour supprimer les conseils
router.delete('/', async (req, res) => {
    if (!global.ACCOUNT_TOKEN) {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      await pool.query('DELETE FROM tips');
      res.json("All tips have been deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;
