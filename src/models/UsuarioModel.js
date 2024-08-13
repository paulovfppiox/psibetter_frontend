// src/models/UsuarioModel.js
/* eslint-disable */

import axios from 'axios';
import { ENDPOINT_URL } from '@/models/modelGlobalSettings.js';

export default class UsuarioModel {
  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
     // this.ENDPOINT_URL = "http://184.72.238.232/psibetter/psibetter_backend/services-api.php";
     this.ENDPOINT_URL = ENDPOINT_URL;
  }

  async novoUsuarioAPI( userData )  {

        const sendData = {
            "data" : {
                "entity":"usuarios",
                "operation":this.operacao,
                "object": userData
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- UsuModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log(" CADASTRANDO USER?? " + JSON.stringify( response ) );
        return response.data;
  }


  async consultarUsuarioAPI( userData )  
  {
        const sendData = {
            "data" : {
                "entity":"usuarios",
                "operation":"consultar",
                "object": userData
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- UsuModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log(" CONSULTAR USER?? " + JSON.stringify( response ) );
        return response.data;
    }

  // Add more methods as needed
}
