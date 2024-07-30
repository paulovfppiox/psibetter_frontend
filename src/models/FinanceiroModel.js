// src/models/UsuarioModel.js
/* eslint-disable */
import axios from 'axios';
import { ENDPOINT_URL } from '@/models/modelGlobalSettings.js';


export default class FinanceiroModel {
  constructor() { 
     //alert("Criei o UserModel!! ");
     this.operacao = "cadastrar";
     // this.ENDPOINT_URL = "http://184.72.238.232/psibetter/psibetter_backend/services-api.php";
     this.ENDPOINT_URL = ENDPOINT_URL; //"http://localhost/psibetter_backend/services-api.php";
  }


  /** {
"data":
{
	"entity":"agendaFinanceiro",
	"operation":"cadastrar",
	"object":{		
		 "keys" : 	     {
			"nome": "Administrador",
			"dataHoraInicio": "2024-06-20 00:00:00"	
		 } 
	}
  }
}  */
  async cadastrarFinanceiroAPI( data )  {

        const sendData = {
            "data" : {
                "entity":"agendaFinanceiro",
                "operation":"cadastrar",
                "object": {
                    "keys": data
                }
            }
        };

        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Financeiro Model ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        console.log(" CADASTRANDO Financeiro ?? " + JSON.stringify( response ) );
        return response.data;
  }


  /**
   * 
   * {
"data":
{
	"entity":"agendaFinanceiro",
	"operation":"consultar",
	"object":{				 
            "nomePaciente": "João Guilherme",
			"profissionalId": "143",
			"dataHoraInicio": "2024-08-22 22:22:00",
            "dataHoraFim": "2024-09-16T19:00:00"
	}
  }
}
   */
  async consultarFinanceiroAPI(  nomePaciente, dataHoraIni, dataHoraFim, profissionalId )
  {
  
    //alert( dataHoraIni + " || " + dataHoraFim );

        const sendData = {
            "data" : {
                "entity":"agendaFinanceiro",
                "operation":"consultar",
                "object": {
                    "nomePaciente": nomePaciente,
                    "profissionalId": profissionalId,
                    "dataHoraInicio": dataHoraIni,
                    "dataHoraFim": dataHoraFim
                }
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Financeiro Model ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        // console.log(" Consulta Financeiro?? " + JSON.stringify( response ) );
        return response.data;
    } 

    /** Usar a atualização, para atualizar o fichamento de nova sessão.  
    {
        "data": {
            "entity":"agendaFinanceiro",
            "operation": "atualizar",
            "object" : 	     {
                "keys" : 	     {
                    "idConsultaAgenda" : "117"
                },
                "financeiro":  {
                    "id": "16",
                    "idConsultaAgenda" : "117",
                    "dataPagamento" : "2027-07-01",
                    "mesReferencia" : "01",
                    "anoReferencia" : "2024",
                    "situacaoDebito" : "aberto",
                    "tipoPagamento" : "mensal",
                    "nomeArquivo" : "arquivo-teste.pdf"
                } 
            }
        }
        }*/
    async atualizarFinanceiroAPI( dados )
    {
        const sendData = {
            "data" : {
                "entity":"agendaFinanceiro",
                "operation":"atualizar",
                "object": dados
            }
        };
        // alert( "URL: " + this.$SERVICES_ENDPOINT_URL );
        console.log( "- Atualizar finanças ||| Send Data >> " +  JSON.stringify( sendData ) );
        const response = await axios.post( this.ENDPOINT_URL, sendData );
        return response;
    }

  // Add more methods as needed
}
