const WS = require('./RestAPI/WS');
require("dotenv").config();


//imports
var express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.PORT;

//inicia o server
var app = express();
var router = express.Router(); //inicia a rota do server.


app.use(session({secret:'njafknqjdinfgswjgndjwngjfnwdjifd'}));  //define um código secreto para a sessao.

app.use(express.static('public'));   //define os arquivos estáticos para ler html + css das páginas.

app.use(bodyParser.urlencoded({extended: true}));  //Ao chamar método post, permite pegar elementos do body

app.use(express.json());


app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/login.html")  //Define a rota inicial começando pelo login
})


app.get("/Home", function(req, res){
    res.sendFile(__dirname + "/public/inicial.html")  //Define a rota inicial começando pelo login
})

//Inicio das routes


app.use(bodyParser.json());
app.use(cors());
app.use('/api', router); //Rota Principal



app.post('/login',(req, res) =>{

    
   WS.ConsultaLogin(req.body.username, req.body.password).then(response => {
    dados = res.send(JSON.parse(response));
    console.log(dados);
   }).catch(console.error())
   
   


});




router.route('/Usuarios').get((request, response) => {
    WS.BuscaUsuarios().then(result => {
        return result;

    })
})



app.listen(port);
console.log('WS iniciado na porta : ' + port)