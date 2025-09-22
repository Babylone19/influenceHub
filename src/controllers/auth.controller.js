const authService = require('../services/auth.service');

const authController = {
  async inscription(req, res) {
    try {
      const { email, motDePasse, nom } = req.body;
      const utilisateur = await authService.inscription(email, motDePasse, nom);
      res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async connexion(req, res) {
    try {
      const { email, motDePasse } = req.body;
      const { token, utilisateur } = await authService.connexion(email, motDePasse);
      res.json({ token, utilisateur });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = authController;
