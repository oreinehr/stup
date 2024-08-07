
function CadastroValidacao(values) {

    let errors = {};
    const crp_pattern = /^\d{6}$/;
    const nome_pattern = /^[a-zA-Z\s]*$/;
    const password_pattern = /^(?=.*[a-zA-Z])(?=.*\d).*/;
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!values.crp) {
        errors.crp = 'CRP é obrigatório';
    } else if (!crp_pattern.test(values.crp)) {
        errors.crp = 'CRP inválido';
    }

    if (!values.nome) {
        errors.nome = 'Nome é obrigatório';
    } else if (!nome_pattern.test(values.nome)) {
        errors.nome = 'Nome inválido';
    }

    if (!values.password) {
        errors.password = 'Senha é obrigatória';
    } else if (!password_pattern.test(values.password)) {
        errors.password = 'Senha inválida';
    }

    if (!values.email) {
        errors.email = 'Email é obrigatório';
    } else if (!email_pattern.test(values.email)) {
        errors.email = 'Email inválido';
    }

    return errors;
}

export default CadastroValidacao;