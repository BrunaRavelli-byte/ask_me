const express = require('express');
const app = express();

//Importando o body-parser
const body_parser = require('body-parser');

// Configurando o body-parser
app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json());
//Utilizando o ejs

app.set('view engine', 'ejs');

//Utilizando arquivos estáticos. Public é o nome padrão de mercado para pasta de armazenamento de arquivos


app.use(express.static('public'));



//rotas
app.get("/", (req, res)=>{
     res.render('index')
})

app.get("/perguntar", (req, res)=>{
    res.render("perguntados")
})

app.post('/salvar_pergunta', (req, res)=>{
    res.send('Formulário recebido')
})
//rotas

//Colocando o servidor no ar
app.listen(3000, ()=>{
    console.log('Servidor no ar!')
})