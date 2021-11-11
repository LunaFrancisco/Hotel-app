const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        timestamps: false,
        "createdAt": "createdat",
        "updatedAt": "updatedat",
        freezeTableName: true
    }
});

module.exports = sequelize;