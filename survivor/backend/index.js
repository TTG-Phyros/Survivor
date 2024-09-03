const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Configurer le middleware
app.use(cors());
app.use(bodyParser.json());

// Configurer la connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'survivor',
  password: 'postgres',
  port: 5432,
});

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

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
