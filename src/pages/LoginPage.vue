<template>

<div class="margin-top-login"> 
    <v-img
      class="mx-auto my-6"
      width="150"
      :src="require('@/assets/logo.jpeg')"
    ></v-img>
    <!-- 
      <h1 style="margin-top: 20px; margin-bottom: 20px;"> {{this.$APP_NAME}}  </h1>
      -->
    
        
      <v-card
      class="mx-auto pa-10 pb-8 mb-5"
      elevation="8" 
      rounded="lg"
      max-height="460px"
      :max-width="this.CARD_MAX_WIDTH"
    >
    <v-form ref="form">
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"> 
          Nome de usuário 
      </div>

          <v-text-field
            v-model="email" 
            :rules="emailRules"
            density="compact"
            placeholder="Email ou nome de usuário"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
           Senha

           <v-btn class="text-caption text-blue text-decoration-none"  elevation="0"  to="/nova-senha" >
              Esqueceu sua senha?
           </v-btn>
      </div>

      <v-text-field
        v-model="senha" 
        :rules="senhaRules"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Informe sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-8"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Psibetter te ajuda a organizar todos atendimentos, intervenções e agenda no mesmo lugar!
        </v-card-text>
      </v-card>

      <v-btn
          class="mb-2"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="validate"
        >
        ENTRAR
      </v-btn>

      <v-card-text class="text-center">

        <v-btn class="text-caption text-blue text-decoration-none"  elevation="0"  to="/registro-usuario" >
         Cadastre-se <v-icon icon="mdi-chevron-right"></v-icon> 
        </v-btn>
      </v-card-text>

    </v-form>
  </v-card> 
 </div> 

 <!-- <MySimpleUpload></MySimpleUpload>
 <DropZoneHome></DropZoneHome> -->
</template>

<script setup> 
</script> 


<script>
const TAM_MINIMO_SENHA = 10;

  /* eslint-disable */
  import axios from 'axios';
  import UtilsMixin  from '@/utils/UtilsMixin.js'; 
    export default           {
    mixins: [UtilsMixin],
    components:         {  
    },
    data: () => ({
      selectedTime: null,

      visible: false,
      email: '',
      emailRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 40) || 'Email deve conter no máximo 40 caracteres',
      ], 
      senha: '',
      senhaRules: [
        value => ( value && value.length <= TAM_MINIMO_SENHA ) || 'Senha deve conter no mínimo 6 caracteres'
      ]
    }),  
    computed:    {       
      CARD_MAX_WIDTH()          {
          // alert( window.innerWidth  );
          var width = window.innerWidth;
          // alert( typeof width );
          if ( width < 600 )    {
               return width * 0.8 + 'px';
          }
          else if ( ( width >= 600 ) && ( width <= 960 ) )   {
              return width * 0.5 + 'px';
          }
          // > 960
          return width * 0.3 + 'px'; 
      }
    },
    mounted()   {
        /*if ( !this.USUARIO_AUTENTICADO ) 
        {    
             if ( (  this.PATH_ATUAL != "registro-usuario" ) || (  this.PATH_ATUAL == undefined )  )  { 
                   // alert("indo login");
                   this.$router.push({ path: '/servicos', replace:true  });
             } 
             if ( this.IS_REGISTRAR_USUARIO )  { 
                  this.$router.push({ path: '/registro-usuario', replace:true  });
             }
        }*/
    },
    methods:                      {
      
      handleTimeSelected( time ) 
      {
         this.selectedTime = time;
      },
      async validate ()   { 
        const { valid } = await this.$refs.form.validate()

        if ( valid )    {
             this.loginAPI();
             //alert('Form is valid');
             
        }  
      },
        
      async loginAPI()         {
  
          // var cifrada = this.cifraSenha( "PAULO PAIVA" );
          // var nome = this.decifraSenha( cifrada );

          var sendData = {
              data:  {
                  entity: 'usuarios',
                  operation: 'consultar',
                  object: {
                      email: this.email  
                  }
              }
          };
 
          // var senha = this.cifraSenha( this.formPrimeiroAcesso.senha );
          console.log('-SEND DATA AQUIII == ' + JSON.stringify(  sendData ) );

          // ------------ axios.post( this.$SERVICES_ENDPOINT_URL , sendData ) ------------ 
          axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
                .then( response => {
                        console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                        var responseData = response.data;

                        if ( responseData.code == '99' )      {
                              
                             const msgParams = {
                                  message : "Email ou senha de usuário inválido.",
                                  msgType : "warning"
                             };
                             this.$bus.emit('showModal', msgParams );
                        }   else   {
                            
                            var senhaBD = this.decifraSenha( responseData.data.senha );
                            // alert( senhaBD + " || " + this.senha );


                            var dadosUser = responseData.data;
                            console.log("-- Dados User? " + JSON.stringify( dadosUser ));

                            /*const { id, nome, email, senha, tipo, crm_crp, uf,  celular, dataRegistro, genero, telefone, anoConclusao, curso, valorConsulta, especialidade, instituicao } = responseData.data;
                            const dadosUsuario = { id, nome, email, senha, tipo, crm_crp, uf, celular, dataRegistro, genero, telefone, anoConclusao, curso, valorConsulta, especialidade, instituicao};*/
                            
                            // alert( JSON.stringify( dadosUsuario ) );
                            this.$store.commit( 'setUser', dadosUser );

                            if ( this.senha == senhaBD )  {
                                 var isAutenticado = true;
                                 this.$store.commit( 'setIsUsuAutenticado', isAutenticado );
                                 this.$router.push({ path: '/home', replace:true  });
                            } else {
                                this.$bus.emit('showModal', { message: "Email ou senha de usuário inválido.", msgType: "warning"} );
                            }
                        }
                })
                .catch(error => {
                      this.error = error.message;
                });
          },
          reset () {
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          },
      reset ()    {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>

<style>
/* @import '../styles/text-field.css'; */
 

/* 
MOBILE/TABLETS APP 
  Aplica esse CSS, até o máximo de width=750px */
@media ( max-width: 768px )   
{
    .margin-top-login {
      margin-top: 30%;
    }
}

 


</style>