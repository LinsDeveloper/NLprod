var config = require('./dbconfig');
const server = require('../App');




async function BuscaUsuarios(){

    try{
        config.query('EXEC BuscarUsuario @id=:id, @Nome=:Nome, @NomeDaMae=:NomeDaMae',
    {
    replacements:
    {
        id: 106,
        Nome: 'layer',
        NomeDaMae: 'lipo'
        },
        type: config.QueryTypes.EXEC
    }).then(function(result){
    if (result)
    {
        var dados = result[0];
        var result = dados[0];
        console.log(result.usuarios);
        
    }}).catch(function(err){console.log(err)});

    
    } catch(error){
        console.log(error);
    }


}



async function ConsultaLogin(username, password){

    try{
        const records = await config.query('EXEC ProcLogin @metodo=:Metodo, @email=:Email, @password=:Password',
    {
    replacements:
    {
        Metodo: 'CarregaMenu'
        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = JSON.stringify(records[0])
    return retornoJson;

    
    } catch(error){
        console.log(error);
    }

   
}







module.exports = {
    BuscaUsuarios : BuscaUsuarios,
    ConsultaLogin : ConsultaLogin
}