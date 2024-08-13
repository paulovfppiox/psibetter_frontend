<template>
    
    <v-container style="background-color: #DCEDC8;" >
    
    <div class="titulo-form-container">  

        <h1 class="text-h5 text-lg-h5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
            <b> Minha Conta </b>
       </h1>  

       <!-- <label><b>  Minha Conta  </b></label> -->
       <MyChecklistIcon v-if="formValido"/>
    </div>

    <!-- formValido? {{  formValido  }} <br>
    DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
    email {{ DADOS_USUARIO.email }}
    senha {{ SENHA }} -->

    <v-form class="mt-5" v-model="this.formValido" style="background-color: #DCEDC8" ref="form">

          <v-row>
            <v-col cols="12" md="4" >
            <v-text-field
                  v-model="this.dadosMinhaConta.dadosUsuario.email"
                  :rules="emailRules"
                  prepend-inner-icon="mdi-email"
                  hint="Informe email"
                  max-width="400px"
                  :counter="8"
                  label="Email*"
                  bg-color="white"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>
              </v-col>

            <v-col cols="12" md="4" >
                <v-text-field
                    v-model="SENHA" 
                    :append-inner-icon="senhaVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="senhaVisible ? 'text' : 'password'"
                    density="comfortable"
                    bg-color="transparent"
                    placeholder="Informe sua senha"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="senhaVisible = !senhaVisible"
                    :readonly="true"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" >
              <v-text-field
                  v-model="this.dadosMinhaConta.dadosUsuario.telefone"
                  prepend-inner-icon="mdi-phone"
                  hint="Informe telefone fixo"
                  max-width="400px"
                  :counter="8"
                  label="Telefone"
                  bg-color="white"
                  variant="outlined"
                  density="comfortable"
                  required
              ></v-text-field>
            </v-col>

          </v-row>
      
          <v-row>
            
            <v-col cols="12" md="4" >

              <v-text-field
                  v-model="this.dadosMinhaConta.dadosUsuario.celular"
                  :rules="celularRules"
                  prepend-inner-icon="mdi-cellphone-basic"
                  hint="Informe celular"
                  max-width="400px"
                  :counter="8"
                  label="Celular*"
                  bg-color="white"
                  variant="outlined"
                  density="comfortable"
                  required
              ></v-text-field>

              
            </v-col>

            <v-col cols="12" md="4">
             <v-combobox
               bg-color="white"
               v-model="this.dadosMinhaConta.dadosUsuario.municipio"
               variant="outlined"
               density="comfortable"
               chips
               required
               label="Município" 
             ></v-combobox>
           </v-col>

           <v-col cols="12" md="4" >
             <v-autocomplete
               bg-color="white"
               v-model="this.dadosMinhaConta.dadosUsuario.uf"
               variant="outlined"
               :items="this.listaUFs"
               label="UF"
               density="comfortable"
               required
               :rules="UFRules"
             ></v-autocomplete>
 
           </v-col>          

            
          </v-row>

          <!--- #####################################  LINHA 2  ########################################## -->
          <v-row>
            <v-col cols="12" md="4">
                <!-- <MyDataInput label="Data de nascimento*" v-bind:value="this.dadosMinhaConta.dadosUsuario.dataNascimento" />-->
                <v-text-field
                  v-model="this.dadosMinhaConta.dadosUsuario.idade"
                  :rules="idadeRules"
                  prepend-inner-icon="mdi-history"
                  hint="Informe idade"
                  type='number'
                  max-width="400px"
                  :counter="3"
                  label="Idade*"
                  bg-color="white"
                  variant="outlined"
                  density="comfortable"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
            <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
            <v-autocomplete
                  v-model="this.dadosMinhaConta.dadosUsuario.genero"
                  :items="this.generos"
                  :rules="generoRules"
                  max-width="400px"
                  label="Gênero*"
                  bg-color="white"
                  density="comfortable"
                  placeholder="Informe gênero"
                  prepend-inner-icon="mdi-gender-male-female-variant"
                  variant="outlined"
                  required 
              ></v-autocomplete>
            </v-col>
 
          </v-row>

          <v-row>
               
              <v-divider
                :thickness="1"
                class="border-opacity-50"
              ></v-divider>
              <span class="label"> Formação e Dados Profissionais </span>
          </v-row>

          <!-- !!!!! dadosProfissionais {{ dadosMinhaConta.dadosProfissionais  }} !!!!! -->
          

            <!--- #####################################  LINHA 2  ########################################## -->
          <v-row>
              <v-col cols="12" md="4">
                <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
                <v-autocomplete
                      v-model="this.dadosMinhaConta.dadosProfissionais.instituicao"
                      :items="this.instituicaoItems"
                      :rules="instituicaoRules"
                      max-width="400px"
                      label="Instituição de Formação*"
                      bg-color="white"
                      chips
                      density="comfortable"
                      placeholder="Informe gênero"
                      prepend-inner-icon="mdi-school"
                      variant="outlined"
                      required 
                  ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4">
                <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
                  <v-text-field
                  v-model="this.dadosMinhaConta.dadosProfissionais.curso"
                  :rules="cursoRules"
                  prepend-inner-icon="mdi-cellphone-basic"
                  max-width="400px"
                  :counter="8"
                  label="Curso de Formação*"
                  bg-color="white"
                  variant="outlined"
                  density="comfortable"
                  required
              ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                    v-model="this.dadosMinhaConta.dadosProfissionais.anoConclusao"
                    :rules="anoConclusaoRules"
                    prepend-inner-icon="mdi-calendar-month"
                    type="number"
                    max-width="200px"
                    :counter="4"
                    label="Ano de conclusão"
                    bg-color="white"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
              </v-col>
          </v-row>

            <!--- #####################################  LINHA 2  ########################################## -->
            <v-row>
              <v-col cols="12" md="4">
                <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
                <v-autocomplete
                      v-model="this.dadosMinhaConta.dadosProfissionais.especialidade"
                      :items="especializacaoItems"
                      :rules="especialidadeRules"
                      max-width="400px"
                      label="Especialidade*"
                      bg-color="white"
                      density="comfortable"
                      placeholder="Especialidade*"
                      prepend-inner-icon="mdi-school"
                      variant="outlined"
                      required 
                  ></v-autocomplete>
              </v-col>
              
              <!-- abordagensPsicologia {{ JSON.stringify( abordagensPsicologia )  }} -->
              <v-col cols="12" md="4"> 
              <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
               <v-combobox
                  v-model="this.abordagensPsicologia"
                  :items="this.abordagensItems" 
                  :rules="abordagensRules"
                  prepend-inner-icon="mdi-pill-multiple"
                  label="Abordagens Psicoterápicas*"
                  bg-color="white"
                  chips
                  multiple
                  variant="outlined" 
                  density="comfortable"
                  required
                ></v-combobox>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                    v-model="this.dadosMinhaConta.dadosProfissionais.valorConsulta"
                    prepend-inner-icon="mdi-currency-usd"
                    hint="Informe ano de concliusão"
                    type="number"
                    max-width="400px"
                    :counter="8"
                    label="Valor da consulta"
                    bg-color="white"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
              </v-col>
          </v-row>
          <!-- profissionalExistente {{ profissionalExistente  }} -->

          <v-row>
            <v-col cols="12" md="4">
            </v-col>
            
            <v-col cols="12" md="4">
                <v-btn
                  v-if="(!this.profissionalExistente)"
                  style="width:10px"
                  size="large"
                  color="secondary"
                  append-icon="mdi-database-arrow-up"
                  block
                  @click="cadastrar()"
                >
                Cadastrar Dados Profissionais
              </v-btn>

              <v-btn
                    v-else
                    style="width:10px"
                    size="large"
                    color="secondary"
                    append-icon="mdi-database-arrow-up"
                    block
                    @click="atualizar()"
                  >
                  Atualizar Profissional
                </v-btn>
            </v-col>
          </v-row>

  </v-form>
  </v-container>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import MyDataInput  from '@/components/MyDataInput.vue'
import Usuario      from '@/controllers/Usuario.js'; 
import ListasMixin  from '@/utils/ListasMixin.js';
import MinhaConta   from '@/controllers/MinhaConta.js'; 
import MyChecklistIcon from '@/components/MyChecklistIcon.vue'

const usuario = new Usuario();
const minhaConta = new MinhaConta();

  export default {
    mixins: [ListasMixin],
       
      name:'MinhaContaPage',
      components: {
        MyDataInput,
        MyChecklistIcon
      },
      data: () => ({ 
          dadosMinhaConta: minhaConta.getDadosMinhaConta(), 
          minhaConta,
          formValido: false,
          senhaVisible: false,
          dadosUsuario: usuario.getDadosUsuario(),
          usuario,
         
          /** Realiza a consulta dos dados profissionas previamente cadastrados.
           * Caso existam, o botão de cadastrar não será exibido. */
          profissionalExistente: false, 

          abordagensPsicologia: [],
          dadosMinhaConta :  
          {
              dadosUsuario : {
                  telefone: "",
                  celular: "",
                  municipio: null,
                  uf: "",
                  idade: 0,
                  genero: ""
              },
              dadosProfissionais : {
                    instituicao : null,
                    curso		  : "",
                    anoConclusao : 0,
                    abordagemPsicologia1 : "",
                    abordagemPsicologia2 : "",
                    abordagemPsicologia3 : "",
                    especialidade : "",
                    valorConsulta : ""
              }
          },

          nomeRules: [
            value => {
              if (value) return true

              return 'Preencha o nome.'
            },
            value => {
              if (value?.length <= 20) return true

              return 'O nome está muito extenso'
            },
          ], 
          instituicaoRules: [
            value => {
                if (value) return true
                return 'Instituição é obrigatório.'
            },
          ],
          especialidadeRules: [
            value => {
                if (value) return true
                return 'Especialidade é obrigatório.'
            },
          ],
          abordagensRules: [
            value => {
                if (value) return true
                return 'Abordagens é obrigatório.'
            },
          ],
          generoRules:  [
            value => {
              if (value) return true
              return 'Gênero é obrigatório.'
            },
          ],
          celularRules: [
            value => {
              if (value) return true
              return 'Celular é obrigatório.'
            },
          ],
          UFRules: [
            value => {
              if (value) return true
              return 'UF é obrigatório.'
            },
          ],
          cursoRules: [
            value => {
              if (value) return true
              return 'Curso é obrigatório.'
            },
          ],
          anoConclusaoRules: [

            value => {
                if ( ( value >= 1900 ) && ( value <= 2040 ) )  {
                     return true;
                }  else  {
                   return 'Ano de conclusão inválido.'
                }
            },

          ],
          idadeRules: [
            value => {
              if (value) return true
              return 'Idade é obrigatório.'
            },
          ],
          telefoneRules: [
            value => {
              if (value) return true
              return 'Telefone é obrigatório.'
            },
          ],
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
    created()     {
      //this.sendDataAPI();
    },
    async mounted() {
      
          await this.getDadosProfissionaisAPI();
          await this.getDadosUsuarioAPI();

          /** Dessa forma funciona no primeiro acesso... qdo for montar o DOM, ele pega os dados do primeiro acesso.
          this.dadosMinhaConta.dadosUsuario.email     = this.DADOS_USUARIO.email;
          this.dadosMinhaConta.dadosUsuario.telefone  = this.DADOS_USUARIO.telefone;
          this.dadosMinhaConta.dadosUsuario.celular   = this.DADOS_USUARIO.celular;
          this.dadosMinhaConta.dadosUsuario.genero    = this.DADOS_USUARIO.genero;
          this.dadosMinhaConta.dadosUsuario.uf 		    = this.DADOS_USUARIO.uf;
          this.dadosMinhaConta.dadosUsuario.crm_crp	  = this.DADOS_USUARIO.crm_crp;
          this.dadosMinhaConta.dadosUsuario.municipio = this.DADOS_USUARIO.municipio;
          this.dadosMinhaConta.dadosUsuario.idade     = this.DADOS_USUARIO.idade; */
        
    }, 
    computed:               {  
       
        DADOS_USUARIO()   {
          return this.$store.state.user;
        },
        SENHA() {
          return atob( this.$store.state.user.senha );
        }
    },
    methods:                    {
        
        async cadastrar()           {
          // setTimeout( this.sendDataAPI, 50 );
          const { valid } = await this.$refs.form.validate();
          if (valid) 
              this.cadastrarMinhaContaAPI();
          else
              this.$bus.emit('showModal', { message: 'Preencha todos os campos obrigatórios.', msgType: "warning"} );

        },
        atualizar()           {
          this.atualizarMinhaContaAPI();
        },
        async getDadosProfissionaisAPI()         {
   
            var sendData = {
                data:  {
                    entity: 'profissional',
                    operation: 'consultar',
                    object: {
                      usuarioId: this.DADOS_USUARIO.id  
                    }
                }
            };
           console.log('-SEND DATA get Profissionais API == ' + JSON.stringify(  sendData ) );
           axios.post( this.$SERVICES_ENDPOINT_URL, sendData )
           .then( response => {
                console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                var responseData = response.data;
                
                if ( responseData.code == '0' )  { 
                     this.profissionalExistente = true;
                     // this.$bus.emit('showModal', { message: responseData.message, msgType: "success"} );
                     const dados = responseData.data;
                     //alert( "Data?" + JSON.stringify( dados ) );
                     this.dadosMinhaConta.dadosProfissionais.instituicao   = dados.instituicao;
                     this.dadosMinhaConta.dadosProfissionais.especialidade = dados.especialidade;
                     this.dadosMinhaConta.dadosProfissionais.anoConclusao  = dados.anoConclusao;
                     this.dadosMinhaConta.dadosProfissionais.valorConsulta = dados.valorConsulta;
                     this.abordagensPsicologia[0] = dados.abordagemPsicologia1;
                     this.abordagensPsicologia[1] = dados.abordagemPsicologia2;
                     this.abordagensPsicologia[2] = dados.abordagemPsicologia3;
                     this.dadosMinhaConta.dadosProfissionais.curso = dados.curso;
                      
                }  else {
                  this.profissionalExistente = false;
                    this.$bus.emit('showModal', { message: responseData.message, msgType: "warning"} );
                }  
            })
            .catch(error => {
                  this.error = error.message;
            });
        },
        async getDadosUsuarioAPI()         {
   
              var sendData = {
                    data:  {
                      entity: 'usuarios',
                      operation: 'consultar',
                      object: {
                          email: this.DADOS_USUARIO.email  
                      }
                  }
              };
              console.log('-SEND DATA Usuario == ' + JSON.stringify(  sendData ) );
              axios.post( this.$SERVICES_ENDPOINT_URL, sendData )
              .then( response => {
                    console.log('-Response DATA == ' + JSON.stringify( response.data ) );
                    var responseData = response.data;
                    
                    if ( responseData.code == '0' )  {  
                          // this.$bus.emit('showModal', { message: responseData.message, msgType: "success"} );
                          const dados = responseData.data;
                          //alert( "Data?" + JSON.stringify( dados ) ); 
                          this.dadosMinhaConta.dadosUsuario.email     = dados.email;
                          this.dadosMinhaConta.dadosUsuario.telefone  = dados.telefone;
                          this.dadosMinhaConta.dadosUsuario.celular   = dados.celular;
                          this.dadosMinhaConta.dadosUsuario.genero    = dados.genero;
                          this.dadosMinhaConta.dadosUsuario.uf 		    = dados.uf;
                          this.dadosMinhaConta.dadosUsuario.crm_crp	  = dados.crm_crp;
                          this.dadosMinhaConta.dadosUsuario.municipio = dados.municipio;
                          this.dadosMinhaConta.dadosUsuario.idade     = dados.idade;
                          
                    }  else   { 
                        this.$bus.emit('showModal', { message: responseData.message, msgType: "warning"} );
                    }  
              })
              .catch(error => {
                    this.error = error.message;
              });
        },
        cadastrarMinhaContaAPI()                   { 

              // alert( "-Form valido?!" + this.formValido );
              if ( this.formValido !== true )  {
                   this.$bus.emit('showModal', { message: "Preencha todos os campos obrigatórios", msgType: "warning"} );
                   return;
              }

              /**1) No primeiro acesso (para realizar o cadastro iniciais das infos faltantes), é preciso carregar 
               * do banco os dados principais. */
              this.dadosMinhaConta.dadosUsuario.nome    = this.DADOS_USUARIO.nome;
              this.dadosMinhaConta.dadosUsuario.email   = this.DADOS_USUARIO.email;
              this.dadosMinhaConta.dadosUsuario.senha   = this.DADOS_USUARIO.senha;
              this.dadosMinhaConta.dadosUsuario.crm_crp = this.DADOS_USUARIO.crm_crp;
              this.dadosMinhaConta.dadosUsuario.dataRegistro = this.DADOS_USUARIO.dataRegistro;
              //console.log( "*** DADOS USUARIO RENOVADOS? " + JSON.stringify( this.dadosMinhaConta.dadosUsuario ) );
              

              // ************** VALIDAÇÕES *******************
              var consulta = this.dadosMinhaConta.dadosProfissionais.valorConsulta;
              //this.dadosMinhaConta.dadosProfissionais.anoConclusao
              //alert( "Valor? " + consulta );
              if ( ( consulta == null ) || ( consulta == '' ) ) {
                     this.dadosMinhaConta.dadosProfissionais.valorConsulta = "0";
              }

              this.minhaConta.setDadosMinhaConta(  this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais );
              this.minhaConta.cadastrarMinhaConta( this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais ).
              then(response => {
                  console.log('Cadastro Minha conta Response:', response);
                  // alert( response.code + " ||| " + response.message );

                  // alert("DADOS USER? " + JSON.stringify( this.dadosMinhaConta.dadosUsuario ));

                  // alert( response.code + " ||| " + response.message );
                  if ( response.code == 0 )      {
                      // this.$bus.emit('showModal', response.message );
                      this.$store.commit( 'setUser', this.dadosMinhaConta.dadosUsuario );
                      /* localStorage.setItem('minhaContaOk', true );*/
                      this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                      return;

                  } else if ( response.code == 99 )  {
                      // this.$bus.emit('showModal', response.message );
                      this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
                      return;
                  } 

                  if ( response.includes("SQL") && response.includes("Duplicate entry") )  { 
                       if ( response.includes("for key 'profissional") )
                            this.$bus.emit('showModal', { message: "Dados profissionais já cadastrados na base de dados. Entrar em contato com o suporte Psibetter.", msgType: "error"} );
                       else
                            this.$bus.emit('showModal', { message: "Entrada duplicada em base de dados, para campo único. Entrar em contato com o suporte Psibetter.", msgType: "error"} );     
                  }
                  
  
              }).catch(error => {
                console.error('Error creating user:', error);
              });
        },
        atualizarMinhaContaAPI()               { 

                // Para realizar corretamente a requisição de update, precisa do ID.
                this.dadosMinhaConta.dadosUsuario.nome    = this.DADOS_USUARIO.nome;
                /* this.dadosMinhaConta.dadosUsuario.email   = this.DADOS_USUARIO.email;*/
                this.dadosMinhaConta.dadosUsuario.senha   = this.DADOS_USUARIO.senha;
                // this.dadosMinhaConta.dadosUsuario.idade   = this.DADOS_USUARIO.idade;
                this.dadosMinhaConta.dadosUsuario.crm_crp = this.DADOS_USUARIO.crm_crp;
                this.dadosMinhaConta.dadosUsuario.id = this.DADOS_USUARIO.id;

                //console.log( "*** DADOS USUARIO RENOVADOS? " + JSON.stringify( this.dadosMinhaConta.dadosUsuario ) );

              /**2) Para atualizar é preciso carregar dos campos digitados do formulário, para que no próximo acesso na mesma sessão, 
                 * estes novos dados sejam carregados.*/ 
                const dadosUser = {
                      id : this.DADOS_USUARIO.id,
                      nome: this.dadosMinhaConta.dadosUsuario.nome,
                      email: this.dadosMinhaConta.dadosUsuario.email,
                      genero: this.dadosMinhaConta.dadosUsuario.genero,
                      senha: this.dadosMinhaConta.dadosUsuario.senha,
                      /*tipo: null,
                      crm_crp: null,*/
                      uf: this.dadosMinhaConta.dadosUsuario.uf,
                      celular: this.dadosMinhaConta.dadosUsuario.celular,
                      telefone: this.dadosMinhaConta.dadosUsuario.telefone,
                      instituicao		: this.dadosMinhaConta.dadosProfissionais.instituicao,  
                      curso		  		: this.dadosMinhaConta.dadosProfissionais.curso,  
                      anoConclusao 	: this.dadosMinhaConta.dadosProfissionais.anoConclusao,  
                      abordagemPsicologia1 : this.abordagensPsicologia[0],  
                      abordagemPsicologia2 : this.abordagensPsicologia[1],   
                      abordagemPsicologia3 : this.abordagensPsicologia[2],   
                      especialidade : this.dadosMinhaConta.dadosProfissionais.especialidade,  
                      valorConsulta : this.dadosMinhaConta.dadosProfissionais.valorConsulta  
                }
                this.dadosMinhaConta.dadosProfissionais.abordagemPsicologia1 = this.abordagensPsicologia[0];
                this.dadosMinhaConta.dadosProfissionais.abordagemPsicologia2 = this.abordagensPsicologia[1];
                this.dadosMinhaConta.dadosProfissionais.abordagemPsicologia3 = this.abordagensPsicologia[2];
                

                this.minhaConta.setDadosMinhaConta(  this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais );
                this.minhaConta.atualizarMinhaConta( this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais ).then(response => {
                     console.log('Cadastro Minha Conta Response:', response);
                     
                     /* alert( response.code + " ||| " + response.message );
                     alert( JSON.stringify( this.abordagensPsicologia ) );*/

                     
                     // alert( response.code + " ||| " + response.message );
                     if ( response.code == 0 )      {
                          // this.$bus.emit('showModal', response.message );
                          // Atualiza no STORE
                          
                          this.$store.commit( 'setUser', dadosUser );
                          const flag = true;
                          localStorage.setItem('minhaContaOk', flag );
                          this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                          // this.$router.push({ path: '/home', replace:true  });
                          return;

                     } else if ( response.code == 99 )  {
                            // this.$bus.emit('showModal', response.message );
                            this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
                            return;
                     } 
                     if ( ( typeof response ) == "string" ) {
                        if ( response.includes("SQL") && response.includes("Duplicate entry") )  { 
                              if ( response.includes("for key 'profissional") )
                                  this.$bus.emit('showModal', { message: "Dados profissionais já cadastrados na base de dados. Entrar em contato com o suporte Psibetter.", msgType: "error"} );
                        }
                     }

          }).catch(error => {
            console.error('Error atualizando minha conta:', error);
          });
        },
     }
   }
</script>
 
<style scoped> 
.divider-label {
    display: flex;
    align-items: center;
}

.label {
    margin: 8px;
    white-space: nowrap;
    color:gray;
    font-size: 15px;
}
.titulo-form-container {
    display: flex;
    align-items: center; /* Center vertically align */
    justify-content: center; /* Center horizontally */
    text-align: center; /* Center text inside label */
  }

  .titulo-form-container  label {
    font-weight: bold;
    margin-right: 10px; /* Adjust spacing between elements */
  }
 </style>
 