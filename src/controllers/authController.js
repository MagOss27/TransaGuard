const { gerarToken } = require('../auth/jwtService');

function login(req, res) {
  const body = req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { usuario, senha } = body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  // Sanitização básica contra injection (exemplo simples)
  if (typeof usuario !== 'string' || typeof senha !== 'string') {
    return res.status(400).json({ erro: 'Usuário e senha devem ser strings' });
  }

  if (usuario === 'admin' && senha === '123456') {
    const token = gerarToken({ usuario });
    return res.json({ mensagem: 'Login realizado com sucesso!', token });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
}

module.exports = { login };
