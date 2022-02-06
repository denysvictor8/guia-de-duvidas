const Sequelize = require('sequelize');
const connection = require("./database.js");

const Pergunta = connection.define('pergunta', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    titulo: { type: Sequelize.STRING, allowNull: false},
    descricao: { type: Sequelize.TEXT, allowNull: false}
});

Pergunta.sync({force: false}).then( () => {
    console.log("Tabela criada!");
});

module.exports = Pergunta;
  