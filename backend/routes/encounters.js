const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer les rencontres
router.get('/', async (req,res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      const result = await pool.query('SELECT * FROM encounters');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Endpoint pour récupérer une rencontre par ID
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
    const result = await pool.query('SELECT * FROM encounters WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les rencontres d'un client par ID
router.get('/customer/:id', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM encounters WHERE customer_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les évenements d'un delais en jour
router.get('/delay/days/:days', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { days } = req.params;
  if (!days) {
    return res.status(400).send('Days parameter is required');
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query(`SELECT * FROM encounters WHERE date > $1::date - INTERVAL \'${days} days\'`, [currentDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les rencontres
router.delete('/', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
    try {
      await pool.query('DELETE FROM encounters');
      res.json("All encounters have been deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// Endpoint pour supprimer une rencontre par ID
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
    const result = await pool.query('DELETE FROM encounters WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Encounter not found' });
    }
    res.json("Encounter has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les rencontres d'un client par ID
router.delete('/customer/:id', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
    }
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }

  try {
    const result = await pool.query('DELETE FROM encounters WHERE customer_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No encounters found for the given customer ID' });
    }
    res.json("Encounters for customer have been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
