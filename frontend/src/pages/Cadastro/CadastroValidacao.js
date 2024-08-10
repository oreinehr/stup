
function CadastroValidacao(values) {

    let errors = {};
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const nome_pattern = /^[a-zA-Z\s]*$/;
    const senha_pattern = /^(?=.*[a-zA-Z])(?=.*\d).*/;


    if (!values.nome) {
        errors.nome = 'Nome é obrigatório';
    } else if (!nome_pattern.test(values.nome)) {
        errors.nome = 'Nome inválido';
    }

    if (!values.senha) {
        errors.senha = 'Senha é obrigatória';
    } else if (!senha_pattern.test(values.senha)) {
        errors.senha = 'Senha inválida';
    }

    if (!values.email) {
        errors.email = 'Email é obrigatório';
    } else if (!email_pattern.test(values.email)) {
        errors.email = 'Email inválido';
    }

    return errors;
}

export default CadastroValidacao;