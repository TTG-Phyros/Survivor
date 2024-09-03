const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

// Définir l'URL de base pour l'API distante
const DISTANT_API_BASE_URL = 'https://soul-connection.fr/api';
const API_KEY = process.env.API_KEY;
var ACCOUNT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqZWFubmUubWFydGluQHNvdWwtY29ubmVjdGlvbi5mciIsIm5hbWUiOiJKZWFubmUiLCJzdXJuYW1lIjoiTWFydGluIiwiZXhwIjoxNzI3MTY5MTcxfQ.6GIkltTh6LBjLDIr_XAKCkPv5VlvNCbjGfbI5jRl5aA';


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
// app.get('/api/employees/login', verifyToken, async (req,res) => {j
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

// Endpoint pour refresh les données des employés
app.get('/api/refresh_data/employees', async (req,res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/employees`, {
      headers: {
        'X-Group-Authorization': `${API_KEY}`,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });
    const ids = response.data.map(({ id }) => id);
    console.log(ids);

    ids.forEach(async id => {
      const response = await axios.get(`${DISTANT_API_BASE_URL}/employees/${id}`, {
        headers: {
          'X-Group-Authorization': `${API_KEY}`,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });
      console.log(response.data);

      try {
        console.log(`Importing employee n°${id}`);
        const existing_line = await pool.query('SELECT * FROM employees WHERE id = $1', [`${id}`]);

        if (existing_line.rows.length > 0) {
          await pool.query('UPDATE employees SET email=$1, firstname=$2, lastname=$3, birthdate=$4, gender=$5, job=$6 WHERE id=$7',
            [`${response.data.email}`, `${response.data.surname}`, `${response.data.name}`,
              `${response.data.birth_date}`, `${response.data.gender}`, `${response.data.work}`, `${response.data.id}`]);
        } else {
          await pool.query('INSERT INTO employees (id, email, firstname, lastname, birthdate, gender, job, image) VALUES ($1, $2, $3, $4, $5, $6, $7, NULL)',
            [`${response.data.id}`, `${response.data.email}`, `${response.data.surname}`,
              `${response.data.name}`, `${response.data.birth_date}`, `${response.data.gender}`, `${response.data.work}`]);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Insert / Update Error');
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ID array loop Error');
  }
});

// Endpoint pour refresh les données des clients
app.get('/api/refresh_data/customers', async (req,res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/customers`, {
      headers: {
        'X-Group-Authorization': `${API_KEY}`,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });
    const ids = response.data.map(({ id }) => id);
    console.log(ids);

    ids.forEach(async id => {
      const response = await axios.get(`${DISTANT_API_BASE_URL}/customers/${id}`, {
        headers: {
          'X-Group-Authorization': `${API_KEY}`,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });
      console.log(response.data);

      try {
        console.log(`Importing customer n°${id}`);
        const existing_line = await pool.query('SELECT * FROM customers WHERE id = $1', [`${id}`]);

        if (existing_line.rows.length > 0) {
          await pool.query('UPDATE customers SET email=$1, firstname=$2, lastname=$3, birthdate=$4, gender=$5, description=$6, astrological_sign=$7, phone_number=$8, address=$9 WHERE id=$10',
            [`${response.data.email}`, `${response.data.surname}`, `${response.data.name}`,
              `${response.data.birth_date}`, `${response.data.gender}`, `${response.data.description}`,
              `${response.data.astrological_sign}`, `${response.data.phone_number}`, `${response.data.address}`, `${response.data.id}`]);
        } else {
          await pool.query('INSERT INTO customers (id, email, firstname, lastname, birthdate, gender, description, astrological_sign, phone_number, address, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NULL)',
            [`${response.data.id}`, `${response.data.email}`, `${response.data.surname}`, `${response.data.name}`,
              `${response.data.birth_date}`, `${response.data.gender}`, `${response.data.description}`,
              `${response.data.astrological_sign}`, `${response.data.phone_number}`, `${response.data.address}`]);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Insert / Update Error');
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ID array loop Error');
  }
});

// Endpoint pour refresh les données des vêtements
app.get('/api/refresh_data/clothes', async (req,res) => {
  try {
    const customer_ids = await pool.query('SELECT id FROM customers');
    console.log(customer_ids.rows);
    
    customer_ids.rows.forEach(async ({id}) => {
      const response = await axios.get(`${DISTANT_API_BASE_URL}/customers/${id}/clothes`, {
        headers: {
          'X-Group-Authorization': `${API_KEY}`,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });

      response.data.forEach(async row => {
        try {
          console.log(`Importing cloth n°${row.id}`);
          const existing_line = await pool.query('SELECT * FROM clothes WHERE id = $1', [`${row.id}`]);
          if (existing_line.rows.length > 0) {
            await pool.query('UPDATE clothes SET type=$1 WHERE id=$2', [`${row.type}`, `${row.id}`]);
          } else {
            await pool.query('INSERT INTO clothes (id, type, image) VALUES ($1, $2, NULL)', [`${row.id}`, `${row.type}`]);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Insert / Update Error');
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ID array loop Error');
  }
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
