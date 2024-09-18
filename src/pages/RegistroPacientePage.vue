<template>
    <v-container class="mt-10" style="background-color: rgba(225, 225, 225, 0.95);">
    <h1 class="text-h5 text-lg-h5 mt-5 mb-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
        <b> Registro de Pacientes </b>
    </h1>
      
    <!-- tab  {{ tab }} 
    DADOS_USUARIO {{ JSON.stringify( DADOS_USUARIO ) }} -->
            <v-row class="mt-5" style="width:60%; margin: 0 auto;">
                <v-col cols="12" md="4">
                    Buscar profissional médico/psicólogo:
                </v-col>
                
                <v-col cols="12" md="4"> 
                        <v-radio-group v-model="radios">
                            <v-radio label="Nome Completo" value="filtroNome"></v-radio>
                            <v-radio label="Email" value="filtroEmail"></v-radio>
                        </v-radio-group>  
                </v-col>  
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="this.filtroValor"
                    max-width="400px"
                    :counter="100"
                    label="Preencha o valor a ser pesquisado"
                    bg-color="white"
                    variant="outlined" 
                    density="comfortable"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
              </v-col>

              <v-col cols="12" md="4">
                <v-btn
                    style="width:10px" color="secondary"  append-icon="mdi-magnify" block
                    @click="buscarProfissional()" >
                  Buscar Profissional
                </v-btn>
              </v-col>

              <v-col cols="12" md="4">
              </v-col>
            </v-row> 


            <v-row class="mt-5" style="width:60%; margin: 0 auto;">
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="this.dadosProfissional.id"
                    variant="outlined" 
                    label="Identificador Psibetter"
                    density="comfortable"
                    :readonly="true"
                    ></v-text-field> 
                </v-col>
                <v-col cols="12" md="4"> 
                    <v-text-field
                    label="Nome Completo"
                    v-model="this.dadosProfissional.nome"
                    variant="outlined" 
                    density="comfortable"
                    :readonly="true"
                    ></v-text-field>  
                </v-col>  
                <v-col cols="12" md="4">
                    <v-text-field
                    label="Email"
                    v-model="this.dadosProfissional.email"
                    variant="outlined" 
                    density="comfortable"
                    :readonly="true"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-card-text class="text-center">
                <v-btn class="text-caption text-blue text-decoration-none"  elevation="0"  to="/login" >
                  Login <v-icon icon="mdi-chevron-right"></v-icon> 
                </v-btn>
            </v-card-text>


            <div class="mt-10" v-if="this.formularioHabilitado">
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
            </div>
        </v-container>
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
  
  import axios from 'axios';
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
        radios: "filtroNome",
        filtroValor:"",
        tab: "three",
        formularioHabilitado: false,
        /** Compartilhar os dados do paciente entre todos os componentes, via 'bus' */
        shareDataUsuario: false,
        shareDataClinicos: false,
        dadosProntuario: prontuario.getDadosProntuario(), 
        prontuario,

        /** Armazenam o formValido de cada formulario (Dados Usuario + Clínicos). A API de cadastro
        apenas será chamada, quando os dois valores 'true'. ***/
        formsValidos: [ false, false ],

        dadosProfissional: {
            id: 0, 
            nome: "",
            email: ""
        } 
    }),
    
    computed: {
        DADOS_USUARIO()         {
          return this.$store.state.user;
        }, 
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
        buscarProfissional()      {
            
            if ( ( this.filtroValor == "" ) || (this.filtroValor == null ) )  {
                   this.$bus.emit('showModal', { message: "Preenchar o valor a ser pesquisado.", msgType: "warning"} );
            }
            
           // alert( "*** " + this.filtroValor + " || " + this.radios );

            var sendData;

            if ( this.radios == "filtroEmail" )  
            {
                 sendData  =  {
                    data:  {
                        entity: 'usuarios',
                        operation: 'consultar',
                        object: {
                            email: this.filtroValor  
                        }
                    }
                };
             } else {
                sendData =    {
                    data:  {
                        entity: 'usuarios',
                        operation: 'consultar',
                        object: {
                            nome: this.filtroValor 
                        }
                    }
                };
             }
             
             console.log('-SEND DATA Usuario == ' + JSON.stringify(  sendData ) );
              axios.post( this.$SERVICES_ENDPOINT_URL, sendData )
              .then( response => {
                    console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                    var responseData = response.data;
                    
                    console.log(" RESPONSE?!?! " + JSON.stringify( responseData ) );

                    if ( responseData.code == '0' )  {  
                          // this.$bus.emit('showModal', { message: responseData.message, msgType: "success"} );
                          const dados = responseData.data; 
                          if ( dados.tipo != "paciente" )   {
                               this.dadosProfissional.id = dados.id;
                               this.dadosProfissional.nome = dados.nome;
                               this.dadosProfissional.email = dados.email;
                               this.formularioHabilitado = true;
                          } else {
                            this.$bus.emit('showModal', { message: "Usuário profissional não encontrado.", msgType: "success"} );
                          }
                    }  else   { 
                        this.$bus.emit('showModal', { message: responseData.message, msgType: "warning"} );
                    }  
              })
              .catch(error => {
                    this.error = error.message;
              });

        },
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
                 this.dadosProntuario.dadosUsuario.meuMedicoId1 = this.dadosProfissional.id;
            } 
            if ( this.DADOS_USUARIO.tipo == "psicologo" ) {
                 this.dadosProntuario.dadosUsuario.meuPsicologoId1 = this.dadosProfissional.id;
            }
            if ( this.DADOS_USUARIO.tipo == null ) {
                 this.dadosProntuario.dadosUsuario.meuMedicoId1 = this.dadosProfissional.id;
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
                      this.$router.push({ path: '/login', replace:true  });

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
  