<template> 


    <div class="margin-top-login"> 
    
        <v-card
           class="mx-auto pa-6 pb-6"
           elevation="8" 
           rounded="lg"
           max-height="670px"
           :max-width="this.CARD_MAX_WIDTH"
        >
        
        <h3 class="mb-5"> Redefinição de Senha </h3>
        <!-- -- -->
    
        <!-- NOTA!! NOTA!! fast-fail : validation will short-circuit after the first invalid input is found. --> 
        <v-form fast-fail v-model="valid" style="background-color: #f3f5f0" ref="form">
            <v-container>
              <!-- ############################ LINHA 1 ###########################-->
                
              <!-- ============== CAMPO EMAIL ============== --> 
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-inner-icon="mdi-email"
                  hint="Informe Email"
                  max-width="400px"
                  :counter="8"
                  label="E-mail para redefinição de senha"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>


                <v-card
        class="mb-8"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Atenção: Enviaremos um email com um link para redefinição de sua senha.
        </v-card-text>
      </v-card>
    
              <div class="d-flex flex-column">
                <v-btn
                    class="mt-2"
                    color="blue"
                    size="large"
                    variant="tonal"
                    block
                    @click="validate"
                    max-width="400px"
                    >
                Enviar
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
       import axios from 'axios';
       export default {
          props: 
          {
                 
          }, 
          name:'NovaSenhaPage',
          data: () => ({
            emailHtmlTemplate: '',
            valid: false,
            nome: '',
            nomeRules: [
              value => {
                if (value) return true
    
                return 'Nome é obrigatório'
              },
              value => {
                if (value?.length <= 50) return true
    
                return 'Nome deve conter no máximo 40 caracteres'
              },
            ],
            perfilUsuario: '',
            perfislUsuario: [ 'Médico(a)', 'Psicólogo(a)', 'Rede de Apoio', 'Outro' ],
            perfilUsuarioRules: [
              value => {
                if (value) return true
                return 'Perfil de usuário é obrigatório'
              },
            ],
            docRegistro: null,
            docRegistroRules: [
              value => {
                if (value) return true
                return 'CRM/CRP é obrigatório'
              },
            ],
            senha: '',
            senhaVisivel: false,
            senhaConfirma: '',
            senhaRules: [
                value => {
                if (value) return true
                    return 'Senha é obrigatório.'
                }, 
            ],
            email: '',
            emailRules: [
                value => {
                if (value) return true
    
                return 'E-mail é obrigatório.'
                },
                value => {
                if (/.+@.+\..+/.test(value)) return true
    
                return 'E-mail inválido.'
                },
            ], 
            
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
        created()  {

         /* fetch('http://localhost:8080/psibetter/templates/email_template.html')
              .then(response => response.text())
              .then(html => {
                  this.emailHtmlTemplate = html;
                  console.log('Template loaded and stored in variable:', html);
              })
              .catch(error => console.error('Error fetching template:', error));
              */

        },
        methods: {
          async validate () {
              const { valid } = await this.$refs.form.validate()
    
              if (valid) {  
                  this.sendEmailAPI();
              }
          },
          async sendEmailAPI()    {

                var sendData = {
                    destino: this.email,
                    assunto: "Redefina sua senha (Psibetter) | 2023",
                    corpo: 
                    ` <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 10px; max-width: 600px; margin: auto;">
                          <h2 style="color: #333;">Redefina sua Senha</h2>
                          <p style="font-size: 16px; color: #555; line-height: 1.5;">
                              <b>Acesse o seguinte link para redefinição de senha:</b>
                          </p>
                          <div style="background-color: #e0ffe0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: 20px 0;">
                              <p style="margin: 0;">
                                  <a href="http://paivaservices.com/psibetter/redefine-senha.html?data=${encodeURIComponent(this.email)}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold; font-size: 18px;">
                                      Redefinir Senha
                                  </a>
                              </p>
                          </div>
                          <p style="font-size: 14px; color: #888;">
                              Se você não solicitou esta alteração, ignore este e-mail.
                          </p>
                      </div>
                  `,
                }; 
              // ------------ axios.post( this.$SERVICES_ENDPOINT_URL , sendData ) ------------ 
              // axios.post( 'http://localhost/psibetter_backend/mailsender-api.php', sendData )
              axios.post( 'http://184.72.238.232/psibetter/psibetter_backend/mailsender-api.php', sendData )
                    .then( response => {
                            console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                            var responseData = response.data;

                            if ( responseData.code == '99' )      {
                                //this.$bus.emit('showModal', "Erro ao enviar email: Entre em contato com nossa equipe." );
                                this.$bus.emit('showModal', { message: "Erro ao enviar email: Entre em contato com nossa equipe." , msgType: "warning"} );
                            }   else   {
                                //this.$bus.emit('showModal', "Email enviado com sucesso. Confira sua caixa de entrada e spans." );
                                this.$bus.emit('showModal', { message: "Email enviado com sucesso. Confira sua caixa de entrada e spans.", msgType: "success"} );

                            }
                    })
                    .catch(error => {
                          this.error = error.message;
                    });
              }, 
 
          }, 
          
       }
       </script>
     
     <style> 
     .margin-top-login {
          margin-top: 5%;
          margin-bottom: 5%;
        }
      @media ( max-width: 768px )   
      {
        .margin-top-login {
          margin-top: 30%;
        }
      }
     </style>
     