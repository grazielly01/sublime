const insumo = [ // Array de objetos para armazenar o cadastro de insumos (com suas propriedades básicas)
    {
        nome: "",
        lote: "",
        minimo:"",
        validade:"",
        custo:"",
    },
    {
        nome: "",
        lote: "",
        minimo: "",
        validade:"",
        custo:"",
    },
    {
        nome: "",
        lote: "",
        minimo:"",
        validade:"",
        custo:"",
    }
];


function listarInsumos (req, res) { // Função que processa a lista de insumos e envia a resposta HTTP

   
    const resultado = [];  // Array para armazenar a lista formatada com a propriedade "status"

   
    for (let i = 0; i < insumo.length; i++){  // Loop para percorrer cada item da lista de insumos
        
     
        let status = "ok"; // Define o status padrão do insumo como "ok"
        
        
        if(insumo[i].quantidade <= insumo[i].minimo){ // Verifica se a quantidade atual é menor ou igual ao estoque mínimo recomendado
        status = "repor"; // Atualiza o status para alertar a necessidade de reposição
        }

        // Adiciona um novo objeto formatado ao array de resultados
        resultado.push({
            nome:insumo[i].nome,
            lote:insumo[i].lote,
            quantidade:insumo[i].quantidade,
            minimo:insumo[i].minimo, 
            validade:insumo[i].validade,
            custo:insumo[i].custo,
            status:status
        });

    }

    // Retorna o array processado em formato JSON como resposta da API
    res.json(resultado);
}

// Exporta a função para que possa ser utilizada em outros arquivos (ex: nas rotas)
module.exports = { listarInsumos };