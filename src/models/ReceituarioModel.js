// src/models/UsuarioModel.js
/* eslint-disable */
import axios from 'axios';
import { ENDPOINT_URL } from '@/models/modelGlobalSettings.js';


export default class ReceituarioModel {
  constructor()      { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
     // this.ENDPOINT_URL = "http://184.72.238.232/psibetter/psibetter_backend/services-api.php";
     this.ENDPOINT_URL = ENDPOINT_URL; //"http://localhost/psibetter_backend/services-api.php";
  }

 
  async cadastrarReceituarioAPI( data )  {

        const sendData = {
            "data" : {
                "entity":"receituario",
                "operation":"cadastrar",
                "object": data
            }
        };

        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- REceituario Model ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log(" CADASTRANDO RECEITUARIO ?? " + JSON.stringify( response ) );
        return response.data;
  }


  
  async consultarReceituarioAPI( dados )
  {
  
    //alert( dataHoraIni + " || " + dataHoraFim );

        const sendData = {
            "data" : {
                "entity":"receituario",
                "operation":"consultar",
                "object": dados
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Financeiro Model ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        // console.log(" Consulta Financeiro?? " + JSON.stringify( response ) );
        return response.data;
    } 
 
    async atualizarReceituarioAPI( dados )
    {
        const sendData = {
            "data" : {
                "entity":"receituario",
                "operation":"atualizar",
                "object": dados
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Atualizar finanças ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        return response;
    }



    async removerReceituarioAPI( idReceita )  {

        var sendData = {
           "data":     {
              "entity":"receituario",
              "operation": "deletar",
              "object":{
                    "id": idReceita
              }
           }
        }; 
      
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Receituario ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log("-->> Response " + JSON.stringify( response.data ) ); 
        return response.data; 
     }

  // Add more methods as needed
}
