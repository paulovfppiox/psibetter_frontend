<template>
  
  <v-container style="background-color: #DCEDC8" >
    
    <div class="titulo-form-container">  
       <label><b>  Dados Clínicos  </b></label>
       <MyChecklistIcon v-if="formValido"/>
    </div>
    
   <!-- formReadonly ?!? {{  formReadonly  }} <br>
    formValido {{ formValido }} -->

  <v-form v-model="formValido" style="background-color: #DCEDC8" ref="form">

        <!--- #####################################  LINHA 1  ########################################## -->
        <div class="mb-2" style="text-align: left;">I. Medicamentos, substâncias e comportamentos </div>
        <v-row>
          <v-col cols="12" md="4">
          <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
              <v-combobox
              v-model="dadosClinicos.medicacoesEmUso"
              :items="medicamentosItems" 
              :rules="formReadonly ? [] : medicamentosRules"
              prepend-inner-icon="mdi-pill-multiple"
              label="Medicações*"
              :bg-color="camposBgColor"
              chips
              multiple
              variant="outlined" 
              density="comfortable"
              :readonly="formReadonly"
              required
            ></v-combobox>
          </v-col>
          <!-- select ? {{ JSON.stringify( this.select ) }} -->  

          <v-col cols="12" md="4">
            <v-combobox
              v-model="dadosClinicos.alergias"
              :rules="formReadonly ? [] : alergiasRules"
              prepend-inner-icon="mdi-face-mask"
              label="Alergias*"
              :bg-color="camposBgColor"
              chips
              multiple
              variant="outlined" 
              density="comfortable"
              :readonly="formReadonly"
              required
            ></v-combobox>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-combobox
              v-model="dadosClinicos.drogas"
              :items="drogasItens"
              prepend-inner-icon="mdi-needle-off"
              label="Uso de Drogas?*"
              :bg-color="camposBgColor"
              :rules="formReadonly ? [] : drogasRules"
              chips
              multiple
              variant="outlined" 
              density="comfortable"
              :readonly="formReadonly"
              required
          ></v-combobox>
          
          </v-col>
        </v-row>
        
        <!--- #####################################  LINHA 2  ########################################## -->
        <v-row style="margin-top: -5%;">
          <v-col cols="12" md="4">
          <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->

          <v-container class="horizontal-checkboxes">
                <v-checkbox
                  style="font-size: 10px; margin-top: 20px; color:black"
                  v-model="dadosClinicos.bebe"
                  label="Bebe?"
                  value="1"
                  density="compact"
                  :readonly="formReadonly"
                ></v-checkbox>
                
                <v-checkbox
                  style="font-size: 10px; margin-top: 20px; color:black"
                  v-model="dadosClinicos.fuma"
                  label="Fuma?"
                  :readonly="formReadonly"
                  value="1"
                ></v-checkbox>
            </v-container>

             
          </v-col>
          <!-- select ? {{ JSON.stringify( this.select ) }} -->  

          <v-col cols="12" md="4">
            <v-checkbox
                  style="font-size: 10px; margin-top: 20px"
                  v-model="dadosClinicos.atividadeFisica"
                  label="Atividade Física?"
                  :readonly="formReadonly"
                  value="1"
                ></v-checkbox>
          </v-col>
 
        </v-row>



        <!--- #####################################  LINHA 3  ########################################## -->
         <div class="mb-2" style="text-align: left; margin-top: -2%;">II. Histórico do Paciente </div>
         <v-row>
          <v-col cols="12" md="4">
          <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
          <v-textarea
              v-model="dadosClinicos.historicoPsiquiatrico"
              :rules="formReadonly ? [] : historicoPsiquiatricoRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Histórico psiquiátrico*"
              :bg-color="camposBgColor"
              rows="3"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
          </v-col>
          <!-- select ? {{ JSON.stringify( this.select ) }} -->  

          <v-col cols="12" md="4"> 
            <v-textarea
              v-model="dadosClinicos.historicoFamiliar"
              :rules="formReadonly ? [] : historicoFamiliarRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Histórico familiar*"
              :bg-color="camposBgColor"
              rows="3"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
          </v-col> 

          <v-col cols="12" md="4"> 
            <v-textarea
              v-model="dadosClinicos.textoAnamnese"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Anamnese"
              :bg-color="camposBgColor"
              rows="3"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
          </v-col>           
        </v-row>

        <v-row style="margin-top: -2%;">
            <v-col cols="12" md="4"> 
              <v-combobox
                v-model="dadosClinicos.cirurgias"
                :items="cirurgiasItems"
                prepend-inner-icon="mdi-medical-bag"
                label="Cirurgias Realizadas" 
                :bg-color="camposBgColor"
                :rules="formReadonly ? [] : cirurgiasRules"
                chips
                multiple
                required
                variant="outlined" 
                density="comfortable"
                :readonly="formReadonly"
              ></v-combobox>
          </v-col> 

          <v-col cols="12" md="4"> 
           <v-combobox
              v-model="dadosClinicos.doencasPreexistentes"
              :items="diagnosticosCID"
              :rules="formReadonly ? [] : diagnosticosRules"
              label="Diagnósticos prévios*"
              :readonly="formReadonly"
              :bg-color="camposBgColor"
              chips
              multiple
              variant="outlined" 
              density="comfortable"
              required
            ></v-combobox>
          </v-col>
        </v-row>

        <!--- #####################################  LINHA 4  ########################################## -->
        <div class="mb-2" style="text-align: left;">III. Comportamentos de Risco </div>
        <v-row>
          <v-col cols="12" md="4">
          <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
              <v-combobox
                v-model="dadosClinicos.ideacoesSuicidas"
                :items="nivelIdeacaoSuicidaItems"
                prepend-inner-icon="mdi-thought-bubble"
                label="Ideação suicída*"
                :bg-color="camposBgColor"
                :rules="formReadonly ? [] : ideacoesSuicidasRules"
                variant="outlined" 
                density="comfortable"
                :readonly="formReadonly"
                required
              ></v-combobox>
          </v-col>
          <!-- select ? {{ JSON.stringify( this.select ) }} -->  

          <v-col cols="12" md="4">
          <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
              <v-combobox
                 v-model="dadosClinicos.numTentativasSuicidio"
                 :items="numTentativasSuicidioItens"
                 prepend-inner-icon="mdi-timer-sand-complete"
                 label="N° de tentativas de suicídio*"
                 :bg-color="camposBgColor"
                 :rules="formReadonly ? [] : tentativasRules"
                 variant="outlined" 
                 density="comfortable"
                 :readonly="formReadonly"
                 required
              ></v-combobox>
          </v-col>
 
          <v-col cols="12" md="4">
              <v-checkbox
                 style="font-size: 10px;"
                 v-model="dadosClinicos.temAutomutilacao"
                 label="Histórico de Automutilação?*"
                 :readonly="formReadonly"
                 value="1"
              ></v-checkbox>
          </v-col>
        </v-row>

</v-form> 
</v-container>
</template>
<script>
/* eslint-disable */
import MyChecklistIcon from '@/components/MyChecklistIcon.vue';

import axios from 'axios';
 export default {
     props: {
            idUsuario: Number,  
            shareData: Boolean,
            modoEdicao: String  /** EDICAO or LEITURA */
    },
    components: {
      MyChecklistIcon
    },
    watch: {
          idUsuario(newValue)    {
              alert( "Valor? " + newValue );
          },
          shareData( newValue )  {
            
              var dados = JSON.stringify( this.dadosClinicos );
              console.log( "1- shareData->AppFormDadosClinicos || - Form clinicos valido?? " + this.formValido + " || dadosClinicos? " + dados );

              this.validaForm();

              if ( this.formValido )  {
                   console.log( "2- shareData->AppFormDadosClinicos || emitting 'busFormDadosClinicos' " );
                   this.$bus.emit('busFormDadosClinicos', this.dadosClinicos );
              }  else  {
                   this.$bus.emit('busFormDadosClinicos', false );
              }
          },
          modoEdicao( value )          {
            
              alert( "MODO CLINICO?!? !?!?!? " + value );
              if ( value == "LEITURA" ) {
                   this.formReadonly = true; 
                   this.camposBgColor = "grey-lighten-3"; //"#C6C6C4";
              }
              if ( value == "EDICAO" ) {
                   this.formReadonly = false;
                   this.camposBgColor = "white";
              }
          }
      },
    name:'AppFormDadosClinicos',
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
      medicamentosItems: [
          'Certralina',
          'Venlafaxina',
          'Depakote',
          'Depakene',
      ],
      diagnosticosCID: [ 
      ],
      nivelIdeacaoSuicidaItems:   [
          'Nenhum',
          'Leve',
          'Moderado',
          'Alto'
      ],
      numTentativasSuicidioItens: [
          '0', '1', '2', '3', '4', '5',
          '6', '7', '8', '9', '10', '11',
          '12', '13', '14', '15','16', '17',
          '18', '19', '20'
      ],
      dadosClinicos:    {  
         cirurgias: [],
         medicacoesEmUso: [],
         doencasPreexistentes: [],
         textoAnamnese: '',
         bebe: false,
         fuma: false,
         atividadeFisica: false,
         numTentativasSuicidio: null,
         ideacoesSuicidas: null,
         temAutomutilacao: false
      },
      alergiasRules:  [
         value => {
            if (value) return true
            return 'Preencha as alergias.'
          },
      ],
      drogasRules:  [
         value => {
            if (value) return true
            return 'Preencha o campo de drogas.'
          },
      ],
      historicoPsiquiatricoRules: [
          value => {
             if (value) return true
             return 'Preencha o histórico psiquiátrico.'
          },
      ],
      historicoFamiliarRules: [
          value => {
             if (value) return true
             return 'Preencha o histórico familiar.'
          },
      ],
      textoAnamneseRules: [
          value => {
            if (value) return true
            return 'Preencha a anamnese.'
          }, 
      ],
      ideacoesSuicidasRules: [
          value => {
            if (value) return true
            return 'Preencha a ocorrência de ideias suicídas.'
          },
      ],
      tentativasRules: [
          value => {
            if (value) return true
            return 'Preencha a tentativas de suicídio.'
          },
      ],
      diagnosticosRules: [
          value => {
            if (value) return true
            return 'Preencha o nome.'
          }, 
      ],
      medicamentosRules: [
          value => {
            if (value) return true
            return 'Preencha os medicamentos.'
          }, 
      ],
      cirurgiasRules: [
          value => {
            if (value) return true
            return 'Preencha as cirurgias.'
          }, 
      ],
  }),
  async beforeMount() {
      
      // ***************** VERIFICAR O NOME DA PÁGINA AQUI ***************** 
      if ( this.PATH_ATUAL == "consulta-prontuario" )           {

           this.formReadonly = true;

           // Definido no clique do componente MyPacientesTable.vue
           let  storedData = localStorage.getItem('usuarioObj');  
           if ( storedData )      {
                storedData = JSON.parse( storedData );
                // console.log( "Dados retornados?!?! " + storedData );
                // alert( "-- ID user ?!?!" + storedData.id );
                await this.consultaDadosClinicos( storedData.id );
           }
      }
      if ( this.PATH_ATUAL == "meus-pacientes" )   {
           this.camposBgColor = "white";
      }

      
  },
  mounted()     {
        // Add event listener for key press on the entire document
        document.addEventListener('keypress', this.handleKeyPress);

        this.$bus.on('busAjustarComboboxes', ( flag ) => {
            // alert("*** AppFormDadosClinicos || ajustar aqui os valores do form" );
            // alert( "DROGAS?" + JSON.stringify( this.dadosClinicos.drogas ) );

            if ( ( typeof this.dadosClinicos.cirurgias ) == "string" )
                   this.dadosClinicos.cirurgias = this.dadosClinicos.cirurgias.split(", ");
            
            if ( ( typeof this.dadosClinicos.alergias ) == "string" )
                   this.dadosClinicos.alergias = this.dadosClinicos.alergias.split(", ");
            
            if ( ( typeof this.dadosClinicos.medicacoesEmUso ) == "string" )
                   this.dadosClinicos.medicacoesEmUso = this.dadosClinicos.medicacoesEmUso.split(", ");
            
            if ( ( typeof this.dadosClinicos.doencasPreexistentes ) == "string" )
                   this.dadosClinicos.doencasPreexistentes = this.dadosClinicos.doencasPreexistentes.split(", ");

            if ( ( typeof this.dadosClinicos.drogas ) == "string" )
                   this.dadosClinicos.drogas = this.dadosClinicos.drogas.split(", ");
          
        })
  }, 
  beforeDestroy() {
        // Remove event listener to avoid memory leaks
        document.removeEventListener('keypress', this.handleKeyPress);
  },
  async created() {
     
     const sendData = {
        "data": {
              "entity": "doencas",
              "operation": "consultar",
              "object": {}
          }
     }
     // console.log("SEND DATA >>>> " + JSON.stringify( sendData ) );

     axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
          .then( response => {
                  // console.log('-Response DATA == ' + JSON.stringify( response.data ) + typeof response.data );
                  var data = response.data;
                  if ( data.code == '0' )      {
                       // var label = data.data[0].cod_cid + " - " + data.data[0].nome;
                       // alert("OKOKOKO!!");
                       this.diagnosticosCID = data.data.map(item => `${item.cod_cid} - ${item.nome}`);
                  }  
          })
          .catch(error => {
                this.error = error.message;
          });

    },
    methods:  {
      async consultaDadosClinicos( pacienteId ) 
      {
            const sendData = {
                "data": {
                      "entity": "dadosClinicos",
                      "operation": "consultar",
                      "object": {
                        "pacienteId": pacienteId 
                      }
                  }
            }
            console.log("SEND DATA >>>> " + JSON.stringify( sendData ) );

            axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
                 .then( response => {
                         console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                         var data = response.data;
                         alert(data.code + " || " + data.message );

                         var dados = data.data;
                         this.dadosClinicos.fuma = dados.fuma.toString();
                         this.dadosClinicos.bebe = dados.bebe.toString();
                         this.dadosClinicos.atividadeFisica = dados.atividadeFisica.toString();
                         this.dadosClinicos.historicoFamiliar = dados.historicoFamiliar;
                         this.dadosClinicos.historicoPsiquiatrico = dados.historicoPsiquiatrico;
                         this.dadosClinicos.ideacoesSuicidas = dados.ideacoesSuicidas;
                         this.dadosClinicos.numTentativasSuicidio = dados.numTentativasSuicidio;
                         this.dadosClinicos.textoAnamnese    = dados.textoAnamnese;
                         this.dadosClinicos.temAutomutilacao = dados.temAutomutilacao.toString();

                         this.dadosClinicos.cirurgias            = dados.cirurgias.split(", ");
                         this.dadosClinicos.medicacoesEmUso      = dados.medicacoesEmUso.split(", ");
                         this.dadosClinicos.doencasPreexistentes = dados.doencasPreexistentes.split(", ");
                         this.dadosClinicos.alergias             = dados.alergias.split(", ");
                         this.dadosClinicos.drogas               = dados.drogas.split(", ");
                  })
                  .catch(error => {
                        this.error = error.message;
                  });
      },
      async validaForm()   
      {
            const { formValido } = await this.$refs.form.validate();
            // alert( "** Form valido?!?! " + formValido );
      },
      handleKeyPress( event )     {
        
        if ( this.$DEBUG_ON )       {
            if ( event.key == "=" )   { 
                 this.dadosClinicos.cirurgias = [ 'Plástica', 'Cardíaca' ];
                 this.dadosClinicos.medicacoesEmUso = [ 'Certralina', 'Depakote' ];
                 this.dadosClinicos.doencasPreexistentes = [ 'F45 - Transtornos somatoformes' ];
                 this.dadosClinicos.textoAnamnese = 'Anamnese';
                 this.dadosClinicos.historicoFamiliar = "Historia familia";
                 this.dadosClinicos.historicoPsiquiatrico = "3 Manias";
                 this.dadosClinicos.alergias = ['Dipirona'];
                 this.dadosClinicos.bebe = false;
                 this.dadosClinicos.fuma = "1";
                 this.dadosClinicos.atividadeFisica = "1";
                 this.dadosClinicos.numTentativasSuicidio = "0";
                 this.dadosClinicos.ideacoesSuicidas = "Nenhuma";
                 this.dadosClinicos.temAutomutilacao = false;
      
            }
        }
      }
    }
    
 }
 </script>

<style> 
.horizontal-checkboxes {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -15px;
} 
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

