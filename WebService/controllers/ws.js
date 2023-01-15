const ModelProduto = require('../models/wsModel');


module.exports = {
    
    async BuscaUsuarios(req, res){
        try{
            const BuscarUsuario = await ModelProduto.findAll();


            
            return res.json(BuscarUsuario);

        } catch(error){
            return console.log("Erro na List : ", BuscaUsuarios);
        }
    },


    async Create(req, res){
        try{
            const produtos = await ModelProduto.create(
                {
                    Codigo : req.body.Codigo,
                    Descricao : req.body.Descricao,
                    DataCriacao : req.body.DataCriacao,
                    DataAtualizacao : null

                }
            );

            return res.json(produtos);

        } catch(error){
            return console.log("Erro na Create : ", erro);
        }
    },




    async Update(req, res){
        try{


            const prod = await ModelProduto.findByPk(req.body.Codigo);

            if (prod) {
                prod.Descricao = req.body.Descricao;
                prod.DataAtualizacao = new Date();
                await prod.save();
            }



            return res.json(prod);


        } catch(error){
            return console.log("Erro na Update : ", erro);
        }
    },



    async GetOne(req, res){
        try{


            const prod = await ModelProduto.findByPk(req.body.Codigo);


            return res.json(prod);


        } catch(error){
            return console.log("Erro na Update : ", erro);
        }
    },



    async Delete(req, res){
        try{


            const prod = await ModelProduto.findByPk(req.body.Codigo);

            await prod.destroy();
            return res.json(prod);


        } catch(error){
            return console.log("Erro na Delete : ", erro);
        }
    }





    
}