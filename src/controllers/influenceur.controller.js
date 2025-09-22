const influenceurService = require('../services/influenceur.service');

const influenceurController = {
  async create(req, res) {
    try {
      const influenceur = await influenceurService.create(req.body);
      res.status(201).json(influenceur);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async findAll(req, res) {
  try {
    // Récupérer les filtres depuis l'URL
    const { categorie, pays } = req.query;

    // Construire l'objet where dynamiquement
    const where = {};
    if (categorie) where.categorie = categorie;
    if (pays) where.pays = pays;

    // Appeler le service avec les filtres
    const influenceurs = await influenceurService.findAll(where);

    res.json(influenceurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

  async findById(req, res) {
    try {
      const influenceur = await influenceurService.findById(req.params.id);
      if (!influenceur) {
        return res.status(404).json({ message: 'Influenceur non trouvé' });
      }
      res.json(influenceur);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const influenceur = await influenceurService.update(req.params.id, req.body);
      if (!influenceur) {
        return res.status(404).json({ message: 'Influenceur non trouvé' });
      }
      res.json(influenceur);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await influenceurService.delete(req.params.id);
      res.json({ message: 'Influenceur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = influenceurController;
