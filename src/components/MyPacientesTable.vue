<template> 
  <div style="width:90%; margin-left:5%; margin-right:5%" >
    <v-data-table-virtual
      :headers="headers"
      :items="pacientesData"
      height="300"
      item-value="name"
      :mobile="this.$IS_MOBILE_APP"
      :show-select="true"
      select-strategy="single"
      @click:row="handleRowClick"
    ></v-data-table-virtual>
  </div>
  
 <!-- 
  pacientesData {{ JSON.stringify( this.pacientesData ) }}
  DADOS_USUARIO ?!?!  {{ this.DADOS_USUARIO }} 
  -->

</template>
  

<script>
/** #########################  TO-DO: TEMPORÁRIA ############################333 **/
/** #########################  TO-DO: TEMPORÁRIA ############################333 **/
import axios from 'axios' ;

/* eslint-disable */ 
export default      {    
  name: 'MyPacientesTable',
  components: { 
  },
  data: () => ({   
    headers: [
        { title: 'Nome',        align: 'start', key: 'nome' },
        { title: 'Celular',     align: 'end', key: 'celular' },
        { title: 'Profissão',   align: 'end', key: 'profissao' },
        { title: 'Município',     align: 'end', key: 'municipio' },
        { title: 'UF',            align: 'end', key: 'uf' },
        { title: 'Data Registro', align: 'end', key: 'dataRegistro' },
    ],
    pacientesData: [],
    /* pacientesData: [
          {
            nome: 'Speedster',
            celular: 35,
            profissao: 2021,
            municipio: 22,
            uf: 'PB',
            dataRegistro: '2012-01-01'
          },
          {
            nome: 'Paulo Paiva',
            celular: 35,
            profissao: 2021,
            municipio: 22,
            uf: 'PB',
            dataRegistro: '2012-01-01'
          },
        ],*/
    }), 
    computed: {    
        DADOS_USUARIO()  {
          return this.$store.state.user;
        }
    },
    methods:  {
          handleRowClick(item , obj ) {
          
            /*var msg = "OBJ ID: " + obj.index + " || " + JSON.stringify(obj.item)  + "|| Row clicked: " + item;
            alert('showModal', { message: msg, msgType: "success"} );*/

            /** Compartilha o usuario objeto com a página consultaProntuarioPage */
            // this.$bus.emit('busShareUsuarioObj', obj.item );
            localStorage.setItem('usuarioObj', JSON.stringify( obj.item ) );
            setTimeout(() => {
                this.$router.push({ path: '/consulta-prontuario', replace: true });
            }, 300);
        },
        async getPacientesData()      {

          var sendData = {
              "data":     {
                 "entity":"usuarios",
                 "operation":"consultar",
                 "object":{
                     "meuMedicoId1": this.DADOS_USUARIO.id ,
                  }
              }
        };

        // var senha = this.cifraSenha( this.formPrimeiroAcesso.senha );
        console.log('-SEND DATA AQUIII == ' + JSON.stringify(  sendData ) );

        // ------------ axios.post( this.$SERVICES_ENDPOINT_URL , sendData ) ------------ 
        axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
             .then( response => {
                      console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                      var responseData = response.data;
                      this.pacientesData = responseData.data;
                      alert("DADOS TABLE?!? " + JSON.stringify( responseData.data ));
                      this.$store.commit( 'setMeusPacientes', this.pacientesData );

              })
              .catch(error => {
                    this.error = error.message;
              });

        }
    },
    async created()   
    {
         await this.getPacientesData();
    },
}
</script>

<style>
.bold-header th {
  font-weight: bold;
}
</style>