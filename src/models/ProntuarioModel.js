// src/models/UsuarioModel.js
/* eslint-disable */

import axios from 'axios';
import { ENDPOINT_URL } from '@/models/modelGlobalSettings.js';


export default class ProntuarioModel {
  constructor()   { 
     this.operacao = "cadastrar";
     // this.ENDPOINT_URL = "http://184.72.238.232/psibetter/psibetter_backend/services-api.php";
     this.ENDPOINT_URL = ENDPOINT_URL; //"http://localhost/psibetter_backend/services-api.php";
     // alert("Criei o UserModel!! " );
  }

  /** Função que converte os diferentes tipos de dados do front-end para os tipos do back-end. */
  preparaDadosBD( sendData )             {

      /** Senha padrão cifrada. */
      sendData.data.object.usuario.senha = btoa( "psibetter" );
      sendData.data.object.usuario.tipo  = "paciente";

      var strCirurgias;   		 
      var strAlergias;    		 
      var strMedicamentos;
      var strDoencasPreexistentes; 
      var strDrogas; 	
      
      // alert("TIPO?!?! " + typeof sendData.data.object.dadosClinicos.cirurgias );
      if ( sendData.data.object.dadosClinicos.cirurgias != null )
           strCirurgias = sendData.data.object.dadosClinicos.cirurgias.join(", ");
         
      if ( sendData.data.object.dadosClinicos.alergias != null )
         strAlergias = sendData.data.object.dadosClinicos.alergias.join(", ");
         
      if ( sendData.data.object.dadosClinicos.medicacoesEmUso != null )	 
         strMedicamentos = sendData.data.object.dadosClinicos.medicacoesEmUso.join(", ");
         
      if ( sendData.data.object.dadosClinicos.doencasPreexistentes != null )	 	 
         strDoencasPreexistentes = sendData.data.object.dadosClinicos.doencasPreexistentes.join(", ");

      if ( sendData.data.object.dadosClinicos.drogas != null )	 	 	 
         strDrogas = sendData.data.object.dadosClinicos.drogas.join(", ");

      sendData.data.object.dadosClinicos.cirurgias = strCirurgias;
      sendData.data.object.dadosClinicos.alergias  = strAlergias;
      sendData.data.object.dadosClinicos.medicacoesEmUso = strMedicamentos;
      sendData.data.object.dadosClinicos.doencasPreexistentes  = strDoencasPreexistentes;
      sendData.data.object.dadosClinicos.drogas  = strDrogas;


      if ( !sendData.data.object.dadosClinicos.fuma )
            sendData.data.object.dadosClinicos.fuma = "0";

      if ( !sendData.data.object.dadosClinicos.bebe )
            sendData.data.object.dadosClinicos.bebe = "0";   
      
      if ( !sendData.data.object.dadosClinicos.atividadeFisica )
            sendData.data.object.dadosClinicos.atividadeFisica = "0";               
      
      if ( !sendData.data.object.dadosClinicos.temAutomutilacao )
            sendData.data.object.dadosClinicos.temAutomutilacao = "0";             
            
      /** alert( "* Fuma?!? " + sendData.data.object.dadosClinicos.fuma );
      alert( "* Bebe?!? " + sendData.data.object.dadosClinicos.bebe );
      alert( "* atividadeFisica ?!? " + sendData.data.object.dadosClinicos.atividadeFisica );
      alert( "* temAutomutilacao ?!? " + sendData.data.object.dadosClinicos.temAutomutilacao );*/
      // sendData.data.object.dadosClinicos.bebe

      
      /* if ( sendData.data.object.dadosClinicos.ideacoesSuicidas != null )
           sendData.data.object.dadosClinicos.ideacoesSuicidas = sendData.data.object.dadosClinicos.ideacoesSuicidas.toLowerCase();*/

      return sendData;
  }

  async cadastrarProntuarioAPI( dadosUsuario , dadosClinicos )  {

        var sendData = {
           "data":     {
              "entity":"prontuarioPaciente",
              "operation":this.operacao,
              "object":{
                  "usuario": dadosUsuario,
                  "dadosClinicos": dadosClinicos
              }
           }
        };
        sendData = this.preparaDadosBD( sendData );

        /** Senha padrão cifrada. 
        sendData.data.object.usuario.senha = btoa( "psibetter" );
        sendData.data.object.usuario.tipo  = "paciente";

        const strCirurgias    = sendData.data.object.dadosClinicos.cirurgias.join(", ");
        const strAlergias     = sendData.data.object.dadosClinicos.alergias.join(", ");
        const strMedicamentos = sendData.data.object.dadosClinicos.medicacoesEmUso.join(", ");
        const strDoencasPreexistentes = sendData.data.object.dadosClinicos.doencasPreexistentes.join(", ");
        const strDrogas = sendData.data.object.dadosClinicos.drogas.join(", ");

        sendData.data.object.dadosClinicos.cirurgias = strCirurgias;
        sendData.data.object.dadosClinicos.alergias  = strAlergias;
        sendData.data.object.dadosClinicos.medicacoesEmUso = strMedicamentos;
        sendData.data.object.dadosClinicos.doencasPreexistentes  = strDoencasPreexistentes;
        sendData.data.object.dadosClinicos.drogas  = strDrogas;

        sendData.data.object.dadosClinicos.ideacoesSuicidas = sendData.data.object.dadosClinicos.ideacoesSuicidas.toLowerCase();
         */
       // console.log( "DADOS CLINICOS OK ?!?!?! " + JSON.stringify( dadosClinicos ) );

        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- ProntuarioModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log("-->> Response " + JSON.stringify( response.data ) );

        return response.data;
        
  }


  async atualizarProntuarioAPI( dadosUsuario , dadosClinicos )  {

   var sendData = {
      "data":     {
         "entity":"prontuarioPaciente",
         "operation": "atualizar",
         "object":{
             "usuario": dadosUsuario,
             "dadosClinicos": dadosClinicos
         }
      }
   };
   sendData = this.preparaDadosBD( sendData );
 
   // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
   console.log( "- ProntuarioModel ||| Send Data >> " +  JSON.stringify( sendData ) );
   const response = await axios.post( this.ENDPOINT_URL, sendData );
   console.log("-->> Response " + JSON.stringify( response.data ) );

   return response.data;
   
}




async removerProntuarioAPI( idUsuario )  {

   var sendData = {
      "data":     {
         "entity":"prontuarioPaciente",
         "operation": "deletar",
         "object":{
             "usuario": {
                  "id": idUsuario
             }
         }
      }
   }; 
 
   // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
   console.log( "- ProntuarioModel ||| Send Data >> " +  JSON.stringify( sendData ) );
   const response = await axios.post( this.ENDPOINT_URL, sendData );
   console.log("-->> Response " + JSON.stringify( response.data ) );

   return response.data;
   
}



  // Add more methods as needed
}
