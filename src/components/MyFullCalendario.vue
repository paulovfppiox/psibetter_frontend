<template>

  <!-- DADOS?!?! {{ this.DADOS_USUARIO }} -->
    <div style="background-color: lightgray;">
        <h2>Instruções de Uso</h2>
        <br/>
        <p> Para adicionar uma nova consulta, basta selecionar a data desejada. </p>
        <p> Para deletar uma consulta, basta clicar sobre ela. </p>
      
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle'/>
              Visualizar finais de semana
        </label>
        <br>
        <br>
        <h2> N° total de consultas agendadas: {{ currentEvents.length }} </h2>
    </div>


    <!-- MENUS_PACIENTES_NOMES {{ JSON.stringify( MENUS_PACIENTES_NOMES ) }} 
    tituloNovoEvento {{ tituloNovoEvento }}    <br>
    horaIniNovoEvento {{ horaIniNovoEvento }}  <br>
    horaFimNovoEvento {{ horaFimNovoEvento  }} <br>
    modalNovoEventoOn {{ modalNovoEventoOn }}  <br>
    dadosNovoEvento {{  dadosNovoEvento  }} -->

    <v-dialog v-model="modalNovoEventoOn" max-width="500px">
      <v-card> 
        <v-card-text> 
        
        <label> Descrição do Evento </label><br>
          <v-combobox
              v-model="this.tituloNovoEvento"
              :items="this.MENUS_PACIENTES_NOMES"
              style="width:90%;"
              prepend-inner-icon="mdi-account"
              label="Agendar Paciente"
              bg-color="white"
              chips
              variant="outlined" 
              density="comfortable"
              required
          ></v-combobox>

          <label> Horas Inicial e Final do Evento </label><br>
          <input type="time" id="appt" name="appt" v-model="this.horaIniNovoEvento" style="background-color: white; width: 100px; height: 50px;">
          <input type="time" id="appt" name="appt" v-model="this.horaFimNovoEvento" style="background-color: white; width: 100px; height: 50px; margin-left: 10px">

        </v-card-text>
        <v-checkbox
          style="font-size: 10px; margin-top: 20px; color:black"
          v-model="agendarTrimestre"
          label="Agendar Trimestre?" 
          value="1"
        ></v-checkbox>
        <v-card-actions>
          <v-btn  color="primary" @click="this.addEventos()"> Adicionar Evento </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    

    <!-- calendarLocale {{  calendarOptions.calendarLocale }}
    :locale="calendarOptions.calendarLocale"
    -->
    <div class='demo-app-main' style="background-color: white"> 
      
      <div class="visao-label">
           Perspectiva
      </div>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
        @datesSet="handleDatesSet"
        ref="calendarRef"
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/utils/eventUtils.js'

// Import locale data directly in the component
// import ptLocale from '@fullcalendar/core/locales/pt-br';

import Agenda from '@/controllers/Agenda.js'; 
import Financeiro from '@/controllers/Financeiro.js';
 
const agenda = new Agenda();
const financeiro = new Financeiro();

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      
      dadosEvento: agenda.getDados(),
      agenda,
      financeiro,
      eventosBD : [],

      tituloNovoEvento:null,
      horaIniNovoEvento: null,
      horaFimNovoEvento: null,
      modalNovoEventoOn: false,
      dadosNovoEvento: null,
      modoVisaoAtual: null,   /** Detectado em onViewChange() */
      agendarTrimestre: false,
      cores: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      calendarOptions: {
        // calendarLocale: ptLocale,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: false, // Disable drag-and-drop
        droppable: false,

        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:*/
        eventAdd: this.testeAdd,
        eventChange: this.testeChange,
        eventRemove: this.testeRemove,

         // Callback when the view changes
         //viewDidMount: this.onViewChange,
         viewWillUnmount: this.onViewChange,
         // viewDidChange: this.onViewChange,
      },
      currentEvents: [],
    }
  },
  computed: {
      MEUS_PACIENTES_DATA()        {
          return this.$store.state.meusPacientes;
      },
      MENUS_PACIENTES_NOMES()      {
          return this.$store.state.meusPacientes.map(obj => obj.nome);
      },
      DADOS_USUARIO()  {
         return this.$store.state.user;
      }
  },

  created()       {
  },
  mounted()       {
  
      
      /******************************* */
      // var dataIni = new Date("2024-04-14T00:00:00");
      // var dataFim = new Date("2024-07-30T19:00:00");

      // Current date
      const currentDate = new Date();

      // Set iniDate to current date at midnight (00:00:00)
      const dataIni = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
      const dataFim = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, currentDate.getDate(), 19, 0, 0);

      const profissionalId = this.DADOS_USUARIO.id;

      console.log("iniDate:", dataIni.toISOString());
      console.log("endDate:", dataFim.toISOString());
      
      this.agenda.consultarEventos( dataIni, dataFim, profissionalId ).
      then(response => {
        console.log('Cadastro Evento de Agenda Response:', response);
        
        if ( response.code == 0 )   {
             const eventos = response.data;
             console.log(JSON.stringify( eventos ))

             for(var i=0; i<eventos.length; i++)  {
                
                 this.eventosBD[i] = {
                    id : eventos[i].id,
                    title : eventos[i].nomePaciente,
                    start : eventos[i].dataHoraInicio,
                    end : eventos[i].dataHoraFim,
                    color : this.cores[this.rnd(0, this.cores.length - 1)]
                    // allDay: true
                 }
             }
             this.addListaEventos( this.eventosBD );
             // console.log( JSON.stringify( this.eventosBD ) );
        } 
      }).catch(error => {
          console.error('Error creating user:', error);
      });
      
  },
  updated() {
      this.translateCalendar( this.modoVisaoAtual );
  },
  methods: {
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    // Method to handle view change
    onViewChange(viewInfo)   {

        // Logs the type of the current view (e.g., 'dayGridMonth', 'timeGridWeek', 'timeGridDay' etc.)
        // alert( 'View changed:' + viewInfo.view.type ); 
        // You can perform actions based on the view type here
        
        // ------------ SEMANA ------------ 
        switch( viewInfo.view.type )  {

         // Semana   
         case 'dayGridMonth':
            //alert('Visão de semana!! ');
            this.modoVisaoAtual = "SEMANA";
         break;

         // Mês
         case 'timeGridWeek':
            //alert('Visão de Mês!! ');
            this.modoVisaoAtual = "MES";
         break;

         // Dia
         case 'timeGridDay':
            //alert('Visão de DIA!! ');
            this.modoVisaoAtual = "DIA";
         break;

        }
         
        
    },
    onViewDay(viewInfo)   {

      // Logs the type of the current view (e.g., 'dayGridMonth', 'timeGridWeek', 'timeGridDay' etc.)
      // alert( 'View changed:' + viewInfo.view.type ); 
      // You can perform actions based on the view type here

      if (viewInfo.view.type === 'timeGridDay') {  
          alert('Visão de DAY !!!! ');
          this.modoVisaoAtual = "DIA";
      }
    }, 

    addEventoAPI( dadosEvento )  {
      
        // alert("** Dados eventos: " + JSON.stringify( dadosEvento ) );

        // this.agenda.setDados( dadosEvento );
        this.agenda.cadastrarEvento( dadosEvento ).then(response => {
            // console.log('Cadastro Evento Response:', response);
            // alert( response.code + " ||| " + response.message );
            if ( response.code == 0 )      {
                 this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                 

                 const dataHraIni = dadosEvento.dataHoraInicio.slice(0, 19);
                 var dadosFinanceiros = {
                      "nome": dadosEvento.nomePaciente,
                      "dataHoraInicio": dataHraIni
                 };        
                 alert( "Data? " + JSON.stringify( dadosFinanceiros ) );
                 const resp = this.financeiro.cadastrarFinanceiro( dadosFinanceiros );
                 alert( "REsponse? " + JSON.stringify( resp.data ) );
            }
        }).catch(error => {
          console.error('Error creating user:', error);
        });
    },  
    removeEventoAPI( dadosEvento )  {
      
      this.agenda.setDados( dadosEvento );
      this.agenda.removerEvento( dadosEvento.title, dadosEvento.startStr ).then(response => {
           // console.log('Cadastro Evento Response:', response);
           //alert( response.code + " ||| " + response.message );
           if ( response.code == 0 )      {
                this.$bus.emit('showModal', { message: "Consulta removida com sucesso!", msgType: "warning"} );
           }
      }).catch(error => {
        console.error('Error creating user:', error);
      });
    }, 
    testeAdd( eventData )         {
        // alert("ADDD !!!!");
    },

    /** Atualiza o evento !!!!!!! */
    testeChange( eventData )      {
        // alert("*** CHANGE !!!! !!!! " + JSON.stringify( eventData ) ); 

        this.dadosNovoEvento  = eventData.event;
        this.tituloNovoEvento = eventData.oldEvent.title;
        // alert("CHANGE !!!! !!!! >> Nome = " +  eventData.oldEvent.title );

        this.removeEventoAPI( eventData.oldEvent );
        this.addEvento( eventData.event );
    },
    testeRemove( eventData )      {
        // alert("REMOVE !!!! !!!!");
    },
    
    handleDatesSet() {
      alert("Ok data sets");
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    addEventoOLD()                  {
      if ( this.tituloNovoEvento == null )  {
           alert("Selecione o titulo do novo evento.");
           return;
      }
      console.log("** Adicionando novo evento: " + JSON.stringify( this.dadosNovoEvento ));
      // let calendarApi = this.dadosNovoEvento.view.calendar;
      const calendarApi = this.$refs.calendarRef.getApi();
      calendarApi.unselect() // clear date selection
      
      let title = this.tituloNovoEvento;
      if (title) {
          calendarApi.addEvent({
              id: createEventId(),
              title,
              start: this.dadosNovoEvento.startStr,
              end: this.dadosNovoEvento.endStr,
              color: this.cores[this.rnd(0, this.cores.length - 1)],
              allDay: this.dadosNovoEvento.allDay
          })
      }
      var evento = {
          nomePaciente: this.tituloNovoEvento, 
          dataHoraInicio: this.dadosNovoEvento.startStr,
          dataHoraFim: this.dadosNovoEvento.endStr
      }
      this.addEventoAPI( evento );
      this.modalNovoEventoOn = false;
    },
    /** Dada um parâmetro de data inicial no formato dateIni = '2024-07-18',
     * Gera um vetor com as 12 próximas datas com intervalo de 7 dias entre cada uma.
     * Função usada para agendar um trimestre para um paciente. **/
    gerarDatasTrimestre( dateIni )          {
        let dates = [];
        let currentDate = new Date(dateIni); // Convert input date string to Date object
        dates.push(currentDate.toISOString().slice(0, 10)); // Push initial date to array

        // Generate 11 more dates, each 7 days apart
        for (let i = 1; i < 12; i++) {
            currentDate.setDate(currentDate.getDate() + 7); // Add 7 days to current date
            dates.push(currentDate.toISOString().slice(0, 10)); // Push formatted date string to array
        }
        // alert("DATAS GERADAS?!" + JSON.stringify(dates));
        return dates;
    },
    addEventos()              {
      
        // alert( this.agendarTrimestre );
        if ( this.agendarTrimestre )    {
             var datas = this.gerarDatasTrimestre( this.dadosNovoEvento.startStr );
             for( var i=0; i<datas.length; i++ )   {
                  this.dadosNovoEvento.startStr = datas[ i ];
                  this.addEventoDia();
             }
        } else {
          this.addEventoDia();
        }
    },
    addEventoDia()      {
      if ( this.tituloNovoEvento == null )  {
           // alert("Selecione o titulo do novo evento.");
           this.$bus.emit('showModal', { message: "Selecione o titulo do novo evento.", msgType: "warning"} );
           return;
      }
      console.log("** Adicionando novo evento: " + JSON.stringify( this.dadosNovoEvento ));
      // let calendarApi = this.dadosNovoEvento.view.calendar;
      const calendarApi = this.$refs.calendarRef.getApi();
      calendarApi.unselect() // clear date selection
      
      // alert("DATA START? " + this.dadosNovoEvento.startStr + " || " + this.horaIniNovoEvento + " || " + this.horaFimNovoEvento );

      /** DATA INICIAL */
      var dateString = this.dadosNovoEvento.startStr;
      var initialTime = this.horaIniNovoEvento;
      var datetimeString = `${dateString}T${initialTime}:00`;
      // Initialize a Date object with the combined datetime string
      const dateTimeIniObject = new Date(datetimeString);

      /** DATA FINAL */
      dateString = this.dadosNovoEvento.startStr;
      var finalTime = this.horaFimNovoEvento;
      datetimeString = `${dateString}T${finalTime}:00`;
      // Initialize a Date object with the combined datetime string
      const dateTimeFimObject = new Date(datetimeString);

      console.log("DATA INICIAL:  " + dateTimeIniObject );
      console.log("DATA FINAL:  " + dateTimeFimObject );

      //*********************** COMPARAR HORÁRIOs *************************** */  
      var timeOk = this.isDataTimeFimMaior( dateTimeIniObject, dateTimeFimObject);
      if ( !timeOk )  {
            this.$bus.emit('showModal', { message: "Horário final deve ser maior que o inicial.", msgType: "warning"} );
            return;
      }
      //************************************************** */  

      let title = this.tituloNovoEvento;
      if (title) {
          calendarApi.addEvent({
              id: createEventId(),
              title,
              start: dateTimeIniObject,
              end: dateTimeFimObject,
              color: this.cores[this.rnd(0, this.cores.length - 1)],
              allDay: false
          })
      }

      console.log( "DATA INI = " + dateTimeIniObject + " || DATA FIM = " + dateTimeFimObject);

      /** Monta evento para back-end, e envia via API */
      const evento = {
          nomePaciente: this.tituloNovoEvento, 
          dataHoraInicio: dateTimeIniObject,
          dataHoraFim: dateTimeFimObject,
          profissionalId: this.DADOS_USUARIO.id
      }
      this.addEventoAPI( evento );
      this.modalNovoEventoOn = false;
    },
    addEventoOLD()                  {
      if ( this.tituloNovoEvento == null )  {
           alert("Selecione o titulo do novo evento.");
           return;
      }
      console.log("** Adicionando novo evento: " + JSON.stringify( this.dadosNovoEvento ));
      // let calendarApi = this.dadosNovoEvento.view.calendar;
      const calendarApi = this.$refs.calendarRef.getApi();
      calendarApi.unselect() // clear date selection
      
      // alert("DATA START? " + this.dadosNovoEvento.startStr + " || " + this.horaIniNovoEvento + " || " + this.horaFimNovoEvento );

      /** DATA INICIAL */
      var dateString = this.dadosNovoEvento.startStr;
      var initialTime = this.horaIniNovoEvento;
      var datetimeString = `${dateString}T${initialTime}:00`;
      // Initialize a Date object with the combined datetime string
      const dateTimeIniObject = new Date(datetimeString);

      /** DATA FINAL */
      dateString = this.dadosNovoEvento.startStr;
      var finalTime = this.horaFimNovoEvento;
      datetimeString = `${dateString}T${finalTime}:00`;
      // Initialize a Date object with the combined datetime string
      const dateTimeFimObject = new Date(datetimeString);

      console.log("DATA INICIAL:  " + dateTimeIniObject );
      console.log("DATA FINAL:  " + dateTimeFimObject );

      //*********************** COMPARAR HORÁRIOs *************************** */  
      var timeOk = this.isDataTimeFimMaior( dateTimeIniObject, dateTimeFimObject);
      if ( !timeOk )  {
            this.$bus.emit('showModal', { message: "Horário final deve ser maior que o inicial.", msgType: "warning"} );
            return;
      }
      //************************************************** */  

      let title = this.tituloNovoEvento;
      if (title) {
          calendarApi.addEvent({
              id: createEventId(),
              title,
              start: dateTimeIniObject,
              end: dateTimeFimObject,
              color: this.cores[this.rnd(0, this.cores.length - 1)],
              allDay: false
          })
      }

      console.log( "DATA INI = " + dateTimeIniObject + " || DATA FIM = " + dateTimeFimObject);

      /** Monta evento para back-end, e envia via API */
      const evento = {
          nomePaciente: this.tituloNovoEvento, 
          dataHoraInicio: dateTimeIniObject,
          dataHoraFim: dateTimeFimObject,
          profissionalId: this.DADOS_USUARIO.id
      }
      this.addEventoAPI( evento );
      this.modalNovoEventoOn = false;
    },
    addListaEventos( events )                 {
      /*const events = [
        {
          id: createEventId(),
          title: 'Event TESTE 1',
          start: new Date('2024-06-10T12:00:00'),
          end: new Date('2024-06-10T13:30:00'),
          color:'red'
          // color: this.cores[this.rnd(0, this.cores.length - 1)]
        }, 
      ];*/
      
      // Set events array to calendarOptions
      this.calendarOptions.events = events;      
      const calendarApi = this.$refs.calendarRef.getApi();
      calendarApi.removeAllEvents(); // Clear existing events (optional)
      calendarApi.addEventSource(events); // Add new events
        
    }, 
    handleDateSelect(selectInfo) {

      this.modalNovoEventoOn = true;
      this.dadosNovoEvento = selectInfo;
      
    },
    handleEventClick(clickInfo) {

      // alert( JSON.stringify( clickInfo.event ) );

      if ( confirm( `Você tem certeza que deseja remover o evento '${clickInfo.event.title}' ?` ) ) {
           clickInfo.event.remove();
           this.removeEventoAPI( clickInfo.event );
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
})

</script>



<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

/* 
MOBILE/TABLETS APP 
  Aplica esse CSS, até o máximo de width=750px */
  @media ( min-width: 768px )   
{
    .demo-app {
      display: flex;
      min-height: 100%;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
      font-size: 14px;
      background-color: rgb(224, 60, 9);
    }
}


.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  background-color: lightblue;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.visao-label {
  text-align: right;
  margin-right: 45px;
  font-size: 13px;
  font-weight: bold;
}
</style>
