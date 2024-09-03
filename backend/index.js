const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Récupérer variables d'environnement
require('dotenv').config();

// Configurer le middleware
app.use(cors());
app.use(bodyParser.json());

// Configurer la connexion à PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});



// app.get('/api/token', async (req, res) => {
//   var id;
//   if (req.query.id) {
//     id = req.query.id;
//   }

//   if (!id) {
//     return res.status(400).send('ID parameter is required');
//   }
//   console.log(id);
//   return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '1h' });
// });

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// Endpoint pour récupérer les employés
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
});

// Endpoint pour connecter un employé
// app.get('/api/employees/login', verifyToken, async (req,res) => {
//   try {
//     // const result = await pool.query('');
//     // res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// Endpoint pour récupérer un employé par ID
app.get('/api/employees/employee_id', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer l'image d'un employé par ID
app.get('/api/employees/employee_id/image', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT image FROM employees WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les clients
app.get('/api/customers', async (req,res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer un client par ID
app.get('/api/customers/customer_id', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer l'image d'un client par ID
app.get('/api/customers/customer_id/image', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT image FROM customers WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les historiques de paiement d'un client par ID
app.get('/api/customers/customer_id/payments_history', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM payments WHERE customer_id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les vêtements d'un client par ID
app.get('/api/customers/customer_id/clothes', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM clothes WHERE customer_id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les rencontres
app.get('/api/encounters', async (req,res) => {
  try {
    const result = await pool.query('SELECT * FROM encounters');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer une rencontre par ID
app.get('/api/encounters/encounter_id', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM encounters WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les rencontres d'un client par ID
app.get('/api/encounters/customer/customer_id', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM encounters WHERE customer_id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les conseils
app.get('/api/tips', async (req,res) => {
  try {
    const result = await pool.query('SELECT * FROM tips');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les évenements
app.get('/api/events', async (req,res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer un évenement par ID
app.get('/api/events/event_id', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer l'image d'un vêtement par ID
app.get('/api/clothes/clothe_id/image', async (req,res) => {
  var id;
  if (req.query.id) {
    id = req.query.id;
  }

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT image FROM clothes WHERE id = $1', [`${id}`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
