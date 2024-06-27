 import Vuex from 'vuex';

const store = new Vuex.Store( {
  state:          { 
    isUsuAutenticado: false,
    isUsuRegistrado: false,
    user:                {
        id: null,
        nome:null,
        email: null, 
        senha: null,
        tipo: null,
        crm_crp: null,
        uf: null,
        celular: null,
        dataRegistro: null
    },
    meusPacientes: []
     
  },
  mutations:  {

    setIsUsuRegistrado( state , data )   {
      state.isUsuRegistrado = data;
      // console.log( "No Mutation || isAutenticated " + state );
    },  
    setIsUsuAutenticado( state , data )  {
      state.isUsuAutenticado = data;
      // console.log( "No Mutation || isAutenticated " + state );
    }, 
    setUser( state , data )              {
        state.user = data;
        console.log( "Mutation SET USER ===>>> " + JSON.stringify( state.user ) );
    }, 
    setMeusPacientes( state , data )     {
        state.meusPacientes = data;
    }
  }
});
export default store;