const validator = require('validator');

async function validarTransacaoService(transacao) {
    const alertas = [];

    const camposObrigatorios = ['valor', 'cpf_destinatario', 'localizacao', 'dispositivo'];

    camposObrigatorios.forEach(campo => {
        if (!transacao[campo]) {
            alertas.push(`Campo obrigatório ausente: ${campo}`);
        }
    });

    // Sanitização manual
    const cpf = validator.escape(String(transacao.cpf_destinatario || ''));
    const localizacao = validator.escape(String(transacao.localizacao || ''));
    const dispositivo = validator.escape(String(transacao.dispositivo || ''));

    // Validação CPF
    const regexCPF = /^\d{11}$/;
    if (!regexCPF.test(cpf)) {
        alertas.push("CPF do destinatário inválido.");
    }

    if (transacao.valor <= 0) {
        alertas.push("Valor da transação deve ser maior que zero.");
    }

    if (transacao.valor > 10000) {
        alertas.push("Transação acima do valor permitido.");
    }

    const listaNegra = ['12345678900', '98765432100'];
    if (listaNegra.includes(cpf)) {
        alertas.push("Destinatário consta na blacklist.");
    }

    const paisesBloqueados = ['Coreia do Norte', 'Irã', 'Síria'];
    if (paisesBloqueados.includes(localizacao)) {
        alertas.push("Transação feita de país restrito.");
    }

    const hora = new Date().getHours();
    if (hora >= 0 && hora <= 5) {
        alertas.push("Transação realizada em horário incomum.");
    }

    const dispositivosConfiaveis = ['desktop', 'celular'];
    if (!dispositivosConfiaveis.includes(dispositivo)) {
        alertas.push("Dispositivo não reconhecido.");
    }

    const mediaUsuario = 200;
    if (transacao.valor > mediaUsuario * 5) {
        alertas.push("Valor muito acima da média do usuário.");
    }

    return {
        status: alertas.length > 0 ? 'suspeita' : 'aprovada',
        alertas
    };
}

module.exports = { validarTransacaoService };
