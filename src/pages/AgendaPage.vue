<template>
  
  <h2> Minha Agenda </h2>
  
  <MyFullCalendario/>
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