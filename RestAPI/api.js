const WS = require('./WS');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');




var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router); //Rota Principal


router.route('/Usuarios').get((request, response) => {
    WS.BuscaUsuarios().then(result => {
        return result;

    })
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('WS iniciado na porta : ' + port)