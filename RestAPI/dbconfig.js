require("dotenv").config();


//requerindo sequelize 
const Sequelize = require('sequelize'); 
//instancia de conexaão ao banco de dados 
const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USER}`,`${process.env.DB_PASSWORD}`,{
    host:`${process.env.HOST}`, 
    dialect:`${process.env.DIALECT}`,
    port: `${process.env.PORTSQL}`,    //Essa porta pode manter e ser diferente da porta do servidor do Web Service, pois essa porta remete apenas ao servidor
    logging: false
})

sequelize.authenticate().then(function(){
    console.log("conexão estabelecida!")
}).catch(function(erro){
    console.log("conexão falha! "+erro);
});



module.exports = sequelize;