const axios = require("axios");
const endereco = "http://localhost:3000/";
module.exports = class Services{ 
//VERIFICAR USUÁRIO
 static async UsuarioLogin(req,res){
 let valores = req.body;
 const options = {
 url: endereco + 'login',
 method: 'POST',
 data: valores
 };
 axios(options).then((usuario) => {
 if(usuario != undefined){
 return res.render('logado');
 }
 })
 }

  //Create usuário
   static async UsuarioCreate(req,res){
   let valores = req.body;
   const options = {
   url: endereco + 'add_usuario',
   method: 'POST',
   data: valores
   };
   axios(options);
   const mensagem = "Cadastro realizado com sucesso!";
   res.render("mensagem",{mensagem});
   }

  ////////////////////////PRODUTO

  //Create produto
   static async ProdutoCreate(req,res){
   let valores = req.body;
   const options = {
   url: endereco + 'add_chapas',
   method: 'POST',
   data: valores
   };
   axios(options);
   const mensagem = "Cadastro realizado com sucesso!";
   res.render("mensagem",{mensagem});
   }
  //LISTAR
   static async ProdutoListar(req,res){
   const options = {
   url: endereco + 'chapas',
   method: 'GET',
   data: {}
   };
   axios(options).then(response => {
   console.log(response.data);
   const produto =response.data
     
   res.render("produtos/listar",{produto});
   });
   }

}
