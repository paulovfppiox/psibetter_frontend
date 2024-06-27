// src/controllers/UserController.js
import AgendaModel from '@/models/AgendaModel.js';

export default class Agenda    {
 
  constructor() 
  {
      this.agendaModel = new AgendaModel();
      console.log( "Agenda || criando... " + JSON.stringify( this.agendaModel ) );      
      this.eventos = [];
  }

  getDados()         {
      return this.dadosEvento;
  }

  setDados( evento  )  {
      this.eventos.push( evento );
  }

  async cadastrarEvento( evento ) 
  {
    console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.agendaModel.novoEventoAPI( evento );
         alert( "Prontuario Controller || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }     
  
  async removerEvento( nomePaciente, dia ) 
  {
    console.log( "Modelo Agenda ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.agendaModel.removerEventoAPI( nomePaciente, dia );
         // alert( "Prontuario remover || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }


  async consultarEventos( dataHoraIni, dataHoraFim ) 
  {
    console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.agendaModel.consultarEventosAPI(  dataHoraIni, dataHoraFim  );
         alert( "Consultar eventos || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
