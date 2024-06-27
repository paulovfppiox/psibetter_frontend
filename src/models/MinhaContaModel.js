// src/models/UsuarioModel.js
/* eslint-disable */

import axios from 'axios';

export default class MinhaContaModel {

  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
  }

  /** Função que converte os diferentes tipos de dados do front-end para os tipos do back-end. */
  preparaDadosBD( sendData )             {

      /** Senha padrão cifrada. */
      sendData.data.object.usuario.senha = btoa( "psibetter" );
      sendData.data.object.usuario.tipo  = "paciente";
      return sendData;
  }

  async cadastrarMinhaContaAPI( dadosUsuario , dadosProfissionais )  
  {
        console.log( "*** PROFISSAO !!!!!!!!!!!!! " + JSON.stringify( dadosProfissionais ) );
        
        dadosProfissionais.abordagemPsicologia1 = dadosProfissionais.abordagens[0]; 
        dadosProfissionais.abordagemPsicologia2 = dadosProfissionais.abordagens[1]; 
        dadosProfissionais.abordagemPsicologia3 = dadosProfissionais.abordagens[2]; 

        delete dadosProfissionais['abordagens'];

        console.log( "*** PROFISSAO 222222222 !!!!!!!!!!!!! " + JSON.stringify( dadosProfissionais ) );

        var sendData = {
           "data":     {
              "entity":"contaProfissional",
              "operation":this.operacao,
              "object":{
                 "keys" : 	     {
                     "nome" : dadosUsuario.nome
                  },
                  "usuario": dadosUsuario,
                  "profissional": dadosProfissionais
              }
           }
        };
        // sendData = this.preparaDadosBD( sendData );
        

        
        
        console.log( "DADOS CLINICOS OK ?!?!?! " + JSON.stringify( dadosProfissionais ) );

        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- MinhaContaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( "http://localhost/psibetter/services-api.php", sendData );
        console.log("-->> Response " + JSON.stringify( response.data ) );
        return response.data;
        
  }

  // Add more methods as needed
}
