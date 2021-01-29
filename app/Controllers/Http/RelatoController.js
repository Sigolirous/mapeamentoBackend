'use strict'

class RelatoController {
  async criar({ request, response }){
    const Database = use('Database')
    /* Relato em que a vitima não tem relação com o autor */
      if(request.body.RELACAO_AGRESSOR == ''){
        const time = Date.now();
        /* Inserção do relato na tabela "mapa" */
        try {
          await Database.table('mapa').insert({
            "RELACAO_AGRESSOR": 0,
            "DATA": request.body.DATA,
            "LOCAL": request.body.LOCAL,
            "DESCRICAO_LOCAL": request.body.DESCRICAO_LOCAL,
            "IDADE_DATA_FATO": request.body.IDADE_DATA_FATO,
            "IDADE_ATUAL": request.body.IDADE_DATA_FATO,
            "TIPO_VIOLENCIA": request.body.TIPO_VIOLENCIA,
            "RELIGIAO": request.body.RELIGIAO,
            "IDENTIDADE_GENERO": request.body.IDENTIDADE_GENERO,
            "ORIENTACAO_SEXUAL": request.body.ORIENTACAO_SEXUAL,
            "SEXO": request.body.SEXO,
            "ESCOLARIDADE": request.body.ESCOLARIDADE,
            "PROFISSAO": request.body.PROFISSAO,
            "NACIONALIDADE": request.body.NACIONALIDADE,
            "ETNIA": request.body.ETNIA,
            "DEFICIENCIA": request.body.DEFICIENCIA,
            "VIOLENCIA_INSTITUCIONAL": request.body.VIOLENCIA_INSTITUCIONAL,
            "FEZ_DENUNCIA": request.body.FEZ_DENUNCIA,
            "MOTIVO_NAO_DENUNCIA": request.body.MOTIVO_NAO_DENUNCIA,
            "RELATO_MAO_LIVRE": request.body.RELATO_MAO_LIVRE,
            "TIME": time
          })
        } catch (error) {
          console.log(error)
          response.json({
            status:"Erro na Criacao do Relato",
            mensagem: error
          })
        }
        try{
          /* Uso da API de geolocalização responsável por traduzir endereço em latitude e longitude */
          const axios = require('axios')
          const geoLoc = await axios.post('http://www.mapquestapi.com/geocoding/v1/address?key=a3lI4kNnsvyOaPsgPKApD51NV21hAWET',{
            /* Aqui eu usei uma variável genérica que já estabelece o endereço limitado à BH */
            "location": `${request.body.LOCAL} - Belo Horizonte - MG`,
            "options": {
              "thumbMaps": false,
              "maxResults": 1
            }
          })
          const latLng = geoLoc.data.results[0].locations[0].latLng
          /* Essa variável é usada para sincronizar a tabela de relatos à tabela de locais */
          const posted =     await Database.select('idmapa').from('mapa').where({
            RELACAO_AGRESSOR: request.body.RELACAO_AGRESSOR,
            DATA: request.body.DATA,
            LOCAL: request.body.LOCAL,
            DESCRICAO_LOCAL: request.body.DESCRICAO_LOCAL,
            IDADE_DATA_FATO: request.body.IDADE_DATA_FATO,
            IDADE_ATUAL: request.body.IDADE_DATA_FATO,
            TIPO_VIOLENCIA: request.body.TIPO_VIOLENCIA,
            RELIGIAO: request.body.RELIGIAO,
            IDENTIDADE_GENERO: request.body.IDENTIDADE_GENERO,
            ORIENTACAO_SEXUAL: request.body.ORIENTACAO_SEXUAL,
            SEXO: request.body.SEXO,
            ESCOLARIDADE: request.body.ESCOLARIDADE,
            PROFISSAO: request.body.PROFISSAO,
            NACIONALIDADE: request.body.NACIONALIDADE,
            ETNIA: request.body.ETNIA,
            DEFICIENCIA: request.body.DEFICIENCIA,
            VIOLENCIA_INSTITUCIONAL: request.body.VIOLENCIA_INSTITUCIONAL,
            FEZ_DENUNCIA: request.body.FEZ_DENUNCIA,
            MOTIVO_NAO_DENUNCIA: request.body.MOTIVO_NAO_DENUNCIA,
            RELATO_MAO_LIVRE: request.body.RELATO_MAO_LIVRE,
            TIME: time
            })
          /* Inserção das coordenadas geográficas na tabela "localizar" */
          await Database.table('localizar').insert({
            "LATITUDE":latLng.lat,
            "LONGITUDE":latLng.lng,
            "mapa_idmapa":posted[0].idmapa
          })
          response.json({
            status:"ok",
            mensagem: "Relato adicionado com sucesso ao banco de dados!"
          })
        }catch(error){
          console.log(error)
          response.json({
            status:"Erro na obtencao dos dados de longitude e latitude",
            mensagem: error
          })
        }
      }else{
        /* Aqui acontece a mesma coisa do "if" acima, com a única diferença de também criamos um elemento novo na tabela "autor" */
        const time = Date.now()
        try {
          await Database.table('mapa').insert({
            "RELACAO_AGRESSOR": request.body.RELACAO_AGRESSOR,
            "DATA": request.body.DATA,
            "LOCAL": request.body.LOCAL,
            "DESCRICAO_LOCAL": request.body.DESCRICAO_LOCAL,
            "IDADE_DATA_FATO": request.body.IDADE_DATA_FATO,
            "IDADE_ATUAL": request.body.IDADE_DATA_FATO,
            "TIPO_VIOLENCIA": request.body.TIPO_VIOLENCIA,
            "RELIGIAO": request.body.RELIGIAO,
            "IDENTIDADE_GENERO": request.body.IDENTIDADE_GENERO,
            "ORIENTACAO_SEXUAL": request.body.ORIENTACAO_SEXUAL,
            "SEXO": request.body.SEXO,
            "ESCOLARIDADE": request.body.ESCOLARIDADE,
            "PROFISSAO": request.body.PROFISSAO,
            "NACIONALIDADE": request.body.NACIONALIDADE,
            "ETNIA": request.body.ETNIA,
            "DEFICIENCIA": request.body.DEFICIENCIA,
            "VIOLENCIA_INSTITUCIONAL": request.body.VIOLENCIA_INSTITUCIONAL,
            "FEZ_DENUNCIA": request.body.FEZ_DENUNCIA,
            "MOTIVO_NAO_DENUNCIA": request.body.MOTIVO_NAO_DENUNCIA,
            "RELATO_MAO_LIVRE": request.body.RELATO_MAO_LIVRE,
            "TIME":time
          })
        } catch (error) {
          console.log(error)
          response.json({
            status:"Erro na criacao do relato",
            mensagem: error
          })
        }
        /* Variável usada para sincronizar o elemento "relato" aos elementos "coordenadas geográficas" e "autor" */
        const posted =     await Database.select('idmapa').from('mapa').where({
          RELACAO_AGRESSOR: request.body.RELACAO_AGRESSOR,
          DATA: request.body.DATA,
          LOCAL: request.body.LOCAL,
          DESCRICAO_LOCAL: request.body.DESCRICAO_LOCAL,
          IDADE_DATA_FATO: request.body.IDADE_DATA_FATO,
          IDADE_ATUAL: request.body.IDADE_DATA_FATO,
          TIPO_VIOLENCIA: request.body.TIPO_VIOLENCIA,
          RELIGIAO: request.body.RELIGIAO,
          IDENTIDADE_GENERO: request.body.IDENTIDADE_GENERO,
          ORIENTACAO_SEXUAL: request.body.ORIENTACAO_SEXUAL,
          SEXO: request.body.SEXO,
          ESCOLARIDADE: request.body.ESCOLARIDADE,
          PROFISSAO: request.body.PROFISSAO,
          NACIONALIDADE: request.body.NACIONALIDADE,
          ETNIA: request.body.ETNIA,
          DEFICIENCIA: request.body.DEFICIENCIA,
          VIOLENCIA_INSTITUCIONAL: request.body.VIOLENCIA_INSTITUCIONAL,
          FEZ_DENUNCIA: request.body.FEZ_DENUNCIA,
          MOTIVO_NAO_DENUNCIA: request.body.MOTIVO_NAO_DENUNCIA,
          RELATO_MAO_LIVRE: request.body.RELATO_MAO_LIVRE,
          TIME: time
          })
        try{
          const axios = require('axios')
          const geoLoc = await axios.post('http://www.mapquestapi.com/geocoding/v1/address?key=a3lI4kNnsvyOaPsgPKApD51NV21hAWET',{
            "location": `${request.body.LOCAL} - Belo Horizonte - MG`,
            "options": {
              "thumbMaps": false,
              "maxResults": 1
            }
          })
          const latLng = geoLoc.data.results[0].locations[0].latLng
          await Database.table('localizar').insert({
            "LATITUDE":latLng.lat,
            "LONGITUDE":latLng.lng,
            "mapa_idmapa":posted[0].idmapa
          })
        }catch(error){
          console.log(error)
          response.json({
            status:"Erro na criacao da localizacao",
            mensagem: error
          })
        }
        try{
          /* Inserção de um novo autor à tabela "autor" */
          await Database.table('autor').insert({
            "RELIGIAO_AUTOR":request.body.RELIGIAO_AUTOR,
            "RELACAO_COM_AUTOR":request.body.RELACAO_AGRESSOR,
            "IDENTIDADE_GENERO_AUTOR":request.body.IDENTIDADE_GENERO_AUTOR,
            "ORIENTACAO_SEXUAL_AUTOR":request.body.ORIENTACAO_SEXUAL_AUTOR,
            "SEXO_AUTOR":request.body.SEXO_AUTOR,
            "ESCOLARIDADE_AUTOR":request.body.ESCOLARIDADE_AUTOR,
            "PROFISSAO_AUTOR":request.body.PROFISSAO_AUTOR,
            "NACIONALIDADE_AUTOR":request.body.NACIONALIDADE_AUTOR,
            "ETNIA_AUTOR":request.body.ETNIA_AUTOR,
            "IDADE_AUTOR":request.body.IDADE_AUTOR,
            "mapa_idmapa": posted[0].idmapa
          })
          response.json({
            status:"ok",
            mensagem: "Relato adicionado com sucesso ao banco de dados!"
          })
        }catch(error){
          console.log(error)
          response.json({
            status:"Erro na criacao do autor",
            mensagem: error
          })
        }
      }

  }

  async excluir({ request, response }){
    const Database = use('Database')
    console.log(request.body.idmapa)
    try {
      await Database.table('mapa').where({idmapa:request.body.idmapa}).delete()
      await Database.table('localizar').where({mapa_idmapa:request.body.idmapa}).delete()
      await Database.table('autor').where({mapa_idmapa: request.body.idmapa}).delete()
    } catch (error) {
      console.log(error)
      response.json({
        status: "error",
        error: error
      })
    }
  }

  async listar({ request, response }){
    const Database = use('Database')
    const relatos = []
    let relatosT = await Database.table('mapa').select('*')
    console.log()
    for(let i = 0; i < Object.keys(relatosT).length; i++){
      console.log('step')
      relatos.push({
        idBE: i,
        relato: relatosT[i],
        mapa: await Database.table("localizar").where({mapa_idmapa: relatosT[i].idmapa}),
        autor: await Database.table('autor').where({mapa_idmapa: relatosT[i].idmapa})
      })
    }
    response.json({
      status: "ok",
      data: relatos
    })
  }

  async listarUm({ request, response }){
    const Database = use('Database')
    let relato = []
    relato.push({
      relato: await Database.table('mapa').where({idmapa: request.get().id}),
      mapa: await Database.table('localizar').where({mapa_idmapa: request.get().id}),
      autor: await Database.table('autor').where({mapa_idmapa: request.get().id})
    })

    response.json({
      status: "ok",
      data: relato
    })
  }

}

module.exports = RelatoController
