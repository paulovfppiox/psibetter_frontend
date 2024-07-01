<template>
    
    <v-container style="background-color: #DCEDC8" >
   
    <div class="titulo-form-container">  
       <label><b>  Dados Gerais do Paciente  </b></label>
       <MyChecklistIcon v-if="formValido"/>
    </div>

    <!--formReadonly ?!? {{  formReadonly  }} <br>
    formValido? {{  formValido  }} 
     PATH_ATUAL {{  PATH_ATUAL  }}
    dadosUsuario {{ JSON.stringify( dadosUsuario ) }} -->
    
    <v-form class="mt-5" v-model="formValido" style="background-color: #DCEDC8" ref="form">
          <v-row>
            
            <v-col cols="12" md="4">
            <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
              <v-text-field
                 v-model="dadosUsuario.nome"
                 :rules="nomeRules"
                 prepend-inner-icon="mdi-account"
                 hint="Informe seu nome completo"
                 max-width="400px"
                 :counter="100"
                 label="Nome*"
                 :bg-color="camposBgColor"
                 variant="outlined" 
                 density="comfortable"
                 :readonly="formReadonly"
                 required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" >
                <v-autocomplete
                  v-model="dadosUsuario.genero"
                  :items="generos"
                  :rules="generoRules"
                  max-width="400px"
                  label="Gênero*"
                  :bg-color="camposBgColor"
                  density="comfortable"
                  placeholder="Informe gênero"
                  prepend-inner-icon="mdi-gender-male-female-variant"
                  variant="outlined"
                  :readonly="formReadonly"
                  required 
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <MyDataInput label="Data de nascimento*" :value="dadosUsuario.dataNascimento" />
            </v-col>
          </v-row>

          <!--- #####################################  LINHA 2  ########################################## -->
          <v-row>
            <v-col cols="12" md="4">

            <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
            <v-text-field
                  v-model="dadosUsuario.telefone"
                  prepend-inner-icon="mdi-phone"
                  hint="Informe telefone fixo"
                  type='number'
                  max-width="400px"
                  :counter="8"
                  label="Telefone"
                  :bg-color="camposBgColor"
                  variant="outlined"
                  density="comfortable"
                  :readonly="formReadonly"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  v-model="dadosUsuario.celular"
                  :rules="celularRules"
                  prepend-inner-icon="mdi-cellphone-basic"
                  hint="Informe celular"
                  type='number'
                  max-width="400px"
                  :counter="15"
                  label="Celular (Com DDD, apenas dígitos)*"
                  :bg-color="camposBgColor"
                  variant="outlined"
                  density="comfortable"
                  :readonly="formReadonly"
                  required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-text-field
                  v-model="dadosUsuario.email"
                  :rules="emailRules"
                  prepend-inner-icon="mdi-email"
                  hint="Informe email"
                  max-width="400px"
                  :counter="30"
                  label="Email*"
                  :bg-color="camposBgColor"
                  variant="outlined"
                  density="comfortable"
                  :readonly="formReadonly"
                  required
                ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
              <v-col cols="12" md="4" >
                  <v-autocomplete
                    v-model="dadosUsuario.profissao"
                    :items="this.profissoesItems"
                    max-width="400px"
                    label="Profissão"
                    :bg-color="camposBgColor"
                    density="comfortable"
                    placeholder="Informe gênero"
                    prepend-inner-icon="mdi-briefcase"
                    variant="outlined"
                    :readonly="formReadonly"
                    required 
                ></v-autocomplete>
              </v-col>
          </v-row>


          <!-- ######################  ENDERECO  ########################### -->

          <v-row>
           <v-col cols="12" md="4">
             <v-autocomplete
               :bg-color="camposBgColor"
               v-model="dadosUsuario.municipio"
               :items="municipios"
               label="Município"
               :readonly="formReadonly"
             ></v-autocomplete>
           </v-col>

           <v-col cols="12" md="4" >
             <v-autocomplete
               :bg-color="camposBgColor"
               v-model="dadosUsuario.uf"
               :items="UFs"
               label="UF"
               :rules="UFRules"
               :readonly="formReadonly"
             ></v-autocomplete>
 
           </v-col>          

           <v-col cols="12" md="4" >
             <v-autocomplete
               v-model="dadosUsuario.tipoMoradia"
               :items="tiposMoradias"
               label="Mora em:"
               :rules="tiposMoradiasRules"
               :bg-color="camposBgColor"
               :readonly="formReadonly"
             ></v-autocomplete>
           </v-col>

         </v-row> 

       <v-row>
          <v-col>

           <!----->
           <v-card  class="mx-auto" color="surface-light" max-width="400">
             <v-card-text>
                 <v-text-field
                   :bg-color="camposBgColor"
                   :loading="loading"
                   append-inner-icon="mdi-magnify"
                   density="compact"
                   label="Buscar localidade por CEP"
                   variant="solo"
                   hide-details
                   single-line
                   @click:append-inner="onClick"
                   :readonly="formReadonly" 
                 ></v-text-field>
             </v-card-text>
           </v-card>

           <!----->
              
          </v-col>
        </v-row> 

  </v-form>
  </v-container>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import MyDataInput     from '@/components/MyDataInput.vue';
import MyChecklistIcon from '@/components/MyChecklistIcon.vue';
//import Usuario from '@/controllers/Usuario.js'; 
import axios from 'axios';

//const usuario = new Usuario();

export default {
      props: {
            idUsuario: Number,  
            shareData: Boolean, /** Indica a necessidade do componente emitir os seus dados via busEvent. */
            modoEdicao: String  /** EDICAO or LEITURA */
      }, 
      watch: {
          idUsuario(newValue)    {
              alert( "Valor? " + newValue );
          },
          modoEdicao( value )          {
            
            alert( "MODO Form Usuario?!? " + value );
            if ( value == "LEITURA" ) {
                 this.formReadonly = true; 
                 this.camposBgColor = "grey-lighten-3"; //"#C6C6C4";
                 alert( this.formReadonly  + " || " + this.camposBgColor );
            }
            if ( value == "EDICAO" ) {
                 this.formReadonly = false;
                 this.camposBgColor = "white";
            }
          },
          shareData( newValue )  {

              var dados = JSON.stringify( this.dadosUsuario );
              console.log( "1- shareData->AppFormUsuario || - Form usuario valido?? " + this.formValido + " || dadosUsuario? " + dados );

              this.validaForm();

              if ( this.formValido )   {
                   console.log( "2- shareData->AppFormUsuario || emitting 'busFormUsuarioDados' " );
                   this.$bus.emit('busFormUsuarioDados', this.dadosUsuario );
              }  else  {
                  this.$bus.emit('busFormUsuarioDados', false );
              } 
          }
          

          /***  
          'dadosUsuario.email':         
          {
                handler( newVal )  {
                  this.$refs.form.validate();
                },
                deep: true,
          },**/ 
      },
      name:'AppFormUsuario',
      components: {
        MyDataInput,
        MyChecklistIcon
      }, 
      computed: {
        PATH_ATUAL()
        {
            return this.$route.name;
        },
      },
      data: () => ({
          formReadonly: false,
          camposBgColor: "",
          formValido: false,
          //dadosUsuario: usuario.getDadosUsuario(),
          //usuario,
          dadosUsuario: {
            dataNascimento: "",
            nome: '',
            genero: '',
            celular: null,
            telefone: null,
            email: '',
            municipio: " ", 
			      uf: " ", 
			      profissao: "",
          },
          nomeRules: [
            value => {
              if (value) return true;
 
              return 'Preencha o nome.'
            },
            value => {
              if (value?.length <= 100) return true

              return 'O nome está muito extenso'
            },
          ],
          generos: [ 'Homem', 'Mulher', 'Não-binário', 'Outro' ],
          
          generoRules:  [
            value => {
              if (value) return true
              return 'Gênero é obrigatório.'
            },
          ],
          celularRules: [
            value => {
              if (value) return true
              return 'Celular é obrigatório.'
            },
          ],
          telefoneRules: [
            value => {
              if (value) return true
              return 'Telefone é obrigatório.'
            },
          ],
          emailRules: [
            value => {
              if (value) return true

              return 'E-mail é obrigatório.'
            },
            value => {
              if (/.+@.+\..+/.test(value)) return true

              return 'E-mail inválido.'
            },
          ],

          /** ========== Dados de Endereco ============== */
           /* submit CEP */
          loaded: false,
          loading: false,
          timeout: null,
          cep: '',
          dadosEndereco : {
              tipoMoradia: '',
              municipio: '', /* Default */
              UF: '',    /* Default */
          },
          
          tiposMoradias: [ 'Apartamento', 'Casa', 'Condomínio', 'Outro' ],
          tiposMoradiasRules: [
            value => {
              if (value) return true
              return 'Tipo Moradia necessário.'
            }, 
          ],
 
          municipios: [ "João Pessoa", 'Bayeux', 'Cabedelo' ],
          UFs: ['PB', 'PE', 'RN', 'RJ'],
          UFRules: [
            value => {
              if (value) return true

              return 'UF é obrigatório'
            }, 
          ],
    }), 
    beforeMount() {
      
        // ***************** VERIFICAR O NOME DA PÁGINA AQUI ***************** 
        if ( this.PATH_ATUAL == "consulta-prontuario" )           {

             this.formReadonly = true;

             // Definido no clique do componente MyPacientesTable.vue
             let storedData = localStorage.getItem('usuarioObj');  
             if (storedData) {
                 storedData = JSON.parse( storedData );
                 // console.log( "Dados retornados?!?! " + storedData );
                 this.dadosUsuario = storedData;
            }
        }
        if ( this.PATH_ATUAL == "meus-pacientes" )   {
             this.camposBgColor = "white";
        }
    },
    mounted()   {
        // Add event listener for key press on the entire document
        document.addEventListener('keypress', this.handleKeyPress); 

        
    }, 
    beforeDestroy() {
        // Remove event listener to avoid memory leaks
        document.removeEventListener('keypress', this.handleKeyPress);
    }, 
    methods:    {
      async validaForm()   
      {
            const { formValido } = await this.$refs.form.validate();
            // alert( "** Form valido?!?! " + formValido );
      },
      async getCepAPI() 
      {
        var URL = "http://viacep.com.br/ws/58015320/json/";

            // console.log( "-- SALVAR ==>> " + JSON.stringify( sendData ).replace( /\\/g, "" ) );
             axios.get( URL )
                  .then( response => {
                   /* alert( "Return? " + JSON.stringify( response.data ) ); */
                   if   ( response.data.erro ) {
                          this.CEP = 0; 
                          return 0;  
                   }        else               {
                        var dados = response.data;  
                        alert( dados.uf + " ||| " + dados.localidade );
                        this.dadosEndereco.municipio  = dados.localidade;
                        this.dadosEndereco.UF = dados.uf;
                   }
                })
                .catch ( error => {
                    this.error = error.message;
                } );
      },

      async onClick () {
        this.loading = true;
        
        setTimeout(() => {
          this.loading = false 
          this.getCepAPI();
          this.loaded = true
        }, 2000)
      },
      handleKeyPress( event )     {
        
        if ( this.$DEBUG_ON )       {
            if ( event.key == "=" )   {
                 
                this.dadosUsuario.dataNascimento = "1987-01-01";
                this.dadosUsuario.nome = 'Jose Bebug ' + (Math.random() * (10 - 0) + 0).toFixed(4);
                this.dadosUsuario.genero = 'Masculino';
                this.dadosUsuario.celular = 996612212;
                this.dadosUsuario.telefone = 996612212;
                this.dadosUsuario.email = 'debug' + (Math.random() * (10 - 0) + 0).toFixed(2) + "@gmail.com";
                this.dadosUsuario.municipio = "João Pessoa"; 
                this.dadosUsuario.uf = "PB"; 
                this.dadosUsuario.profissao = "Astrônomo";

                
            }
        }
      }
    },
      
   }
   </script>
 
 <style> 
  .titulo-form-container {
    display: flex;
    align-items: center; /* Center vertically align */
    justify-content: center; /* Center horizontally */
    text-align: center; /* Center text inside label */
  }

  .titulo-form-container  label {
    font-weight: bold;
    margin-right: 10px; /* Adjust spacing between elements */
  }
 </style>
 