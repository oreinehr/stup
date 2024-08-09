function validaLogin(values) {
    let errors = {};

    const crp_pattern = /^\d{6}$/;
    const password_pattern = /^(?=.*[a-zA-Z])(?=.*\d).*/;

    if (!values.crp) {
        errors.crp = 'CRP é obrigatório';
    } else if (!crp_pattern.test(values.crp)) {
        errors.crp = 'CRP inválido';
    }

    if (!values.password) {
        errors.password = 'Senha é obrigatória';
    } else if (!password_pattern.test(values.password)) {
        errors.password = 'Senha inválida';
    }

    return errors;
}

export default validaLogin;
