// src/models/UsuarioModel.js
/* eslint-disable */

import axios from 'axios';

export default class UsuarioModel {
  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
  }

  async novoEventoAPI( userData )  {

        const sendData = {
            "data" : {
                "entity":"agenda",
                "operation":"cadastrar",
                "object": userData
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( "http://localhost/psibetter/services-api.php", sendData );
        //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
        return response.data;
  }
  async consultarEventosAPI(  dataHoraIni, dataHoraFim  )
  {

    const sendData = {
        "data" : {
            "entity":"agenda",
            "operation":"consultar",
            "object": {
                "dataHoraInicio": dataHoraIni,
                "dataHoraFim": dataHoraFim,
            }
        }
    };
    // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
    console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
    const response = await axios.post( "http://localhost/psibetter/services-api.php", sendData );
    //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
    return response.data;
}


async removerEventoAPI( nomePaciente, dataHoraIni )
  {

    const sendData = {
        "data" : {
            "entity":"agenda",
            "operation":"deletar",
            "object": {
                "nomePaciente" : nomePaciente,
                "dataHoraInicio": dataHoraIni
            }
        }
    };
    // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
    console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
    const response = await axios.post( "http://localhost/psibetter/services-api.php", sendData );
    //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
    return response.data;
}

  // Add more methods as needed
}
