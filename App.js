const WS = require('./RestAPI/CallProcs');
require("dotenv").config();


//imports
var express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');


var port = process.env.PORT;

//inicia o server
var app = express();
var router = express.Router(); //inicia a rota do server.

//Sessao





app.use(express.static('public'));   //define os arquivos estáticos para ler html + css das páginas.






app.use(express.json());


//bodyParser
app.use(bodyParser.urlencoded({extended: true}));  //Ao chamar método post, permite pegar elementos do body




/*

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/login.html")  //Define a rota inicial começando pelo login
})

app.get("/Home", function(req, res){
    res.sendFile(__dirname + "/public/inicial.html")  //Define a rota inicial começando pelo login
})

*/
//Inicio das routes


app.use(bodyParser.json());
app.use(cors());  
app.use('/api', router); //Rota Principal





app.post('/login', (req, res) =>{

   //const passwordhash = await bcrypt.hash(`${req.body.password}`, 8);
   //console.log(passwordhash);
   WS.ConsultaLogin(req.body.username, req.body.password).then(data => {
    dados = JSON.parse(data);
    if(dados[0] == undefined){
        res.json({
            erro: true,
            mensagem: "Erro: Credenciais inválidas!",
        })


    }else{

        
        var token = jwt.sign({id: `${dados[0].idUsuario}`}, `${process.env.CODIGO_VALIDADOR}`, {

            expiresIn: 60 // 1 min
        })
    

        

        res.json({
            erro: false,
            mensagem: "Usuário logado com sucesso!",
            token,
        })

        
    
    
    }


   }).catch(console.error())
   

});




router.route('/Usuarios').get(eAdmin, async (req, res) => {
    WS.BuscaUsuarios().then(result => {
        return result;

    })
})



app.listen(port);
console.log('WS iniciado na porta : ' + port)