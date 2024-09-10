const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

// Endpoint pour refresh les données des employés
router.get('/employees', async (req, res) => {
  try {
    const response = await axios.get(`${global.DISTANT_API_BASE_URL}/employees`, {
      headers: {
        'X-Group-Authorization': global.API_KEY,
        'Authorization': `Bearer ${req.headers.token}`,
      },
    });

    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const employeeResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/employees/${id}`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
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
          'INSERT INTO employees (id, email, password, token, firstname, lastname, birthdate, gender, job, image) VALUES ($1, $2, NULL, NULL, $4, $3, $5, $6, $7, NULL)',
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
  console.log("Refreshed employees");
});

// Endpoint pour refresh les données des employés
router.get('/employees/images', async (req, res) => {
  try {
    const employees_ids = await pool.query('SELECT id FROM employees');
    const ids = employees_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const imageResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/employees/${id}/image`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        },
        responseType: 'arraybuffer'
      });

      const imageData = imageResponse.data;
      // console.log(imageData);
      await pool.query('UPDATE employees SET image=$1 WHERE id=$2', [imageData, id]);
    }));

    res.json({ status: 'success', message: 'Employees images have been refreshed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
  console.log("Refreshed employees image");
});

// Endpoint pour refresh les données des clients
router.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${global.DISTANT_API_BASE_URL}/customers`, {
      headers: {
        'X-Group-Authorization': global.API_KEY,
        'Authorization': `Bearer ${req.headers.token}`,
      }
    });
    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const customerResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/customers/${id}`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
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

    res.json({status: 'success', message: 'Customers have been refreshed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log("Refreshed customers");
});

// Endpoint pour refresh les données des clients
router.get('/customers/images', async (req, res) => {
  try {
    const customers_ids = await pool.query('SELECT id FROM customers');
    const ids = customers_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const imageResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/customers/${id}/image`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        },
        responseType: 'arraybuffer'
      });

      const imageData = imageResponse.data;
      // console.log(imageData);
      await pool.query('UPDATE customers SET image=$1 WHERE id=$2', [imageData, id]);
    }));

    res.json({ status: 'success', message: 'Customers images have been refreshed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
  console.log("Refreshed customers image");
});

// Endpoint pour refresh les données des vêtements
router.get('/clothes', async (req, res) => {
  try {
    const customer_ids = await pool.query('SELECT id FROM customers');
    const ids = customer_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const response = await axios.get(`${global.DISTANT_API_BASE_URL}/customers/${id}/clothes`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        }
      });

      await Promise.all(response.data.map(async (row) => {
        try {
          const existing_line = await pool.query('SELECT * FROM clothes WHERE id = $1', [row.id]);
          if (existing_line.rows.length > 0) {
            await pool.query('UPDATE clothes SET type=$1, customer_id=$2 WHERE id=$3', [row.type, id, row.id]);
          } else {
            await pool.query('INSERT INTO clothes (id, type, image, customer_id) VALUES ($1, $2, NULL, $3)', [row.id, row.type, id]);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Insert / Update Error');
        }
      }));
    }));

    res.json({status: 'success', message: 'Clothes have been refreshed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  
  }
  console.log("Refreshed clothes");
});

// Endpoint pour refresh les données des vêtements
router.get('/clothes/images', async (req, res) => {
  try {
    const clothes_ids = await pool.query('SELECT id FROM clothes');
    const ids = clothes_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const imageResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/clothes/${id}/image`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        },
        responseType: 'arraybuffer'
      });

      const imageData = imageResponse.data;
      // console.log(imageData);
      await pool.query('UPDATE clothes SET image=$1 WHERE id=$2', [imageData, id]);
    }));

    res.json({ status: 'success', message: 'Clothes images have been refreshed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
  console.log("Refreshed clothes images");
});

// Endpoint pour refresh les données des conseils
router.get('/tips', async (req, res) => {
  try {
    const response = await axios.get(`${global.DISTANT_API_BASE_URL}/tips`, {
      headers: {
        'X-Group-Authorization': global.API_KEY,
        'Authorization': `Bearer ${req.headers.token}`,
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

    res.json({status: 'success', message: 'Tips have been refreshed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log("Refreshed tips");
});

// Endpoint pour refresh les données des rencontres
router.get('/encounters', async (req, res) => {
  try {
    const response = await axios.get(`${global.DISTANT_API_BASE_URL}/encounters`, {
      headers: {
        'X-Group-Authorization': global.API_KEY,
        'Authorization': `Bearer ${req.headers.token}`,
      }
    });

    const ids = response.data.map(({ id }) => id);
    // console.log(ids);

    for (const id of ids) {
      try {
        const response = await axios.get(`${global.DISTANT_API_BASE_URL}/encounters/${id}`, {
          headers: {
            'X-Group-Authorization': `${global.API_KEY}`,
            'Authorization': `Bearer ${req.headers.token}`,
          }
        });

        // console.log(response.data);
        // console.log(`Importing encounter n°${id}`);
        const existing_line = await pool.query('SELECT * FROM encounters WHERE id = $1', [id]);

        if (existing_line.rows.length > 0) {
          await pool.query('UPDATE encounters SET customer_id=$1, date=$2, rating=$3, comment=$4, source=$5 WHERE id=$6',
            [response.data.customer_id, response.data.date, response.data.rating,
              response.data.comment, response.data.source, response.data.id]);
        } else {
          await pool.query('INSERT INTO encounters (id, customer_id, date, rating, comment, source) VALUES ($1, $2, $3, $4, $5, $6)',
            [response.data.id, response.data.customer_id, response.data.date,
              response.data.rating, response.data.comment, response.data.source]);
        }
      } catch (err) {
        console.error({ status: 'error', message: `Error processing encounter ID ${id}: ${err.message}` });
      }
    }

    res.json({ status: 'success', message: 'Encounters have been refreshed' });

  } catch (err) {
    console.error({ status: 'error', message: err.message });
    res.status(500).send('Failed to refresh encounters');
  }
  console.log("Refreshed encounters");
});

// Endpoint pour refresh les données des évenements
router.get('/events', async (req, res) => {
  try {
    const response = await axios.get(`${global.DISTANT_API_BASE_URL}/events`, {
      headers: {
        'X-Group-Authorization': global.API_KEY,
        'Authorization': `Bearer ${req.headers.token}`,
      }
    });
    const ids = response.data.map(({ id }) => id);

    await Promise.all(ids.map(async (id) => {
      const eventResponse = await axios.get(`${global.DISTANT_API_BASE_URL}/events/${id}`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        }
      });

      const eventData = eventResponse.data;
      const existing_line = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

      if (existing_line.rows.length > 0) {
        await pool.query('UPDATE events SET name=$1, date=$2, duration=$3, max_participants=$4, location_x=$5, location_y=$6, type=$7, employee_id=$8, location_name=$9 WHERE id=$10',
          [eventData.name, eventData.date, eventData.duration, eventData.max_participants,
            eventData.location_x, eventData.location_y, eventData.type,
            eventData.employee_id, eventData.location_name, id]);
      } else {
        await pool.query('INSERT INTO events (id, name, date, duration, max_participants, location_x, location_y, type, employee_id, location_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [id, eventData.name, eventData.date, eventData.duration,
            eventData.max_participants, eventData.location_x, eventData.location_y,
            eventData.type, eventData.employee_id, eventData.location_name]);
      }
    }));

    res.json({status: 'success', message: 'Events have been refreshed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log("Refreshed events");
});

// Endpoint pour refresh les données des paiements
router.get('/payments', async (req, res) => {
  try {
    const customer_ids = await pool.query('SELECT id FROM customers');
    const ids = customer_ids.rows.map(row => row.id);

    await Promise.all(ids.map(async (id) => {
      const response = await axios.get(`${global.DISTANT_API_BASE_URL}/customers/${id}/payments_history`, {
        headers: {
          'X-Group-Authorization': global.API_KEY,
          'Authorization': `Bearer ${req.headers.token}`,
        }
      });

      await Promise.all(response.data.map(async (row) => {
        try {
          // console.log(`Importing payment n°${row.id}`);
          const existing_line = await pool.query('SELECT * FROM payments WHERE id = $1', [row.id]);
          if (existing_line.rows.length > 0) {
            await pool.query('UPDATE payments SET date=$1, payment_method=$2, amount=$3, comment=$4 WHERE id=$5',
              [row.date, row.payment_method, row.amount, row.comment, row.id]);
          } else {
            await pool.query('INSERT INTO payments (id, date, payment_method, amount, comment) VALUES ($1, $2, $3, $4, $5)',
              [row.id, row.date, row.payment_method, row.amount, row.comment]);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Insert / Update Error');
        }
      }));
    }));

    res.json({status: 'success', message: 'Payments have been refreshed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log("Refreshed payments");
});

module.exports = router;
