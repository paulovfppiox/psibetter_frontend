// src/controllers/UserController.js
import MinhaContaModel from '@/models/MinhaContaModel.js';

export default class MinhaConta    {
 
  constructor() 
  {
      this.minhaContaModel = new MinhaContaModel();
      // console.log( "Usuario || criando... " + JSON.stringify( this.prontuarioModel ) );
      
      this.dadosMinhaConta = {
          dadosUsuario: null,
          dadosProfissionais: null
      }
  }

  getDadosMinhaConta()             {
    return this.dadosMinhaConta;
  }

  setDadosMinhaConta( dadosUsuario , dadosProfissionais  )  {
      this.dadosMinhaConta.dadosUsuario = dadosUsuario;
      this.dadosMinhaConta.dadosProfissionais = dadosProfissionais;
  }

  async cadastrarMinhaConta( dadosUsuario , dadosProfissionais ) 
  {
    console.log( "Modelo ?!?!" + JSON.stringify( this.minhaContaModel ));
    try {
         const response = await this.minhaContaModel.cadastrarMinhaContaAPI( dadosUsuario , dadosProfissionais );
         // alert( "Minha Conta Controller || resp ? " + JSON.stringify( response ) ); 

         return response;
    }  catch (error)  {
       console.error('Error creating user:', error);
       throw error;
    }
  }

  // Add more methods as needed
}
