const passport = require('passport');

    module.exports = {

        async login(req, res, next){
            passport.authenticate('local',  {
                successRedirect: "/Home",
                failureRedirect: "/login"
            }(req, res, next));
        },

       


    }

