<template>
  
  <h1 class="text-h5 text-lg-h5 mb-5 mt-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Minha Agenda </b>
  </h1>
  
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