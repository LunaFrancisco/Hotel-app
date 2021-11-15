require('dotenv').config(); // this is important!
module.exports = {
    "development": {
        "username": "postgres",
        "password": process.env.DB_PASSWORD,
        "database": "test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": process.env.DB_PASSWORD,
        "database": "test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": process.env.DB_PASSWORD,
        "database": "test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
};