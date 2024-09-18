<template>
  
  <h1 class="text-h5 text-lg-h5 mb-5 mt-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Painéis Estatísticos </b>
  </h1>
  
  <v-card>
    <v-tabs
       v-model="tab"
       bg-color="secondary">
          <v-tab value="tab-pacientes"   variant="tonal" size="large" class="text-caption"> Painél Pacientes </v-tab>
          <v-tab value="tab-financeiro"  variant="tonal" class="text-caption"> Painél Financeiro </v-tab>
          <!-- <v-tab value="tab-consultar-pacientes"  variant="tonal" class="text-caption"> Consultar Pacientes </v-tab> -->
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="tab-pacientes">
          <iframe 
            v-if="( DADOS_USUARIO.id == 143 )"
            width="900" height="700" 
            src="https://lookerstudio.google.com/embed/reporting/1d08b51e-e501-40fb-86e3-e8476d23f71d/page/uc09D" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
          </iframe>

          <label v-else> Painél estatístico indisponível no momento. Entrar em contato com a equipe do Psibetter. </label>
                    
        </v-tabs-window-item>
        
        <v-tabs-window-item value="tab-financeiro">
          <iframe 
            v-if="( DADOS_USUARIO.id == 143 )"
            width="1100" height="700" 
            src="https://lookerstudio.google.com/embed/reporting/1d05a298-4b36-443c-9083-53b6d24cad77/page/rBVAE" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
          </iframe> 

          <label v-else> Painél estatístico indisponível no momento. Entrar em contato com a equipe do Psibetter. </label>
        </v-tabs-window-item>

 
      </v-tabs-window>
    </v-card-text>
  </v-card>

  
    

  

</template>

<script>
   

/* eslint-disable */
export default     {
  name: 'App',
  components:   { 
  },
  data() {  
    return { 
        tab: ""
    }
  },
  computed: {
      DADOS_USUARIO()  {
         return this.$store.state.user;
      }
  },
  mounted() {
   },
  methods: {  
  }
}
</script>