const jwt = require('jsonwebtoken');

const generarJWT = (email, tipo) => {
    return new Promise((resolve, reject) => {
        const payload = { email, tipo };
        jwt.sign(payload, process.env.SECRET_JWT_PASSWORD, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(error);
                reject('No se pudo generar el token correspondiente');
            }
            resolve(token);
        });
    });
};

module.exports = {
    generarJWT
};