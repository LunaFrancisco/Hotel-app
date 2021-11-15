const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'tics2', {
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