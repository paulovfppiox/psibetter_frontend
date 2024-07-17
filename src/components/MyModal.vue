<template>
    <!-- Some static text for testing --> 
  
    <!-- Display the current state of dialog for debugging
    {{ dialog }} -->
  
    <!-- Dialog component -->
    <v-dialog v-model="computedVisible" width="auto">
      
      <!-- <v-card max-width="400" :prepend-icon="icone" :text="message" :title="titulo">
        <template v-slot:actions>
          <v-btn class="ms-auto" 
                 text 
                 @click="onCloseModal"
                 :color="cor"
                 variant="tonal"> Ok </v-btn>
        </template>
      </v-card>-->

      <v-card class="mx-auto my-8" elevation="16" max-width="400" >
          <v-card-item>
              <div class="alinha-horizontal">
                <v-icon :icon="icone"></v-icon> 
                <v-card-title :class="estiloTitulo" > {{ titulo }} </v-card-title>
              </div>
          </v-card-item>
          <v-card-text> 
              {{ message }}
          </v-card-text>
          <v-btn class="ms-auto mb-3 mr-3" 
                 text 
                 @click="onCloseModal"
                 :color="cor"
                 variant="tonal"> Ok </v-btn>
    </v-card>

    </v-dialog>
  </template>
  
  <script>
  /* eslint-disable */
  
  export default {
    name: 'MyModal',
    props: {
      message: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      },
      /** error, warning, sucess */
      typeMessage:  {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dialog: this.visible,
        icone:"mdi-update",
        titulo:"",
        cor:'',
        estiloTitulo:''
      };
    },
    methods: {
      onCloseModal() {
        this.$emit('update:visible', false);
        this.$emit('on-close-modal');
      },
      onAcceptModal() {
        this.$emit('on-accept-modal');
      },
      onRejectModal() {
        this.$emit('on-reject-modal');
      },
      onConfirmModal() {
        this.$emit('on-confirm-modal');
      }
    },
    computed: {
      computedVisible: {
        get() {
          return this.visible;
        },
        set(value) {
          this.$emit('update:visible', value);
        }
      }
    },
    watch: {
      visible(newValue) {
        this.dialog = newValue;
      },
      typeMessage( newValue )   {

          switch( newValue )  {
              case 'warning':
                    // alert("warning!!");
                    this.titulo = "Atenção";
                    this.icone = 'mdi-alert';
                    this.cor = "orange";
                    this.estiloTitulo = "titulo-warning"
                    break;
                    
              case 'error':
                    //alert("err!!");
                    this.titulo = "Erro";
                    this.icone = 'mdi-alert-remove';
                    this.cor = "red";
                    this.estiloTitulo = "titulo-error"
                    break;      
              
              case 'success':
                    //alert("sucesso!!");
                    this.titulo = "Sucesso!";
                    this.icone = 'mdi-check-circle';
                    this.cor = "green";
                    this.estiloTitulo = "titulo-success"
                    break;
          }

      },
      dialog(newValue) {
        if (newValue !== this.visible) {
            this.$emit('update:visible', newValue);
        }
      }
    }
  };
  </script>

<style>
.v-dialog--active {
  position: fixed; /* Ensures it stays in a fixed position relative to the viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999; /* Adjust the z-index as needed, ensure it's higher than other elements */
}

.titulo-success {
  color: rgb(3, 134, 3);
  font-size:18px;
}

.titulo-warning {
  color: rgb(231, 151, 2);
  font-size: 18px;
}

.titulo-error {
  color: rgb(226, 89, 89);
  font-size: 18px;
}

.alinha-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
  