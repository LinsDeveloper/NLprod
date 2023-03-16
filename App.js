const WS = require('./RestAPI/CallProcs');
require("dotenv").config();


//imports
var express = require('express');                       //Inicia Servidor e faz controle de rotas.
const session = require('express-session');             //Controla sessão.
const flash = require("connect-flash")                  //Faz envio de mensa
var bodyParser = require('body-parser');                //Middleware que converte body da requisição para vários formatos, ex. json 
var cors = require('cors');                             //ross-origin HTTP. adicionar cabeçalhos HTTP.
const favicon = require('serve-favicon');               //Adiciona pelo servidor favicon no navegador.
const path = require('path');                           //Informa caminhos ao servidor para busca de arquivos.  
const passport = require('passport');                   //Controla autenticação do usuário.
require('./middlewares/auth')(passport);                //Busca usuário para autenticação.
var port = process.env.PORT;                            //Porta do servidor escondida.
const multer = require("multer");
const fs = require('fs');

//inicia o server
var app = express();                                    //Inicia o APP.
var router = express.Router();                          //Inicia a rota do servidor.






function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }else{
        res.redirect('/login')
    }
}


//Inicia sessão
app.use(session({
    secret: "p1g4-oi8h39-gyedg2",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 40 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.idUser = req.idUser || null;
    res.locals.DsUser = req.DsUser || null;
    next()
})



//Busca Engine para rederizar
app.set("view engine", "ejs")
app.use('/styles',express.static('styles'));
app.use('/scriptsApp',express.static('scriptsApp'));



//Inicia o middleware BodyParser
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());  

//Outras rotas serão a partir desta.
app.use('/', router);


//Renderiza o logo no navegador.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



//Upload image user.
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })







router.get("/", (req, res) => {
    res.redirect('/Home');
})


router.get("/login", (req, res) => {
    if (req.query.fail)
    res.render('login', {message: 'E-mail ou senha inválidos!'});
    else
        res.render('login', {message: null})
    
})

router.get("/Home", authenticationMiddleware, (req, res) => {

    var DsName = req.user;    
    res.render('inicial', {NameUsuario: DsName});
    
})

router.get("/Bots", authenticationMiddleware, (req, res) => {
    var DsName = req.user;  
    res.render('bots', {NameUsuario: DsName});
})

router.get("/Treinamentos", authenticationMiddleware, (req, res) => {
    var DsName = req.user;  
    res.render('treinamentos', {NameUsuario: DsName});
})

router.get("/Gerenciamento", authenticationMiddleware, (req, res) => {
   
    var DsName = req.user;  
    res.render('gerenciamento', {NameUsuario: DsName});
})

router.get("/Cadastro", authenticationMiddleware, (req, res) => {
    
    var DsName = req.user; 
    res.render('user', {NameUsuario: DsName, messageSucesso: req.flash('successMessage')});

})


router.get("/NLBot", authenticationMiddleware, (req, res) => {
    res.render('NLBot');
})





//Rotas do App.




router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login?fail=true'
    
}))


router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});




router.post("/DadosCadastro", authenticationMiddleware, (req, res) => {
    var idUser = req.user.idUsuario;
    
    WS.BuscaDadosUsuario(idUser).then(data => {
        
        res.json(data);
    })

})





router.post("/AtualizaUsuario", authenticationMiddleware, upload.single("file"), (req, res) => {
    var idUser = req.user.idUsuario;

    
    
    var nome = req.body.nome;
    var telefone = req.body.telefone;
    var celular = req.body.celular;
    var cpf = req.body.cpf;
    var data = req.body.data;
    var senha = req.body.senha;
    var confirmaSenha = req.body.confirmaSenha;
    var endereco = req.body.endereco;
    var nickname = req.body.nickname;


    if(confirmaSenha == senha){


        WS.AtualizaUsuario(idUser, nome, telefone, celular, cpf, data, senha, endereco, nickname).then(dados => {
            
            console.log(dados[0].success);
            req.flash('successMessage', `${dados[0].success}`);
            res.redirect('/Cadastro');
            return;
        })


    }else{

        
        req.flash('errorMessage', 'Por favor, verifique a confirmação da senha.');

    }




})
















app.listen(port);
console.log('WS iniciado na porta : ' + port)