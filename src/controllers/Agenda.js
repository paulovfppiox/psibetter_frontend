// src/controllers/UserController.js
import AgendaModel from '@/models/AgendaModel.js';

export default class Agenda    {
 
  constructor() 
  {
      this.agendaModel = new AgendaModel();
      // console.log( "Agenda || criando... " + JSON.stringify( this.agendaModel ) );      
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
    //console.log( "Agenda.cadastrarEvento  ?!?!" + JSON.stringify( evento ));

    /* ###################### Corrigindo Horário #################### */
    /* OBS: Por algum motivo estranho, estava cadastrando no BD, as horas definidas + 3 horas;
    /* Aqui é feita a diminuição em 3 horas */
    // Parse date strings into Date objects
    let dateTimeIni = new Date(evento.dataHoraInicio);
    let dateTimeEnd = new Date(evento.dataHoraFim);

    // Subtract 3 hours from both dates
    dateTimeIni.setHours( dateTimeIni.getHours() - 3 );
    dateTimeEnd.setHours( dateTimeEnd.getHours() - 3 );

    // Update the object with adjusted ISO strings
    evento.dataHoraInicio = dateTimeIni.toISOString();
    evento.dataHoraFim = dateTimeEnd.toISOString();

    //console.log( "Agenda.cadastrarEvento APÓS conversão ?!?!" + JSON.stringify( evento ));

    /* ###################### Corrigindo Horário #################### */

    try {
         const response = await this.agendaModel.novoEventoAPI( evento );
         // alert( "Prontuario Controller || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }     

  async atualizarFicharioAtendimento( dadosFicharioAgenda ) 
  {

    const evento = dadosFicharioAgenda;
    try {
         const response = await this.agendaModel.atualizarAgendaAPI( evento );
         // alert( "Agenda fichario add 11 || resp ? " + JSON.stringify( response ) ); 
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


  async consultarEventos( dataHoraIni, dataHoraFim, profissionalId ) 
  {
    // console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.agendaModel.consultarEventosAPI(  dataHoraIni, dataHoraFim, profissionalId  );
         // alert( "Consultar eventos || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
