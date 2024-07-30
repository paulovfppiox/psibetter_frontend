<template>
<form  @submit.prevent="sendFile" enctype="multipart/form-data">

    <!-- DADOS_USUARIO_oi {{  DADOS_USUARIO  }} -->

    <div class="field">
        <p for="file" class="label"> Upload de comprovante </p>
        
        <input 
            id="uploadfiles"
            type="file" 
            ref="filesRef"
            @change="selectFile"
            />

        <div>
        <v-btn @click='sendFile'> Enviar/Atualizar Comprovante </v-btn>
        </div>
        nome do Arquivo {{ this.nomeArquivo }}
        ID CONSULTA {{ this.idConsulta }}
        DATA PAGMTO {{ this.dataPagamento  }}
    </div>
</form>
</template>
    
<script>
import axios from 'axios';

    export default {
    
    name: "MySimpleUpload",
    props: {
      idConsulta: {
        type: String,
        required: true
      },
      dataPagamento: {
        type: String,
        required: true
      }
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
            nomeArquivo: ""
        }
    },
    computed:    {       
      DADOS_USUARIO()  {
         return this.$store.state.user;
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
                const originalFileName = file.name;

                // Check if the file name matches "comprovante"
                if (!originalFileName.toLowerCase().startsWith("comprovante")) {
                alert('Only files named "comprovante" are allowed.');
                this.$refs.filesRef.value = ''; // Clear the input field
                return; // Stop further processing
                }

                // Create a new File object with the new name
                const newFileName = `${baseName}_${originalFileName}`;
                const renamedFile = new File([file], newFileName, { type: file.type });

                // Append the renamed file to FormData
                this.formData.append("files[]", renamedFile);
                this.nomeArquivo = newFileName;
            }

            this.formData.append("userId", this.DADOS_USUARIO.id);
            this.$emit('get-filename', this.nomeArquivo);
        },
        selectFileOLD() {
            this.formData = new FormData();
            
            // Read selected files
            this.files = this.$refs.filesRef.files;
            const totalfiles = this.files.length;

            //alert( this.idConsulta + "_" + this.dataPagamento );
            const baseName = `${this.idConsulta}_${this.dataPagamento}`;
            
            for (let i = 0; i < totalfiles; i++) {
                // Get the original file
                const file = this.files[i];
                
                // Create a new File object with a new name
                const newFileName = `${baseName}_${file.name}`;

                const renamedFile = new File([file], newFileName, { type: file.type });
                
                // Append the renamed file to FormData
                this.formData.append("files[]", renamedFile);
                this.nomeArquivo = newFileName;
            }
            this.formData.append("userId", this.DADOS_USUARIO.id); 
            this.$emit('get-filename', this.nomeArquivo );
        },
        async sendFile()  {  

            alert( "USER_ID : " + this.DADOS_USUARIO.id );
            alert( "http://184.72.238.232/psibetter/financeiro/upload.php" );
            const URL = 'http://184.72.238.232/psibetter/financeiro/upload.php/';
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