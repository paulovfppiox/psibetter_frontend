// src/controllers/UserController.js
import UsuarioModel from '@/models/UsuarioModel.js';

export default class Usuario    {
 
  constructor() 
  {
    this.usuarioModel = new UsuarioModel();
    //console.log( "Usuario || criando... " + JSON.stringify( this.usuarioModel ) );
    //alert( "Usuario || criando... " + JSON.stringify( this.usuarioModel ) );
    this.dadosUsuario = {
         dataNascimento: "2024-05-02",
         nome: '',
         genero: '',
         email: '',
         senha: ''
    }; 
  }

  getDadosUsuario()             {
    return this.dadosUsuario;
  }

  setDadosUsuario( data )  {
    this.dadosUsuario = { ...this.dadosUsuario, ...data };
  }

  async novoUsuario(data) 
  {
    console.log( "MODELO?!?!" + JSON.stringify( this.usuarioModel ));
    try {
         const response = await this.usuarioModel.novoUsuarioAPI(data);
         alert( "Usu Controller || resp ? " + JSON.stringify( response ) ); 
         return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Add more methods as needed
}
