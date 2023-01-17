const express = require('express');
const app = express();
const Resposta = require('./database/Resposta')

//O boby-parser serve para capturar dados de um formulário.           
//Importando o body-parser 
const body_parser = require('body-parser');

// Configurando o body-parser - ele decodifica os dados do formulário para usar no backend
app.use(body_parser.urlencoded({extended: false}))
//permite ler dados em formato jsonh, comum  em apis 
app.use(body_parser.json());
//Utilizando o ejs

app.set('view engine', 'ejs');

// importaando conexao com o banco
const connection = require('./database/database');

//conectando
connection.authenticate()
.then(() => {
    console.log('Conectado ao banco');
})
.catch((mgs_erro)=>{
    console.log('erro ao se conectar');
})

//Utilizando arquivos estáticos. Public é o nome padrão de mercado para pasta de armazenamento de arquivos


app.use(express.static('public'));

//importando a model de sincronização com banco

const Pergunta = require('./database/Pergunta');



//rotas
app.get("/", (req, res)=>{
    //listando as perguntas na home. Equivalente ao select
    Pergunta.findAll({raw: true, order:[
        [
            'id', 'DESC'
        ]
    ]}).then(pergunta => {
        res.render("index", {
            pergunta: pergunta
        })
    })
     
})


app.get("/perguntar", (req, res)=>{
    res.render("perguntados")
})

app.post('/salvar_pergunta', (req, res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao

    //create serve para salvar perguntas no formulário. equivalente ao insert into
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        //quando os dados forem salvados no banco o usuário será redirecionado para a página principal
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id,
                },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
           
        } else {
        
            res.redirect('/')
        }
    })
})

app.post("/responder", (req, res) =>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId)
    })
})
//rotas

//Colocando o servidor no ar
app.listen(3000, ()=>{
    console.log('Servidor no ar!')
})


//sequelize se faz manipulação de bancos de dados e se conectar ao banco de dados através do node
// ibnsetrindo - usuario.Criar({
 //   nome: 'Bruna',
  //  idade: 26
//
// Adicionar também  o mysql2 para trabaolhar com mysql