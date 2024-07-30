// src/controllers/UserController.js
import ProntuarioModel from '@/models/ProntuarioModel.js';

export default class Prontuario    {
 
  constructor() 
  {
      this.prontuarioModel = new ProntuarioModel();
      // console.log( "Usuario || criando... " + JSON.stringify( this.prontuarioModel ) );
      
      this.dadosProntuario = {
          id: 0,
          dadosUsuario: null,
          dadosClinicos: null
      }
  }

  getDadosProntuario()             {
    return this.dadosProntuario;
  }

  setDadosProntuario( dadosUsuario , dadosClinicos  )  {
      this.dadosProntuario.dadosUsuario = dadosUsuario;
      this.dadosProntuario.dadosClinicos = dadosClinicos;
  }

  async cadastrarProntuario( dadosUsuario , dadosClinicos ) 
  {
    console.log( "Modelo ?!?!" + JSON.stringify( this.prontuarioModel ));
    try {
         const response = await this.prontuarioModel.cadastrarProntuarioAPI( dadosUsuario , dadosClinicos );
         // alert( "Prontuario Controller || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async atualizarProntuario( dadosUsuario , dadosClinicos ) 
  {
    // console.log( "Modelo ?!?!" + JSON.stringify( this.prontuarioModel ));
    try {
         const response = await this.prontuarioModel.atualizarProntuarioAPI( dadosUsuario , dadosClinicos );
         // alert( "Prontuario Atualizar || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }



  async removerProntuario( idUsuario ) 
  {
    console.log( "Modelo ?!?!" + JSON.stringify( this.prontuarioModel ));
    try {
         const response = await this.prontuarioModel.removerProntuarioAPI( idUsuario );
         // alert( "Prontuario remover || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
