<template>
  
   <!-- DADOS_USUARIO {{ JSON.stringify( DADOS_USUARIO ) }} -->
   <v-container >
    
    <h1 class="text-h5 text-lg-h5 mb-5 mt-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Receituário </b>
    </h1>
 
    <!-- DADOS RETORNADOS : {{ JSON.stringify( data ) }}

     filtros {{ JSON.stringify( filtros ) }}
    DADOS_USUARIO {{ this.DADOS_USUARIO.id }}
    this.$IS_MOBILE_APP {{  this.$IS_MOBILE_APP }} 
    dialog {{ dialog }} -->

    <v-form class="mt-5" v-model="this.formValido" ref="form">
          
        <!-- NOME {{ historico.nomePaciente }}
        mes {{ historico.mes  }}
        -->

        <!-- =======================  LINHA BOTOES CONSULTA  ======================== -->
        <v-row>

            <!-- ==== Coluna 1 ==== -->
            <v-col cols="12" md="4">
            </v-col>

            <!-- ==== Coluna 2 ==== -->
            <v-col cols="12" md="4">

              <v-combobox
                  v-model="this.filtros.nomePaciente"
                  :items="this.MENUS_PACIENTES_NOMES"
                  prepend-inner-icon="mdi-account"
                  label="Nome do Paciente*"
                  bg-color="white"
                  chips
                  variant="outlined" 
                  density="comfortable"
                  required
              ></v-combobox>

              <p><b> Período de Prescrição </b></p>
                <div style="display: flex; flex-direction: column;">
                <label for="startDate">Data Inicial:
                    <input type="date" class="campo-data" id="startDate" v-model="this.filtros.dataIni">
                </label>
                
                <label for="endDate">Data Final:
                    <input type="date" class="campo-data" id="endDate" v-model="this.filtros.dataFim">
                </label>
            </div>  

                <v-btn
                  class="mb-5 mt-10"
                  color="secondary"
                  append-icon="mdi-magnify" 
                  block
                  @click="consulta()"
                >
                Pesquisar Receitas
              </v-btn>

              <v-btn
                  class="mb-5"
                  color="secondary"
                  append-icon="mdi-database-plus"
                  block
                  @click="cadastra()"
                >
                Cadastrar Nova
              </v-btn>
            </v-col>

            <!-- ==== Coluna 3 ==== -->
            <v-col cols="12" md="4">
            </v-col>
        </v-row>
         
        
  </v-form>
            <!-- this.data.length {{  this.data.length  }} -->

            <v-data-table
                     v-if="(this.data.length > 0 )"
                    :headers="headers"
                    :items="data"
                    item-key="id"
                    class="elevation-1"
                    :mobile="this.$IS_MOBILE_APP"
                >
                    <!-- Slot for Data Consulta -->
                    <template v-slot:[`item.dataPrescricao`]="{ item }">
                        <span>{{ item.dataPrescricao }}</span>
                    </template> 
                  
                    <!-- Slot for Edit Action -->
                    <template v-slot:[`item.action`]="{ item }">
                        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                    </template>
                </v-data-table>

<!-- Edit Modal -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <v-card-title>
            <span class="headline"> Preenchimento de Prescrição de Receita </span>
        </v-card-title>  
        <!-- formValido {{ formValido }} <br>
        valid {{ valid }} <br>
        dadosModal {{  JSON.stringify( dadosModal )  }} -->
 
          <!-- numberOfRows {{ numberOfRows  }} <br>
          medicacao1 {{ this.dadosModal.medicacao1 }} <br>
          medicacao2 {{ this.dadosModal.medicacao2 }} <br>
          medicacao3 {{ this.dadosModal.medicacao3 }} <br>
          medicacao4 {{ this.dadosModal.medicacao4 }} <br>
          medicacao5 {{ this.dadosModal.medicacao5 }} <br>
          valid ?? {{  valid  }} -->

        <!-- ########################### RECEITA RECEITA ##################################### -->
        <!-- ########################### RECEITA RECEITA ##################################### -->
        <!-- ########################### RECEITA RECEITA ##################################### -->
        <!-- ########################### RECEITA RECEITA ##################################### -->
        <v-form v-model="valid" style="background-color: #f3f5f0" ref="formModal">
        <v-container id="relatorioPDF">

             <v-row class="justify-center">
              <v-col cols="auto"> <h2> RECEITUÁRIO DE CONTROLE ESPECIAL </h2></v-col>
            </v-row> 

            <v-row>
              <h2> Identificação do Emitente </h2>
            </v-row>

            <v-row style="margin-top: 10px">
                <v-col cols="12" md="6"> 
                    <v-text-field
                    v-model="cabecalhoReceita.medico.nome"
                    max-width="400px"
                    :counter="50"
                    label="Nome Completo"
                    :bg-color="camposBgColor"
                    variant="outlined"
                    density="compact"
                    :readonly="true"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="3"> 
                    <v-text-field
                      v-model="cabecalhoReceita.medico.crm"
                      max-width="400px"
                      :counter="6"
                      label="CRM"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                      v-model="cabecalhoReceita.medico.crmUF"
                      max-width="400px"
                      :counter="2"
                      label="UF CRM"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
            </v-row>   

            <v-row style="margin-top: 2px">
                <v-col cols="12" md="4"> 
                  <v-text-field
                      v-model="cabecalhoReceita.medico.celular"
                      max-width="400px"
                      :counter="12"
                      label="Celular"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                      v-model="cabecalhoReceita.medico.cidade"
                      max-width="400px"
                      :counter="50"
                      label="Cidade"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4"> 
                  <v-text-field
                      v-model="cabecalhoReceita.medico.UF"
                      max-width="400px"
                      :counter="2"
                      label="UF"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                </v-col>
            </v-row>   

            <v-row style="margin-top: 2px">
                <v-col cols="12" md="12"> 
                  <v-textarea
                    v-model="cabecalhoReceita.medico.endereco"
                    append-inner-icon="mdi-comment"
                    class="mx-2"
                    label="Endereço"
                    bg-color="white"
                    rows="1"
                    variant="outlined"
                    :readonly="true"
                    auto-grow
                    shaped
                  ></v-textarea>
                </v-col> 
            </v-row>

            <v-row>
              <h2> Identificação do Paciente </h2>
            </v-row>

            <v-row style="margin-top: 10px">
                <v-col cols="12" md="6"> 
                    <v-text-field
                      v-model="cabecalhoReceita.paciente.nome"
                      max-width="400px"
                      :counter="50"
                      label="Nome Completo"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="3"> 
                    <v-text-field
                      v-model="cabecalhoReceita.paciente.cidade"
                      max-width="400px"
                      :counter="50"
                      label="Cidade"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                 </v-col>

                 <v-col cols="12" md="3"> 
                    <v-text-field
                      v-model="cabecalhoReceita.paciente.UF"
                      max-width="400px"
                      :counter="50"
                      label="UF"
                      :bg-color="camposBgColor"
                      variant="outlined"
                      density="compact"
                      :readonly="true"
                      required
                    ></v-text-field>
                 </v-col>
            </v-row>  

            <v-row style="margin-top: 2px">
                <v-col cols="12" md="12"> 
                  <v-textarea
                    v-model="cabecalhoReceita.paciente.endereco"
                    append-inner-icon="mdi-comment"
                    class="mx-2"
                    label="Endereço"
                    bg-color="white"
                    rows="1"
                    variant="outlined"
                    :readonly="true"
                    auto-grow
                    shaped
                  ></v-textarea>
                </v-col> 
            </v-row>

            <v-row style="margin-top: 2px">
              <h2> Prescrição </h2>
            </v-row>
            <v-row style="margin-top: 2px">
                <v-col cols="12" md="4"> N° Identificador da Prescrição: {{ this.dadosModal.id }} </v-col>
                <v-col cols="12" md="4"> 
                  <label for="startDate">Data de Prescrição: </label>
                  <input type="date" style="width: 50%" class="campo-data" id="startDate" v-model="this.dadosModal.dataPrescricao">
                </v-col>
            </v-row>   

            <v-slider
              width="50%"
              v-model="numberOfRows"
              :min="1"
              :max="5"
              :step="1"
              label="Número de medicamentos"
              class="mb-4"
            ></v-slider>

            <v-row v-for="index in numberOfRows" :key="index" class="mb-2">
            <v-col cols="12" md="4">
              <!-- dados.medicacao? {{ dadosModal[`medicacao${index}`] }} -->

               <v-combobox 
                  v-model="dadosModal[`medicacao${index}`]"
                  :rules="formReadonly ? [] : medicacaoRules"
                  :items="medicacoes" 
                  bg-color="white"
                  variant="outlined"
                  chips
                  label="Medicamento">
              </v-combobox>   
               
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="dadosModal[`quantidade${index}`]"
                :rules="formReadonly ? [] : quantidadeRules"
                max-width="400px"
                :counter="30"
                label="Quantidade"
                :bg-color="camposBgColor"
                variant="outlined"
                density="compact"
                :readonly="formReadonly"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="dadosModal[`posologia${index}`]"
                :rules="formReadonly ? [] : posologiaRules"
                max-width="400px"
                :counter="30"
                label="Posologia"
                :bg-color="camposBgColor"
                variant="outlined"
                density="compact"
                :readonly="formReadonly"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          
          

          <v-row style="margin-top: 2px">
                <v-col cols="12" md="6"> 
                    <p> Identificação do Comprador </p>
                    <div style="border: 2px solid black; padding: 10px;">
                      Nome: ________________________________ <br>
                      Ident.: ____________ Órg. Emissor: _____ <br>
                      End.: __________________________________ <br>
                      __________________________________ <br>
                      Cidade: ___________________ UF: ______ <br>
                      Telefone: ___________________ <br>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <p> Identificação do Fornecedor </p> 
                    <div style="border: 2px solid black; padding: 10px;">
                      <v-textarea
                        append-inner-icon="mdi-comment"
                        class="mx-2"
                        label="Assinatura do Farmacêutico / Data"
                        bg-color="white"
                        rows="6"
                        variant="outlined"
                        :readonly="true"
                        auto-grow
                        shaped
                      ></v-textarea>
                    </div> 
                </v-col>
          </v-row> 
          </v-container>

          <v-row> 
            <v-col cols="12" md="4"> </v-col>
            <v-col cols="12" md="4"> 
            <v-btn
                v-if="( tipoOperacao == 'atualiza' )"
                class="mt-2"
                color="blue"
                size="large"
                variant="tonal"
                block
                @click="atualiza"
                style="width: 50%"
                >
            Atualizar
            </v-btn>

            <v-btn
                v-if="( tipoOperacao == 'atualiza' )"
                class="mt-2"
                color="red"
                size="large"
                variant="tonal"
                block
                @click="remove"
                style="width: 50%"
                >
            Remover
            </v-btn>

            <v-btn
                v-if="( this.tipoOperacao == 'cadastra' )"
                class="mt-2"
                color="green"
                size="large"
                variant="tonal"
                block
                @click="cadastra"
                style="width: 50%"
                >
            Cadastrar 
            </v-btn>

            <v-btn
                class="mt-2"
                color="green"
                size="large"
                variant="tonal"
                block
                @click="reset"
                style="width: 50%"
                >
                <v-icon icon="mdi-restore"></v-icon> 
            </v-btn>
            </v-col>
            <v-col cols="12" md="4"> </v-col>


          </v-row>
  </v-form>

      <v-card-actions>
          <v-spacer></v-spacer>
          <AppPrintPDF raiz="relatorioPDF" btnName="Download Receita"/>
          <v-btn color="primary" text @click="closeModal"> Fechar </v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>


<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
<!-- ################## MODAL MODAL MODAL  MODAL MODAL MODAL MODAL MODAL MODAL MODAL ######################### -->
  
</v-container>

</template>

<script setup> 
</script> 

<script> 
  /* eslint-disable */
  import ListasMixin  from '@/utils/ListasMixin.js'; 
 
  
  import { ref, reactive, watch } from 'vue';

  /* eslint-disable */ 
  import UtilsMixin  from '@/utils/UtilsMixin.js'; 
  import Receituario from '@/controllers/Receituario.js'; 
  import AppPrintPDF from '@/components/AppPrintPDF.vue'; 

  import Usuario from  '@/controllers/Usuario.js'; 
  
  const receituario = new Receituario();
  const usuario = new Usuario();

  export default           {
    mixins: [ListasMixin],
    setup() {
          const numberOfRows = ref(1);
          const dadosModal = reactive({});

          watch(numberOfRows, (newVal) => {
            for (let i = 1; i <= newVal; i++) {
              dadosModal[`medicacao${i}`] = dadosModal[`medicacao${i}`] || '';
              dadosModal[`quantidade${i}`] = dadosModal[`quantidade${i}`] || '';
              dadosModal[`posologia${i}`] = dadosModal[`posologia${i}`] || '';
            }
          });

          return {
            numberOfRows,
            dadosModal
          };
    },
    mixins: [UtilsMixin],
    components:         { 
      AppPrintPDF
    },
    data: () => ({
       
        receituario,
        usuario,
        // numberOfRows: 1, // Number of rows - Numero de medicamentos
        tipoOperacao: '', /* cadastra, atualiza */
        camposBgColor: 'white',
        formReadonly: false,
        medicacaoRules:  [
        value => {
          if (value) return true
          return 'Preencha as medicacoes.'
          },
        ],
        quantidadeRules: [
        value => {
          if (value) return true
          return 'Preencha as quantidades.'
          },
        ],
        posologiaRules:  [
        value => {
          if (value) return true
          return 'Preencha o campo de posologia.'
          },
        ], 
      
      visible: false,
      formValido: false,
      valid: null,

      filtros : {
          nomePaciente:null,  
          dataIni: "",
          dataFim: "",
      },

      cabecalhoReceita : {
          medico: {
             nome: "",
             crm: "",
             crmUF: "",
             endereco: "",
             cidade: "",
             celular: "",
             UF: "",
          },
          paciente: {
             nome: "",
             endereco: "",
             rua: "",
             bairro: "",
             cidade: "",
             UF: ""
          }

      },
      dialog: false,
      
      /** MODAL MODAL MODAL  */
      /** TABELA TABELA TABELA */
        currentItem: {},
        // dadosModal: {},
        headers: [
            { title: 'ID Receita', value: 'id' },
            {  title: 'Data de Prescrição', value: 'dataPrescricao' },
            {  title: 'Medicamento 1', value: 'medicacao1' },
            {  title: 'Medicamento 2', value: 'medicacao2' },
            {  title: 'Medicamento 3', value: 'medicacao3' },
            {  title: 'Medicamento 4', value: 'medicacao4' },
            {  title: 'Medicamento 5', value: 'medicacao5' },
            {  title: 'Editar', value: 'action', sortable: false },
        ],

        /* Dados do receituario no seguinte formato */
        data: [], 
        /* data: [
            {
              "id":20,
              "medicacao1":"Remedio XXX",
              "quantidade1":"20 mg",
              "posologia1":"1 vez",
              "medicacao2":"Remedio 1",
              "quantidade2":"20 mg",
              "posologia2":"1 vez ao dia",
              "medicacao3":"Remedio 1",
              "quantidade3":"20 mg",
              "posologia3":"1 vez ao dia",
              "medicacao4":"Remedio 1",
              "quantidade4":"20 mg",
              "posologia4":"1 vez ao dia",
              "medicacao5":"Remedio 1",
              "quantidade5":"20 mg",
              "posologia5":"1 vez",
              "dataPrescricao":"2024-08-01",
              "observacoes":0,
              "idMedico":347,
              "idPaciente":138
            },
            {
                "id":20,
                "medicacao1":"Remedio XXX",
                "quantidade1":"20 mg",
                "posologia1":"1 vez",
                "medicacao2":"Remedio 1",
                "quantidade2":"20 mg",
                "posologia2":"1 vez ao dia",
                "medicacao3":"Remedio 1",
                "quantidade3":"20 mg",
                "posologia3":"1 vez ao dia",
                "medicacao4":"Remedio 1",
                "quantidade4":"20 mg",
                "posologia4":"1 vez ao dia",
                "medicacao5":"Remedio 1",
                "quantidade5":"20 mg",
                "posologia5":"1 vez",
                "dataPrescricao":"2024-08-01",
                "observacoes":0,
                "idMedico":347,
                "idPaciente":138
              } ,
             
            // Add more items as needed
        ],*/
    
    }),  
    async mounted()       { 
        
    },
    computed:    {       
      DADOS_USUARIO()  {
         return this.$store.state.user;
      },
      MENUS_PACIENTES_NOMES()      {
          return this.$store.state.meusPacientes.map(obj => obj.nome);
      },
      CONDICAO_UPLOAD_COMPROVANTE() {
        return ( this.valid && ( this.dadosModal.financeiro.dataPagamento != '0000-00-00' ) && ( this.dadosModal.financeiro.situacaoDebito == 'pago' ) )
      }
    },
    methods:                      {
       
      closeModal( isRemove = false )      {

        if ( !isRemove )
              this.consulta();
        this.dialog = false;
        this.data = [];
      }, 
      
      reset()                         {
        this.$refs.formModal.reset();
        this.$refs.formModal.resetValidation();
        this.currentItem.financeiro.dataPagamento = "";
      },
      contaNumMedicamentos()          {
          const properties = ['medicacao5', 'medicacao4', 'medicacao3', 'medicacao2', 'medicacao1'];
          var numMedicamentos = 0;
          for (let i = 0; i < properties.length; i++) {
              if ( (this.dadosModal[properties[i]] !== "") && (this.dadosModal[properties[i]] !== " ") && (this.dadosModal[properties[i]] !== null) ) {
                  // console.log(`TEM ${5 - i} !!!`);
                  numMedicamentos = 5 - i;
                  break;
              } 
          }
          // alert("NUMBER sss = " + numMedicamentos);
          this.numberOfRows = numMedicamentos;
      },
      async preencheCabecalhoReceita()          {
        
          const dadosPaciente = await this.consultaPacienteByNome( this.usuario, this.filtros.nomePaciente );
          console.log("* Data = " + JSON.stringify( this.DADOS_USUARIO ) );
          
          this.cabecalhoReceita.paciente.nome = dadosPaciente.nome;
          this.cabecalhoReceita.paciente.endereco = dadosPaciente.rua + ", " + dadosPaciente.bairro;
          this.cabecalhoReceita.paciente.cidade = dadosPaciente.municipio;
          this.cabecalhoReceita.paciente.UF = dadosPaciente.uf; 
          if (this.cabecalhoReceita.paciente.endereco == "null, null")
              this.cabecalhoReceita.paciente.endereco = "";

          this.cabecalhoReceita.medico.nome = this.DADOS_USUARIO.nome;
          this.cabecalhoReceita.medico.celular = this.DADOS_USUARIO.celular;
          this.cabecalhoReceita.medico.crm  = this.DADOS_USUARIO.crm_crp;
          this.cabecalhoReceita.medico.endereco = this.DADOS_USUARIO.rua + ", " + this.DADOS_USUARIO.bairro;
          this.cabecalhoReceita.medico.cidade = this.DADOS_USUARIO.municipio;
          this.cabecalhoReceita.medico.UF = this.DADOS_USUARIO.uf;
          if (this.cabecalhoReceita.medico.endereco == "null, null")
              this.cabecalhoReceita.medico.endereco = "";

      },
      editItem( item )                {
               this.currentItem = item;
               this.dadosModal = this.currentItem;
               
               console.log( JSON.stringify( this.dadosModal ) );
               this.contaNumMedicamentos();

               // alert( "MED3 ? " + this.dadosModal.medicacao3  );
               
              // 2- Remove a quantidade do medicamento, acessando somente o seu nome.
              for (let i = 1; i <= 5; i++)    {
                  let key = `medicacao${i}`;
                  if (this.dadosModal[key]) {
                      this.dadosModal[key] = this.dadosModal[key].split("-")[0];
                  }
               }    
               // 3- Converte a data para USA
               this.dadosModal.dataPrescricao = this.convertBRToUSDate( this.dadosModal.dataPrescricao );

               this.preencheCabecalhoReceita();
               this.tipoOperacao = "atualiza";
               this.dialog = true;
      },  
        
      async cadastra()      
      {
          this.preencheCabecalhoReceita();
          this.tipoOperacao = "cadastra";
          // alert( "** OI?!? " + this.tipoOperacao );

          if ( ( this.filtros.nomePaciente == "" ) || ( this.filtros.nomePaciente == null ) ||
               ( this.filtros.nomePaciente == " " ) ) {
                 this.$bus.emit('showModal', { message: "Nome de paciente vazio.", msgType: "warning"} );
                 return;
          }
          
          this.dialog = true;

          // 1- Habilita modal, e verifica validação formulário
          this.valid = await this.$refs.formModal.validate();
          // alert( "Data prescrição! " + this.dadosModal.dataPrescricao + " || ");
          const formValid = this.valid.valid;

          if ( formValid != true )    { 
               alert("- INVALIDO !!");
               return;
          } 

          // 2- Validação de data
          const dataValida = this.validaData( this.dadosModal.dataPrescricao );
          // alert( "Data ok? " + dataValida );
          if ( !dataValida )  {
                this.$bus.emit('showModal', { message: "Data de prescrição nula.", msgType: "warning"} );
                return;
          } 

          /** 3- Consultar o ID do usuário selecionado */ 
          var idPaciente = await this.consultaIDPacienteByNome( this.usuario, this.filtros.nomePaciente );

          
          /* 4- Prepara dados para cadastro */
          this.dadosModal.idPaciente = idPaciente;
          this.dadosModal.idMedico = this.DADOS_USUARIO.id;
          this.dadosModal.id++;
          // alert( "** DADOS? " + this.filtros.nomePaciente +  " || " + JSON.stringify( this.dadosModal ) );

           /* 5- Realiza cadastro */
          const response = await this.receituario.cadastrarReceituario( this.dadosModal );
          console.log( "- Response LAST: " + JSON.stringify( response ) );
          if ( response.code == 0 )   {
               this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
               
               /** Define a data de busca para consulta dentro do closeModal() */
               this.filtros.dataIni = this.dadosModal.dataPrescricao;
               this.filtros.dataFim = this.dadosModal.dataPrescricao;
               this.closeModal();
          } else {
               this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
               return;
          }

      },
      async atualiza() 
      {

          this.valid = await this.$refs.formModal.validate();
          // alert( "Data prescrição! " + this.dadosModal.dataPrescricao + " || ");
          const formValid = this.valid.valid;

          if ( formValid != true )  { 
              alert("- INVALIDO !!");
              return;
          } 

           // 2- Validação de data
           const dataValida = this.validaData( this.dadosModal.dataPrescricao );
          // alert( "Data ok? " + dataValida );
          if ( !dataValida )  {
                this.$bus.emit('showModal', { message: "Data de prescrição nula.", msgType: "warning"} );
                return;
          } 

          console.log("-- DADOS ED ==>> " + JSON.stringify( this.dadosModal ));

          // console.log("-- DADOS E.D. ==>> " + JSON.stringify( this.dadosModal ));

          const response = await this.receituario.atualizarReceituario( this.dadosModal );
          console.log( "- Response LAST: " + JSON.stringify( response.data ) );
          if ( response.data.code == 0 ) {
              this.$bus.emit('showModal', { message: response.data.message, msgType: "success"} );
          } else {
              this.$bus.emit('showModal', { message: response.data.message, msgType: "warning"} );
              return;
          }
      },
      async remove() 
      {
            // alert("-- DADOS ED ==>> " + this.dadosModal.id );
            // console.log("-- DADOS E.D. ==>> " + JSON.stringify( this.dadosModal ));

            const response = await this.receituario.removerReceituario( this.dadosModal.id );
            // alert( "- Response LAST: " + JSON.stringify( response ) );
            if ( response.code == 0 ) {
                 this.$bus.emit('showModal', { message: response.message, msgType: "success"} );
                 this.closeModal( true );
                 // alert( "*** TAM = " + this.data.length );
            } else {
                this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
                return;
            }
            this.closeModal( true );
            this.dialog = false;
      },
      getValue( field, index ) 
      {
          // Build dynamic key based on the field and index
          const key = `${field}${index}`;

          console.log( "getValue?! key = " + key + " ||| " + this.dadosModal[key] );

          // Use Vue.set to ensure reactivity for dynamic keys
          if (!this.dadosModal[key]) {
               this.$set(this.dadosModal, key, '');
          }
          return this.dadosModal[key];
      },       
      async consulta()                  { 
          
          if ( this.filtros.dataIni == null )     {
               this.$bus.emit('showModal', { message: "Preencha a data de início", msgType: "warning"} );
               return;
          }
          if ( this.filtros.dataFim == null )     {
               this.$bus.emit('showModal', { message: "Preencha a data final", msgType: "warning"} );
               return;
          }  
          if ( this.filtros.dataIni > this.filtros.dataFim )     {
               this.$bus.emit('showModal', { message: "Data final deve ser maior ou igual que a inicial.", msgType: "warning"} );
               return;
          }
          if ( this.filtros.nomePaciente == null ) {
               this.$bus.emit('showModal', { message: "Preencha nome", msgType: "warning"} );
               return;
          }
          this.formValido = true;

          const dataIni = this.filtros.dataIni + " 00:00:00";
          const dataFim = this.filtros.dataFim + " 00:00:00";
          // dataFim = this.addUmDiaEmData( dataFim ); // **** MARRETADA !!!!!!


          /** Consultar o ID do usuário selecionado */
          /*const dados = {
              "nome" : this.filtros.nomePaciente
          };
          var resp = await usuario.consultarUsuario( dados );
          var idPaciente;

          if ( resp.code == 0 )      {
               idPaciente = resp.data.id;
               alert("Nome: " + this.filtros.nomePaciente + " || ID = " +  idPaciente);
          }*/
          var idPaciente = await this.consultaIDPacienteByNome( this.usuario, this.filtros.nomePaciente );
          
          const dadosReceituario = {
              "idMedico": this.DADOS_USUARIO.id,
              "idPaciente"  : idPaciente,
              "dataPrescricaoIni": dataIni,
              "dataPrescricaoFim": dataFim
          };

          const response = await this.receituario.consultarReceituario( dadosReceituario );
          if ( response.code == 0 ) {
               
               var receitasArray = response.data;
               
               this.$bus.emit('showModal', { message: "Dados de receitas retornados com sucesso!", msgType: "success"} );
               
               console.log( "resp?! " + JSON.stringify( receitasArray ) );
               // this.data = receitasArray;


                // Function to concatenate quantidade with medicacao
                const concatMedicacaoQuantidade = (data) => {
                  return data.map(item => {
                    for (let i = 1; i <= 5; i++) {
                      const medicacaoKey = `medicacao${i}`;
                      const quantidadeKey = `quantidade${i}`;
                      if (item[medicacaoKey] && item[quantidadeKey]) {
                          item[medicacaoKey] = `${item[medicacaoKey]} - ${item[quantidadeKey]}`;
                      }
                    }
                    if (item.dataPrescricao) {
                          item.dataPrescricao = this.convertUSToBRDate( item.dataPrescricao );
                    }
                    return item;
                  });
                };
                this.data = concatMedicacaoQuantidade( receitasArray );
                // alert( "N° Receitas encontradas?!? " + this.data.length );

          } else {
              this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
          }
      }
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

.campo-data     {
   background-color: white; 
   color: rgb(131, 131, 131);
   width: 60%; 
   height: 40px; 
   margin: 5px;
}
 


</style>