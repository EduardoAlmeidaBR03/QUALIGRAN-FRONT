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
  

router.get("/usuarios/Cadastrar",(req, res) => {
    res.render("usuarios/Cadastrar", { isInativa: true});
  });

router.post("/usuarios/Cadastrar",Services.UsuarioCreate);


/////////////////PRODUTO

router.get("/chapas/Cadastrar",(req, res) =>{
 res.render("produtos/Cadastrar");
})
router.post("/chapas/Cadastrar",Services.ProdutoCreate);

router.get("/chapas/listar",Services.ProdutoListar);

router.post("/chapa/excluir/:id",Services.ProdutoDelete);



router.get('/carrinho/Adicionar/:id_chapa/:nome/:preco/:link', Services.CarrinhoAdicionar);
router.get('/carrinho/listar', Services.CarrinhoListar);
router.get('/carrinho/remover/:id_chapa', Services.CarrinhoRemoverItem);

module.exports=router;