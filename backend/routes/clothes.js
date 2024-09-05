const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint pour récupérer l'image d'un vêtement par ID
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
      const result = await pool.query('SELECT image FROM clothes WHERE id = $1', [`${id}`]);
      res.json({ image : Buffer.from(result.rows[0].image).toString('base64') });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Endpoint pour supprimer l'image d'un vêtement par ID
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

module.exports = router;
