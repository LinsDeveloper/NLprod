const jwt = require('jsonwebtoken');
const {promosify} = require('util');





module.exports = {

    eAdmin: async function (req, res, next){
       const authHeader = req.headers.authorization;
       if(!authHeader){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessario autenticacao do Token!"
        })
       }

       const [, token] = authHeader.split(' ');

       if(!token){
        return res.status(400).json({

            erro: true,
            mensagem: "Erro: Necessario autenticacao do Token!"

        });
        
       }

       try{

            const decode = await promosify(jwt.verify)(token, `${process.env.CODIGO_VALIDADOR}`);
            req.userId = decode.id;
            return next();

       }catch(err){

        return res.status(400).json({

            erro: true,
            mensagem: "Erro: Token inválido!"

        });

       }


    }
}