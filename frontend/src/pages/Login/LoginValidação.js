function validaLogin(values) {
    let errors = {};

    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const senha_pattern = /^(?=.*[a-zA-Z])(?=.*\d).*/;

    if (!values.email) {
        errors.email = 'email é obrigatório';
    } else if (!email_pattern.test(values.email)) {
        errors.email = 'email inválido';
    }

    if (!values.senha) {
        errors.senha = 'Senha é obrigatória';
    } else if (!senha_pattern.test(values.senha)) {
        errors.senha = 'Senha inválida';
    }

    return errors;
}

export default validaLogin;
