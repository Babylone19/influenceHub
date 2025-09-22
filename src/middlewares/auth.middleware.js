const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const prisma = require('../config/db');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id: decoded.userId } });
    if (!utilisateur) throw new Error('Utilisateur non trouvé');
    req.user = utilisateur;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authMiddleware;
