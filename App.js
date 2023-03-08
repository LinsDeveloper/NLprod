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
const { authenticate } = require('passport');
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
    cookie: {maxAge: 20 * 60 * 1000}
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







app.set("view engine", "ejs")
app.use('/styles',express.static('styles'));
//app.use(express.static(path.join(__dirname, 'public')));   //define os arquivos estáticos para ler html + css das páginas.
app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.json());


//bodyParser



app.use('/', router);



app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


router.get("/", (req, res) => {
    res.redirect('/login');
})


router.get("/login", (req, res) => {
    if (req.query.fail)
    res.render('login', {message: 'E-mail ou senha inválidos!'});
    else
        res.render('login', {message: null})
})

router.get("/home", authenticationMiddleware, (req, res) => {
    res.render('inicial');
})

router.get("/bots", authenticationMiddleware, (req, res) => {
    res.render('bots');
})

router.get("/treinamentos", authenticationMiddleware, (req, res) => {
    res.render('treinamentos');
})

router.get("/gerenciamento", authenticationMiddleware, (req, res) => {
    res.render('gerenciamento');
})






//Inicio das routes


app.use(bodyParser.json());
app.use(cors());  

 



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