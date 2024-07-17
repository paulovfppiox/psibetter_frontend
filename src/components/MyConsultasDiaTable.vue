<template>
    
<div style="width:90%; margin-left:5%; margin-right:5%" >
        <label><b> Atendimentos do Dia </b></label>
        <v-text-field 
          style="margin-top: 20px;"
          v-model="search"
          bg-color="white"
          label="Consultar Paciente" 
          placeholder="Insira um valor para buscar paciente..." outlined>
        </v-text-field>
 
        <v-data-table-virtual
          :headers="headers"
          :items="consultasData"
          height="300"
          item-value="name"
          :mobile="this.$IS_MOBILE_APP"
          :show-select="true"
          :search="search"
          select-strategy="single"
          @click:row="handleRowClick">
      </v-data-table-virtual>
      </div>
</template>


<script>
/* eslint-disable */ 
  // import emitter from '../utils/eventBus';
  
  import UtilsMixin       from '@/utils/UtilsMixin.js';
  import axios from 'axios';
  import Agenda from '@/controllers/Agenda.js';

  const agenda = new Agenda();

  export default {
  mixins: [UtilsMixin],
  name: 'App',
    components: {
       
    },
    data: () => ({  
      dadosEvento: agenda.getDados(),
      agenda, 
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
      temConsultasHoje: false,
    }),
    computed: {

      DADOS_USUARIO()  {
         return this.$store.state.user;
      }
    },
    created() {
         

    },
    mounted()       {

          /*  Consulta as minhas consultas do dia de hoje  */
          // Current date
          const currentDate = new Date();

          // Set iniDate to current date at midnight (00:00:00)
          const dataIni = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), -3, 0, 0);
          const dataFim = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0);
          const profissionalId = this.DADOS_USUARIO.id;

          console.log("iniDate:", dataIni.toISOString());
          console.log("endDate:", dataFim.toISOString());
          
          this.agenda.consultarEventos( dataIni, dataFim, profissionalId ).
          then(response => {
            console.log('Cadastro Evento de Agenda Response:', response);
            alert( response.code + " || " + response.message );

            if ( response.code == 0 )   {  
                 var responseData = response.data;
                 this.consultasData = responseData;
                 alert("DADOS TABLE?!? " + JSON.stringify( this.consultasData )); 
                 this.temConsultasHoje = true;
            }   else  {
                this.temConsultasHoje = false;
            }
            this.$emit('tem-consultas-update', this.temConsultasHoje);
          }).catch(error => {
              console.error('Error creating user:', error);
          });
          
        },
    
    methods:    {
        handleRowClick(item , obj ) {
          
          var msg = "OBJ ID: " + obj.index + " || " + JSON.stringify(obj.item)  + "|| Row clicked: " + item;
          alert( msg );

          localStorage.setItem('ficharioUsuarioObj', JSON.stringify( obj.item ) );

          // Caso eu esteja em HOME
          if ( this.$route.name !== 'fichario-consultas' )   {
               setTimeout(() => {
                        this.$router.push({ path: '/fichario-consultas', replace: true });
               }, 300);
          } else {
            // this.$emit('row-clicked', true );
            // this.$bus.emit('busDadosFicharioConsulta', obj.item );
            alert("* ")
          }

      }, 
       
    }
    
  }
</script>

<style> 


</style>

