// src/controllers/UserController.js
import FinanceiroModel from '@/models/FinanceiroModel.js';

export default class Agenda    {
 
  constructor() 
  {
      this.financeiroModel = new FinanceiroModel();
      // console.log( "Financeiro || criando... " + JSON.stringify( this.financeiroModel ) );      
  } 
 

  async cadastrarFinanceiro( dados ) 
  {
    // console.log( "Cadastrar Finanças !?!" + JSON.stringify( dados )); 

    try {
         const response = await this.financeiroModel.cadastrarFinanceiroAPI( dados );
         // alert( "financeiroModel response: " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }     

  async atualizarFinanceiro( dados ) 
  {

    // console.log( "** DADOS 1111 ?!? " + JSON.stringify( dados ) );

    try {
         const response = await this.financeiroModel.atualizarFinanceiroAPI( dados );
         // alert( "Agenda financeiro add || resp ? " + JSON.stringify( response.data ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }    
    
  async consultarFinanceiro( nomePaciente, dataHoraIni, dataHoraFim, profissionalId ) 
  {
    // console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.financeiroModel.consultarFinanceiroAPI(  nomePaciente, dataHoraIni, dataHoraFim, profissionalId );
         // alert( "Consultar Financeiro.js || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
