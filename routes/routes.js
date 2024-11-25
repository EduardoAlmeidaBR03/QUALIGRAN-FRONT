const express = require("express");
const Services = require("../services/services");
const router = express.Router();
/*
router.get("/",(req, res) =>{
 res.send("Seja bem Vindo ao nosso sistema de Varejo Virtual.");
});
*/

router.get("/", Services.ProdutoListar);

router.post("/login",Services.UsuarioLogin);
router.get('/login', (req, res) => {
    res.render('usuarios/login', { isInativa: true });
  });

router.get('/logado', (req, res) => {
   res.render('logado');
});
  

router.get("/usuarios/Cadastrar",(req, res) => {
    res.render("usuarios/Cadastrar", { isInativa: true});
  });

router.post("/usuarios/Cadastrar",Services.UsuarioCreate);


/////////////////PRODUTO

router.get("/chapas/Cadastrar",(req, res) =>{
 res.render("produtos/Cadastrar", { isInativa: true });
});
router.post("/chapas/Cadastrar",Services.ProdutoCreate);


// Renderizar formulário de alteração
router.get('/chapa/alterar/:id_chapa', async (req, res) => {
  const idChapa = req.params.id_chapa;
  console.log("ID para alterar" + req.params.id_chapa)
  try {
     const chapa = await Services.buscarChapaPeloId(idChapa);
     console.log("CHAPA PARA ALTERAR::  " + chapa) // Certifique-se que isso retorna a chapa corretamente
     if (!chapa) {
        res.status(404).send("Chapa não encontrada");
     } else {
        res.render('produtos/atualizar', { chapa, isInativa: true });
     }
  } catch (error) {
     console.error("Erro ao buscar chapa:", error);
     res.status(500).send("Erro no servidor");
  }
});


// Atualizar chapa
router.post('/chapas/update/:id_chapa', Services.ProdutoAtualizar);



router.get("/chapas/listar",Services.ProdutoListar);

router.post("/chapa/excluir/:id",Services.ProdutoDelete);



router.get('/carrinho/Adicionar/:id_chapa/:nome/:preco/:link/:largura/:altura', Services.CarrinhoAdicionar);
router.get('/carrinho/listar', Services.CarrinhoListar);
router.get('/carrinho/remover/:id_chapa', Services.CarrinhoRemoverItem);

module.exports=router;