<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar' v-if="this.$IS_MOBILE_APP">
      <div class='demo-app-sidebar-section'>
        <h2>Instruções de Uso</h2>
        <ul>
          <li> Para adicionar uma nova consulta, basta selecionar as datas. </li>
          <li> Para deletar uma consulta, basta clicar sobre ela. </li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle'/>
              Visualizar finais de semana
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2> N° total de consultas agendadas: {{ currentEvents.length }} </h2>
        <!-- <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul> -->
      </div>
    </div>

    <!-- MENUS_PACIENTES_NOMES {{ JSON.stringify( MENUS_PACIENTES_NOMES ) }}
    tituloNovoEvento {{ tituloNovoEvento }}
    modalNovoEventoOn {{ modalNovoEventoOn }}
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

        </v-card-text>
        <v-card-actions>
          <v-btn  color="primary" @click="this.addEvento()"> Adicionar Evento </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    

    <!-- calendarLocale {{  calendarOptions.calendarLocale }}
    :locale="calendarOptions.calendarLocale"
    -->
    <div class='demo-app-main'>
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
 
 const agenda = new Agenda();

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      
      dadosEvento: agenda.getDados(),
      agenda,
      eventosBD : [],

      tituloNovoEvento:null,
      modalNovoEventoOn: false,
      dadosNovoEvento: null, 

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
         viewDidMount: this.onViewChange,
         viewWillUnmount: this.onViewChange,
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
      }
  },
  created()       {
  },
  mounted()       {

      
      const dataIni = new Date("2024-04-14T00:00:00");
      const dataFim = new Date("2024-06-16T19:00:00");
      
      this.agenda.consultarEventos( dataIni, dataFim ).
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
                 }
             }
             this.addListaEventos( this.eventosBD );
             console.log( JSON.stringify( this.eventosBD ) );
        } 
      }).catch(error => {
          console.error('Error creating user:', error);
      });
  },
  updated() {
      this.translateCalendar();
  },
  methods: {
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    // Method to handle view change
    onViewChange(viewInfo)   {

        // Logs the type of the current view (e.g., 'dayGridMonth', 'timeGridWeek', etc.)
        alert('View changed:', viewInfo.view.type); 
        // You can perform actions based on the view type here
        if (viewInfo.view.type === 'dayGridMonth') {
            alert('Switched to month view');
        }
    },
    addEventoAPI( dadosEvento )  {
      
        this.agenda.setDados( dadosEvento );
        this.agenda.cadastrarEvento( dadosEvento ).then(response => {
            console.log('Cadastro Evento Response:', response);

            alert( response.code + " ||| " + response.message );
            //if ( response.code == 0 )      {
            //}
        }).catch(error => {
          console.error('Error creating user:', error);
        });
    },  
    removeEventoAPI( dadosEvento )  {
      
      this.agenda.setDados( dadosEvento );
      this.agenda.removerEvento( dadosEvento.title, dadosEvento.startStr ).then(response => {
           console.log('Cadastro Evento Response:', response);

           alert( response.code + " ||| " + response.message );
           //if ( response.code == 0 )      {
           //}
      }).catch(error => {
        console.error('Error creating user:', error);
      });
    }, 
    testeAdd( eventData )         {
        alert("ADDD !!!!");
    },

    /** Atualiza o evento !!!!!!! */
    testeChange( eventData )      {
        alert("*** CHANGE !!!! !!!! " + JSON.stringify( eventData ) ); 

        this.dadosNovoEvento  = eventData.event;
        this.tituloNovoEvento = eventData.oldEvent.title;
        // alert("CHANGE !!!! !!!! >> Nome = " +  eventData.oldEvent.title );

        this.removeEventoAPI( eventData.oldEvent );
        this.addEvento( eventData.event );
    },
    testeRemove( eventData )      {
        alert("REMOVE !!!! !!!!");
    },
    translateCalendar()           {

      // Day names translation mapping
      const dayNameMappings = {
        'Sunday': 'Dom',
        'Monday': 'Seg',
        'Tuesday': 'Ter',
        'Wednesday': 'Qua',
        'Thursday': 'Qui',
        'Friday': 'Sex',
        'Saturday': 'Sáb'
      };

      // Select all day header cells
      const dayHeaderCells = this.$refs.calendarRef.$el.querySelectorAll('.fc-col-header-cell');

      dayHeaderCells.forEach((cell) => {
        const originalDayName = cell.querySelector('.fc-col-header-cell-cushion').getAttribute('aria-label');
        const translatedDayName = dayNameMappings[originalDayName];
        if (translatedDayName) {
          cell.querySelector('.fc-col-header-cell-cushion').innerText = translatedDayName;
        }
      });

      // Month names translation
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const translatedMonthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
 
      monthNames.forEach((monthName, index) => {
        const monthTopElements = this.$refs.calendarRef.$el.querySelectorAll(`.fc-month-view .fc-day-top[data-date*='${monthName}']`);
        monthTopElements.forEach((monthTopElement) => {
          translatedMonthNames.forEach((translatedMonthName, translatedIndex) => {
            if (monthTopElement.innerText.includes(monthNames[translatedIndex])) {
              monthTopElement.innerText = monthTopElement.innerText.replace(monthNames[translatedIndex], translatedMonthName);
            }
          });
        });
      });

      // ############################# Translate buttons #############################
      const buttonsToTranslate = {
        'fc-prev-button': 'Anterior',
        'fc-next-button': 'Próximo',
        'fc-today-button': 'Hoje',
        'fc-dayGridMonth-button': 'Mês',
        'fc-timeGridWeek-button': 'Semana',
        'fc-timeGridDay-button': 'Dia'
      };

      Object.entries(buttonsToTranslate).forEach(([className, translation]) => {
        const buttonElement = this.$refs.calendarRef.$el.querySelector(`.${className}`);
        if (buttonElement) {
          buttonElement.innerText = translation;
        }
      });
    },
    handleDatesSet() {
      alert("Ok data sets");
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    addEvento()                  {
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

      alert( JSON.stringify( clickInfo.event ) );

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

</style>
