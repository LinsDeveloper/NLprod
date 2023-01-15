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



app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/login.html")  //Define a rota inicial começando pelo login
})




//Inicio das routes




app.post('/login',(req, res)=>{
    let usuario = req.body.usuario;
    let password = req.body.password;
    console.log(usuario+''+password);
})




app.use(bodyParser.json());
app.use(cors());
app.use('/api', router); //Rota Principal


router.route('/Usuarios').get((request, response) => {
    WS.BuscaUsuarios().then(result => {
        return result;

    })
})



app.listen(port);
console.log('WS iniciado na porta : ' + port)