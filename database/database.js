const Sequelize = require('sequelize');

const connection = new Sequelize('guia', 'root', 'passWord2022', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;