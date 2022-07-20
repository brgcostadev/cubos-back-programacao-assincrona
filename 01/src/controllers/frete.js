const produtos = require("../bancodedados/produtos");
const { getStateFromZipcode } = require("utils-playground")

const listarProdutos = (req,res) => res.send(produtos)
const detalharProduto = (req,res) => {
    const { idProduto } = req.params
    const resultado = produtos.find(produto => produto.id === Number(idProduto))

    if(!resultado) {
        return res.send("Produto não encontrado")
    }

    res.send(resultado)
}

const calculaFrete = async (req,res) => {
    const { idProduto } = req.params
    const { cep } = req.params

    const resultado = produtos.find(produto => produto.id === Number(idProduto))
    

    if(!resultado) {
        return res.send("Produto não encontrado")
    }

    const pegaEstado = await getStateFromZipcode(cep)
    let fretePorcentagem = 12/100
    if(pegaEstado === "BA" || pegaEstado === "SE" || pegaEstado === "AL" || pegaEstado === "PE" || pegaEstado === "PB") {
        fretePorcentagem = 10/100
    }
    if(pegaEstado === "SP" || pegaEstado === "RJ") {
        fretePorcentagem = 15/100
    }

    const calculaFrete = resultado.valor * fretePorcentagem

    res.json({
        resultado,
        estado: pegaEstado,
        frete: calculaFrete
    })
}


module.exports = {
    listarProdutos,
    detalharProduto,
    calculaFrete

}