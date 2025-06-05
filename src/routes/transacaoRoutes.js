const express = require('express');
const router = express.Router();
const { validarTransacao } = require('../controllers/transacaoController');

// Aqui já está protegido no app.js, então NÃO precisa proteger de novo
router.post('/', validarTransacao);

module.exports = router;
