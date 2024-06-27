<template>
    
    <v-container style="background-color: #DCEDC8;" >
    <label><b>  Minha Conta  </b></label>

    <!-- formValido? {{  formValido  }} -->

    DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
    email {{ DADOS_USUARIO.email }}
    senha {{ SENHA }}

    <v-form class="mt-5" v-model="this.formValido" style="background-color: #DCEDC8" ref="form">

          <v-row>
            <v-col cols="12" md="4" >
            <v-text-field
                  v-model="DADOS_USUARIO.email"
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
                  :readonly="true"
                ></v-text-field>
              </v-col>

            <v-col cols="12" md="4" >
                <v-text-field
                    v-model="SENHA" 
                    :append-inner-icon="senhaVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="senhaVisible ? 'text' : 'password'"
                    density="comfortable"
                    bg-color="white"
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
                  :rules="telefoneRules"
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
             <v-autocomplete
               bg-color="white"
               v-model="this.dadosMinhaConta.dadosUsuario.municipio"
               variant="outlined"
               density="comfortable"
               required
               label="Município" 
             ></v-autocomplete>
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
                <MyDataInput label="Data de nascimento*" v-bind:value="this.dadosMinhaConta.dadosUsuario.dataNascimento" />
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
                  :rules="celularRules"
                  prepend-inner-icon="mdi-cellphone-basic"
                  hint="Informe celular"
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
                    prepend-inner-icon="mdi-calendar-month"
                    hint="Informe ano de concliusão"
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
                      :rules="instituicaoRules"
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


              <v-col cols="12" md="4"> 
              <!-- NOTA!! NOTA!! hide-details: esconde o detalhe de validação do Campo !!!!  -->
               <v-combobox
                  v-model="this.dadosMinhaConta.dadosProfissionais.abordagens"
                  :items="this.abordagensItems" 
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
                    label="Valor da consulta*"
                    bg-color="white"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
              </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4"></v-col>
            <v-col cols="12" md="4">
                <v-btn
                  style="width:10px"
                  size="large"
                  color="secondary"
                  append-icon="mdi-database-arrow-up"
                  block
                  @click="cadastrar()"
                >
                Cadastrar Profissional
              </v-btn>
              <v-col cols="12" md="4"></v-col>
            </v-col>
          </v-row>

  </v-form>
  </v-container>
</template>
<script>
/* eslint-disable */
import MyDataInput  from '@/components/MyDataInput.vue'
import Usuario      from '@/controllers/Usuario.js'; 
import ListasMixin  from '@/utils/ListasMixin.js';
import MinhaConta   from '@/controllers/MinhaConta.js'; 

const usuario = new Usuario();
const minhaConta = new MinhaConta();

  export default {
    mixins: [ListasMixin],
       
      name:'MinhaContaPage',
      components: {
        MyDataInput
      },
      data: () => ({ 
          dadosMinhaConta: minhaConta.getDadosMinhaConta(), 
          minhaConta,
          formValido: false,
          senhaVisible: false,
          dadosUsuario: usuario.getDadosUsuario(),
          usuario,
         
          dadosMinhaConta :  
          {
              dadosUsuario : {
                  telefone: "",
                  celular: "",
                  municipio: "",
                  uf: "",
                  dataNascimento: "01-01-2024",
                  genero: ""
              },
              dadosProfissionais : {
                    instituicao : null,
                    curso		  : "",
                    anoConclusao : "",
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
    computed:               {  
       
        DADOS_USUARIO()   {
          return this.$store.state.user;
        },
        SENHA() {
          return atob( this.$store.state.user.senha );
        }
    },
    methods:                    {
        async validate ()     { 
          const { valid } = await this.$refs.form.validate()

          if ( valid )        {
              this.loginAPI();
              //alert('Form is valid');
          }  
        },
        cadastrar()             {
          // setTimeout( this.sendDataAPI, 50 );
          this.sendDataAPI();
        },
        sendDataAPI()           { 

              this.dadosMinhaConta.dadosUsuario.nome    = this.DADOS_USUARIO.nome;
              this.dadosMinhaConta.dadosUsuario.email   = this.DADOS_USUARIO.email;
              this.dadosMinhaConta.dadosUsuario.senha   = this.DADOS_USUARIO.senha;
              this.dadosMinhaConta.dadosUsuario.crm_crp = this.DADOS_USUARIO.crm_crp;
              this.dadosMinhaConta.dadosUsuario.dataRegistro = this.DADOS_USUARIO.dataRegistro;
              console.log( "*** DADOS USUARIO RENOVADOS? " + JSON.stringify( this.dadosMinhaConta.dadosUsuario ) );

              this.minhaConta.setDadosMinhaConta(  this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais );
              this.minhaConta.cadastrarMinhaConta( this.dadosMinhaConta.dadosUsuario , this.dadosMinhaConta.dadosProfissionais ).then(response => {
                  console.log('Cadastro Prontuário Response:', response);
                  alert( response.code + " ||| " + response.message );


                  // alert( response.code + " ||| " + response.message );
                  if ( response.code == 0 )      {
                      // this.$bus.emit('showModal', response.message );
                      this.$bus.emit('showModal', { message: response.message, msgType: "success"} );

                  } else if ( response.code == 99 )  {
                      // this.$bus.emit('showModal', response.message );
                      this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
                  } 
                  if ( response.includes("SQL") && response.includes("Duplicate entry") )  { 
                       if ( response.includes("for key 'profissional") )
                            this.$bus.emit('showModal', { message: "Dados profissionais já cadastrados na base de dados. Entrar em contato com o suporte Psibetter.", msgType: "error"} );
                  }
  
              }).catch(error => {
                console.error('Error creating user:', error);
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
 </style>
 