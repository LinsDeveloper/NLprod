//requerindo sequelize 
const Sequelize = require('sequelize'); 
//instancia de conexaão ao banco de dados 
const sequelize = new Sequelize('db_neverloss','sa','P1g4-7x3f-si2a',{
    host:"NOTE-PEDROHENRI", 
    dialect:'mssql',
    port: "1433"
})



//conexão estabelecida ou não 
sequelize.authenticate().then(function(){
    console.log("conexão estabelecida!")
}).catch(function(erro){
    console.log("conexão falha! "+erro);
});




sequelize.query('EXEC BuscarUsuario @id=:id, @Nome=:Nome, @NomeDaMae=:NomeDaMae',
    {
    replacements:
    {
        id: 70,
        Nome: 'maiara',
        NomeDaMae: 'Carlone'
        },
        type: sequelize.QueryTypes.EXEC
    }).then(function(result){
    if (result)
    {
        var dados = result[0];
        var data = JSON.parse(dados[0].usuarios);
        console.log(data);
        
    }}).catch(function(err){console.log(err)});


    