const Joi = require('joi');

const influenceurSchema = Joi.object({
  nom: Joi.string().required(),
  reseaux: Joi.array().items(Joi.string()).required(),
  followers: Joi.number().required(),
  categorie: Joi.string().required(),
});

module.exports = influenceurSchema;
