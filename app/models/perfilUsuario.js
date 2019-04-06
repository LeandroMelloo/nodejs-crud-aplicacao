/**
 * Arquivo: cadastroUsuario.js
 * Author: Leandro Mello
 * Descrição: Arquivo responsavél onde trataremos o modelo de classe 'cadastroUsuario'
 * Data: 11/03/2019
 */

const mongoose = require('mongoose');
const schemaPerfilUsuario = mongoose.Schema;

 /**
  *  -> nome: String
  *  -> cargoAtual: String
  *  -> areaAtual: String
  *  -> userId: String
  *  -> dataNascimeto: Date
  *  -> createdAt: Date
  */

 const perfilUsuarioSchema = new schemaPerfilUsuario({
    nome: {
        type: String,
        required: true,
    },
    cargoAtual: {
        type: String,
        required: true,
    },
    areaAtual: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
    dataNascimeto: {
        type: Date,
        required: true,
    },
    // guarda a data de criação de cada jobMatch
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// código pra registrar um model na nossa aplicação
module.exports = mongoose.model('perfilUsuario', perfilUsuarioSchema);