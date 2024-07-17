<template>
    
    <v-container id="relatorioPDF" style="background-color: #DCEDC8;" >
    <label><b>  Fichário de Atendimento  </b></label>

    <!-- formValido? {{  formValido  }} -->

    <!-- DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
    email {{ DADOS_USUARIO.email }}
    senha {{ SENHA }} -->

    <v-form class="mt-5" v-model="this.formValido" style="background-color: #DCEDC8" ref="form">
          
            <!-- ========================== LINHA 1================================ -->
            <v-row>
            <v-col cols="12" md="6">
                <v-text-field
                  v-model="dadosFicharioAgenda.nomePaciente"
                  prepend-inner-icon="mdi-account"
                  hint="Informe seu nome completo"
                  max-width="400px"
                  :counter="100"
                  label="Nome do Paciente"
                  :bg-color="transparent"
                  variant="outlined" 
                  density="comfortable"
                  :readonly="true"
                  required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6"> 
              <v-text-field
                 v-model="dadosFicharioAgenda.dataHoraInicio"
                 prepend-inner-icon="mdi-account"
                 hint="Informe seu nome completo"
                 max-width="400px"
                 :counter="100"
                 label="Horário"
                 :bg-color="transparent"
                 variant="outlined" 
                 density="comfortable"
                 :readonly="true"
                 required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- ========================== LINHA 2 ========================== -->
          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
              v-model="dadosFicharioAgenda.motivosConsulta"
              :rules="formReadonly ? [] : motivosConsultaRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Motivos da Consulta"
              :bg-color="camposBgColor"
              rows="5"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>

            <v-col cols="12" md="6"> 
              <v-textarea
              v-model="dadosFicharioAgenda.historiaConsulta"
              :rules="formReadonly ? [] : historiaConsultaRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Registro Detalhado da Consulta*"
              :bg-color="camposBgColor"
              rows="5"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>
          </v-row>

          <!-- ============================== LINHA 3 ================================ -->
          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
              v-model="dadosFicharioAgenda.intervencoes"
              :rules="formReadonly ? [] : intervencoesRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Intervenções realizadas*"
              :bg-color="camposBgColor"
              rows="5"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>

            <v-col cols="12" md="6"> 
              <v-textarea
              v-model="dadosFicharioAgenda.planoIntervencoes"
              :rules="formReadonly ? [] : planoIntervencoesRules"
              append-inner-icon="mdi-comment"
              class="mx-2"
              label="Plano de intervenções futuras*"
              :bg-color="camposBgColor"
              rows="5"
              variant="outlined"
              :readonly="formReadonly"
              auto-grow
              shaped
              required
            ></v-textarea>
            </v-col>
          </v-row>


          <!-- ========================== LINHA 4 ============================ -->

          <v-row>
            <v-col cols="12" md="6">
                <v-combobox
                v-model="dadosFicharioAgenda.statusContulta"
                :items="statusContultaItems"
                prepend-inner-icon="mdi-list-status"
                label="Status contulta*"
                :bg-color="camposBgColor"
                chips
                variant="outlined" 
                density="comfortable"
                :readonly="formReadonly"
                required
              ></v-combobox>
            </v-col>

            <v-col cols="12" md="6"> 
                <v-btn
                    style="width:10px"
                    size="large"
                    color="secondary"
                    append-icon="mdi-database-arrow-up"
                    block
                    @click="atualizar()"
                  >
                  Registrar Consulta
                </v-btn>
            </v-col>
          </v-row>

          <AppPrintPDF raiz="relatorioPDF" btnName="Download Relatório"/> 

          

  </v-form>
  </v-container>
</template>
<script>
/* eslint-disable */ 
import AppPrintPDF  from '@/components/AppPrintPDF.vue' 
import MyDataInput  from '@/components/MyDataInput.vue' 
import ListasMixin  from '@/utils/ListasMixin.js'; 
 
import Agenda from '@/controllers/Agenda.js'; 
const agenda = new Agenda();

export default {
    mixins: [ListasMixin],
       
      name:'FicharioAtendimentos',
      components: {
        MyDataInput,
        AppPrintPDF
      },
      data: () => ({  
          dadosEvento: agenda.getDados(),
          agenda,
          formValido: false,
          senhaVisible: false, 
          camposBgColor: "white",
          statusContultaItems: [ "Em Andamento", "Realizada", "Não realizada" ],
          dadosFicharioAgenda :  
          {
             id: "",
             nomePaciente  : "",
             dataHoraInicio : "",
             dataHoraFim : "",
             profissionalId : 0,
             motivosConsulta  : "",
             historiaConsulta : "",	 
             statusContulta	 : null, 			
             intervencoes	   : "",
             planoIntervencoes : ""
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
    created()         {
         
    },
    mounted()         {
        this.$bus.on('busFormUsuarioDados', ( dadosFicharioConsulta ) => {
            alert( '[*] Dados ?!?' + JSON.stringify( dadosFicharioConsulta ) );
         })
    },
    beforeMount()     {
       
       // Definido no clique do componente MyPacientesTable.vue
       let storedData = localStorage.getItem('ficharioUsuarioObj');  
       if ( storedData )             {
            storedData = JSON.parse( storedData );
            alert("Dados retornados?!?! " + JSON.stringify( storedData ) ); 
            /** Carrega dados doa atual Fichário caso pré-salvos em Banco de Dados. */
            this.dadosFicharioAgenda.nomePaciente = storedData.nomePaciente;
            this.dadosFicharioAgenda.id = storedData.id;
            this.dadosFicharioAgenda.profissionalId = storedData.profissionalId;
            this.dadosFicharioAgenda.dataHoraInicio = storedData.dataHoraInicio;
            this.dadosFicharioAgenda.dataHoraFim = storedData.dataHoraFim;
            this.dadosFicharioAgenda.motivosConsulta   = storedData.motivosConsulta;
            this.dadosFicharioAgenda.historiaConsulta  = storedData.historiaConsulta;  
            this.dadosFicharioAgenda.statusContulta    = storedData.statusContulta;    
            this.dadosFicharioAgenda.intervencoes      = storedData.intervencoes;      
            this.dadosFicharioAgenda.planoIntervencoes = storedData.planoIntervencoes;
            
       } else {
          alert("NOT USER");
       }
    },
    async mounted()         {
        
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
        atualizar()           {
    

            // alert( JSON.stringify( this.dadosFicharioAgenda ) );

            // this.agenda.setDados( dadosEvento );
            this.agenda.atualizarFicharioAtendimento( this.dadosFicharioAgenda ).then(response => {
                // console.log('Cadastro Evento Response:', response);
                // alert( response.code + " ||| " + response.message );
                if ( response.code == 0 )      {
                     this.$bus.emit('showModal', { message: "Fichário de consulta cadastrado com sucesso!", msgType: "success"} );
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
 