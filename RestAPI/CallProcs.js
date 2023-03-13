var config = require('./dbconfig');
const server = require('../App');








async function ConsultaLogin(username, password){

    try{
        const records = await config.query('EXEC ProcLogin @metodo=:Metodo, @email=:Email, @password=:Password',
    {
    replacements:
    {
        Metodo: 'ConsultaLogin',
        Email: username,
        Password: password
        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = JSON.stringify(records[0])
    return retornoJson;

    
    } catch(error){
        console.log(error);
    }

   
}




async function BuscaDadosUsuario(idUser){

    

    try{
        const records = await config.query('EXEC ProcUsuarios @metodo=:Metodo, @IdUsuario=:IdUsuario, @Nome=:Nome, @Telefone=:Telefone, @Celular=:Celular, @DsCpf=:DsCpf, @DtNascimento=:DtNascimento, @password=:password, @Nickname=:Nickname,  @Endereco=:Endereco',
    {
    replacements:
    {
        Metodo: 'BuscaDadosUsuario',
        IdUsuario: idUser,
        Nome: '',
        Telefone: '',
        Celular: '',
        DsCpf: '',
        DtNascimento: '',
        password: '',
        Nickname: '',
        Endereco: '',
        

        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(err){
        console.log(err);
    }


}







module.exports = {
    
    ConsultaLogin : ConsultaLogin,
    BuscaDadosUsuario : BuscaDadosUsuario
}