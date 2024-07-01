<template>

    locale {{ locale }}

    <v-text-field
      v-model="formattedDate"
      bg-color="white"
      :label="label"
      :rules="[validateDate]"
      outlined
    >
      <template v-slot:append>
        <v-icon @click="openDatePicker">
          mdi-calendar
        </v-icon>
      </template>
      
      
        <v-menu 
            offset-y
            activator="parent"
            ref="menu" v-model="menu" transition="scale-transition" :close-on-content-click="false">
          <v-date-picker 
             v-model="selectedDate" 
             :locale="locale" 
             @change="onDateSelected">

             <template v-slot:default="{ formattedValue }">
                <span>{{ formattedValue }}</span>
             </template>
          </v-date-picker>
        </v-menu> 
        
    </v-text-field>
  </template>
  
  <script>
  export default {
    name: 'MyDataInput',
    props: {
      label: String,
      value: {
        type: String,
        validator(val) {
          return !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val);
        },
      },
    },
    data() {
      return {
        menu: false,
        selectedDate: this.parseDate(this.value) || null,
        formattedDate: this.value,
      };
    },
    computed: {
      locale() {
        return 'pt-BR'; // Brazilian Portuguese locale for datepicker
      },
    },
    watch: {
      value(newVal) {
        this.formattedDate = newVal;
        this.selectedDate = this.parseDate(newVal);
      },
      selectedDate(newVal) {
        if (newVal) {
          this.formattedDate = this.formatDate(newVal);
          this.$emit('input', this.formattedDate);
        }
      },
    },
    methods: {
      openDatePicker() {
        this.menu = true;
        if (!this.selectedDate && this.formattedDate) {
          // Try to parse the formatted date on opening the picker
          this.selectedDate = this.parseDate(this.formattedDate);
        }
      },
      onDateSelected(val) {
        this.menu = false;
        this.selectedDate = val;
      },
      validateDate(val) {
        return !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val);
      },
      formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      },
      parseDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length !== 3) return null;
        return new Date(parts[2], parts[1] - 1, parts[0]);
      },
    },
    created() {
      // Initialize the formatted date and selected date on component creation
      this.formattedDate = this.value;
      this.selectedDate = this.parseDate(this.value);
    },
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  