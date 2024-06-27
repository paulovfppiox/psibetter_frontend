<template>
    <div>
    <!-- <p>User connected for: {{ duration }}</p> -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        connectionTime: null,
        duration: null
      };
    },
    created() {
      // Record the connection time when the component is created
      this.connectionTime = new Date();
      
      // Calculate the duration periodically (e.g., every second)
      setInterval(() => {
        this.calculateDuration();
      }, 1000);
    },
    methods: {
      calculateDuration() {
        const currentTime = new Date();
        const elapsedTime = currentTime - this.connectionTime;
        
        // Convert milliseconds to human-readable format
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        
        // Format the duration as "HH:MM:SS"
        this.duration = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      },
      pad(value) {
        // Helper function to pad single-digit numbers with leading zeros
        return value < 10 ? `0${value}` : value;
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  