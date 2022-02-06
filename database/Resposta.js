const Sequelize = require("sequelize");
const connection = require("./database.js");
const Pergunta = require("./Pergunta.js");

const Resposta = connection.define("resposta", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    titulo: { type: Sequelize.STRING, allowNull: false},
    descricao: { type: Sequelize.TEXT, allowNull: false},
    pergunta_id: {type:Sequelize.INTEGER, allowNull: false}
})


Resposta.sync({force: false}).then( () => {
    console.log("Tabela RESPOSTA criada!");
});

module.exports = Resposta;