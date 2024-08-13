<template>
  
   <!-- DADOS_USUARIO {{ JSON.stringify( DADOS_USUARIO ) }} -->
   <v-container id="relatorioPDF" style="background-color: #DCEDC8;" >
    
    <h1 class="text-h5 text-lg-h5 mb-5 mt-5" style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
      <b> Financeiro </b>
    </h1>

    <!-- filtros {{ JSON.stringify( filtros ) }}
    DADOS_USUARIO {{ this.DADOS_USUARIO.id }}
    this.$IS_MOBILE_APP {{  this.$IS_MOBILE_APP }} -->
    

    <v-form class="mt-5" v-model="this.formValido" style="background-color: #DCEDC8" ref="form">
          
          <!-- NOME {{ historico.nomePaciente }}
          mes {{ historico.mes  }} -->
       
          <!-- ========================== LINHA 1================================ -->
          <v-row>
          <v-col cols="12" md="6">
              <p> . </p>
              <v-combobox
                  v-model="this.filtros.nomePaciente"
                  :rules="nomePacienteRules"
                  :items="this.MENUS_PACIENTES_NOMES"
                  style="width:90%;"
                  prepend-inner-icon="mdi-account"
                  label="Nome do Paciente*"
                  bg-color="white"
                  chips
                  variant="outlined" 
                  density="comfortable"
                  required
              ></v-combobox>
          </v-col>

          <v-col cols="12" md="6">
            <div style="display: flex; flex-direction: column;">
                <label for="startDate">Data Inicial:
                  <input type="date" class="campo-data" id="startDate" v-model="this.filtros.dataIni">
                </label>
                
                <label for="endDate">Data Final:
                  <input type="date" class="campo-data" id="endDate" v-model="this.filtros.dataFim">
                </label>
            </div>
          </v-col>
        </v-row>

        <!-- =======================  LINHA BOTÃO  ======================== -->
        <v-row>
            <v-col cols="12" md="4">
            </v-col>

            <v-col cols="12" md="4">
                <v-btn
                  class="mb-5"
                  color="secondary"
                  append-icon="mdi-database-arrow-up"
                  block
                  @click="consulta()"
                >
                Pesquisar Pagamentos
              </v-btn>
            </v-col>

            <v-col cols="12" md="4">
            </v-col>
        </v-row>
         
       
        <!-- consultasFiltradas {{ JSON.stringify( consultasFiltradas ) }} 
        <div v-if="(this.consultasFiltradas.length > 0)">
            <AppFicharioconsultaGrid v-for="(consulta, index) in consultasFiltradas" :key="index" :dados="consulta" /> 
            <AppPrintPDF raiz="relatorioPDF" btnName="Download Relatório"/>
        </div>-->
  </v-form>

  <v-data-table
                    :headers="headers"
                    :items="data"
                    item-key="id"
                    class="elevation-1"
                    :mobile="this.$IS_MOBILE_APP"
                >
                    <!-- Slot for Data Consulta -->
                    <template v-slot:[`item.dataConsulta`]="{ item }">
                        <span>{{ item.dataConsulta }}</span>
                    </template>

                    <!-- Slot for Data Pagamento -->
                    <template v-slot:[`item.financeiro.dataPagamento`]="{ item }">
                        <span>{{ item.financeiro.dataPagamento || 'N/A' }}</span>
                    </template>

                    <!-- Slot for Nome Arquivo -->
                    <template v-slot:[`item.financeiro.nomeArquivo`]="{ item }">
                        <v-btn 
                            v-if="item.financeiro.nomeArquivo" 
                            :href="'http://paivaservices.com/psibetter/financeiro/comprovantes/' + this.DADOS_USUARIO.id + '/' + item.financeiro.nomeArquivo" 
                            target="_blank"
                        >
                            {{ item.financeiro.nomeArquivo }}
                        </v-btn>
                        <span v-else>N/A</span>
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
<v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
        <v-card-title>
            <span class="headline">Atualização de Dados Financeiros</span>
        </v-card-title> 
        
        <!-- formValido {{ formValido }} <br>
        valid {{ valid }} <br>
        dadosModal {{  JSON.stringify( dadosModal )  }} -->

        <v-form v-model="valid" style="background-color: #f3f5f0" ref="formModal">
        <v-container>
          <v-row class="justify-center">
         <v-col cols="auto">
        
          <!-- ############################ LINHA 1 ###########################-->
          <label for="startDate">Data de Pagamento: </label>
          <input type="date" style="width: 50%" class="campo-data" id="startDate" v-model="this.dadosModal.financeiro.dataPagamento">

          <v-autocomplete
              class="mt-5"
              v-model="this.dadosModal.financeiro.mesReferencia"
              :items="meses"
              :rules="mesReferenciaRules"
              max-width="400px"
              label="Mês de referência."
              density="comfortable"
              placeholder="Informe sua senha"
              prepend-inner-icon="mdi-cash-clock"
              variant="outlined"
              bg-color="white"
              required 
          ></v-autocomplete> 
            
          <!-- NOTA!! NOTA!! density="comfortable, compact" NOTA!! NOTA!! -->
          <v-autocomplete
            v-model="this.dadosModal.financeiro.anoReferencia"
            :items="anos"
            :rules="anoReferenciaRules"
            type="number"
            max-width="400px"
            :counter="8"
            label="Ano de referência"
            prepend-inner-icon="mdi-cash-clock"
            variant="outlined"
            density="comfortable"
            bg-color="white"
            required
          ></v-autocomplete>

            <!-- ============== CAMPO situacaoDebito ==============  --> 
            <v-autocomplete
              v-model="this.dadosModal.financeiro.situacaoDebito"
              :items="situacoesDebito"
              :rules="situacaoDebitoRules"
              max-width="400px"
              label="Situação do débito"
              density="comfortable"
              prepend-inner-icon="mdi-list-status"
              variant="outlined"
              bg-color="white"
              required 
          ></v-autocomplete> 


          <!-- ============== CAMPO situacaoDebito ==============  --> 
          <v-autocomplete
              v-model="this.dadosModal.financeiro.tipoPagamento"
              :items="tiposPagamento"
              :rules="tipoPagamentoRules"
              max-width="400px"
              label="Tipo de pagamento"
              density="comfortable"
              prepend-inner-icon="mdi-list-status"
              variant="outlined"
              bg-color="white"
              required 
          ></v-autocomplete> 

          <v-card-text class="text-medium-emphasis text-caption mb-2">
            Faça o upload de comprovante de pagamento abaixo, caso necessário.
          </v-card-text>

          <!-- CONDICAO_UPLOAD_COMPROVANTE {{  this.CONDICAO_UPLOAD_COMPROVANTE  }}
           ============== CAMPO SENHA ============== --> 
          <MySimpleUpload 
              v-if="( this.CONDICAO_UPLOAD_COMPROVANTE )"
              :id-consulta="this.dadosModal.financeiro.idConsultaAgenda" 
              :data-pagamento="this.dadosModal.financeiro.dataPagamento"
              @get-filename="( filename ) => handleUploadedFilename( filename )"
              @handle-upload="( flag ) => handleUpload( flag )" >
          </MySimpleUpload>

              
          <div class="d-flex flex-column">
            
            <v-btn
                v-if="( this.dadosModal.financeiro.situacaoDebito == 'aberto' )"
                class="mt-2"
                color="blue"
                size="large"
                variant="tonal"
                block
                @click="atualiza"
                max-width="400px"
                >
            Atualizar
            </v-btn>

            <v-btn class="mt-4" color="lightskyblue" @click="reset" >
                <v-icon icon="mdi-restore"></v-icon> 
            </v-btn> 
 
        </div>
      </v-col>
    </v-row>
      </v-container>
  </v-form>


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeModal">Close</v-btn>
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




<!-- <br>
<br> 
  <MySimpleUpload></MySimpleUpload>
<br>
<br> 
<div>
    <v-btn @click="downloadFile"> Download File </v-btn>
</div> -->

</template>

<script setup> 
</script> 

<script> 
  /* eslint-disable */ 
  import UtilsMixin  from '@/utils/UtilsMixin.js'; 
  import MySimpleUpload  from '@/components/MySimpleUpload.vue'; 
  import Financeiro from '@/controllers/Financeiro.js'; 
  
  const financeiro = new Financeiro();

  export default           {

    mixins: [UtilsMixin],
    components:         { 
      MySimpleUpload,
    },
    data: () => ({
       
        nomePacienteRules:  [
        value => {
          if (value) return true
          return 'Preencha as alergias.'
          },
        ],
        tipoPagamentoRules: [
        value => {
          if (value) return true
          return 'Preencha as alergias.'
          },
        ],
        mesReferenciaRules:  [
        value => {
          if (value) return true
          return 'Preencha o campo de drogas.'
          },
        ],

        anoReferenciaRules:  [
        value => {
          if (value) return true
          return 'Preencha as alergias.'
          },
        ],
        situacaoDebitoRules:  [
        value => {
          if (value) return true
          return 'Preencha o campo de drogas.'
          },
        ],
      selectedTime: null,
      financeiro,
      visible: false,
      formValido: false,
      valid: null,

      filtros : {
          nomePaciente:null,  
          dataIni: "",
          dataFim: "",
      },
      dialog: false,
      
      /** MODAL MODAL MODAL  */
      meses: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
      anos: [],
      situacoesDebito: [ 'pago', 'aberto' ],
      tiposPagamento: [ 'mensal', 'consulta' ],
      /** TABELA TABELA TABELA */
        currentItem: {},
        dadosModal: {},
        headers: [
            { title: 'ID', value: 'id' },
            { title: 'ID Consulta', value: 'financeiro.idConsultaAgenda' },
            {  title: 'Data Consulta', value: 'dataConsulta' },
            {  title: 'Data Pagamento', value: 'financeiro.dataPagamento' },
            {  title: 'Mês de Referência', value: 'financeiro.mesReferencia' },
            {  title: 'Ano de Referência', value: 'financeiro.anoReferencia' },
            {  title: 'Situação do Débito', value: 'financeiro.situacaoDebito' },
            {  title: 'Tipo de Pagamento', value: 'financeiro.tipoPagamento' },
            {  title: 'Comprovante', value: 'financeiro.nomeArquivo'  },
            {  title: 'Editar', value: 'action', sortable: false },
        ],
        data: [],
        /* data: [
            {
                id: 16,
                dataConsulta: "2024-08-08 22:22:00",
                financeiro: {
                    id: 16,
                    idConsultaAgenda:308,
                    dataPagamento:"2027-07-01",
                    mesReferencia:1,
                    anoReferencia:2024,
                    situacaoDebito:"aberto",
                    tipoPagamento:"mensal",
                    nomeArquivo:"arquivo-teste.pdf"
                }
            },
            {
                id: 17,
                dataConsulta: "2024-08-15 22:22:00",
                financeiro: {
                    id: 17,
                    idConsultaAgenda:309,
                    dataPagamento:"2027-07-01",
                    mesReferencia:1,
                    anoReferencia:2024,
                    situacaoDebito:"aberto",
                    tipoPagamento:"mensal",
                    nomeArquivo:"arquivo.pdf"
                }
            },
             
            // Add more items as needed
        ],*/
    
    }),  
    mounted()       {
      for(var i=2020; i<2050; i++ ) {
          this.anos.push( i );
      }
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
      closeModal() {
        this.consulta();
        this.dialog = false;
      },
      handleUploadedFilename( filename ) {
         // alert( "DATA?!? " + filename );
         this.dadosModal.financeiro.nomeArquivo = filename;
      },
      handleUpload( flag )           {
         // alert("- Upload OK !!!! " + flag );
         this.atualiza();
      },
      reset()                  {
        this.$refs.formModal.reset();
        this.$refs.formModal.resetValidation();
        this.currentItem.financeiro.dataPagamento = "";
      },
      editItem(item) {
               this.currentItem = item;
               this.dadosModal = this.currentItem;
               this.dialog = true;
               // alert( JSON.stringify( this.currentItem  ) );
      },
      downloadFile() {
          // Replace with your actual PHP script URL and remote file URL
          let phpScriptUrl = 'http://paivaservices.com/psibetter/psibetter_backend/download.php';
          let fileUrl = 'http://paivaservices.com/psibetter/financeiro/comprovantes/fundo.png';
          

          // Create a hidden <a> element to trigger the download
          let a = document.createElement('a');
          a.href = `${phpScriptUrl}?fileUrl=${encodeURIComponent(fileUrl)}`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      },
      /** Transforma os dados retornados pela API para o tipo de array que é suportado pela tabela */
      transformDataArray( financeiroArray ) 
      {
          return financeiroArray.map(item => ({
            id: item.financeiro.id,  // Flatten the unique identifier
            dataConsulta: item.dataConsulta,
            financeiro: {
                id: item.financeiro.id,  // Keep the nested `id`
                idConsultaAgenda: item.financeiro.idConsultaAgenda,
                dataPagamento: item.financeiro.dataPagamento,
                mesReferencia: item.financeiro.mesReferencia,
                anoReferencia: item.financeiro.anoReferencia,
                situacaoDebito: item.financeiro.situacaoDebito,
                tipoPagamento: item.financeiro.tipoPagamento,
                nomeArquivo: item.financeiro.situacaoDebito === 'aberto' ? null : item.financeiro.nomeArquivo
            }
          }));
      },
      async atualiza() 
      {

         this.valid = await this.$refs.formModal.validate();
        
        if ( this.dadosModal.financeiro.situacaoDebito == "pago" )  {
             if ( ( this.dadosModal.financeiro.dataPagamento == "" ) || ( this.dadosModal.financeiro.dataPagamento == "0000-00-00" ) 
                || ( this.dadosModal.financeiro.dataPagamento == null ) ) 
             {
                this.$bus.emit('showModal', { message: "Preencha a data de pagamento.", msgType: "warning"} );
                this.valid = false;
                return;
             }
        } else {

            // alert( "DTA PGMT = " + this.dadosModal.financeiro.dataPagamento );

            if ( ( this.dadosModal.financeiro.dataPagamento != "" ) && ( this.dadosModal.financeiro.dataPagamento != "0000-00-00" ) 
                  && ( this.dadosModal.financeiro.dataPagamento != null ) ) 
             {
                this.$bus.emit('showModal', { message: "Situação de débito aberto com data de pagamento definida. Altere um dos valores.", msgType: "warning"} );
                this.valid = false;
                return;
             }
        }
        if ( this.dadosModal.financeiro.dataPagamento == "0000-00-00" ) 
             this.dadosModal.financeiro.dataPagamento = "";

        if (!this.valid)  { 
            // alert("- INVALIDO !!");
            return;
        } 
        console.log("-- DADOS ED ==>> " + JSON.stringify( this.dadosModal ));

        const dadosFinanceiros = { 
            "keys" : 	     {
                "idConsultaAgenda" : this.dadosModal.financeiro.idConsultaAgenda
            },
            "financeiro":  {
                "id": this.dadosModal.id,
                "idConsultaAgenda" : this.dadosModal.financeiro.idConsultaAgenda,
                "dataPagamento"  : this.dadosModal.financeiro.dataPagamento,
                "mesReferencia"  : this.dadosModal.financeiro.mesReferencia,
                "anoReferencia"  : this.dadosModal.financeiro.anoReferencia,
                "situacaoDebito" : this.dadosModal.financeiro.situacaoDebito,
                "tipoPagamento"  : this.dadosModal.financeiro.tipoPagamento,
                "nomeArquivo"    : this.dadosModal.financeiro.nomeArquivo
            }
           };

        // console.log("-- DADOS E.D. ==>> " + JSON.stringify( this.dadosModal ));

        const response = await this.financeiro.atualizarFinanceiro( dadosFinanceiros );
        console.log( "- Response LAST: " + JSON.stringify( response.data ) );
        if ( response.data.code == 0 ) {
             this.$bus.emit('showModal', { message: response.data.message, msgType: "success"} );
        } else {
            this.$bus.emit('showModal', { message: response.data.message, msgType: "warning"} );
            return;
        }
      },
      addUmDiaEmData( dateString )            
      {

          const date = new Date(dateString);

          // Check if the date is valid
          if (isNaN(date.getTime())) {
              console.error("Invalid date string");
          } else {
              // Add one day
              date.setDate(date.getDate() + 1);

              // Format the new date back to a string (e.g., YYYY-MM-DD)
              const newDateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

              console.log("New date string:", newDateString);
          }
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

          const response = await this.financeiro.consultarFinanceiro( this.filtros.nomePaciente, dataIni, dataFim, this.DADOS_USUARIO.id );
          if ( response.code == 0 ) {
               
               var financeiroArray = response.data;

               const dadosFinanceirosNulos = financeiroArray.every(item => item.financeiro === null);
               if ( dadosFinanceirosNulos ) {
                    this.$bus.emit('showModal', { message: "Dados financeiros não encontrados", msgType: "warning"} ); 
                    return;
               }
               this.$bus.emit('showModal', { message: "Dados financeiros retornados com sucesso!", msgType: "success"} );
               
               console.log( "resp?! " + JSON.stringify( financeiroArray ) );
               const financeiroArrayNaoNulo = financeiroArray.filter(item => item.financeiro !== null); // Remove atributos 'financeiro' nulos
               this.data = this.transformDataArray( financeiroArrayNaoNulo );
          } else {
              this.$bus.emit('showModal', { message: response.message, msgType: "warning"} );
              return;
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