// src/models/UsuarioModel.js
/* eslint-disable */
import axios from 'axios';
import { ENDPOINT_URL } from '@/models/modelGlobalSettings.js';


export default class AgendaModel {
  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
     // this.ENDPOINT_URL = "http://184.72.238.232/psibetter/psibetter_backend/services-api.php";
     this.ENDPOINT_URL = ENDPOINT_URL; //"http://localhost/psibetter_backend/services-api.php";
  }

  async novoEventoAPI( userData )  {

        const sendData = {
            "data" : {
                "entity":"agenda",
                "operation":"cadastrar",
                "object": userData
            }
        };
        if ( userData.dataHoraInicio.length == 24 )
             userData.dataHoraInicio = userData.dataHoraInicio.slice(0, -1);

        if ( userData.dataHoraFim.length == 24 )
             userData.dataHoraFim = userData.dataHoraFim.slice(0, -1);

             // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
        return response.data;
  }
  async consultarEventosAPI(  dataHoraIni, dataHoraFim, profissionalId )
  {
  
    //alert( dataHoraIni + " || " + dataHoraFim );

    const sendData = {
        "data" : {
            "entity":"agenda",
            "operation":"consultar",
            "object": {
                "profissionalId": profissionalId,
                "dataHoraInicio": dataHoraIni,
                "dataHoraFim": dataHoraFim,
            }
        }
    };
    // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
    console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
    const response = await axios.post( this.ENDPOINT_URL, sendData );
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
    const response = await axios.post( this.ENDPOINT_URL, sendData );
    //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
    return response.data;
}

    /** Usar a atualização, para atualizar o fichamento de nova sessão. */
    async atualizarAgendaAPI( dadosFicharioAgenda )
    {

        const sendData = {
            "data" : {
                "entity":"agenda",
                "operation":"atualizar",
                "object": {
                    "id" : dadosFicharioAgenda.id,
                    "nomePaciente" :  dadosFicharioAgenda.nomePaciente,
                    "dataHoraInicio" :  dadosFicharioAgenda.dataHoraInicio,
                    "dataHoraFim"	 :  dadosFicharioAgenda.dataHoraFim,
                    "profissionalId" :  dadosFicharioAgenda.profissionalId,
                    "motivosConsulta"  : dadosFicharioAgenda.motivosConsulta,
                    "historiaConsulta" : dadosFicharioAgenda.historiaConsulta,
                    "statusContulta"   : dadosFicharioAgenda.statusContulta,
                    "intervencoes"     : dadosFicharioAgenda.intervencoes,
                    "planoIntervencoes" : dadosFicharioAgenda.planoIntervencoes
                }
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- AgendaModel ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        //console.log(" CADASTRANDO Agenda Evento?? " + JSON.stringify( response ) );
        return response.data;
    }

  // Add more methods as needed
}
