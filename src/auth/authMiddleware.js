const jwt = require('jsonwebtoken');

function protegerRota(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o payload possui informações obrigatórias
    if (!decoded.usuario) {
      return res.status(403).json({ erro: 'Token inválido - usuário não identificado' });
    }

    req.usuario = decoded;
    next();
  } catch {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = protegerRota;
