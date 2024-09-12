const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour ajouter une ligne d'historique à un client
router.post('/:customerID/:action', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
        console.log("The user is not connected")
        return res.status(401).json({ error: 'Not connected' });
    }
    const { customerID, action } = req.params;

    if (!action || !customerID) {
        return res.status(400).send('action and customerID parameters are required');
    }
    try {
        await pool.query('INSERT INTO customers_history (customer_id, action, date) VALUES ($1, $2, $3)', [ customerID, action, new Date() ]);
        res.json({ status: 'success', message: 'Customer history has been created' });
    } catch (error) {
        res.json({ status: 'failure', message: 'Customer history has not been created' });
        console.error(error);
    }
});

// Endpoint pour recupérer l'historique d'actions d'un client
router.get('/:customerID', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
        console.log("The user is not connected")
        return res.status(401).json({ error: 'Not connected' });
    }
    const { customerID } = req.params;

    if (!customerID) {
        return res.status(400).send('customerID parameters are required');
    }
    try {
        const customerHistoryResult = await pool.query('SELECT * FROM customers_history WHERE customer_id=$1', [ customerID ]);
        res.json(customerHistoryResult.rows);
    } catch (error) {
        res.json({ status: 'failure', message: 'Coach relations has not been returned' });
        console.error(error);
    }
});

// Endpoint pour retirer un client à un employé
router.delete('/:id', async (req, res) => {
    if (!req.headers.token || req.headers.token === 'undefined') {
      console.log("The user is not connected")
      return res.status(401).json({ error: 'Not connected' });
    }
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).send('id parameter are required');
    }
    try {
      await pool.query('DELETE FROM customers_history WHERE id=$1', [ id ]);
      res.json({ status: 'success', message: 'Coach / Customer relation has been deleted' });
    } catch (error) {
      res.json({ status: 'failure', message: 'Coach / Customer relation has not been deleted' });
      console.error(error);
    }
});

module.exports = router;
