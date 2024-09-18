<template>
  <div id="app">

<!--- VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS 
    https://medium.com/@toakshay.official/vue-js-generate-pdf-from-html-f095cf72bff4
    https://medium.com/@toakshay.official/vue-js-generate-pdf-from-html-f095cf72bff4
    https://medium.com/@toakshay.official/vue-js-generate-pdf-from-html-f095cf72bff4
    https://medium.com/@toakshay.official/vue-js-generate-pdf-from-html-f095cf72bff4
    https://medium.com/@toakshay.official/vue-js-generate-pdf-from-html-f095cf72bff4

VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS -->
<!--- VER ISSO DEPOIS -->

    
    <v-btn v-if="( this.PATH_ATUAL == 'receituario')" @click="exportToPDF" style="margin-top:5px" append-icon="mdi-file">
      Emitir Receita
    </v-btn>

    <v-btn v-else size="small" @click="exportToPDF" style="margin-top:5px" append-icon="mdi-file">
      Download Relatório
    </v-btn>

    

    <!-- <v-btn @click="exportToPDF" style="margin-top:5px">
          <i class="fa-solid fa-file-pdf"></i> Download Relatório
    </v-btn>-->
  </div>
</template>

<script>


/* eslint-disable */
import html2pdf from "html2pdf.js";

export default {
  props:  {
      raiz: String
  },
  btnName: {
      type: String,
      required: true
  },
  computed: {

      PATH_ATUAL()
      {
          return this.$route.name;
      },
  }, 
  methods: {
    exportToPDF() {

      var elem = document.getElementById( this.raiz );
      // alert( JSON.stringify( elem ) + "|| " + elem.id );
      elem.style.display = "block";

/*      html2pdf( document.getElementById( this.raiz ), {
				margin: 1,
  			filename: "i-was-html.pdf",
        jsPDF: {
         orientation: 'portrait',
        }
			});*/


      html2pdf() // move your config in the .set({...}) function below
      .set({
        filename: 'test.pdf',
        margin: 5,
        jsPDF: {
          orientation: 'portrait',
        }
      })
      .from( elem ) // Element to print...
      .outputPdf()  // add this to replace implicite .save() method, which triggers file download
      .get('pdf')
      .then(function (pdfObj) {
        pdfObj.autoPrint();
        window.open(pdfObj.output("bloburl"), "F")
      });
          

    },
  },
};
</script>

<style>

</style>