<template>
    
    <h1 class="text-h5 text-lg-h5 mt-5 mb-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Meus Pacientes </b>
    </h1>
      
    <!-- tab  {{ tab }} 
    DADOS_USUARIO {{ JSON.stringify( DADOS_USUARIO ) }} -->
    <v-card>
    <v-tabs
       v-model="tab"
       bg-color="secondary">
          <v-tab value="tab-meus-pacientes"       variant="tonal" size="large" class="text-caption"> Meus Pacientes </v-tab>
          <v-tab value="tab-cadastrar-pacientes"  variant="tonal" class="text-caption"> Cadastrar Paciente </v-tab>
          <!-- <v-tab value="tab-consultar-pacientes"  variant="tonal" class="text-caption"> Consultar Pacientes </v-tab> -->
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="tab-meus-pacientes">

            <label class="text-subtitle-1 font-weight-bold"> Últimos Atendimentos </label>
            <MyPacientesTable/>
            
            <div class="d-flex flex-column flex-md-row justify-space-between">
              <div class="w-100 pa-4 ma-2 ">
                    <v-card
                        @click="handleClick('tab-cadastrar-pacientes')"
                        color="secondary"
                        append-icon="mdi-open-in-new"
                        class="mx-auto" 
                        max-width="344"
                        prepend-icon="mdi-account-plus"
                        rel="noopener"
                        subtitle="Cadastre pacientes e seus dados"
                        target="_blank"
                        title="Cadastrar Pacientes"
                    ></v-card>
              </div>

              <div class="w-100 pa-4 ma-2 " >
                    <v-card
                        color="secondary"
                        append-icon="mdi-open-in-new"
                        class="mx-auto"
                        @click="onHistoricoClick()"
                        max-width="344"
                        prepend-icon="mdi-chart-box-plus-outline"
                        rel="noopener"
                        subtitle="Detalhe "
                        target="_blank"
                        title="Histórico de Consultas"
                    ></v-card>
              </div>


              <div class="w-100 pa-4 ma-2 " >
                    <v-card
                        color="secondary"
                        append-icon="mdi-open-in-new"
                        class="mx-auto" 
                        max-width="344"
                        prepend-icon="mdi-account-search"
                        rel="noopener"
                        subtitle="Consulte dados cadastrais aqui."
                        target="_blank"
                        title="Prontuário de Pacientes"
                    ></v-card>
              </div>
           </div>
        </v-tabs-window-item>
        
        <v-tabs-window-item value="tab-cadastrar-pacientes">
            <AppFormUsuario       :id-usuario="dadosProntuario.id"  :share-data="this.shareDataUsuario"/>
            <AppFormDadosClinicos :id-usuario="dadosProntuario.id"  :share-data="this.shareDataClinicos"/>
            <!-- <AppFormEndereco      :id-usuario="dadosProntuario.id"  :share-data="this.shareDataEndereco"/> -->
             
            <v-row class="mt-5">
              <v-col cols="12" md="4">
              </v-col>

              <v-col cols="12" md="4">
                <v-btn
                    style="width:10px"
                    color="secondary"
                    size="large" 
                    append-icon="mdi-database-arrow-up"
                    block
                    @click="cadastrar()" >
                  Cadastrar Paciente
                </v-btn>
              </v-col>

              <v-col cols="12" md="4">
              </v-col>
            </v-row>
            
        </v-tabs-window-item>

 
      </v-tabs-window>
    </v-card-text>
  </v-card>
    
  </template>
  
  <script setup> 
  </script>
  
  <script>
  /* eslint-disable */
  import AppFormUsuario from '@/components/AppFormUsuario.vue'
  import AppFormEndereco from '@/components/AppFormEndereco.vue'
  import AppFormDadosClinicos from '@/components/AppFormDadosClinicos.vue'
  import MyPacientesTable from '@/components/MyPacientesTable.vue'
  import MyPacientesServerTable from '@/components/MyPacientesServerTable.vue'

  import Prontuario from '@/controllers/Prontuario.js'; 
 
  const prontuario = new Prontuario();
  
  export default {
    
    name: 'App',
    components: {
      AppFormUsuario,
      AppFormEndereco,
      AppFormDadosClinicos,
      MyPacientesTable,
      MyPacientesServerTable
    },
    data: () => ({  
        tab: "three",
        /** Compartilhar os dados do paciente entre todos os componentes, via 'bus' */
        shareDataUsuario: false,
        shareDataClinicos: false,
        dadosProntuario: prontuario.getDadosProntuario(), 
        prontuario,

        /** Armazenam o formValido de cada formulario (Dados Usuario + Clínicos). A API de cadastro
        apenas será chamada, quando os dois valores 'true'. ***/
        formsValidos: [ false, false ],

        /*dadosProntuario: {
            id: 0,
            dadosUsuario: null,
            dadosEndereco: null,
            dadosClinicos: null
        }*/
    }),
    
    computed: {
        DADOS_USUARIO()  {
          return this.$store.state.user;
        }
    },
    created()  {
    },
    mounted()  {
        /*********** Função disparada em AppFormUsuario.  ********/
        this.$bus.on('busFormUsuarioDados', ( dadosUsuario ) => {
              
              console.log( "3- mounted->MeusPacientesPage || on 'busFormUsuarioDados' -->> Dados Usuario? " + JSON.stringify( dadosUsuario ));

              // Caso dados recebidos sejam válidos ( diferente de válidos )
              if ( ( dadosUsuario != null ) && ( dadosUsuario != false ) )  {
                     this.formsValidos[ 0 ] = true;
                     this.dadosProntuario.dadosUsuario = dadosUsuario;
              } else {
                     // this.$bus.emit('showModal', "Preencha todos dados de usuário corretamente." );
                     this.$bus.emit('showModal', { message: "Preencha todos dados de usuário corretamente.", msgType: "warning"} );
              }     
              this.shareDataUsuario = false;
              console.log('3.1. Dados recebidos do usuario? ' + JSON.stringify( this.dadosProntuario.dadosUsuario ) );
        }),  


        this.$bus.on('busFormDadosClinicos', ( dadosClinicos ) => {

              console.log( "3- mounted->MeusPacientesPage || on 'busFormDadosClinicos' -->> Dados Clínicos? " + JSON.stringify( dadosClinicos ));
              
              // Caso dados recebidos sejam válidos 
              if ( ( dadosClinicos != null ) && ( dadosClinicos != false ) )  {
                    this.formsValidos[ 1 ] = true;
                    this.dadosProntuario.dadosClinicos = dadosClinicos;
               } else {
                    // this.$bus.emit('showModal', "Preencha todos dados clínicos corretamente.");
                    this.$bus.emit('showModal', { message: "Preencha todos dados clínicos corretamente.", msgType: "warning"} );
               }
              this.shareDataClinicos = false;
              console.log('3.1. Dados Clínicos recebidos? ' + JSON.stringify( this.dadosProntuario.dadosClinicos ) );
        })
        
    },
    methods:  {
        handleClick( tabValue )   {
            // alert('Card Clicked!' + tabValue );
            this.tab = tabValue;
            // You can perform any actions you want here, like showing a dialog, updating data, etc.
        },
        onHistoricoClick()        {
            this.$router.push({ path: '/historico-consultas', replace: true });
        },
        sendDataAPI()             {
            /**** console.log( "this.shareDataClinicos?? " + this.shareDataClinicos );
            console.log('Dados Gerais OK? ' + JSON.stringify( this.dadosProntuario ) );
            var nomeExistenteERROR = true;
            var msg = "Nome já cadastrado!";
            if ( nomeExistenteERROR ) { this.$bus.emit('showModal', msg ); }
            ****/

            // alert( "formsValidos ?? " + JSON.stringify( this.formsValidos ) );
            if ( !this.formsValidos[0] || !this.formsValidos[1] )
                  return;

            // alert( "TIPOS?!? " + this.DADOS_USUARIO.tipo + " || " + this.DADOS_USUARIO.id );

            /** Caso o tipo de usuario logado seja um profissional, definir o link com o cliente pelo seu ID. */      
            if ( this.DADOS_USUARIO.tipo == "medico" )    {
                 this.dadosProntuario.dadosUsuario.meuMedicoId1 = this.DADOS_USUARIO.id;
            } 
            if ( this.DADOS_USUARIO.tipo == "psicologo" ) {
                 this.dadosProntuario.dadosUsuario.meuPsicologoId1 = this.DADOS_USUARIO.id;
            }
            if ( this.DADOS_USUARIO.tipo == null ) {
                 this.dadosProntuario.dadosUsuario.meuMedicoId1 = this.DADOS_USUARIO.id;
            }

            this.prontuario.setDadosProntuario( this.dadosProntuario.dadosUsuario , this.dadosProntuario.dadosClinicos );
            this.prontuario.cadastrarProntuario( this.dadosProntuario.dadosUsuario , this.dadosProntuario.dadosClinicos ).then(response => {
                 console.log('Cadastro Prontuário Response:', response);

                 /* if ( response.includes("SQLSTATE") )      {
                      this.$bus.emit('showModal', "Erro de banco de dados." );
                 } */

                 // alert( response.code + " ||| " + response.message );
                 if ( response.code == 0 )      {
                      // this.$bus.emit('showModal', response.message );
                      this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                      this.$router.push({ path: '/home', replace:true  });

                 } else {
                      this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );

                      /** OBS: No caso de erro, os valores dos comboboxes são concatenados.
                      * Quando o formulário é preenchido e ocorre uma primeira tentativa de envio, caso haja algum erro no
                      * lado do servidor (ex: Nome ou email já existentes),
                      * em alguns dos campos, todos eles (que sejam arrays) sofrerão um join (em prontuarioModel).
                      * A partir da segunda tentativa, esses campos que deveriam ser arrays, estão como strings.
                      * Para mitigar esse problema, antes de enviar os dados, preciso chegar se trata-se de uma string 
                      * (segunda tentativa em diante). */ 
                      this.$bus.emit('busAjustarComboboxes', true );
                 }

            }).catch(error => {
              console.error('Error creating user:', error);
            });
           

        },
        cadastrar()           {
 
            /* Dispara o watch do componente filho de Dados Clinicos.
             * Lá é disparado  emit com os dados preenchidos, que são capturados aqui no mount() */
             this.shareDataClinicos = true;
             this.shareDataUsuario  = true; 
             
             setTimeout( this.sendDataAPI, 50 );
        }
    }
  }
  </script>
  