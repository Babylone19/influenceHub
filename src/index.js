require('dotenv').config();
const express = require('express');
const cors = require('cors');
const influenceurRoutes = require('./routes/influenceur.route');
const authRoutes = require('./routes/auth.route');
// ...
const logger = require('./config/logger');
const { PORT } = require('./config/env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/influenceurs', influenceurRoutes);
app.use('/api/auth', authRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  logger.info(`Serveur démarré sur le port ${PORT}`);
});
