const WS = require('./RestAPI/CallProcs');
require("dotenv").config();


//imports
var express = require('express');
const session = require('express-session');
const flash = require("connect-flash")
var bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const favicon = require('serve-favicon');
const path = require('path')
const { eAdmin } = require('./middlewares/eAdmin');
const passport = require('passport');
require('./middlewares/auth')(passport);
var port = process.env.PORT;

//inicia o server
var app = express();
var router = express.Router(); //inicia a rota do server.




function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login')
    }
}


//Sessao


app.use(session({
    secret: "p1g4-oi8h39-gyedg2",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.user = req.user || null;
    next()
})



app.use(express.static('public'));   //define os arquivos estáticos para ler html + css das páginas.



app.use(express.json());


//bodyParser
app.use(bodyParser.urlencoded({extended: true}));  //Ao chamar método post, permite pegar elementos do body






app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.get("/login?fait=true", function(req, res){
    if (req.query.fail){
        res.json({
            erro: true,
            mensagem: "Erro: Credenciais inválidas!",
        })
    }else{

        res.redirect('/login')

    }
    
    
})

app.get("/", function(req, res){
    
   res.redirect()
})



app.get("/login", function(req, res){
    res.sendFile(__dirname + "/public/login.html")  //Define a rota inicial começando pelo login
})

app.get("/validate", authenticationMiddleware, function(req, res){
    res.redirect('/Home')
     
})



//Inicio das routes


app.use(bodyParser.json());
app.use(cors());  
app.use('/api', authenticationMiddleware, router); //Rota Principal





app.post('/login', passport.authenticate('local', {
    successRedirect: '/validate',
    failureRedirect: '/login?fait=true'
}));





app.post('/Menu', eAdmin, (req, res) =>{

    //const passwordhash = await bcrypt.hash(`${req.body.password}`, 8);
    //console.log(passwordhash);
    WS.ConsultaLogin().then(data => {
     
 
 
    }).catch(console.error())
    
 
 });





router.route('/Usuarios').get(eAdmin, async (req, res) => {
    WS.BuscaUsuarios().then(result => {
        return result;

    })
})



app.listen(port);
console.log('WS iniciado na porta : ' + port)