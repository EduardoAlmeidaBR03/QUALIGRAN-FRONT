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
    res.render('usuarios/login', { isLogin: true });
  });
  

router.get("/usuarios/Cadastrar",(req, res) =>{
 res.render("usuarios/Cadastrar");
})

router.post("/usuarios/Cadastrar",Services.UsuarioCreate);


/////////////////PRODUTO

router.get("/chapas/Cadastrar",(req, res) =>{
 res.render("produtos/Cadastrar");
})
router.post("/chapas/Cadastrar",Services.ProdutoCreate);

router.get("/chapas/listar",Services.ProdutoListar);

router.post("/chapa/excluir/:id",Services.ProdutoDelete);

module.exports=router;