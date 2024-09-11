const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour ajouter un client à un employé
router.post('/:employeeID/:customerID', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
        console.log("The user is not connected")
        return res.status(401).json({ error: 'Not connected' });
    }
    const { employeeID, customerID } = req.params;

    if (!employeeID || !customerID) {
        return res.status(400).send('employeeID and customerID parameters are required');
    }
    try {
        const employeesRelationResult = await pool.query('SELECT * FROM CustomersRelations WHERE coach_id=$1 AND customer_id=$2', [ employeeID, customerID ]);
        if (!employeesRelationResult.rows.length > 0) {
        await pool.query('INSERT INTO CustomersRelations (customer_id, coach_id, update_date) VALUES ($1, $2, $3)', [ customerID, employeeID, new Date() ]);
        }
        res.json({ status: 'success', message: 'Coach / Customer relation has been created' });
    } catch (error) {
        res.json({ status: 'failure', message: 'Coach / Customer relation has not been created' });
        console.error(error);
    }
});

// Endpoint pour recupérer les relations d'un employé
router.get('/:employeeID', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
        console.log("The user is not connected")
        return res.status(401).json({ error: 'Not connected' });
    }
    const { employeeID } = req.params;

    if (!employeeID) {
        return res.status(400).send('employeeID parameters are required');
    }
    try {
        const employeesRelationResult = await pool.query('SELECT * FROM CustomersRelations WHERE coach_id=$1', [ employeeID ]);
        res.json(employeesRelationResult.rows);
    } catch (error) {
        res.json({ status: 'failure', message: 'Coach relations has not been returned' });
        console.error(error);
    }
});

// Endpoint pour retirer un client à un employé
router.delete('/:employeeID/:customerID', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
      return res.status(401).json({ error: 'Not connected' });
    }
    const { employeeID, customerID } = req.params;
  
    if (!employeeID || !customerID) {
      return res.status(400).send('employeeID and customerID parameters are required');
    }
    try {
      await pool.query('DELETE FROM CustomersRelations WHERE coach_id=$1 AND customer_id=$2', [ employeeID, customerID ]);
      res.json({ status: 'success', message: 'Coach / Customer relation has been deleted' });
    } catch (error) {
      res.json({ status: 'failure', message: 'Coach / Customer relation has not been deleted' });
      console.error(error);
    }
});

module.exports = router;
