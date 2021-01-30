function someElemento(elemento, acao){
    if(acao === 1){
        document.getElementById(elemento).style.display = 'none'
    }else{
        document.getElementById(elemento).style.display = 'inline'
    }
}
function relacaoNenhuma(){
    document.getElementById("relacaoAgressor").value = 0
}
function enviarRelato(){
    relato = {
        "RELACAO_AGRESSOR": document.getElementById("relacaoAgressor").value,
        "DATA": document.getElementById("dataAgressao").value,
        "LOCAL": document.getElementById("local").value,
        "DESCRICAO_LOCAL": document.getElementById("descricaoLocal").value,
        "IDADE_DATA_FATO": document.getElementById("idadeDataFato").value,
        "IDADE_ATUAL": document.getElementById("idadeAtual").value,
        "TIPO_VIOLENCIA": document.getElementById("tipoDeViolencia").value,
        "RELIGIAO": document.getElementById("religiao").value,
        "IDENTIDADE_GENERO": document.getElementById("identidadeGenero").value,
        "ORIENTACAO_SEXUAL": document.getElementById("orientacaoSexual").value,
        "SEXO": document.getElementById("sexo").value,
        "ESCOLARIDADE": document.getElementById("escolaridade").value,
        "PROFISSAO": document.getElementById("profissao").value,
        "NACIONALIDADE": document.getElementById("nacionalidade").value,
        "ETNIA": document.getElementById("etnia").value,
        "DEFICIENCIA": document.getElementById("deficiencia").value,
        "VIOLENCIA_INSTITUCIONAL": document.getElementById("violenciaInstitucional").value,
        "FEZ_DENUNCIA": document.getElementById("fezDenuncia").value,
        "MOTIVO_NAO_DENUNCIA": document.getElementById("motivoNaoDenuncia").value,
        "RELATO_MAO_LIVRE":document.getElementById("relatoMaoLivre").value,
        "RELIGIAO_AUTOR": document.getElementById("religiaoAgressor").value,
        "IDENTIDADE_GENERO_AUTOR": document.getElementById("identidadeGeneroAutor").value,
        "ORIENTACAO_SEXUAL_AUTOR": document.getElementById("orientacaoSexualAgressor").value,
        "SEXO_AUTOR": document.getElementById("sexoAgressor").value,
        "ESCOLARIDADE_AUTOR":document.getElementById("escolaridadeAutor").value,
        "PROFISSAO_AUTOR":document.getElementById("profissaoAgressor").value,
        "NACIONALIDADE_AUTOR": document.getElementById("nacionalidadeAgressor").value,
        "ETNIA_AUTOR": document.getElementById("etniaAgressor").value,
        "IDADE_AUTOR":document.getElementById("idadeAgressor").value
        
    }
    console.log(relato)
    fetch('http://127.0.0.1:3333/criarRelato', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(relato),
    }).then(
        response => response.json()
    ).then(
        data => {
            console.log('Success:', data);
        }
    ).catch(
        (error) => {
            console.error('Error:', error);
        }
    );
    console.log(relato)
    /* window.location.href = '/lerRelatos.html' */
}