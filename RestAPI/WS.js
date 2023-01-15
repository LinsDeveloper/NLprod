var config = require('./dbconfig');



async function BuscaUsuarios(){

    try{
        config.query('EXEC BuscarUsuario @id=:id, @Nome=:Nome, @NomeDaMae=:NomeDaMae',
    {
    replacements:
    {
        id: 104,
        Nome: 'Leandro',
        NomeDaMae: 'Claudia'
        },
        type: config.QueryTypes.EXEC
    }).then(function(result){
    if (result)
    {
        var dados = result[0];
        var result = dados[0];
        return console.log(result.usuarios);
        
    }}).catch(function(err){console.log(err)});

    
    } catch(error){
        console.log(error);
    }


}




module.exports = {
    BuscaUsuarios : BuscaUsuarios
}