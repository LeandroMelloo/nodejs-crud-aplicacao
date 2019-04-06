/**
 * Arquivo: server.js
 * Descrição: servidor node.js
 * Author: Leandro Mello
 * Data: 11/03/2019
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const perfilUsuario = require('./app/models/perfilUsuario');

// URI: MongoDB - conexão do mongoose:
mongoose.connect('mongodb://localhost:27017/jobMatch', { useNewUrlParser: true })

// configuração da variavel app, atraves do 'bodyParser' e retornando dados no formato 'JSON':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurando a porta, onde será executada nossa api:
const port = process.env.port || 9000;

//  rotas da nossa API:
//=============================================================================================

// configurando as rotas com a criação de uma instância via express:
const router = express.Router();

router.use(function(req, res, next) {
    console.log('Iniciando fluxo JobMatch');
    next();
});

// rota de exemplo:
router.get('/', function(req, res) {
    res.json({ message: 'Cadastrando um novo perfil de usuario'})
});

// API´s
//============================================================================================

// rotas que terminarem com '/perfilUsuarios' (servir: GET ALL & POST)
router.route('/perfilUsuario')

    /* 1° Método: Criar Perfil Usuario (acessar em: POST http://localhost:9000/api/perfilUsuario)*/
    .post(function(req, res) {
        var PerfilUsuario = new perfilUsuario();

        // aqui vamos setar os campos do produto (via request):
        PerfilUsuario.nome = req.body.nome;
        PerfilUsuario.cargoAtual = req.body.cargoAtual;
        PerfilUsuario.areaAtual = req.body.areaAtual;
        PerfilUsuario.userId = req.body.userId;
        PerfilUsuario.dataNascimeto = req.body.dataNascimeto;

        PerfilUsuario.save(function(error) {
            if(error) {
                res.send('Erro ao tentar salvar o Perfil do usuario' + error);
            } else {
                res.json({ message: 'Perfil Usuario cadastrado com sucesso'});
            };    
        });
    });

// definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

// iniciando a Aplicação (servidor):
app.listen(port);
console.log('Servidor rodando na porta:', port);