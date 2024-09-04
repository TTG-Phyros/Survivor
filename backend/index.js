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
app.get('/api/employees/:id', async (req, res) => {
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
app.get('/api/employees/:id/image', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT image FROM employees WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.type('image/jpeg'); // Changez le type selon le format de l'image
      res.send(result.rows[0].image); // Assurez-vous que l'image est stockée sous forme de buffer
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour récupérer les clients
app.get('/api/customers', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM customers');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Endpoint pour récupérer un client par ID
app.get('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('ID parameter is required');
    }
    try {
        const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
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
app.get('/api/customers/:id/payments_history', async (req, res) => {
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
app.get('/api/customers/:id/clothes', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID parameter is required');
  }
  try {
    const result = await pool.query('SELECT * FROM clothes WHERE customer_id = $1', [id]);
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
app.get('/api/encounters/:id', async (req, res) => {
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
app.get('/api/encounters/customer/:id', async (req, res) => {
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
app.get('/api/events/:id', async (req, res) => {
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

// Endpoint pour supprimer les employés
app.delete('/api/employees', async (req, res) => {
  try {
    await pool.query('DELETE FROM employees');
    res.json("All employees have been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint pour supprimer un employé par ID
app.delete('/api/employees/:id', async (req, res) => {
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
app.delete('/api/employees/:id/image', async (req, res) => {
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

// Endpoint pour supprimer les clients
app.delete('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM customers');
    res.json("All customers have been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint pour supprimer un client par ID
app.delete('/api/customers/:id', async (req, res) => {
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
app.delete('/api/customers/:id/image', async (req, res) => {
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
app.delete('/api/customers/:id/payments_history', async (req, res) => {
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
app.delete('/api/customers/:id/clothes', async (req, res) => {
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


// Endpoint pour supprimer les rencontres
app.delete('/api/encounters', async (req, res) => {
  try {
    await pool.query('DELETE FROM encounters');
    res.json("All encounters have been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Endpoint pour supprimer une rencontre par ID
app.delete('/api/encounters/:id', async (req, res) => {
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
app.delete('/api/encounters/customer/:id', async (req, res) => {
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

// Endpoint pour supprimer les conseils
app.delete('/api/tips', async (req, res) => {
  try {
    await pool.query('DELETE FROM tips');
    res.json("All tips have been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer les évenements
app.delete('/api/events', async (req, res) => {
  try {
    await pool.query('DELETE FROM events');
    res.json("All events have been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour supprimer un évenement par ID
app.delete('/api/events/:id', async (req, res) => {
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

// Endpoint pour supprimer l'image d'un vêtement par ID
app.delete('/api/clothes/:id/image', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('ID parameter is required');
  }

  try {
    // Mettre à jour la colonne `image` pour le vêtement spécifique
    const result = await pool.query('UPDATE clothes SET image = NULL WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    res.json("Image has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour refresh les données des employés
app.get('/api/refresh_data/employees', async (req, res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/employees`, {
      headers: {
        'X-Group-Authorization': API_KEY,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      },
    });

    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const employeeResponse = await axios.get(`${DISTANT_API_BASE_URL}/employees/${id}`, {
        headers: {
          'X-Group-Authorization': API_KEY,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        },
      });

      const employeeData = employeeResponse.data;
      const existing_line = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);

      if (existing_line.rows.length > 0) {
        await pool.query(
          'UPDATE employees SET email=$1, firstname=$3, lastname=$2, birthdate=$4, gender=$5, job=$6 WHERE id=$7',
          [
            employeeData.email, employeeData.surname, employeeData.name,
            employeeData.birth_date, employeeData.gender, employeeData.work, id,
          ]
        );
      } else {
        await pool.query(
          'INSERT INTO employees (id, email, firstname, lastname, birthdate, gender, job, image) VALUES ($1, $2, $4, $3, $5, $6, $7, NULL)',
          [
            id, employeeData.email, employeeData.surname,
            employeeData.name, employeeData.birth_date, employeeData.gender, employeeData.work,
          ]
        );
      }
    }));

    res.json({ status: 'success', message: 'Employees have been refreshed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
});


// Endpoint pour refresh les données des clients
app.get('/api/refresh_data/customers', async (req, res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/customers`, {
      headers: {
        'X-Group-Authorization': API_KEY,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });
    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const customerResponse = await axios.get(`${DISTANT_API_BASE_URL}/customers/${id}`, {
        headers: {
          'X-Group-Authorization': API_KEY,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });

      const customerData = customerResponse.data;
      const existing_line = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);

      if (existing_line.rows.length > 0) {
        await pool.query('UPDATE customers SET email=$1, firstname=$3, lastname=$2, birthdate=$4, gender=$5, description=$6, astrological_sign=$7, phone_number=$8, address=$9 WHERE id=$10',
          [customerData.email, customerData.surname, customerData.name,
            customerData.birth_date, customerData.gender, customerData.description,
            customerData.astrological_sign, customerData.phone_number, customerData.address, id]);
      } else {
        await pool.query('INSERT INTO customers (id, email, firstname, lastname, birthdate, gender, description, astrological_sign, phone_number, address, image) VALUES ($1, $2, $4, $3, $5, $6, $7, $8, $9, $10, NULL)',
          [id, customerData.email, customerData.surname, customerData.name,
            customerData.birth_date, customerData.gender, customerData.description,
            customerData.astrological_sign, customerData.phone_number, customerData.address]);
      }
    }));

    res.json("Customers have been refreshed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour refresh les données des vêtements
app.get('/api/refresh_data/clothes', async (req, res) => {
  try {
    const customer_ids = await pool.query('SELECT id FROM customers');
    const ids = customer_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const response = await axios.get(`${DISTANT_API_BASE_URL}/customers/${id}/clothes`, {
        headers: {
          'X-Group-Authorization': API_KEY,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });

      await Promise.all(response.data.map(async (row) => {
        try {
          const existing_line = await pool.query('SELECT * FROM clothes WHERE id = $1', [row.id]);
          if (existing_line.rows.length > 0) {
            await pool.query('UPDATE clothes SET type=$1 WHERE id=$2', [row.type, row.id]);
          } else {
            await pool.query('INSERT INTO clothes (id, type, image) VALUES ($1, $2, NULL)', [row.id, row.type]);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Insert / Update Error');
        }
      }));
    }));

    res.json("Clothes have been refreshed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour refresh les données des conseils
app.get('/api/refresh_data/tips', async (req, res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/tips`, {
      headers: {
        'X-Group-Authorization': API_KEY,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });

    await Promise.all(response.data.map(async (row) => {
      try {
        const existing_line = await pool.query('SELECT * FROM tips WHERE id = $1', [row.id]);
        if (existing_line.rows.length > 0) {
          await pool.query('UPDATE tips SET title=$1, tip=$2 WHERE id=$3', [row.title, row.tip, row.id]);
        } else {
          await pool.query('INSERT INTO tips (id, title, tip) VALUES ($1, $2, $3)', [row.id, row.title, row.tip]);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Insert / Update Error');
      }
    }));

    res.json("Tips have been refreshed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour refresh les données des rencontres
app.get('/api/refresh_data/encounters', async (req, res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/encounters`, {
      headers: {
        'X-Group-Authorization': API_KEY,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });
    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const encounterResponse = await axios.get(`${DISTANT_API_BASE_URL}/encounters/${id}`, {
        headers: {
          'X-Group-Authorization': API_KEY,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });

      const encounterData = encounterResponse.data;
      const existing_line = await pool.query('SELECT * FROM encounters WHERE id = $1', [id]);

      if (existing_line.rows.length > 0) {
        await pool.query('UPDATE encounters SET customer_id=$1, date=$2, rating=$3, comment=$4, source=$5 WHERE id=$6',
          [encounterData.customer_id, encounterData.date, encounterData.rating,
            encounterData.comment, encounterData.source, id]);
      } else {
        await pool.query('INSERT INTO encounters (id, customer_id, date, rating, comment, source) VALUES ($1, $2, $3, $4, $5, $6)',
          [id, encounterData.customer_id, encounterData.date,
            encounterData.rating, encounterData.comment, encounterData.source]);
      }
    }));

    res.json("Encounters have been refreshed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint pour refresh les données des évenements
app.get('/api/refresh_data/events', async (req, res) => {
  try {
    const response = await axios.get(`${DISTANT_API_BASE_URL}/events`, {
      headers: {
        'X-Group-Authorization': API_KEY,
        'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
      }
    });
    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const eventResponse = await axios.get(`${DISTANT_API_BASE_URL}/events/${id}`, {
        headers: {
          'X-Group-Authorization': API_KEY,
          'Authorization': `Bearer ${ACCOUNT_TOKEN}`,
        }
      });

      const eventData = eventResponse.data;
      const existing_line = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

      if (existing_line.rows.length > 0) {
        await pool.query('UPDATE events SET name=$1, date=$2, max_participants=$3, location_x=$4, location_y=$5, type=$6, employee_id=$7, location_name=$8 WHERE id=$9',
          [eventData.name, eventData.date, eventData.max_participants,
            eventData.location_x, eventData.location_y, eventData.type,
            eventData.employee_id, eventData.location_name, id]);
      } else {
        await pool.query('INSERT INTO events (id, name, date, max_participants, location_x, location_y, type, employee_id, location_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [id, eventData.name, eventData.date,
            eventData.max_participants, eventData.location_x, eventData.location_y,
            eventData.type, eventData.employee_id, eventData.location_name]);
      }
    }));

    res.json("Events have been refreshed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
