//Criando as tabelas 


//iportando o sequelize e a conexao com o banco

const Sequelize = require('sequelize');
const connection = require('./database');

//definindo o model 

const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//criando a tabela e sincronizando
Pergunta.sync({force: false}).then(()=>{
    console.log('Tabela criada');
});

// para executar a sync vá ao arquivo principal e importe

module.exports = Pergunta;