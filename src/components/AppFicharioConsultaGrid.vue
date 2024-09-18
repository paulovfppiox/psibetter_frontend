<template>
     <!-- ========================== LINHA 2 ========================== -->
      <!--dados dentro da GRID ?!?! {{ JSON.stringify( dadosFichario ) }}
       <v-container v-if="( dadosFichario )"> -->
        

    <v-container>
    <label> {{ this.dataBR }} às {{ this.horaIni }}</label><br/><br/>
    <v-row>
            <v-col cols="12" md="6">
              <v-textarea
              v-model="this.dadosFichario.motivosConsulta"
               append-inner-icon="mdi-comment"
              class="mx-2"
              label="Motivos da Consulta"
              bg-color="white"
              rows="5"
              variant="outlined"
              :readonly="true"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>

            <v-col cols="12" md="6"> 
              <v-textarea
              v-model="this.dadosFichario.historiaConsulta"
               append-inner-icon="mdi-comment"
              class="mx-2"
              label="Histórico da Consulta*"
              bg-color="white"
              rows="5"
              variant="outlined"
              :readonly="true"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>
          </v-row>

            
          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
              v-model="this.dadosFichario.intervencoes"
               append-inner-icon="mdi-comment"
              class="mx-2"
              label="Intervenções realizadas*"
              bg-color="white"
              rows="5"
              variant="outlined"
              :readonly="true"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>

            <v-col cols="12" md="6"> 
              <v-textarea
              v-model="this.dadosFichario.planoIntervencoes"
               append-inner-icon="mdi-comment"
              class="mx-2"
              label="Plano de intervenções futuras*"
              bg-color="white"
              rows="5"
              variant="outlined"
              :readonly="true"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>
          </v-row>
 

          <v-row>
            <v-col cols="12" md="6">
                <v-combobox
                v-model="this.dadosFichario.statusContulta"
                prepend-inner-icon="mdi-list-status"
                label="Status contulta*"
                bg-color="white"
                chips
                variant="outlined" 
                density="comfortable"
                :readonly="true"
                required
              ></v-combobox>
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
       this.dadosFichario = newValue;
       // alert( "Grid element ? " + JSON.stringify( newValue ) );
       const dataUS = this.dadosFichario.dataHoraInicio.split(' ')[0];
       this.horaIni = this.dadosFichario.dataHoraInicio.split(' ')[1];
       this.dataBR = this.convertUSToBrazilDate( dataUS );
    }
  },
  data: () => ({
    /** Data e hora da consulta */
    dataBR: '',
    horaIni: '',
    
    dadosFichario :  {
        id: "",
        nomePaciente  : "",
        dataHoraInicio : "",
        dataHoraFim : "",
        profissionalId : 0,
        motivosConsulta  : "",
        historiaConsulta : "",	 
        statusContulta	 : null, 			
        intervencoes	   : "",
        planoIntervencoes : ""
    },
    
  }),
  methods:  {

      convertUSToBrazilDate(usDate)   
      {
          // Split the date string by "-"
          let parts = usDate.split('-');
          
          // Extract year, month and day
          let year = parts[0];
          let month = parts[1];
          let day = parts[2];
          
          // Create the Brazilian format date string
          let brazilianDate = `${day}/${month}/${year}`;
      
      return brazilianDate;
  }
  }
}
</script>