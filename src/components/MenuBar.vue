<template>

    <!-- DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
    NOME_USUARIO_PROFISSIONAL {{ JSON.stringify( NOME_USUARIO_PROFISSIONAL )  }} -->

    <v-navigation-drawer
        style="background-color: lightgray;"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        :width="MENU_WIDTH"
      > 
        <v-list-item
          variant="tonal"
          prepend-avatar=https://www.medguias.com.br/storage/images/announcements/xsK9jS096nlyebKWdp2UWkQQCuJ6q3c4rlDVbrG2.png
          :title="NOME_USUARIO_PROFISSIONAL"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" value="home" 
              title="Home"
              to="/home"
              @click.stop="rail = !rail"></v-list-item>

          <v-list-item prepend-icon="mdi-calendar-month" value="account" 
              title="Agenda" 
              to="/agenda"
              @click.stop="rail = !rail"></v-list-item>

          <v-list-item prepend-icon="mdi-account-group" 
              title="Meus Pacientes" 
              to="/meus-pacientes" value="users"
              @click.stop="rail = !rail"></v-list-item>

          <v-list-item prepend-icon="mdi-file-document-edit" 
              title="Receituário"  
              ></v-list-item>   
    
          <v-list-item prepend-icon="mdi-currency-usd" 
              title="Financeiro" 
              ></v-list-item>        
        </v-list>
      </v-navigation-drawer>

      <!-- drawer {{ drawer }}
      rail {{ rail }} -->

    <v-app-bar  style="background-color: lightgreen;">
      <v-app-bar-nav-icon @click="this.drawer = !this.drawer"></v-app-bar-nav-icon>

      <v-app-bar-title style="text-align: left;"> Psibetter® </v-app-bar-title>
      <v-btn icon="mdi-account-cog" to="/minha-conta"></v-btn>
      <v-btn icon="mdi-logout" @click="logoutClick" to="/login"> </v-btn>
      
    </v-app-bar>

    
</template>

<script setup>
/***
 * import { ref } from 'vue'
 * const drawer = ref(null)
 * const rail = ref(null) 
 * ***/

</script>

<script>
// import eventBus from '@/utils/eventBus';
  export default {
    data: () => ({ 
      drawer: true, /** Barra superior */
      rail: true   /** Menu lateral */
    }),
    created()    {
    },
    methods:        {
      logoutClick()         {
          
          var isAutenticado = false;
          this.$store.commit( 'setIsUsuAutenticado', isAutenticado );
      }
    },
    computed:               {  
        MENU_WIDTH()  {
            if ( this.$IS_MOBILE_APP )
                 return 200;
            return 250;    
        },
        DADOS_USUARIO() 
        {
          return this.$store.state.user;
         },
        NOME_USUARIO_PROFISSIONAL() 
        {
            if ( this.$store.state.user.tipo != "paciente" )  {
                 return "Dr(a). " +  this.$store.state.user.nome;
            }
            return this.$store.state.user.nome;
         }, 
    }
  }
</script>