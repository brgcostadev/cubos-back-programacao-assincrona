const express = require("express")
const { listarProdutos, detalharProduto, calculaFrete } = require("./controllers/frete")

const routes = express()

routes.get("/produtos", listarProdutos)
routes.get("/produtos/:idProduto", detalharProduto)
routes.get("/produtos/:idProduto/frete/:cep", calculaFrete)


module.exports = {
    routes
}