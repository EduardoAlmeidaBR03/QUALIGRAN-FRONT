const axios = require("axios");
const endereco = "http://localhost:3000/";

module.exports = class Services {
   // VERIFICAR USUÁRIO
   static async UsuarioLogin(req, res) {
      let valores = req.body;
      const options = {
         url: endereco + 'login',
         method: 'POST',
         data: valores
      };
      axios(options).then((usuario) => {
         if (usuario != undefined) {
            return res.render('logado');
         }
      });
   }

   // Create usuário
   static async UsuarioCreate(req, res) {
      let valores = req.body;
      const options = {
         url: endereco + 'add_usuario',
         method: 'POST',
         data: valores
      };
      axios(options);
      const mensagem = "Cadastro realizado com sucesso!";
      res.render("mensagem", { mensagem });
   }

   //////////////////////// PRODUTO

   // Create produto
   static async ProdutoCreate(req, res) {
      let valores = req.body;
      const options = {
         url: endereco + 'add_chapa',
         method: 'POST',
         data: valores
      };
      axios(options);
      const mensagem = "Cadastro realizado com sucesso!";
      res.render("mensagem", { mensagem });
   }

   // Listar produtos
   static async ProdutoListar(req, res) {
      const options = {
         url: endereco + 'chapas',
         method: 'GET',
         data: {}
      };
      axios(options).then(response => {
         console.log(response.data);
         const chapa = response.data;
         res.render("produtos/listar", { chapa });
      });
   }

   // Deletar produto
   static async ProdutoDelete(req, res) {
      const idChapa = req.params.id; // Supondo que o ID da chapa venha pela URL
      const options = {
         url: endereco + 'chapas/delete/' + idChapa, // A URL para deletar
         method: 'DELETE'
      };

      try {
         await axios(options);
         const mensagem = "Chapa deletada com sucesso!";
         res.render("mensagem", { mensagem });
      } catch (error) {
         console.error("Erro ao deletar chapa:", error);
         const mensagem = "Erro ao deletar chapa!";
         res.render("mensagem", { mensagem });
      }
   }

   //COOKIES
   static async CarrinhoAdicionar(req, res){
      const Item = {
         id: req.params.id,
         nome: req.params.nome
      };
      //Verificando se já existe cookie para o carrinho
      if (req.cookies.carrinho){
         const carrinho = JSON.parse(req.cookies.carrinho);
         carrinho.push(Item);
         res.cookie('carrinho', JSON.stringify(carrinho), { maxAge: 9000000, httpOnly: true});

      }else{
         const carrinho = [Item];
         res.cookie('carrinho', JSON.stringify(carrinho), { maxAge: 9000000, httpOnly: true});
      }
      res.send('Item adicionado ao carrinho')
   }

   static async CarrinhoRemoverItem(req, res){
      const itemDeletar = req.params.item;
      if (req.cookies.carrinho){
         let carrinho = JSON.parse(req.cookies.carrinho);

         carrinho = carrinho.filter(item => item.id !== itemDeletar);

         res.cookie('carrinho', JSON.stringify(carrinho), {maxAge: 9000000, httpOnly: true});

         res.send('Item removido do carrinho');
      }else{
         res.send('Carrinho vazinho');
      }
   }

   static async CarrinhoListar(req,res){
      if(req.cookies.carrinho){
         const carrinho = JSON.parse(req.cookies.carrinho);
         res.render('carrinho/Listar', {carrinho});
      }else{
         res.send('Carrinho vazio');
      }
   }

}
