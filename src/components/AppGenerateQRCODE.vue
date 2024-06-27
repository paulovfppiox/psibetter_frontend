<template>
    <main>
       <div class="content">
            <!-- <b-form-input v-model="userId"></b-form-input>  -->
         <div class="qr-container" z-index="99999999999">
              <img id="qr-code" :src="this.QR_CODE"> 
              <p style="background-color: gray; font-size:10px;"><a :href="this.TOKEN" target="_blank"> Confirmar </a></p>
         </div>
       </div>
   </main>
   </template>
   <script>
  
     export default {
        props: 
        {
            idOperacao: 
            {
              type: Number,    
              required: true  
            },  
            matricula: 
            {
              type: Number,    
              required: true  
            },  
        }, 
        name:'AppGenerateQRCODE',
        data() {
            return { 
                TOKEN: '',
                SERVERNAME: '',
            };
        }, 
        mounted()        {

          /*if ( this.$AMBIENTE )   
               this.SERVERNAME = "http://localhost:8888/qrcode/";
          else */
              this.SERVERNAME = "http://paivaservices.com/qrcode/";

          var matStrReversa = this.matricula + "";
          matStrReversa = matStrReversa.split('').reverse().join('');

          if ( this.$route.name == "addOperacoes" )   {
                this.TOKEN = this.SERVERNAME + "confirma-entrega.html?data=" + this.idOperacao + "-" + matStrReversa;
                
          } else {
                this.TOKEN = this.SERVERNAME + "confirma-devolucao.html?data=" + this.idOperacao + "-0";
          }
          // alert("AQUI qrcode!! " + this.TOKEN );
        },
       computed:   {
           QR_CODE()   {
               return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+this.TOKEN;
           }
       },
       
       methods:    { 
       }
     }
     </script>
   
   <style>
   .qr-container { /* Optional container for styling */
    position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
   margin-top:5%;
  display: column; /* New property for flexbox */
  align-items: center; /* New property for vertical centering */
  z-index: 9999999999;
}

.qr-code { /* Your QR code element (e.g., img) */
  width: 500px; /* Adjust as needed */
  height: 500px; /* Adjust as needed */
}
    
   </style>
   