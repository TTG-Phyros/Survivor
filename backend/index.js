const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Configurer le middleware
app.use(cors());
app.use(bodyParser.json());

// Importer les routes
const clothesRoutes = require('./routes/clothes');
const customerRoutes = require('./routes/customers');
const employeeRoutes = require('./routes/employees');
const encountersRoutes = require('./routes/encounters');
const eventsRoutes = require('./routes/events');
const refresh_dataRoutes = require('./routes/refresh_data');
const tipsRoutes = require('./routes/tips');

// Utiliser les routes
app.use('/api/clothes', clothesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/encounters', encountersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/refresh_data', refresh_dataRoutes);
app.use('/api/tips', tipsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
