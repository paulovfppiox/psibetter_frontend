<template>

      <!-- ########################  MODAL ############################## -->
      <v-dialog v-model="modalRemoveVisivel" max-width="500">
      <v-card>
            <v-card-title>
            Confirmar Ação
            </v-card-title>
            <v-card-text>
            Tem certeza que deseja executar esta ação?
            </v-card-text>
            <v-card-actions>
            <v-btn color="red darken-1" text @click="modalRemoveVisivel = false">
            Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="confirmarRemocao">
            Confirmar
            </v-btn>
            </v-card-actions>
      </v-card>
      </v-dialog>
      <!-- ########################  MODAL ############################## -->


      <!-- dadosUsuario?!?!  {{  JSON.stringify( dadosUsuario ) }} 
      modoEdicao ?!?!  {{  modoEdicao  }}     <br>
      idUsuario        {{  idUsuario  }}      <br>
      isEdicaoOn       {{ isEdicaoOn }}       <br>
      shareDataUsuario {{ shareDataUsuario }} <br>-->

      <div class="centralizaToogle">
          <v-switch
              :model-value="this.isEdicaoOn" color="primary" label="Habilitar Edição" 
              @change="this.isEdicaoOn = !this.isEdicaoOn"
            ></v-switch>
      </div>

      <AppFormUsuario       :modoEdicao="this.modoEdicao" :share-data="this.shareDataUsuario"/>
      <AppFormDadosClinicos :modoEdicao="this.modoEdicao" :share-data="this.shareDataUsuario"/>

      <v-container>
    <v-row>
    <v-col cols="12">
      <v-btn
        color="secondary"
        size="large"
        append-icon="mdi-database-arrow-up"
        class="custom-btn mb-4"
        @click="atualizar()"
      >
        Atualizar Paciente
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-btn
        class="custom-btn"
        color="red"
        variant="error"
        size="large"
        append-icon="mdi-delete-forever"
        @click="remover()"
      >
        Remover Paciente
      </v-btn>
    </v-col>
  </v-row>
</v-container>     
</template>

<script>
/* eslint-disable */
import AppFormUsuario from '@/components/AppFormUsuario';
import AppFormDadosClinicos from '@/components/AppFormDadosClinicos';
import Prontuario from '@/controllers/Prontuario.js'; 
 
const prontuario = new Prontuario();

export default                
{
  name: 'ConsultaProntuarioPage',
  components:            { 
    AppFormUsuario,
    AppFormDadosClinicos
  },
  data() {
    return {
        idUsuario: null,
        dadosUsuario: null,
        modoEdicao: '',
        isEdicaoOn: false,
        modalRemoveVisivel: false,

        /** Controles do compartilhamento dos dados dos componentes filhos via bus.event() */
        shareDataUsuario: null,
        shareDataClinicos: false,
        dadosProntuario: prontuario.getDadosProntuario(), 
        prontuario,

        /** Armazenam o formValido de cada formulario (Dados Usuario + Clínicos). A API de cadastro
        apenas será chamada, quando os dois valores 'true'. ***/
        formsValidos: [ false, false ],
    };
  },
  methods: {
    onCloseModal() { 
    }, 
  }, 
 /***********  beforeMount()  { 
        Função disparada em AppFormUsuario.  
        this.$bus.on('busShareUsuarioObj', ( usuarioObj ) => {
              console.log( "Antes Dados Usuario? " + JSON.stringify( usuarioObj ));
              this.dadosUsuario = usuarioObj; 
              console.log( "Depois Dados Usuario? " + JSON.stringify( this.dadosUsuario ));
        });
  },********/
  async beforeMount() {
       
        this.modoEdicao = "LEITURA";

           // Definido no clique do componente MyPacientesTable.vue
           let  storedData = localStorage.getItem('usuarioObj');  
           if ( storedData )             {
                storedData = JSON.parse( storedData );
                // console.log( "Dados retornados?!?! " + storedData );
                // alert( "-- ID user ?!?!" + storedData.id );
                this.idUsuario = storedData.id;
            }
       
  },
  mounted()  {
        this.modoEdicao = "LEITURA";

        /*********** Função disparada em AppFormUsuario.  ********/
        this.$bus.on('busFormUsuarioDados', ( dadosUsuario ) => {
              
              // console.log( "3- mounted->ConsultaProntuarioPage || on 'busFormUsuarioDados' -->> Dados Usuario? " + JSON.stringify( dadosUsuario ));

              // Caso dados recebidos sejam válidos ( diferente de válidos )
              if ( ( dadosUsuario != null ) && ( dadosUsuario != false ) )  {
                     this.formsValidos[ 0 ] = true;
                     this.dadosProntuario.dadosUsuario = dadosUsuario;
              } else {
                     this.$bus.emit('showModal', { message: "Preencha todos dados de usuário corretamente.", msgType: "warning"} );
              }
              this.shareDataUsuario = false;
              // console.log('3.1. Dados recebidos do usuario? ' + JSON.stringify( this.dadosProntuario.dadosUsuario ) );
        }),

        this.$bus.on('busFormDadosClinicos', ( dadosClinicos ) => {

                // console.log( "3- mounted->ConsultaProntuarioPage || on 'busFormDadosClinicos' -->> Dados Clínicos? " + JSON.stringify( dadosClinicos ));

                // Caso dados recebidos sejam válidos 
                if ( ( dadosClinicos != null ) && ( dadosClinicos != false ) )  {
                      this.formsValidos[ 1 ] = true;
                      this.dadosProntuario.dadosClinicos = dadosClinicos;
                } else {
                      this.$bus.emit('showModal', { message: "Preencha todos dados clínicos corretamente.", msgType: "warning"} );
                }
                this.shareDataClinicos = false;
                // console.log('3.1. Dados Clínicos recebidos? ' + JSON.stringify( this.dadosProntuario.dadosClinicos ) );
         })
  },
  methods: {  

    sendDataAPI()            {
            /**** console.log( "this.shareDataClinicos?? " + this.shareDataClinicos );
            console.log('Dados Gerais OK? ' + JSON.stringify( this.dadosProntuario ) );
            var nomeExistenteERROR = true;
            var msg = "Nome já cadastrado!";
            if ( nomeExistenteERROR ) { this.$bus.emit('showModal', msg ); }
            ****/

            // alert( "formsValidos ?? " + JSON.stringify( this.formsValidos ) );
            if ( !this.formsValidos[0] || !this.formsValidos[1] )
                  return;
            
                this.prontuario.setDadosProntuario( this.dadosProntuario.dadosUsuario , this.dadosProntuario.dadosClinicos );
                this.prontuario.atualizarProntuario( this.dadosProntuario.dadosUsuario , this.dadosProntuario.dadosClinicos ).then(response => {
                console.log('Cadastro Prontuário Response:', response);

                if ( response.code == 0 )      
                {
                     this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                     this.$bus.emit('busAjustarComboboxes', true ); 
                } else {
                      this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );

                      /** OBS: No caso de erro, os valores dos comboboxes são concatenados.
                      * Quando o formulário é preenchido e ocorre uma primeira tentativa de envio, caso haja algum erro no
                      * lado do servidor (ex: Nome ou email já existentes),
                      * em alguns dos campos, todos eles (que sejam arrays) sofrerão um join (em prontuarioModel).
                      * A partir da segunda tentativa, esses campos que deveriam ser arrays, estão como strings.
                      * Para mitigar esse problema, antes de enviar os dados, preciso chegar se trata-se de uma string 
                      * (segunda tentativa em diante). */
                      this.$bus.emit('busAjustarComboboxes', true ); 
                 }

            }).catch(error => {
              console.error('Error creating user:', error);
            });
           

        },
        atualizar()           {
 
              /* Dispara o watch do componente filho de Dados Clinicos.
              * Lá é disparado  emit com os dados preenchidos, que são capturados aqui no mount() */
              this.shareDataClinicos = true;
              this.shareDataUsuario  = true;
              
              setTimeout( this.sendDataAPI, 50 );
        },
        remover()           {
            this.modalRemoveVisivel = true;
        },
        confirmarRemocao()    {

            this.prontuario.setDadosProntuario( this.dadosProntuario.dadosUsuario , this.dadosProntuario.dadosClinicos );
            this.prontuario.removerProntuario( this.idUsuario ).then(response => {

            if ( response.code == 0 )
                 this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
            if ( response.code == 99 )
                 this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );

            // console.log('REMOCAO Prontuário Response:', response);
            }).catch(error => {
              console.error('Error creating user:', error);
            });
            this.modalRemoveVisivel = false;

            this.$router.push({ path:'/home', replace:true }); 
            
        }
  }, 
  beforeDestroy() {
      // this.$bus.off('busShareUsuarioObj', data );
  },
  watch: { 
    isEdicaoOn( value ) {
        // alert("this.isEdicaoOn MUDOU!!!!" + value );
        if ( value )
             this.modoEdicao = "EDICAO";
        else
             this.modoEdicao = "LEITURA";            
    }
  }
};
</script>

<style>
.centralizaToogle {
    display: flex;
    justify-content: center;
    align-items: center; 
}

.custom-btn {
  min-width: 100px; /* Set a minimum width to ensure button text is fully visible */
  margin: 5px; /* Adds a margin of 10 pixels */
  text-align: center; /* Center text within the button */
  white-space: nowrap; /* Prevent text wrapping */
  box-sizing: border-box; /* Include padding and border in button's total width */
}
</style>

 

