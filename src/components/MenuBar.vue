<template>

    <!-- DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
    NOME_USUARIO_PROFISSIONAL {{ JSON.stringify( NOME_USUARIO_PROFISSIONAL )  }} 
    rail {{ rail }}
    drawer {{ drawer }}-->

    <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
    <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
    <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
    <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
    <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->

    <v-dialog v-model="userImgModal" max-width="600">
    <v-card>
        <v-card-title>
            <span class="headline"> Selecione o seu avatar </span>
        </v-card-title> 

        <v-form v-model="valid" style="background-color: #f3f5f0" ref="formModal">
        <v-container>
          <!-- ############################ LINHA 1 ###########################-->
          
           <p> Avatar prévio </p>
          <v-img
            class="mx-auto my-6"
            width="150"
            height="150"
            :src="URL_IMAGEM"
          ></v-img>

          <!-- ============== CAMPO SENHA ==============  --> 
          <MySimpleUpload 
              :id-consulta="123"  >
          </MySimpleUpload>
 
        
      </v-container>
  </v-form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeModal">Fechar</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
<!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
<!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
<!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->
<!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


    <v-navigation-drawer
        style="background-color: lightgray;"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        :width="MENU_WIDTH"
      > 
        <v-list-item
          @click="onUserImageClick"
          variant="tonal"
          :prepend-avatar="require('@/assets/user.png')"
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
 
        <v-list class="fonte-menor" density="compact" nav> 
          <!-- <v-tooltip v-model="showTooltip[0]" text="Home"> -->
            <v-tooltip text="Home">
            <template v-slot:activator="{ props }">
                <v-list-item 
                  v-bind="props"
                  prepend-icon="mdi-home-city" 
                  title="Home"
                  to="/home" value="home" 
                  @click.stop="rail = !rail"> 
              </v-list-item>
              <!-- @mouseover="this.showTooltip[0] = rail" > -->
            </template>
          </v-tooltip>

           <!-- <v-tooltip v-model="showTooltip[1]" text="Meus Pacientes">-->
            <v-tooltip text="Meus Pacientes">
              <template v-slot:activator="{ props }">
                <v-list-item 
                    v-bind="props"
                    prepend-icon="mdi-account-group" 
                    title="Meus Pacientes" 
                    to="/meus-pacientes" value="users"
                    @click.stop="rail = !rail" >
                 </v-list-item>  
              </template>
          </v-tooltip>

          <!-- <v-tooltip v-model="showTooltip[2]" text="Agenda">-->
            <v-tooltip v-if="!$IS_MOBILE_APP" text="Agenda">
              <template v-slot:activator="{ props }">
                <v-list-item 
                    v-bind="props"
                    prepend-icon="mdi-calendar-month" 
                    value="account" 
                    title="Agenda" 
                    to="/agenda"
                    @click.stop="rail = !rail" >
                 </v-list-item>
                </template>
          </v-tooltip>
 
         <!--  <v-tooltip v-model="this.showTooltip[3]" text="Histórico de Consultas"> -->
          <v-tooltip text="Histórico de Consultas"> 
            <template v-slot:activator="{ props }">
                <v-list-item 
                  v-bind="props"
                  prepend-icon="mdi-chart-timeline-variant" 
                  value="account" 
                  title="Histórico de Consultas" 
                  to="/historico-consultas"
                  @click.stop="rail = !rail" >
                </v-list-item>
             </template>
          </v-tooltip>

          <v-tooltip text="Receituário"> 
            <template v-slot:activator="{ props }">
                <v-list-item 
                  v-bind="props"
                  prepend-icon="mdi-file-document-edit" 
                  value="account" 
                  title="Receituário" 
                  to="/receituario"
                  @click.stop="rail = !rail" >
                </v-list-item>
             </template>
          </v-tooltip>
    
            <v-tooltip text="Financeiro"> 
            <template v-slot:activator="{ props }">
                <v-list-item 
                  v-bind="props"
                  prepend-icon="mdi-currency-usd" 
                  value="account" 
                  title="Financeiro" 
                  to="/financeiro"
                  @click.stop="rail = !rail" >
                </v-list-item>
             </template>
          </v-tooltip>


          <v-tooltip text="Painel"> 
            <template v-slot:activator="{ props }">
                <v-list-item 
                  v-bind="props"
                  prepend-icon="mdi-monitor-dashboard" 
                  value="account" 
                  title="Painel" 
                  to="/painel"
                  @click.stop="rail = !rail" >
                </v-list-item>
             </template>
          </v-tooltip>


          <v-tooltip text="Tutoriais"> 
            <template v-slot:activator="{ props }">
                <v-list-item href="https://paivaservices.com/psibetter/tutoriais-psibetter.html" target="_blank"
                  v-bind="props"
                  prepend-icon="mdi-cast-education" 
                  value="account" 
                  title="Tutoriais" 
                  @click.stop="rail = !rail" >
                </v-list-item>
             </template>
          </v-tooltip>
            

        </v-list>
      </v-navigation-drawer>

      <!-- drawer {{ drawer }}
      rail {{ rail }} -->

    
    <v-app-bar  style="background: linear-gradient(to left, #5a9e00, #b2e48a);"> 
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
import MySimpleUpload  from '@/components/MySimpleUpload.vue'; 

// import eventBus from '@/utils/eventBus';
  export default {
    components:         { 
      MySimpleUpload,
    },
    data: () => ({ 
      drawer: true, /** Barra superior */
      rail: true,   /** Menu lateral */
      /* showTooltip: [],*/ 
      userImgModal: false,
      versionImg: 0,
    }),
    
    created()    {
      
    },
    updated() {
        this.versionImg++;
    },
    methods:        {
      logoutClick()         {
          
          var isAutenticado = false;
          this.$store.commit( 'setIsUsuAutenticado', isAutenticado );
      },
      showMsg()     {
          this.$bus.emit('showModal', { message: "Área em construção", msgType: "warning"} );
      },
      handleMouseOver() {
          // alert("** OLÁ!!! ");
      },
      onUserImageClick()    {
          
          /* if ( !this.rail )
          this.userImgModal = true;*/
      },
      closeModal()  {
          this.userImgModal = false;
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
                 return "Sr(a). " +  this.$store.state.user.nome +  " (" + 
                                     this.$store.state.user.id + ")";
            }
            return this.$store.state.user.nome;
         }, 
        URL_IMAGEM() {
            return `http://paivaservices.com/psibetter/usuarios/imagens/${this.DADOS_USUARIO.id}/foto.png?t=${this.versionImg}`;
        }
    }
  }
</script>


<style>
  .fonte-menor {
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-size: 15px;
  }

.gradiente {
  background: linear-gradient(to left, #5a9e00, #b2e48a); /* Gradient colors */
}
</style>