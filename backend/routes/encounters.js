const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer les rencontres
router.get('/', async (req,res) => {
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

// Endpoint pour supprimer les rencontres
router.delete('/', async (req, res) => {
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
