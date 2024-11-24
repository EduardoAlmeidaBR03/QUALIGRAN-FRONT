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

      try {
         await axios(options); // Aguarde a finalização da requisição
         res.json({ mensagem: "Cadastro realizado com sucesso!" });
      } catch (error) {
         res.status(500).json({ mensagem: "Erro ao cadastrar o usuário." });
      }
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
      try {
         await axios(options); // Aguarde a finalização da requisição
         res.json({ mensagem: "Cadastro realizado com sucesso!" });
      } catch (error) {
         res.status(500).json({ mensagem: "Erro ao cadastrar o material." });
      }
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

   // Atualizar produto
   static async ProdutoAtualizar(req, res) {
      const idChapa = req.params.id_chapa;
      let valores = req.body;
      console.log("CHAPA ID ATUALIZAR: " + idChapa)

      const options = {
         url: endereco + 'chapas/update/' + idChapa,
         method: 'PUT',
         data: valores
      };

      try {
         await axios(options);
         const mensagem = "Chapa atualizada com sucesso!";
         res.redirect('/chapas/listar');
         // res.send('Chapa atualizada com sucesso!');
      } catch (error) {
         console.error("Erro ao atualizar chapa:", error);
         const mensagem = "Erro ao atualizar chapa!";
         res.send('Erro ao atualizar chapa!')
      }
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
         // Redireciona para a página chapas/listar
         res.redirect('/chapas/listar');
      } catch (error) {
         console.error("Erro ao deletar chapa:", error);
         const mensagem = "Erro ao deletar chapa!";
         res.render("mensagem", { mensagem });
      }
   }


   // Buscar produto pelo ID
   static async buscarChapaPeloId(idChapa) {
      const options = {
         url: endereco + 'chapas/' + idChapa, // A URL para buscar a chapa
         method: 'GET'
      };

      try {
         const response = await axios(options);
         return response.data;
      } catch (error) {
         console.error("Erro ao buscar chapa pelo ID:", error);
         return null;
      }
   }

   // COOKIES
   static async CarrinhoAdicionar(req, res) {
      const Item = {
         id_chapa: req.params.id_chapa,
         nome: req.params.nome,
         preco: req.params.preco,
         link: decodeURIComponent(req.params.link)
      };
      console.log("teste:  " + Item.id_chapa, Item.nome, Item.preco);
      try {
         let carrinho = req.cookies.carrinho ? JSON.parse(req.cookies.carrinho) : [];

         // Verificar se o item já existe
         const existe = carrinho.find(item => item.id_chapa === Item.id_chapa);
         if (!existe) {
            carrinho.push(Item);
            res.cookie('carrinho', JSON.stringify(carrinho), { maxAge: 9000000, httpOnly: true });
            res.redirect('/chapas/listar');
            // res.send('Item adicionado ao carrinho');
         } else {
            res.send('Item já existe no carrinho');
         }

      } catch (error) {
         console.error("Erro ao adicionar item ao carrinho:", error);
         res.send('Erro ao adicionar item ao carrinho');
      }
   }

   static async CarrinhoRemoverItem(req, res) {
      const itemDeletar = req.params.id_chapa;

      try {
         if (req.cookies.carrinho) {
            let carrinho = JSON.parse(req.cookies.carrinho);
            carrinho = carrinho.filter(item => item.id_chapa !== itemDeletar);
            res.cookie('carrinho', JSON.stringify(carrinho), { maxAge: 9000000, httpOnly: true });
            res.redirect('/chapas/listar');
            //res.send('Item removido do carrinho');
         } else {
            res.send('Carrinho vazio');
         }
      } catch (error) {
         console.error("Erro ao remover item do carrinho:", error);
         res.send('Erro ao remover item do carrinho');
      }
      
   }

   // Listar itens do carrinho com o total dos valores
   static async CarrinhoListar(req, res) {
      try {
         if (req.cookies.carrinho) {
            const carrinho = JSON.parse(req.cookies.carrinho);

            // Calcular o total dos preços dos itens no carrinho
            const total = carrinho.reduce((sum, item) => sum + (parseFloat(item.preco) || 0), 0);

            // Renderizar a página do carrinho com os itens e o total
            res.render('carrinho/Listar', { carrinho, total });
         } else {
            res.send('Carrinho vazio');
         }
      } catch (error) {
         console.error("Erro ao listar carrinho:", error);
         res.send('Erro ao listar carrinho');
      }
   }
};
