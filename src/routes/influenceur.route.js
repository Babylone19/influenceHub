const express = require('express');
const router = express.Router();
const influenceurController = require('../controllers/influenceur.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, influenceurController.create);
router.get('/', influenceurController.findAll);
router.get('/:id', influenceurController.findById);
router.put('/:id', authMiddleware, influenceurController.update);
router.delete('/:id', authMiddleware, influenceurController.delete);

module.exports = router;
