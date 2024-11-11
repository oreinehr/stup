import jwt from 'jsonwebtoken';

const secretKey = 'chavinha1234'; 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("Token recebido:", token); // Log do token

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error("Erro na verificação do token:", err);
            return res.sendStatus(403);
        }
        console.log("Usuário autenticado:", user); // Log do usuário
        req.userId = user.id;
        next();
    });
};

export default authenticateToken;
