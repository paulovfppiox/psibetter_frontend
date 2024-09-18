<template>
    <!-- #DCEDC8 -->
    <v-container id="relatorioPDF" >
    
    <h1 class="text-h5 text-lg-h5 mb-5 mt-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Histório de Consultas  </b>
    </h1>
    <p> Nesta página, consulte o histórico de registros de consultas realizadas por mês/ano.</p>


    <!-- 
      formValido? {{  formValido  }} 
      DADOS_USUARIO {{ JSON.stringify(DADOS_USUARIO) }}
      email {{ DADOS_USUARIO.email }}
      senha {{ SENHA }} 
      -->

        <v-form class="mt-5" v-model="this.formValido" ref="form">
          
            <!-- NOME {{ historico.nomePaciente }}
            mes {{ historico.mes  }} -->
            
          <!-- =======================  LINHA BOTÃO  ======================== -->
          <v-row>
              <v-col cols="12" md="4">
              </v-col>

              <v-col cols="12" md="4">

                <v-combobox
                    v-model="this.historico.nomePaciente"
                    :rules="nomePacienteRules"
                    :items="this.MENUS_PACIENTES_NOMES"
                    prepend-inner-icon="mdi-account"
                    label="Nome do Paciente*"
                    bg-color="white"
                    chips
                    variant="outlined" 
                    density="comfortable"
                    required
                ></v-combobox>
            
                <div style="display: flex; justify-content: center; margin-right: 10px;"> 
                <v-combobox
                    v-model="this.historico.mes"
                    :rules="mesRules"
                    :items="this.meses"
                    style="width:50%;"
                    prepend-inner-icon="mdi-account"
                    label="Mês*"
                    bg-color="white"
                    chips
                    variant="outlined" 
                    density="comfortable"
                    required
                ></v-combobox>

                <v-combobox
                    style="margin-left: 10px; width:30%;"
                    v-model="this.historico.ano"
                    :rules="anoRules"
                    :items="this.anos"
                    prepend-inner-icon="mdi-account"
                    label="Ano*"
                    bg-color="white"
                    chips
                    variant="outlined" 
                    density="comfortable"
                    required
                ></v-combobox>
                </div>

                  <v-btn
                    color="secondary"
                    append-icon="mdi-database-arrow-up"
                    block
                    @click="consulta()"
                  >
                  Pesquisar Consultas
                </v-btn>
              </v-col>

              <v-col cols="12" md="4">
              </v-col>
          </v-row>
           
         
          <!-- consultasFiltradas {{ JSON.stringify( consultasFiltradas ) }} -->
          
          <div v-if="(this.consultasFiltradas.length > 0)">
              <br>
              <br>
              <label style="margin-top: 20%"><b> Quantidade de consultas realizadas: {{ consultasFiltradas.length }} </b></label>
              <br>
              <br>
              <AppFicharioconsultaGrid v-for="(consulta, index) in consultasFiltradas" :key="index" :dados="consulta" />
              <AppPrintPDF raiz="relatorioPDF" btnName="Download Relatório"/>
          </div>
          

  </v-form>
  </v-container>
</template>
<script>
/* eslint-disable */ 
import AppPrintPDF  from '@/components/AppPrintPDF.vue' 
import MyDataInput  from '@/components/MyDataInput.vue' 
import ListasMixin  from '@/utils/ListasMixin.js'; 
import AppFicharioconsultaGrid from '@/components/AppFicharioConsultaGrid.vue';

import Agenda from '@/controllers/Agenda.js'; 
const agenda = new Agenda();

export default {
    mixins: [ListasMixin],
       
      name:'FicharioAtendimentos',
      components: {
        MyDataInput,
        AppPrintPDF,
        AppFicharioconsultaGrid
      },
      data: () => ({  
          dadosEvento: agenda.getDados(),
          agenda,
          formValido: false,
          formReadonly: true,

          senhaVisible: false, 
          camposBgColor: "white",
          historico : {
            nomePaciente:null, 
            mes:null,
            ano:null,
            dataIni: null,
            dataFim: null,
          },
          consultasFiltradas: [],
          meses: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
          anos: [ 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035 ],
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
          nomePacienteRules: [
            value => {
              if (value) return true

              return 'Preencha o nome do paciente.'
            },
            value => {
              if (value?.length <= 40) return true

              return 'O nome está muito extenso'
            },
          ], 
          mesRules: [
            value => {
                if (value) return true
                return 'Mês é obrigatório.'
            },
          ],
          anoRules:  [
            value => {
              if (value) return true
              return 'Ano é obrigatório.'
            },
          ]
    }),
    created()         { 
    },
    mounted()         {
        this.$bus.on('busFormUsuarioDados', ( dadosFicharioConsulta ) => {
            // alert( '[*] Dados ?!?' + JSON.stringify( dadosFicharioConsulta ) );
         })
    },
    computed: {  
       
        DADOS_USUARIO()   {
          return this.$store.state.user;
        },
        SENHA() {
          return atob( this.$store.state.user.senha );
        },
        MENUS_PACIENTES_NOMES()      {
          return this.$store.state.meusPacientes.map(obj => obj.nome);
        },
    },
    methods:                    {
        async validate ()     { 
          const { valid } = await this.$refs.form.validate()

          if ( valid )        {
              this.loginAPI();
              //alert('Form is valid');
          }  
        },
        async consulta()  {
          /** Marreta:  Só funciona com duas chamadas ao mesmo método */
          /** Marreta:  Só funciona com duas chamadas ao mesmo método */          
            await this.consultaHistorico();
            await this.consultaHistorico(); 
        },
        async consultaHistorico()                    {

            // alert( this.historico.mes + " ||| " +  this.historico.ano + " ||| " + this.formValido );
            if ( !this.formValido  )    {
                  this.$bus.emit('showModal', { message: "Preencha todos filtros corretamente.", msgType: "warning"} );
                  return;
            } else {
                this.getMonthInterval( this.historico.mes , this.historico.ano ); 
            }

            const profissionalId = this.DADOS_USUARIO.id;

            /*console.log("iniDate:", this.historico.dataIni );
            console.log("endDate:", this.historico.dataFim );*/
            const dataIni = this.historico.dataIni;
            const dataFim = this.historico.dataFim;

            this.agenda.consultarEventos( dataIni, dataFim, profissionalId ).
            then(response => {
                // console.log('Cadastro Evento de Agenda Response:', response);
                if ( response.code == 0 )   {  
                    var consultasAgenda = response.data;
                    console.log("DADOS TABLE?!? " + JSON.stringify( consultasAgenda )); 

                    // 1- Selecionar apenas consultas do paciente pesquisado.  
                    this.consultasFiltradas = consultasAgenda.filter(consultas => consultas.nomePaciente === this.historico.nomePaciente  );
                    // console.log("Dados filtrados?!? " + JSON.stringify( this.consultasFiltradas )); 

                    // 2- Selecionar apenas consultas cujo status seja realizada.  
                    this.consultasFiltradas = this.consultasFiltradas.filter(obj => obj.statusContulta === "realizada");
                    // console.log("Array OK?!? " + JSON.stringify( this.consultasFiltradas ));
                    if ( this.consultasFiltradas == "" ) 
                         this.$bus.emit('showModal', { message: "Não foram encontrados registro de consultas para o período desejado." , msgType: "warning"} );
                    
                }   else  {
                    this.$bus.emit('showModal', { message: "Não foram encontrados registro de consultas para o período desejado." , msgType: "warning"} );
                } 
            }).catch(error => {
                console.error('Error creating user:', error);
            });
        },
        getMonthInterval(month, year)       {

            // Array of month names in Portuguese
            const months = [
                "Janeiro", "Fevereiro", "Março", "Abril",
                "Maio", "Junho", "Julho", "Agosto",
                "Setembro", "Outubro", "Novembro", "Dezembro"
            ];

            // Find the numeric index of the input month
            const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());

            // Check if the month name was valid
            if (monthIndex === -1) {
                throw new Error('Invalid month name. Please provide a valid month in Portuguese.');
            }

            // Create start date of the month
            const startDate = new Date(year, monthIndex, 1, 0, 0, 0, 0);

            // Calculate the end date of the month
            // Move to the next month, then back one millisecond to the end of the current month
            const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);


            this.historico.dataIni = startDate.toISOString();
            this.historico.dataFim = endDate.toISOString();

            // Return the formatted date strings
            // return [startDate.toISOString(), endDate.toISOString()];
        },
        atualizar()             {

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
.consulta-btn {
  width: 20%;
}
 </style>
 
 