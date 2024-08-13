<template>
    
    
    <v-container style="background-color: #DCEDC8"  >
    <label><b> Dados de Localidade </b></label>

    <!-- formValid {{ formValido }} -->
    <!-- NOTA!! NOTA!! fast-fail : validation will short-circuit after the first invalid input is found. --> 
    <v-form class="mt-5" fast-fail v-model="formValido" style="background-color: #DCEDC8" >
          <!-- ############################ LINHA 1 ###########################-->
          <v-row>
           
            <v-col cols="12" md="4">
              <v-autocomplete
                bg-color="white"
                v-model="dadosEndereceo.municipio"
                :items="municipios"
                label="Município" 
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4" >
              <v-autocomplete
                bg-color="white"
                v-model="dadosEndereceo.UF"
                :items="UFs"
                label="UF"
                :rules="UFRules"
              ></v-autocomplete>
              <!-- NOTA!! NOTA!! density="comfortable, compact" NOTA!! NOTA!!-->

            </v-col>

           

            <v-col cols="12" md="4" >
              <v-autocomplete
                v-model="dadosEndereceo.tipoMoradia"
                :items="tiposMoradias"
                label="Mora em:"
                :rules="tiposMoradiasRules"
                bg-color="white"
              ></v-autocomplete>
            </v-col>

          </v-row>

        <v-row>
           <v-col>

            <!----->
            <v-card  class="mx-auto" color="surface-light" max-width="400">
              <v-card-text>
                  <v-text-field
                    bg-color="white"
                    :loading="loading"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Buscar localidade por CEP"
                    variant="solo"
                    hide-details
                    single-line
                    @click:append-inner="onClick"
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
   import axios from 'axios';

   export default {
     props: {
            idUsuario:      {
              type: Number,    
              required: true  
            },  
            shareData:      {
              type: Boolean,    
              required: true  
            },  
    }, 
    watch: {
          idUsuario(newValue)    {
              alert( "Valor? " + newValue );
          },
          shareData( newValue )  {
            
              // alert( "Em FormEndereco || shareData?! " + newValue );

              // alert( "- Form endereco valido?? " + this.formValido + " || " + dados );
              if ( this.formValido )    {
                   if ( newValue )    {
                        this.$bus.emit('busFormDadosEndereco', this.dadosEndereceo );
                   }
              } else  {
                     this.$bus.emit('busFormDadosEndereco', false );
              }
              
              
          }
      }, 
      name:'AppFormEndereco',
      data: () => ({
        
        /* submit CEP */
        loaded: false,
        loading: false,
        timeout: null,
        cep: '',
        dadosEndereceo : {
            tipoMoradia: '',
            municipio: 'João Pessoa', /* Default */
            UF: 'Paraíba',    /* Default */
        },
        
        tiposMoradias: [ 'Apartamento', 'Casa', 'Condomínio', 'Outro' ],
        tiposMoradiasRules: [
          value => {
            if (value) return true
            return 'Tipo Moradia necessário.'
          }, 
        ],

        formValido: false,
        municipios: [ "João Pessoa", 'Bayeus', 'Cabedelo' ],
        UFs: ['Paraíba', 'Pernambuco', 'Rio Grande do Norte', 'Rio de Janeiro'],
        UFRules: [
          value => {
            if (value) return true

            return 'UF é obrigatório'
          }, 
        ],
    }),

    methods: {
      
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
                        // alert( JSON.stringify(dados) );
                        this.municipio    = dados.localidade;
                        this.UF = dados.uf;
                   }
                })
                .catch ( error => {
                    this.error = error.message;
                } );
      },

      async onClick () {
        this.loading = true
        
        setTimeout(() => {
          this.loading = false 
          this.getCepAPI();
          this.loaded = true
        }, 2000)
      },
    },

      
   }
   </script>
 
 <style> 
  
 </style>
 