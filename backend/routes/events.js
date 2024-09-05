const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer les évenements
router.get('/', async (req,res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      const result = await pool.query('SELECT * FROM events');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Endpoint pour récupérer un évenement par ID
router.get('/:id', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les évenements
router.delete('/', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      await pool.query('DELETE FROM events');
      res.json("All events have been deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Endpoint pour supprimer un évenement par ID
router.delete('/:id', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }

  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json("Event has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
