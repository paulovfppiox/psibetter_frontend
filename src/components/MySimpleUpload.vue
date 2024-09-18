<template>
<form  @submit.prevent="sendFile" enctype="multipart/form-data">

    <!-- DADOS_USUARIO_oi {{  DADOS_USUARIO  }} 
    PATH_ATUAL {{ this.PATH_ATUAL }}
    tipoArquivo {{  tipoArquivo  }} -->

    <div class="field">
        <p for="file" class="label"> Upload de {{ tipoArquivo }} </p>
        
        <!-- Caso Upload de imagem de usuário -->
        <input 
            class="mb-2 mt-2"
            v-if="(this.PATH_ATUAL == 'home')"
            id="uploadfiles"
            type="file" 
            ref="filesRef"
            @change="selectImageFile"
            />

        <!-- Caso Upload de comprovantes -->
        <input 
            v-else
            id="uploadfiles"
            type="file" 
            ref="filesRef"
            @change="selectFile"
            />    

        <div>
        <v-btn @click='sendFile' color="secondary"> Enviar/Atualizar Pagamento </v-btn>
        </div>
        <!-- nome do Arquivo {{ this.nomeArquivo }}
        ID CONSULTA {{ this.idConsulta }}
        DATA PAGMTO {{ this.dataPagamento  }} -->
    </div>
</form>
</template>
    
<script>
/* eslint-disable */
import axios from 'axios';

    export default {
    
    name: "MySimpleUpload",
    props: {
      idConsulta: String,
      dataPagamento: String,
    },
    watch: {
        idConsulta(newValue)    {
              alert( "idConsulta: " + newValue );
        }
    },
    data()  {
        return {
            files: "",
            formData: null,
            nomeArquivo: "",
            tipoArquivo: (this.PATH_ATUAL === 'home') ? 'Comprovante' : 'Imagem'
        }
    },
    computed:    {       
      DADOS_USUARIO()  {
         return this.$store.state.user;
      },
      PATH_ATUAL()
      {
          return this.$route.name;
      }
    },
    methods:    {
        selectFile() {
            this.formData = new FormData();
            
            // Read selected files
            this.files = this.$refs.filesRef.files;
            const totalFiles = this.files.length;

            // Base name for the file
            const baseName = `${this.idConsulta}_${this.dataPagamento}`;

            // Reset the file name
            this.nomeArquivo = "";

            for (let i = 0; i < totalFiles; i++) {
                const file = this.files[i];
                var originalFileName = file.name;

                /*/ Check if the file name matches "comprovante"
                if (!originalFileName.toLowerCase().startsWith("comprovante")) {
                    alert('Apenas arquivos nomeados com "comprovante" são permitidos.');
                    this.$refs.filesRef.value = ''; // Clear the input field
                    return; // Stop further processing
                }*/

                var tipo = file.type;
                tipo = tipo.replace("image/", "");

                //alert( "FILENAME?!? " + originalFileName + " - " + tipo );
                originalFileName = "comprovante";

                // Create a new File object with the new name
                const newFileName = `${baseName}_${originalFileName}.${tipo}`;
                const renamedFile = new File([file], newFileName, { type: file.type });

                // Append the renamed file to FormData
                this.formData.append("files[]", renamedFile);
                this.nomeArquivo = newFileName;
            }
            this.formData.append("userId", this.DADOS_USUARIO.id);
            this.$emit('get-filename', this.nomeArquivo);
        },
        selectImageFile() {
            this.formData = new FormData();
            
            // Read selected files
            this.files = this.$refs.filesRef.files;
            const totalFiles = this.files.length;

            // Base name for the file

            // Reset the file name
            this.nomeArquivo = "";

            for (let i = 0; i < totalFiles; i++) {
                const file = this.files[i];
                const originalFileName = file.name;

                // Check if the file name matches "comprovante"
                if (! ( originalFileName.toLowerCase() === "foto.png") ) {
                    // alert('Arquivo deve conter o nome "foto".');
                    this.$bus.emit('showModal', { message: 'Arquivo deve conter o nome "foto" do tipo "png".', msgType: "warning"} );
                    this.$refs.filesRef.value = ''; // Clear the input field
                    return; // Stop further processing
                }

                // Create a new File object with the new name
                const newFileName = `${originalFileName}`;
                const renamedFile = new File([file], newFileName, { type: file.type });

                // Append the renamed file to FormData
                this.formData.append("files[]", renamedFile);
                this.nomeArquivo = newFileName;
            }

            this.formData.append("userId", this.DADOS_USUARIO.id);
            this.$emit('get-filename', this.nomeArquivo);
        },
        async sendFile()  {  

            // alert( "USER_ID : " + this.DADOS_USUARIO.id );
            
            var URL = 'https://paivaservices.com/psibetter/financeiro/upload.php/';
            
             

            console.log( "-- url = " + URL );

            try {
                let response = await axios.post( URL, this.formData );
                console.log('Response:', response.data );
                this.$emit('handle-upload', true );
                
            } catch(err) {
                console.log(err);
            }
        }
    }
    
}  
</script>