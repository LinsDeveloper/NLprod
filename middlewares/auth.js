const localStrategy = require("passport-local").Strategy;
const WS = require('../RestAPI/CallProcs');



module.exports = function(passport){



  
// serialize o usuário
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
                                
                                return await dados[0];
                                
                    
                            }).catch(console.error()));

            
            
            user.then(result => {
                if(!result) return done(null, false);
                console.log(result);
                return done(null, (result));

            })
            
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    }));


}