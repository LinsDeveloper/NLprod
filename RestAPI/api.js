const WS = require('../../NLprod/');
require("dotenv").config();

var express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT;




var app = express();
var router = express.Router();


app.use(session({secret:'njafknqjdinfgswjgndjwngjfnwdjifd'}));




app.get("/", function(req, res){
    res.sendFile(__dirname + "../login.html")
})



app.post('/login',(req, res)=>{
    usuario = req.body.login;
    console.log(usuario);
})



app.use(bodyParser.urlencoded({extended: true}));
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