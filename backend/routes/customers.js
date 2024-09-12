const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer les clients
router.get('/', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows.map(row => {
      const imageBase64 = row.image ? Buffer.from(row.image).toString('base64') : null;
      return {
          ...row,
          image: imageBase64
      };
    }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour ajouter un nouveau client
router.post('/', async (req, res) => {
  const { email, firstname, lastname, birthdate, gender, description, astrological_sign, phone_number, address, image } = req.body;

  if (!email || !firstname || !lastname || !birthdate || !gender || !description, !astrological_sign, !phone_number, !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let imageBinary = null;
  if (image) {
    try {
      imageBinary = Buffer.from(image, 'base64');
    } catch (error) {
      return res.status(400).json({ error: 'Invalid image format' });
    }
  }

  try {
    const result = await pool.query(
      `INSERT INTO customers (email, firstname, lastname, birthdate, gender, description, astrological_sign, phone_number, address, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [email, firstname, lastname, birthdate, gender, description, astrological_sign, phone_number, address, imageBinary]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
});

// Endpoint pour récupérer le nombre de clients
router.get('/count', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT COUNT(*) FROM customers');
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre de clients qui ont eu une rencontre
router.get('/count/encounters', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT COUNT(DISTINCT customers.id) FROM customers JOIN encounters ON customers.id = encounters.customer_id');
    res.json({ status: 'success', value: result.rows[0].count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les infos basiques des clients
router.get('/basic_infos', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT id, firstname, lastname, email, phone_number, astrological_sign FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les infos basiques des clients dans un intervale de jours
router.get('/basic_infos/:days', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { days } = req.params;
  if (!days) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    let currentDate = new Date().toJSON().slice(0, 10);
    const result = await pool.query(
      `SELECT id, firstname, lastname, email, phone_number, astrological_sign, creation_date FROM customers WHERE creation_date > $1::date - INTERVAL \'${days} days\'`,
      [currentDate]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer un client par ID
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
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    result.rows = result.rows.map(row => {
      const imageBase64 = row.image ? Buffer.from(row.image).toString('base64') : null;
      return {
          ...row,
          image: imageBase64
      };
    })
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer l'image d'un client par ID
router.get('/:id/image', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT image FROM customers WHERE id = $1', [`${id}`]);
    res.json({ image : Buffer.from(result.rows[0].image).toString('base64') });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les historiques de paiement d'un client par ID
router.get('/:id/payments_history', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM payments WHERE customer_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les vêtements d'un client par ID
router.get('/:id/clothes', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM clothes WHERE customer_id = $1', [id]);
    res.json(result.rows.map(row => {
      const imageBase64 = row.image ? Buffer.from(row.image).toString('base64') : null;
      return {
          ...row,
          image: imageBase64
      };
    }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les clients
router.delete('/', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    await pool.query('DELETE FROM customers');
    res.json("All customers have been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint pour supprimer un client par ID
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
    const result = await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json("Customer has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Endpoint pour supprimer l'image d'un client par ID
router.delete('/:id/image', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }

  try {
    const result = await pool.query('UPDATE customers SET image = NULL WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found or image already deleted' });
    }
    res.json("Customer image has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les historiques de paiement d'un client par ID
router.delete('/:id/payments_history', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM payments WHERE customer_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No payment history found for this customer' });
    }
    res.json("Customer's payment history has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les vêtements d'un client par ID
router.delete('/:id/clothes', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM clothes WHERE customer_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No clothes found for this customer' });
    }
    res.json("Customer's clothes have been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
