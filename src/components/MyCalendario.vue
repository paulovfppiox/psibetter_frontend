<template>
  
  <!-- dataEvento {{  JSON.stringify( dadosEvento ) }} -->

  intervalo {{ intervalo }}
  <!--
  <v-container style="margin-top: 20px">
      <v-row justify="center">
          
          
             
             <input type="time" id="appt" name="appt" v-model="this.dadosEvento.horaFimEvento" style="background-color: white; width: 10%; height: 50px;">
          
                
      </v-row> 

    <v-row>
        <v-col cols="12">
          
        </v-col>
    </v-row>
  </v-container> -->    
  
  
  <v-container fluid style="width:70%">
    <!-- Grid system with 2 rows and 2 columns -->
    <v-row>
      <v-col cols="12" md="6"> <!-- Each column takes half width on medium screens and larger -->
          <label> Data do Evento </label>
          <MyDataInput label="Adicionar Nova Data" 
             @input = "data => handleDataUpdate( data )" 
             :value = "this.dadosEvento.dataEvento"/>
      </v-col>

      <v-col cols="12" md="6">
        <label> Horas Inicial e Final do Evento </label><br>
        <input type="time" id="appt" name="appt" v-model="this.dadosEvento.horaIniEvento" style="background-color: white; width: 100px; height: 50px;">
        <input type="time" id="appt" name="appt" v-model="this.dadosEvento.horaFimEvento" style="background-color: white; width: 100px; height: 50px; margin-left: 10px">
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <label> Descrição do Evento </label><br>
        <v-combobox
            v-model="this.dadosEvento.tituloEvento"
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
      </v-col>

      <v-col cols="12" md="6">
        <v-btn
            class="custom-btn"
            color="primary"
            append-icon="mdi-calendar-plus"
            @click="sendDataAPI()" > <!-- addEvento() -->
              Adicionar Novo Evento
          </v-btn> 

          <v-btn
            class="custom-btn"
            color="error"
            append-icon="mdi-calendar-remove"
            @click="addEvento()" >
              Cancelar Evento
          </v-btn> 
      </v-col>

    </v-row>
  </v-container>


    <div>
      <v-sheet
        class="d-flex"
        height="54"
        tile
      >
        <v-select
          v-model="type"
          :items="types"
          class="ma-2"
          label="View Mode"
          variant="outlined"
          dense
          hide-details
        ></v-select>
        
        <v-select
          v-model="weekday"
          :items="weekdays"
          class="ma-2"
          label="weekdays"
          variant="outlined"
          dense
          hide-details
        ></v-select>
      </v-sheet>
      <v-sheet>
        <v-calendar
            :mobile="this.$IS_MOBILE_APP"
            ref="calendar"
            v-model="value"
            :events="events"
            :view-mode="type"
            :weekdays="weekday"
            :interval-minutes="this.intervalo"
          >
        
          <template #time="{ time }">
            {{ time.format('HH:mm') }}
          </template>
        
        </v-calendar>
      </v-sheet>
    </div>
  </template>

<script>
import { useDate } from 'vuetify'
/* eslint-disable */
import MyDataInput from '@/components/MyDataInput.vue';

import Agenda from '@/controllers/Agenda.js'; 
 
 const agenda = new Agenda();
 

export default {

  name:'MyCalendario',
  components: {
    MyDataInput
  }, 
  data: () => ({
    dadosEvento: agenda.getDados(),
    agenda,

    intervalo:30,
    dadosEvento : {
      dataEvento: "2024-01-01",
      horaIniEvento: '12:12:00',
      horaFimEvento: '12:12:00',
      tituloEvento: null
    },
    type: 'month',
    types: ['month', 'week', 'day'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: 'Sun - Sat', value: [ 0, 1, 2, 3, 4, 5, 6 ] },
      { title: 'Mon - Sun', value: [ 1, 2, 3, 4, 5, 6, 0 ] },
      { title: 'Mon - Fri', value: [ 1, 2, 3, 4, 5 ] },
      { title: 'Mon, Wed, Fri', value: [1, 3, 5 ] },
    ],
    value: [new Date()],
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    titles: ['Paciente 1', 'Paciente 2', 'Paciente 3', 'Paciente 4', 'Paciente 5' , 'Paciente 6' ],
  }),
  computed: {
      MEUS_PACIENTES_DATA()           {
          return this.$store.state.meusPacientes;
      },
      MENUS_PACIENTES_NOMES()         {
          return this.$store.state.meusPacientes.map(obj => obj.nome);
      }
  },
  update()    {
      alert( dataEvento + " || " + horaEvento );
  },
  mounted ()  {
    const adapter = useDate();
    var date = new Date('2023-08-01T12:00:00')
    console.log(JSON.stringify(date) );

    /*this.getEvents(
    { 
        start: adapter.startOfDay(adapter.startOfMonth(new Date())), 
        end: adapter.endOfDay(adapter.endOfMonth(new Date()))
     })*/
    
    this.events.push({
           title: "Paulo Vinícius de F. Paiva",
           start:  new Date('2024-06-25T12:00:00'),
           end:    new Date('2024-06-25T12:30:00'),
           color: this.colors[this.rnd(0, this.colors.length - 1)],
           allDay: false,
    });

    this.events.push({
           title: "GIVALDO MEDEIROS",
           start:  new Date('2024-07-01T12:00:00'),
           end:    new Date('2024-07-01T12:30:00'),
           color: this.colors[this.rnd(0, this.colors.length - 1)],
           allDay: false,
    });

    console.log(JSON.stringify( this.events[0] ));
    this.events.push({
           title: "Ana Laryssa Melo",
           start:  new Date(2024, 5, 10, 3, 0, 0, 0),
           end:   new Date(2024, 5, 10, 4, 0, 0, 0),
           color: this.colors[2],
           allDay: false,
    });
    console.log(JSON.stringify( this.events[1] ));
    

  },
  methods: {
    handleDateClick(date) {
        this.dadosEvento.dataEvento = date;
    },
    addEvento()                     {
        console.log( "Evento: " + JSON.stringify( this.dadosEvento ) );

        if ( this.dadosEvento.horaFimEvento <= this.dadosEvento.horaIniEvento )  {
             this.$bus.emit('showModal', { message: "Horário Final deve ser maior que o inicial.", msgType: "warning"} );
             return;
        }

        const dataPartes = this.dadosEvento.dataEvento.split("/");
        const dia = dataPartes[0];
        const mes = ( dataPartes[1] - 1 );
        const ano = dataPartes[2];

        alert( ano + "|" + mes + "|" + dia );
        this.events.push({
           title: this.dadosEvento.tituloEvento,
           start:  new Date( ano, mes, dia, 1, 0, 0, 0),
           end:    new Date( ano, mes, dia, 2, 30, 0, 0),
           color: this.colors[this.rnd(0, this.colors.length - 1)],
           allDay: false,
        });


        this.events.push({
           title: (this.dadosEvento.tituloEvento + "TESTE "),
           start:  new Date( ano, mes, dia, 2, 45, 0, 0),
           end:    new Date( ano, mes, dia, 4, 0, 0, 0),
           color: this.colors[this.rnd(0, this.colors.length - 1)],
           allDay: false,
        });
    },
    handleDataUpdate( data )        {
        alert("*** Data =>> " + data );
        this.dadosEvento.dataEvento = data;
    },
    getEvents ({ start, end })      {
      const events = []

      const min = start
      const max = end
      const days = (max.getTime() - min.getTime()) / 86400000
      var eventCount = this.rnd(days, days + 20)

      eventCount = 5;

      for (let i = 0; i < eventCount; i++)      {
           const allDay = this.rnd(0, 3) === 0
           const firstTimestamp = this.rnd(min.getTime(), max.getTime())
           const first = new Date(firstTimestamp - (firstTimestamp % 900000))
           const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
           const second = new Date(first.getTime() + secondTimestamp)

           console.log("n°-" + i + ") => first - " +  first + " || second - " + second );

           events.push({
             title: this.titles[ i ],
             start: first,
             end: second,
             color: this.colors[this.rnd(0, this.colors.length - 1)],
             allDay: !allDay,
           })
      }

      this.events = events
    },
    sendDataAPI()            {
            
            var dadosEvento = {
              dataEvento: "2024-01-01",
              horaIniEvento: '12:12:00',
              horaFimEvento: '12:12:00',
              tituloEvento: null
            }
            /*this.agenda.setDados( dadosEvento );
            this.agenda.cadastrarEvento( dadosEvento ).
            then(response => {
              console.log('Cadastro Evento de Agenda Response:', response);
            }).catch(error => {
               console.error('Error creating user:', error);
            });*/


            var mes = 10;
            this.agenda.consultarEventos( mes ).
            then(response => {
              console.log('Cadastro Evento de Agenda Response:', response);
            }).catch(error => {
               console.error('Error creating user:', error);
            });

   },

    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>