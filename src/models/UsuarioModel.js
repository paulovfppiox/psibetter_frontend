// src/models/UsuarioModel.js
/* eslint-disable */

import axios from 'axios';

export default class UsuarioModel {
  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
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
        const response = await axios.post( "http://localhost/psibetter/services-api.php", sendData );
        console.log(" CADASTRANDO USER?? " + JSON.stringify( response ) );
        return response.data;
  }

  // Add more methods as needed
}
