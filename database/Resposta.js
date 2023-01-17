const { TEXT } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require('./database');

// criando o model

const Resposta = connection.define('respostas', {
    corpo: {
        type: TEXT,
        allowNull: false
    },
    //relacionamento cru entre tabelas. Relacionando duas tabelas
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(() =>{
    console.log('Tabela Resposta criada com sucesso!');
});

module.exports = Resposta;
