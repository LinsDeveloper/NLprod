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
        const records = await config.query('EXEC ProcUsuarios @metodo=:Metodo, @IdUsuario=:IdUsuario, @Nome=:Nome, @Telefone=:Telefone, @Celular=:Celular, @DsCpf=:DsCpf, @DtNascimento=:DtNascimento, @password=:password, @Nickname=:Nickname,  @Endereco=:Endereco, @DsTokenOne=:DsTokenOne,  @DsTokenTwo=:DsTokenTwo',
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
        DsTokenOne:'',
        DsTokenTwo:''
       
        

        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(err){
        console.log(err);
    }


}








async function AtualizaUsuario(idUser, nome, telefone, celular, cpf, data, senha, endereco, nickname, avatar){

    

    try{
        const records = await config.query('EXEC ProcUsuarios @metodo=:Metodo, @IdUsuario=:IdUsuario, @Nome=:Nome, @Telefone=:Telefone, @Celular=:Celular, @DsCpf=:DsCpf, @DtNascimento=:DtNascimento, @password=:password, @Nickname=:Nickname,  @Endereco=:Endereco, @DsTokenOne=:DsTokenOne,  @DsTokenTwo=:DsTokenTwo',
    {
    replacements:
    {
        
        Metodo: 'AtualizaUsuario',
        IdUsuario: idUser,
        Nome: nome,
        Telefone: telefone,
        Celular: celular,
        DsCpf: cpf,
        DtNascimento: data,
        password: senha,
        Nickname: nickname,
        Endereco: endereco,
        DsTokenOne:'',
        DsTokenTwo:''
        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(err){
        console.log(err);
    }


}



async function AtualizaToken(idUser, tokenOne, tokenTwo){

    

    try{
        const records = await config.query('EXEC ProcUsuarios @metodo=:Metodo, @IdUsuario=:IdUsuario, @DsTokenOne: DsTokenOne, @DsTokenTwo: DsTokenTwo',
    {
    replacements:
    {
        
        Metodo: 'AtualizaToken',
        IdUsuario: idUser,
        DsTokenOne: tokenOne,
        DsTokenTwo: tokenTwo

        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(err){
        console.log(err);
    }


}



async function BuscaBots(idUser, id){

    try{
        const records = await config.query('EXEC ProcOperacao @metodo=:Metodo, @IdBots=:IdBots, @IdUsuario=:IdUsuario',
    {
    replacements:
    {
        Metodo: 'TrocaBots',
        IdBots: id,
        IdUsuario: idUser
        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(error){
        console.log(error);
    }

   
}



async function connectData(idUser){

    try{
        const records = await config.query('EXEC ProcOperacao @metodo=:Metodo, @IdUsuario=:IdUsuario',
    {
    replacements:
    {
        Metodo: 'verificaConnect',
        IdUsuario: idUser
        
        },
        type: config.QueryTypes.EXEC
    })


    retornoJson = records[0]
    return retornoJson;

    
    } catch(error){
        console.log(error);
    }

   
}







module.exports = {
    
    ConsultaLogin : ConsultaLogin,
    BuscaDadosUsuario : BuscaDadosUsuario,
    AtualizaUsuario : AtualizaUsuario,
    BuscaBots : BuscaBots,
    AtualizaToken: AtualizaToken,
    connectData: connectData
}