<template>
     <!-- ========================== LINHA 2 ========================== -->
      <!--dados dentro da GRID ?!?! {{ JSON.stringify( dadosReceituario ) }}
       <v-container v-if="( dadosReceituario )"> -->
        

    <v-container style="width: 80%;">
    <label> {{ this.dataBR }} às {{ this.horaIni }}</label><br/><br/>
    <v-row class="mb-2">
            <v-col cols="12" md="4">
                <v-text-field
                   v-model="this.dadosReceituario.id"
                   hint="Informe email"
                   max-width="400px"
                   :counter="30"
                   label="N° da receita"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
                <v-text-field
                   v-model="this.dadosReceituario.dataPrescricao"
                   
                   hint="Informe email"
                   max-width="400px"
                   :counter="30"
                   label="Data de prescrição"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
 
     </v-row>

     <!--  ====================================  LINHA 1 ==================================== -->     
     <v-row v-if="this.dadosReceituario.medicacao1" class="mb-2">
            <v-col cols="12" md="4">
              <v-text-field
                   v-model="this.dadosReceituario.medicacao1"
                   max-width="400px"
                   :counter="30"
                   label="Medicamento"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.quantidade1"
                   max-width="400px"
                   :counter="30"
                   label="Quantidade"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.posologia1"
                   max-width="400px"
                   :counter="30"
                   label="Posologia"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
     </v-row>

     <!--  ====================================  LINHA 2 ==================================== -->     
     <v-row v-if="this.dadosReceituario.medicacao2" class="mb-2">
            <v-col cols="12" md="4">
              <v-text-field
                   v-model="this.dadosReceituario.medicacao2"                   
                   max-width="400px"
                   :counter="30"
                   label="Medicamento"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.quantidade2"                   
                   max-width="400px"
                   :counter="30"
                   label="Quantidade"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.posologia2"                   
                   max-width="400px"
                   :counter="30"
                   label="Posologia"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
     </v-row>




     <!--  ====================================  LINHA 3 ==================================== -->     
     <v-row v-if="this.dadosReceituario.medicacao3" class="mb-2">
            <v-col cols="12" md="4">
              <v-text-field
                   v-model="this.dadosReceituario.medicacao3"                   
                   max-width="400px"
                   :counter="30"
                   label="Medicamento"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.quantidade3"                   
                   max-width="400px"
                   :counter="30"
                   label="Quantidade"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.posologia3"                   
                   max-width="400px"
                   :counter="30"
                   label="Posologia"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
     </v-row>





      <!--  ====================================  LINHA 4 ==================================== -->     
      <v-row v-if="this.dadosReceituario.medicacao4" class="mb-2">
            <v-col cols="12" md="4">
              <v-text-field
                   v-model="this.dadosReceituario.medicacao4"                   
                   max-width="400px"
                   :counter="30"
                   label="Medicamento"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.quantidade4"                   
                   max-width="400px"
                   :counter="30"
                   label="Quantidade"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.posologia4"                   
                   max-width="400px"
                   :counter="30"
                   label="Posologia"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
     </v-row>





      <!--  ====================================  LINHA 5 ==================================== -->     
      <v-row v-if="this.dadosReceituario.medicacao5" class="mb-10">
            <v-col cols="12" md="4">
              <v-text-field
                   v-model="this.dadosReceituario.medicacao5"
                   max-width="400px"
                   :counter="30"
                   label="Medicamento"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.quantidade5"
                   max-width="400px"
                   :counter="30"
                   label="Quantidade"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4"> 
              <v-text-field
                   v-model="this.dadosReceituario.posologia5"
                   max-width="400px"
                   :counter="30"
                   label="Posologia"
                   :bg-color="camposBgColor"
                   variant="outlined"
                   density="comfortable"
                   :readonly="formReadonly"
                   required
                ></v-text-field>
            </v-col>
     </v-row>


           
      </v-container>
</template>    

<script>
/* eslint-disable */

export default {
  name:'AppFicharioConsultaGrid',
  props:  {
     dados: Object
  },
  watch: {
    dados( newValue )    {
       this.dadosReceituario = newValue;
       /*
       const dataUS = this.dadosReceituario.dataHoraInicio.split(' ')[0];
       this.horaIni = this.dadosReceituario.dataHoraInicio.split(' ')[1];
       this.dataBR = this.convertUSToBrazilDate( dataUS );*/
    }
  },
  data: () => ({
    /** Data e hora da consulta */
    dataBR: '',
    horaIni: '',

    dadosReceituario :  {
        id: "",
        medicacao1    : "",
        quantidade1   : "",
        posologia1   :  "",
        medicacao2    : "",
        quantidade2   : "",
        posologia2   :  "",
        medicacao3    : "",
        quantidade3   : "",
        posologia3   :  "",
        medicacao4    : "",
        quantidade4   : "",
        posologia4   :  "",
        medicacao5    : "", 
        quantidade5   : "",
        posologia5   :  "",
        dataPrescricao: "",
        observacoes :   "",
        idMedico 	:   0,
        idPaciente  :   0
     },
  }),
  methods:  {

   
  }
}
</script>