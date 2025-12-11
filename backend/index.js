const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dashboardRoutes = require('./routes/dashboardRoutes');
const skillTreeRoutes = require('./routes/skillTreeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/skill-tree', skillTreeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al backend con Node.js y Express' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
