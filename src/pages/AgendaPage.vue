<template>
  
  <h1> Minha Agenda </h1>
  
  <MyFullCalendario style="margin-top: 10px"/>
  <!-- <FullCalendar :options="calendarOptions" />-->
  
</template>

<script>
 
import MyFullCalendario from '@/components/MyFullCalendario.vue';

/* eslint-disable */
export default    {
  name: 'App',
  components: {
      //MyCalendario
      // FullCalendar
      MyFullCalendario
  },
  data() {  
    return { 
     }
  },
  methods: { 
  }
}
</script>