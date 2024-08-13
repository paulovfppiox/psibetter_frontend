<template> 
    
    <!-- DADOS_USUARIO {{ JSON.stringify( DADOS_USUARIO ) }} -->
      
    <v-overlay 
       v-model="overlay" 
       class="overlay-container"
       opacity="0.8"
       :persistent="true">
       
      <v-btn 
        elevation="20"
        to="/minha-conta"
        icon="mdi-account-cog" color="gray" @click="overlay=false" class="overlay-btn">
      </v-btn> 
      <!-- -- --
      <v-btn 
        elevation="20"
        to="/minha-conta"
        icon="mdi-account-cog" color="gray" @click="overlay = false"  class="overlay-btn">
      </v-btn>
      -- -- -->
    </v-overlay> 


    <!-- ### #### ##### ### ##### ##### # #### #### #### #### #### ##### ##### ##### ##### -->

      <v-container>
 
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <div class="w-100"> </div>
          <div class="w-100" > 
                               
               <h1 class="text-h5 text-lg-h5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
                   <b> Bem-vindo(a) {{ DADOS_USUARIO.nome }} </b>
               </h1>  
          </div>

          <div class="w-100">
              {{ dataHojeBR }}
          </div>
        </div>
      </v-container>
      
      <!-- temConsultasHoje {{  temConsultasHoje  }} -->
      <MyConsultasDiaTable  v-if="temConsultasHoje" @tem-consultas-update="handleTemConsultas" />
      <div v-else>
        <label> Você não possui nenhum atendimento hoje. </label>
        <MyPacientesTable class="mt-5" />  
      </div>

      <v-container>
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <div class="w-100 pa-4 ma-2 ">
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-book-clock-outline"
                  rel="noopener"
                  subtitle="Consulte sua agenda"
                  target="_blank"
                  title="Agenda de Consultas"
                  @click="() => { 
                      this.$router.push({ path:'/agenda', replace:true });
                  }"
              ></v-card>
          </div>

          <div class="w-100 pa-4 ma-2 " >
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-cash-100"
                  rel="noopener"
                  subtitle="Organize todos seus recibos."
                  target="_blank"
                  title="Financeiro"
                  @click="() => { 
                      this.$router.push({ path:'/financeiro', replace:true });
                  }"
              ></v-card>
          </div>
          <div class="w-100 pa-4 ma-2 " >
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-account-group"
                  rel="noopener"
                  subtitle="Acesse dados de antigos pacientes e cadastre novos."
                  target="_blank"
                  title="Meus Pacientes"
                  @click="() => {
                      this.$router.push({ path:'/meus-pacientes', replace:true });
                  }"
              ></v-card>
          </div>
        </div>
      </v-container> 



</template>

<script setup> 
</script>

<script>
/* eslint-disable */ 
  // import emitter from '../utils/eventBus';
  import MyPacientesTable from '@/components/MyPacientesTable.vue' 
  import MyConsultasDiaTable from '@/components/MyConsultasDiaTable.vue'
  import UtilsMixin       from '@/utils/UtilsMixin.js';
  import axios from 'axios'
  import Agenda from '@/controllers/Agenda.js';  
  const agenda = new Agenda();

  export default {
  mixins: [UtilsMixin],
  name: 'App',
    components: {
      MyPacientesTable,
      MyConsultasDiaTable
    },
    data: () => ({  
      dadosEvento: agenda.getDados(),
      agenda,
      overlay: false,
      search: '',
      /** TODO TODO: REVISAR !!!!!!!!!!!!!!!!!!! */
      /** TODO TODO: REVISAR !!!!!!!!!!!!!!!!!!! */
      /** TODO TODO: REVISAR !!!!!!!!!!!!!!!!!!! */
      /** TODO TODO: REVISAR !!!!!!!!!!!!!!!!!!! */
      /** TODO TODO: REVISAR !!!!!!!!!!!!!!!!!!! */
      headers: [
        { title: 'Nome',        align: 'start', key: 'nomePaciente' },
        { title: 'Horário Início',     align: 'end', key: 'dataHoraInicio' },
        { title: 'Horário Fim',   align: 'end', key: 'dataHoraFim' },
        { title: 'Status',   align: 'end', key: 'statusContulta' },
      ],
      consultasData: [],
      temConsultasHoje: true,
      dataHojeBR: ''
    }),
    computed: {

      DADOS_USUARIO()  {
         return this.$store.state.user;
      }
    },
    created() {
        const dataAtual = new Date();
        const data = dataAtual.toISOString().split("T")[0];
        this.dataHojeBR = this.convertUSToBRDate( data )
        //alert( "data hoje = " + data + " || " + this.dataHojeBR );

        /** Verificar preenchimento de dados cadastrais caso profissional */
        if ( this.DADOS_USUARIO.tipo != 'paciente' )
             this.verificaCadastroIncompleto();

    },
    async mounted()       {
  
          // Consulta os dados dos meus pacientes.
          await this.getPacientesData(); 
         
    },
    
    methods:    {
        handleRowClick(item , obj ) {
          
          var msg = "OBJ ID: " + obj.index + " || " + JSON.stringify(obj.item)  + "|| Row clicked: " + item;
          //alert( msg );
          localStorage.setItem('ficharioUsuarioObj', JSON.stringify( obj.item ) );
          setTimeout(() => {
                this.$router.push({ path: '/fichario-consultas', replace: true });
          }, 300);

      },
      handleTemConsultas( val )  {
          //alert("-Tem consultas hoje!? " + val );
          this.temConsultasHoje = val;
      },
      showModal()     {
          // this.$bus.emit('showModal', "Área em construção" );
          this.$bus.emit('showModal', { message: "Área em construção.", msgType: "warning"} );
      },
      async getPacientesData()      
      {
          // alert( "Meu user ID?! " + this.DADOS_USUARIO.id );

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
          console.log('-SEND DATA HomePage == ' + JSON.stringify(  sendData ) );

          // ------------ axios.post( this.$SERVICES_ENDPOINT_URL , sendData ) ------------ 
          axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
            .then( response => {
                      // console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                      var responseData = response.data;
                      const pacientesData = responseData.data;
                      // alert("DADOS TABLE?!? " + JSON.stringify( responseData.data ));
                      this.$store.commit( 'setMeusPacientes', pacientesData );

              })
              .catch(error => {
                    this.error = error.message;
              });

      },
      async verificaCadastroIncompleto()  
      {         
          //alert("Dias de Registrado: " + dias );

          /*const minhaContaOk = localStorage.getItem('minhaContaOk');
          alert( "MINHA CONTA?!? " + minhaContaOk );
          if ( minhaContaOk )
               return;*/
          
          var UF = this.DADOS_USUARIO.uf;
          var celular = this.DADOS_USUARIO.celular;

          //alert( UF + " || " + celular );

          /* Verifica se dados obrigatórios do usuário já foram atualizados */
          if ( ( UF == null ) || ( UF == "" ) && ( celular == null ) || ( celular == "0" ) ) {
                
                 var dataAtual = await this.getDataHoraAtual("data");
                 //alert("DATA Atual?!? " + dataAtual + " || " + this.DADOS_USUARIO.dataRegistro );

                 var dataRegistroBD, dias;
                 if ( this.DADOS_USUARIO.dataRegistro )
                    dataRegistroBD = this.DADOS_USUARIO.dataRegistro.split(" ");
                 

                if ( ( dataRegistroBD != null ) && ( dataRegistroBD != undefined ) )  {
                    //alert("DATA1 = " + dataRegistroBD[0] + " || DATA2 = " +  dataAtual );
                     dias = this.difDiasEntreDatas( dataRegistroBD[0], dataAtual );
                }
                 //alert(" Dif. dias " + dias );
                 // if ( dias == 0 )   {
                 if ( dias >= 0 )   {
                     // Ativa modal, com cobrança de preenchimento
                     // this.$bus.emit('showModal', { message: "Os seus dados cadastrais estão incompletos. Para melhor interação, preencha-os na sessão 'Minha Conta' no canto direito/superior da barra de tarefas.", msgType: "warning" } );
                     this.overlay = true; 
                     //alert( "Os seus dados cadastrais estão incompletos. Para melhor interação, preencha-os na sessão 'Minha Conta' no canto direito/superior da barra de tarefas." );       
                      setTimeout(() => {
                      alert( "Os seus dados cadastrais estão incompletos. Para melhor interação, preencha-os na sessão 'Minha Conta' no canto direito/superior da barra de tarefas." );       
                    }, 50); // 5000 milliseconds = 5 seconds
                }
          }

      }
    }
    
  }
</script>

<style>
.overlay-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
}

.overlay-content {
  width: 80%; /* Adjust width as needed */
  display: flex;
  justify-content: flex-end;
}

.overlay-btn {
  margin-right: 40px;
  border-color: red;
  border-width: 5px;
}


</style>

