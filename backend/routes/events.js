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

// Endpoint pour récupérer les évenements du jour
router.get('/day', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT * FROM events WHERE date > $1::date - INTERVAL \'1 days\'', [currentDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les évenements de la semaine
router.get('/week', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT * FROM events WHERE date > $1::date - INTERVAL \'7 days\'', [currentDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les évenements du mois
router.get('/month', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT * FROM events WHERE date > $1::date - INTERVAL \'1 month\'', [currentDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les évenements du mois
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
    const result = await pool.query(`SELECT * FROM events WHERE date > $1::date - INTERVAL \'${days} days\'`, [currentDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre d'évenements
router.get('/count', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT COUNT(*) FROM events');
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre d'évenements du jour
router.get('/count/day', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT COUNT(*) FROM events WHERE date > $1::date - INTERVAL \'1 days\'', [currentDate]);
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre d'évenements de la semaine
router.get('/count/week', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT COUNT(*) FROM events WHERE date > $1::date - INTERVAL \'7 days\'', [currentDate]);
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre d'évenements du mois
router.get('/count/month', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query('SELECT COUNT(*) FROM events WHERE date > $1::date - INTERVAL \'1 month\'', [currentDate]);
    res.json({ status: 'success', value: result.rows[0].count  });
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
