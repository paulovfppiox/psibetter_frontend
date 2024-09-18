// src/controllers/UserController.js
import ReceituarioModel from '@/models/ReceituarioModel.js';

export default class Agenda    {
 
  constructor() 
  {
      this.receituarioModel = new ReceituarioModel();
      // console.log( "Financeiro || criando... " + JSON.stringify( this.receituarioModel ) );      
  } 
 

  async cadastrarReceituario( dados ) 
  {
    // console.log( "Cadastrar Finanças !?!" + JSON.stringify( dados )); 

    try {
         const response = await this.receituarioModel.cadastrarReceituarioAPI( dados );
         // alert( "receituarioModel response: " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }     

  async atualizarReceituario( dados ) 
  {

    // console.log( "** DADOS 1111 ?!? " + JSON.stringify( dados ) );

    try {
         const response = await this.receituarioModel.atualizarReceituarioAPI( dados );
         // alert( "Agenda financeiro add || resp ? " + JSON.stringify( response.data ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }    
    
  async consultarReceituario( dados ) 
  {
    // console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.receituarioModel.consultarReceituarioAPI(  dados );
         // alert( "Consultar Financeiro.js || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }




  async removerReceituario( id ) 
  {
    // console.log( "Modelo ?!?!" + JSON.stringify( this.agendaModel ));
    try {
         const response = await this.receituarioModel.removerReceituarioAPI( id );
         // alert( "Consultar Financeiro.js || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
