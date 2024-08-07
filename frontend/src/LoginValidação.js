function validaLogin(values) {
    let error = {};

    const crp_pattern = /^[A-Za-z]{2}\/[0-9]{6}$/;
    const password_pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!values.crp) {
        error.crp = 'CRP é obrigatório';
    } else if (!crp_pattern.test(values.crp)) {
        error.crp = 'CRP inválido';
    } else {
        error.crp = '';
    }

    if (!values.password) {
        error.password = 'Senha é obrigatória';
    } else if (!password_pattern.test(values.password)) {
        error.password = 'Senha inválida';
    } else {
        error.password = '';
    }
    return error;
}

export default validaLogin;