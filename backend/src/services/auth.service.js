const prisma = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const bcrypt = require('bcryptjs');

const authService = {
  async inscription(email, motDePasse, nom) {
    const motDePasseHache = await bcrypt.hash(motDePasse, 10);
    return await prisma.utilisateur.create({
      data: { email, motDePasse: motDePasseHache, nom }
    });
  },

  async connexion(email, motDePasse) {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });
    if (!utilisateur) throw new Error('Utilisateur non trouvé');

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) throw new Error('Mot de passe incorrect');

    const token = jwt.sign({ userId: utilisateur.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, utilisateur: { id: utilisateur.id, email: utilisateur.email, nom: utilisateur.nom } };
  },
};

module.exports = authService;
