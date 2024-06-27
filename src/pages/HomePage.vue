<template> 
      
        
    <v-overlay 
       v-model="overlay" 
       class="overlay-container"
       opacity="0.8"
       :persistent="true">
       
      <v-btn 
        elevation="20"
        to="/minha-conta"
        icon="mdi-account-cog" color="gray" @click="overlay=false" class="overlay-btn">
      </v-btn> 

      <!-- -- --
      <v-btn 
        elevation="20"
        to="/minha-conta"
        icon="mdi-account-cog" color="gray" @click="overlay = false"  class="overlay-btn">
      </v-btn>
      -- -- -->
    </v-overlay> 


<!-- ################################################################## -->

      <v-container>
 
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <div class="w-100"> </div>
          <div class="w-100" > 
              <h1 class="text-h6 text-lg-h5"> Bem-vindo(a) {{ this.DADOS_USUARIO.nome }} </h1> 
          </div>

          <div class="w-100">
              12/08/2022
          </div>
        </div>
      </v-container>
      
      <MyPacientesTable/>
      
      <v-container>

        <div class="d-flex flex-column flex-md-row justify-space-between">
          <div class="w-100 pa-4 ma-2 ">
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-book-clock-outline"
                  rel="noopener"
                  subtitle="Consulte sua agenda"
                  target="_blank"
                  title="Agenda de Consultas"
                  @click="showModal"
              ></v-card>
          </div>

          <div class="w-100 pa-4 ma-2 " >
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-file-document-edit"
                  rel="noopener"
                  subtitle="Organize aqui suas receitas emitidas, e lista de medicações por pacientes."
                  target="_blank"
                  title="Receituário"
                  @click="() => { 
                      // this.$router.push({ path:'/meus-pacientes', replace:true });
                  }"
              ></v-card>
          </div>
          <div class="w-100 pa-4 ma-2 " >
            <v-card
                  color="secondary"
                  append-icon="mdi-open-in-new"
                  class="mx-auto"
                  max-width="344"
                  prepend-icon="mdi-account-group"
                  rel="noopener"
                  subtitle="Acesse dados de antigos pacientes e cadastre novos."
                  target="_blank"
                  title="Meus Pacientes"
                  @click="() => {
                      this.$router.push({ path:'/meus-pacientes', replace:true });
                  }"
              ></v-card>
          </div>
        </div>
      </v-container> 



</template>

<script setup> 
</script>

<script>
/* eslint-disable */ 
  // import emitter from '../utils/eventBus';
  import MyPacientesTable from '@/components/MyPacientesTable.vue' 
  import UtilsMixin       from '@/utils/UtilsMixin.js';
  
  export default {
  mixins: [UtilsMixin],
  name: 'App',
    components: {
      MyPacientesTable
    },
    data: () => ({  
      overlay: false, 
    }),
    computed: {

      DADOS_USUARIO()  {
         return this.$store.state.user;
      }
    },
    created() {
        
        
        /** Verificar preenchimento de dados cadastrais caso profissional */
        if ( this.DADOS_USUARIO.tipo != 'paciente' )
             this.verificaCadastroIncompleto();

    },
    
    methods:    {
      showModal()  {
          // this.$bus.emit('showModal', "Área em construção" );
          this.$bus.emit('showModal', { message: "Área em construção.", msgType: "warning"} );
      },
      async verificaCadastroIncompleto()  
      {         
          //alert("Dias de Registrado: " + dias );
          
          var UF = this.DADOS_USUARIO.uf;
          var celular = this.DADOS_USUARIO.celular;

          //alert( UF + " || " + celular );

          /* Verifica se dados obrigatórios do usuário já foram atualizados*/
          if ( ( UF == null ) || ( UF == "" ) && ( celular == null ) || ( celular == "0" ) ) {

                this.overlay = true;

                var dataAtual = await this.getDataHoraAtual("data");
                //alert("DATA Atual?!? " + dataAtual + " || " + this.DADOS_USUARIO.dataRegistro );

                var dataRegistroBD;
                if ( this.DADOS_USUARIO.dataRegistro )
                    dataRegistroBD = this.DADOS_USUARIO.dataRegistro.split(" ");
                
                var dias = this.difDiasEntreDatas(  dataRegistroBD[0], dataAtual );


                if ( dias >= 20 )   {
                     this.$bus.emit('showModal', { message: "Os seus dados cadastrais estão incompletos. Para melhor interação, preencha-os na sessão 'Minha Conta' no canto direito/superior da barra de tarefas.", msgType: "warning" } );
                }
          }

      }
    }
    
  }
</script>

<style>
.overlay-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
}

.overlay-content {
  width: 80%; /* Adjust width as needed */
  display: flex;
  justify-content: flex-end;
}

.overlay-btn {
  margin-right: 40px;
  border-color: red;
  border-width: 5px;
}


</style>

