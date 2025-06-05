require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizar = require('./src/middleware/sanitizar');

const authRoutes = require('./src/routes/authRoutes');
const transacaoRoutes = require('./src/routes/transacaoRoutes');
const protegerRota = require('./src/auth/authMiddleware');

const app = express();

// Segurança HTTP
app.use(helmet());

// Rate limit para prevenir DDoS
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições. Tente novamente mais tarde.',
}));

app.use(express.json());

// Sanitização dos dados de entrada
app.use(sanitizar);

// Rotas
app.use('/auth', authRoutes);
app.use('/transacoes', protegerRota, transacaoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
