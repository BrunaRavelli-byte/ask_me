// se conectando ao banco

const Sequelize = require('sequelize');

//configurando
const connection = new Sequelize('ask_me','root','naruto13',{
    host: 'localhost', 
    dialect: 'mysql'
});



// exportando

module.exports = connection;