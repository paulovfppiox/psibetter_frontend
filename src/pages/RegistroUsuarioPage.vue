<template> 

<!-- VALIDO ?!?!?!? {{ valid  }}
concordoTermosDeUso {{  concordoTermosDeUso  }} -->

<div class="margin-top-login"> 

    <v-dialog v-model="modalTermosUso" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Termos de Uso Psibetter
        </v-card-title>
        <v-card-text>
          <p> Ao utilizar nosso sistema Psibetter, você concorda com os seguintes termos:</p>
          <ul>
              <li> Os dados pessoais dos pacientes são coletados e utilizados exclusivamente para fins de gerenciamento e assistência médica.</li>
              <li> Todos os dados são armazenados de forma segura e criptografada, conforme exigido pela Lei Geral de Proteção de Dados (LGPD).</li>
              <li> O acesso aos dados é restrito a profissionais de saúde autorizados e é estritamente controlado.</li>
              <li> O consentimento do paciente é requerido para a coleta e processamento de dados pessoais, podendo ser revogado a qualquer momento.</li>
              <li> Os pacientes têm direito de acessar, corrigir, atualizar e solicitar a exclusão de seus dados pessoais.</li>
              <li> Não realizamos transferência de dados pessoais para terceiros sem consentimento prévio, exceto nos casos permitidos por lei.</li>
              <li> Comprometemo-nos a cumprir integralmente as normas da LGPD e outras regulamentações aplicáveis.</li>
              <li> Para dúvidas ou informações adicionais sobre nossa política de privacidade, entre em contato conosco.</li>
          </ul>    
          <v-checkbox
             v-model="concordoTermosDeUso"
             label="Li e concordo com os Termos de Uso do Psibetter"
             value="Concordo"
           ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="concordoTermosDeUso" color="primary" @click="this.validate()">Registrar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <v-card
       class="mx-auto pa-6 pb-6"
       elevation="8" 
       rounded="lg"
       max-height="720px"
       :max-width="this.CARD_MAX_WIDTH"
    >
    
    <h3 class="mb-5"> Bem-vindo ao Psibetter® </h3>
    <!-- -- -->

    <!-- NOTA!! NOTA!! fast-fail : validation will short-circuit after the first invalid input is found. --> 
    <v-form v-model="valid" style="background-color: #f3f5f0" ref="form">
        <v-container>
          <!-- ############################ LINHA 1 ###########################-->
          <v-text-field
              v-model="dadosUsuario.nome"
              :rules="rules.nomeRules"
              prepend-inner-icon="mdi-account"
              hint="Informe seu nome completo"
              max-width="400px"
              type="text"
              :counter="50"
              label="Nome completo."
              variant="outlined"
              density="comfortable"
              bg-color="white"
              :error="this.nomeError"
              required
            ></v-text-field>
 
            <v-autocomplete
                v-model="dadosUsuario.tipo"
                :items="tiposUsuario"
                :rules="rules.tipoUsuarioRules"
                max-width="400px"
                label="Perfil de usuário."
                density="comfortable"
                placeholder="Informe sua senha"
                prepend-inner-icon="mdi-account-box"
                variant="outlined"
                bg-color="white"
                required 
            ></v-autocomplete>
            
            
            <!-- NOTA!! NOTA!! density="comfortable, compact" NOTA!! NOTA!! -->
            <v-text-field
              v-model="dadosUsuario.crm_crp"
              :rules="rules.docRegistroRules"
              type="number"
              hint="Informe CRP/CRM"
              max-width="400px"
              :counter="8"
              label="CRM/CRP"
              prepend-inner-icon="mdi-card-account-details"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              required
            ></v-text-field>

            <!-- ============== CAMPO EMAIL ==============  --> 
            <v-text-field
              v-model="dadosUsuario.email"
              :rules="rules.emailRules"
              prepend-inner-icon="mdi-email"
              hint="Informe Email"
              max-width="400px"
              :counter="8"
              label="E-mail"
              variant="outlined"
              density="comfortable"
              :error="emailError"
              bg-color="white"
              required
            ></v-text-field>

            <!-- ============== CAMPO SENHA ============== --> 
            <v-text-field
              v-model="dadosUsuario.senha" 
              :rules="rules.senhaRules"
              :append-inner-icon="senhaVisivel ? 'mdi-eye-off' : 'mdi-eye'"
              :type="senhaVisivel ? 'text' : 'password'"
              max-width="400px"
              density="compact"
              placeholder="Informe sua senha"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              @click:append-inner="senhaVisivel = !senhaVisivel"
              bg-color="white"
              required
            ></v-text-field>

            <!-- ============== CAMPO SENHA II ============== --> 
            <v-text-field
              v-model="senhaConfirma" 
              :rules="rules.senhaRules"
              :append-inner-icon="senhaVisivel ? 'mdi-eye-off' : 'mdi-eye'"
              :type="senhaVisivel ? 'text' : 'password'"
              max-width="400px"
              density="compact"
              placeholder="Informe sua senha"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              @click:append-inner="senhaVisivel = !senhaVisivel"
              bg-color="white"
              required
            ></v-text-field>
 
          <div class="d-flex flex-column">
            <v-btn
                class="mt-2"
                color="green"
                size="large"
                variant="tonal"
                block
                @click="abrirTermosDeUso()"
                max-width="400px"
                >
            Termos de Uso
            </v-btn>

            <v-btn
                class="mt-2"
                color="blue"
                size="large"
                variant="tonal"
                block
                @click="validate"
                max-width="400px"
                >
            Registrar
            </v-btn>

            <v-btn class="mt-4" color="lightskyblue" block @click="reset" >
                <v-icon icon="mdi-restore"></v-icon> 
            </v-btn>

            <v-card-text class="text-center">
                <v-btn class="text-caption text-blue text-decoration-none"  elevation="0"  to="/login" >
                  Login <v-icon icon="mdi-chevron-right"></v-icon> 
                </v-btn>
            </v-card-text>
 
        </div>
        
      </v-container>
  </v-form>

</v-card>
</div>
 
 </template>
 <script>
 /* eslint-disable */
 import axios from 'axios';
 import UtilsMixin   from '@/utils/UtilsMixin.js';
 import RulesFactory from '@/utils/RulesFactory.js';

 export default {
 mixins: [UtilsMixin],
      props: 
      {
             
      }, 
      name:'RegistroUsuarioPage',
      data: () => ({
        rules: {},
        modalTermosUso: false,
        concordoTermosDeUso: false,
        nomeError: false,
        emailError: false,
        valid: false,
        dadosUsuario: {
           nome: '',
           email: '',
           crm_crp: null,
           tipo: '',
           senha: '',
        }, 
        tiposUsuario: [ 'Médico(a)', 'Psicólogo(a)' ],
        
        senhaVisivel: false,
        senhaConfirma: '',
        
        
    }),
    computed:    {      
      CARD_MAX_WIDTH()           {
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
    created()     {
          this.loadRules();
    },
    methods: {
      async loadRules()     {
            this.rules = await RulesFactory.loadRules( this.$options.name );
      },
      async validate()      {
          const { valid } = await this.$refs.form.validate()

          if (valid)  { 
               if ( this.concordoTermosDeUso )
                    this.registrarUsuarioAPI();
               else {
                    // this.$bus.emit('showModal', "Para registrar-se é necessário concordar com os Termos de Uso." ); 
                    this.$bus.emit('showModal', { message: "Para registrar-se é necessário concordar com os Termos de Uso." , msgType: "warning"} );
               }
          } 
      },
      async registrarUsuarioAPI()         {
        
        var sendData = {
            data:  {
                entity: 'usuarios',
                operation: 'registrar',
                object: this.dadosUsuario
            }
        };
        // alert( this.dadosUsuario.tipo );

        if ( this.dadosUsuario.tipo == 'Médico(a)' )
             this.dadosUsuario.tipo = 'medico';
        if ( this.dadosUsuario.tipo == 'Psicólogo(a)' )
             this.dadosUsuario.tipo = 'psicologo';

        this.dadosUsuario.senha = this.cifraSenha( this.dadosUsuario.senha );

        // var senha = this.cifraSenha( this.formPrimeiroAcesso.senha );
        console.log('-SEND DATA AQUIII == ' + JSON.stringify(  sendData ) );
        
        // ------------ axios.post( this.$SERVICES_ENDPOINT_URL , sendData ) ------------ 
        axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
              .then( response => {
                      console.log('-Response DATA == ' + JSON.stringify( response.data ) + typeof response.data );
                      var data = response.data;

                      if ( data.code == '99' )      {
                           // this.$bus.emit('showModal', data.message ); 
                           this.$bus.emit('showModal', { message: data.message , msgType: "warning"} );
                           this.dadosUsuario.senha = '';
                           this.senhaConfirma = '';

                      }  else  {
                           this.$bus.emit('showModal', { message: data.message , msgType: "success"} );
                           this.$store.commit( 'setIsUsuRegistrado', true );
                           this.$bus.on('closeModal', () => {

                                var isUsuRegistrado = this.$store.state.isUsuRegistrado;
                                // alert("USU REGISTRADO?!? " + isUsuRegistrado );
                                if ( isUsuRegistrado )  {
                                     this.$router.push({ path: '/login', replace:true  });
                                     this.$store.commit( 'setIsUsuRegistrado', false );
                                }
                           })
                      }
              })
              .catch(error => {
                    this.error = error.message;
              });
      },
      abrirTermosDeUso()           {
          this.modalTermosUso = true;
          // return true;
      },
      reset ()                  {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      },
    },
      
   }
   </script>
 
 <style> 
 .margin-top-login {
      margin-top: 3%;
      margin-bottom: 3%;
    }
  @media ( max-width: 768px )   
  {
    .margin-top-login {
      margin-top: 30%;
    }
  }
 </style>
 