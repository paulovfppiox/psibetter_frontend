<!-- Overlay.vue -->
<template>
    
    
      <v-overlay 
          style="text-align: center"
          v-model="overlay" 
          class="overlay-container"
          opacity="0.5"
          :persistent="true">

          loadingTime {{  loadingTime  }} <br>
          totalNumRepetitions {{ totalNumRepetitions }} <br>
          repetitionsCounter {{  repetitionsCounter  }} <br>
          loadingOn {{ loadingOn  }}

          <div v-if="this.loadingOn" class="overlay-content">
              <v-progress-circular :model-value="this.value" :rotate="360" :size="100" :width="15" color="white">
                <template v-slot:default> {{ value }} % </template>
              </v-progress-circular>
          </div>
      </v-overlay>

</template>
  
  <script>
  export default {
    name: 'MyLoadingOverlay',
    components: { 
    },
    props: {  
      loadingOn: Boolean
    },
    watch: {
      loadingOn( newValue) {
        alert( "Novo loading: " + newValue );

          if ( newValue ) 
          {
                this.interval = setInterval(() => {
                  if (this.value === 100)   {
                      this.repetitionsCounter++;
                    return (this.value = 0)
                  }
                  this.value += 10
                }, this.loadingTime)
          }
      }
    },
    data () {
      return {
        interval: -1,
        value: 10, 
        repetitionsCounter:1,
        loadingTime: 500,
        totalNumRepetitions: 20,
        overlay: this.loadingOn
      }
    },    
    mounted () {
    },
    updated() {
        alert("Oi " + this.value + " || " + this.repetitionsCounter );

        if ( this.totalNumRepetitions > 0 ) {

            if ( this.repetitionsCounter == this.totalNumRepetitions )  {
                 this.overlay = false;
                 clearInterval(this.interval);                 
            }
        }  

        alert( this.repetitionsCounter + " || " + this.totalNumRepetitions );
        if ( this.repetitionsCounter == this.totalNumRepetitions )  {
             this.overlay = false;
             clearInterval(this.interval);                 
        }
    },
    beforeUnmount () {
      clearInterval(this.interval)
    },
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.overlay-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100%; /* Ensure overlay takes full height */
}

.overlay-content {
  text-align: center; /* Center content inside the container */
}
</style>
  