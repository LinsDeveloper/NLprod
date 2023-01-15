const express = require('express');
const controllerProduto = require('./controllers/ws');



$(document).ready(function(){


    var Executar = document.querySelector("#Executar");

    Executar.addEventListener("click", function(){

        
        

        const routes = express.Router();



        routes.get('./ws.js/BuscaUsuarios', controllerProduto.BuscaUsuarios);






            module.exports = routes;
     
});

});






var CallBack = function(resposta){
    var Resultado = document.querySelector("#Resultado");

    Resultado.innerHTML = JSON.stringify(resposta);
}