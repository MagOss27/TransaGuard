const validator = require('validator');

/**
 * Middleware para sanitizar req.body, req.query e req.params
 */
function sanitizar(req, res, next) {
    // Função auxiliar para limpar dados
    const sanitizeObject = (obj) => {
        if (typeof obj !== 'object' || obj === null) return {};
        const sanitized = {};
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                sanitized[key] = validator.escape(obj[key].trim());
            } else {
                sanitized[key] = obj[key];
            }
        }
        return sanitized;
    };

    req.body = sanitizeObject(req.body);
    req.query = sanitizeObject(req.query);
    req.params = sanitizeObject(req.params);

    next();
}

module.exports = sanitizar;
