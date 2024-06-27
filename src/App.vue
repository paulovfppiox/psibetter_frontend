<template>
 
  
  <v-app id="inspire" style="background-color:lightgreen"> 
  <!-- <v-app id="inspire" class="app-background" style="background-color:lightgreen">
    overlayOn {{ overlayOn }}
    loadingOn {{ loadingOn }} -->
    
     
    <!-- <MyLoadingOverlay :loading-on="loadingOn"   />  
    <MyLoadingOverlay :overlay-on="true" :loading-on="true"  :loading-time="500" /> 
    -->
    <MyModal id="myModal" 
           :message="appModalMessage"
           :visible="appModalIsVisible" 
           :typeMessage="appModalTypeMessage"
           @on-close-modal="handleCloseModal()"
           @on-accept-modal="handleAcceptModal()"
           @on-reject-modal="handleRejectModal()"
           @on-confirm-modal="handleConfirmModal()">
    </MyModal>

    <v-main>
          <MenuBar v-if="this.USUARIO_AUTENTICADO"/>
          <MyConectionTime />
          <RouterView /> 
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */ 
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import MenuBar from './components/MenuBar.vue'
import MyConectionTime from './components/MyConectionTime.vue'
import MyModal from './components/MyModal.vue'
import MyLoadingOverlay from './components/MyLoadingOverlay.vue'
import LoginPage from './pages/LoginPage.vue'
import RegistroUsuarioPage from './pages/RegistroUsuarioPage.vue'
import UtilsMixin   from '@/utils/UtilsMixin.js';
 
export default {
  mixins: [UtilsMixin],
  name: 'App',
  components: {
    MenuBar,
    useRoute,
    useRouter,
    MyConectionTime,
    LoginPage,
    MyModal,
    RegistroUsuarioPage,
    MyLoadingOverlay
  },
   
  data()            {
        return {
          appModalIsVisible: false,
          appModalMessage: "Página não autorizada. Acesso restrito.",
          appModalTypeMessage: 'warning', /* warning, error, success */
          dialog: true,

          overlayOn: false,
          loadingOn: false,
          loadingTime: 500
        }
  },
  computed: {

      DADOS_USUARIO() 
      {
        return this.$store.state.user;
      },
      USUARIO_AUTENTICADO() 
      {
          return this.$store.state.isUsuAutenticado;
      }, 
      PATH_ATUAL()
      {
          return this.$route.name;
      },
      IS_REGISTRAR_USUARIO()
      {
        return ( ( this.PATH_ATUAL == 'registro-usuario' ) && ( !this.USUARIO_AUTENTICADO  ) );
      }, 
  }, 
  updated() 	                {
     console.log("Ok updated!!");
  },
  created()             {
  },
  mounted()                   { 
 
        /** --------- show modal - show modal - show modal - show modal --------- */
        /** --------- show modal - show modal - show modal - show modal --------- */
        /** --------- show modal - show modal - show modal - show modal --------- */
        /** --------- show modal - show modal - show modal - show modal --------- */
        this.$bus.on('showModal', ( msgParams  ) => {
            // alert('data?! ' + JSON.stringify( msgParams ) + "|| " + msgParams.message + " || " + msgParams.msgType );
            this.appModalIsVisible = true;
            this.appModalMessage = msgParams.message;
            this.appModalTypeMessage = msgParams.msgType;

            // alert( "-show? " + this.appModalIsVisible );
        })

        /** loadingTime: 500, overlayOn:true, loadginOn: */
        this.$bus.on('showLoadingOverlay', ( loadingOn  ) => { 
            this.loadingOn = loadingOn;  
        })

        if ( !this.USUARIO_AUTENTICADO ) 
        {     
             if ( (  this.PATH_ATUAL != "registro-usuario" ) || (  this.PATH_ATUAL == undefined ) )  { 
                   // alert("indo login");
                   this.$router.push({ path: '/login', replace:true  });
             } 
             if ( this.IS_REGISTRAR_USUARIO )  { 
                  this.$router.push({ path: '/registro-usuario', replace:true  });
             }
       }
   },
   
   methods: {
      checaAutenticacao() 
      {
          alert("* Autenticou ?!?! ");
      }, 
      handleConfirmModal()    {
          alert("--")
      },
      handleCloseModal()      {
           this.appModalIsVisible = false;
           // console.log( "-show? " + this.appModalIsVisible );
           // alert("*** FECHOU O MODAL !!! ");
           this.$bus.emit('closeModal');
      },
   }, 
        
   
}
</script> 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

.app-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-image: url(https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg); */
  background-image: url("@/assets/img/psicologia2.png");
  background-size: cover;
  background-position: center center;
  z-index: -1; /* Place the background behind other content */
}
</style>


