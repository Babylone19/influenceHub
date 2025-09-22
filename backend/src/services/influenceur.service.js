const prisma = require('../config/db');

const DEFAULT_RESEAU = "Inconnu";

const influenceurService = {
  // Créer un nouvel influenceur
  async create(data) {
    // Assurer que reseau n'est pas null
    if (!data.reseau) data.reseau = DEFAULT_RESEAU;
    return await prisma.influenceur.create({ data });
  },

  // Lister tous les influenceurs
  // Lister tous les influenceurs — avec filtres optionnels
async findAll(where = {}) { // ← Ajoute le paramètre "where" avec valeur par défaut {}
  const influenceurs = await prisma.influenceur.findMany({
    where, // ← Passe les filtres ici
  });

  return influenceurs.map(i => ({
    ...i,
    reseau: i.reseau || DEFAULT_RESEAU,
  }));
},
  // Obtenir un influenceur par ID
  async findById(id) {
    const influenceur = await prisma.influenceur.findUnique({ where: { id } });
    if (!influenceur) return null;
    return {
      ...influenceur,
      reseau: influenceur.reseau || DEFAULT_RESEAU,
    };
  },

  // Mettre à jour un influenceur
  async update(id, data) {
    // Assurer que reseau n'est pas null lors de la mise à jour
    if (data.reseau === null || data.reseau === undefined) {
      delete data.reseau; // ne pas écraser le champ existant
    }
    return await prisma.influenceur.update({ where: { id }, data });
  },

  // Supprimer un influenceur
  async delete(id) {
    return await prisma.influenceur.delete({ where: { id } });
  },
};

module.exports = influenceurService;
