const localStrategy = require("passport-local").Strategy;
const WS = require('../RestAPI/CallProcs');



module.exports = function(passport){



  

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
      
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });

   
    

    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    (username, password, done) => {
        try{
            var user =  (WS.ConsultaLogin(username, password).then( async data => {

                                var dados = JSON.parse(data);
                                console.log(dados);
                                return await dados[0];
                                
                    
                            }).catch(console.error()));

            
            
            user.then(total => {
                
                if(!total) return done(null, false);
                return done(null, user);

            })
            
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    }));


}