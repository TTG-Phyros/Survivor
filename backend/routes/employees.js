const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

// Endpoint pour récupérer les employés
router.get('/', async (req, res) => {
  // console.log(req.headers.token);
  // console.log(req.headers);
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  console.log("token is good");
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows.map(row => {
      const imageBase64 = row.image ? Buffer.from(row.image).toString('base64') : null;
      return {
          ...row,
          image: imageBase64
      };
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
});

// Endpoint pour connecter un employé
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).send('email and password parameters are required');
  }
  try {
    const loginResponse = await axios.post(
      `${global.DISTANT_API_BASE_URL}/employees/login`,
      {
          email: email,
          password: password
      },
      {
          headers: {
              'Content-Type': 'application/json',
              'X-Group-Authorization': global.API_KEY
          }
      }
    );
    res.json({ status: 'success', message: 'User has been connected', token : loginResponse.data.access_token });
  } catch (error) {
    res.json({ status: 'failure', message: 'User has not been connected' });
    console.error(error);
  }
});

// Endpoint pour récupérer le nombre d'employés
router.get('/count', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT COUNT(*) FROM employees');
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer le nombre de coach
router.get('/coach/count', async (req,res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    const result = await pool.query('SELECT COUNT(*) FROM employees WHERE job = \'Coach\'');
    res.json({ status: 'success', value: result.rows[0].count  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer un employé par ID
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
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer l'image d'un employé par ID
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
    const result = await pool.query('SELECT image FROM employees WHERE id = $1', [`${id}`]);
    res.json({ image : Buffer.from(result.rows[0].image).toString('base64') });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les employés
router.delete('/', async (req, res) => {
  if (!req.headers.token || req.headers.token === 'undefined') {
    console.log("The user is not connected")
    return res.status(401).json({ error: 'Not connected' });
  }
  try {
    await pool.query('DELETE FROM employees');
    res.json("All employees have been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint pour supprimer un employé par ID
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
    const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json("Employee has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer l'image d'un employé par ID
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
    const result = await pool.query('UPDATE employees SET image = NULL WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json("Employee's image has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
