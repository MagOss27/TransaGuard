const { validarTransacaoService } = require('../services/validadorService');

async function validarTransacao(req, res) {
  const resultado = await validarTransacaoService(req.body);
  res.json(resultado);
}

module.exports = { validarTransacao };
