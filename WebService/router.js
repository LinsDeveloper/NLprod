const express = require('express');
const controllerProduto = require('./controllers/ws');


const routes = express.Router();



routes.get('./ws.js/BuscaUsuarios', controllerProduto.BuscaUsuarios);






module.exports = routes;

