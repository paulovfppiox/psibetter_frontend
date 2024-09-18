<template>
    
    <v-autocomplete 
        v-model="this.medicamento"
        :item-props="itemProps" 
        :items="medicacoes.name" 
        label="Medicamento">
    </v-autocomplete>
  </template>
  <script>
  /* eslint-disable */
  import ListasMixin  from '@/utils/ListasMixin.js'; 
 
  export default {
    mixins: [ListasMixin],
  props: {
        medicamentoStr:      {
            type: String,    
            required: true  
        },   
    }, 
    watch: {
          medicamento(newValue)    {
              // alert( "Valor? ss " + JSON.stringify( newValue ) );
              this.$emit('medicacao-selected', this.medicamento );
          },  
          medicamentoStr( newVal )  {
              this.medicamento = newVal;
              alert("- Medicamento New Val = " + newVal + " || " + this.medicamento );
          }
    },  
    data: () => ({
        medicamento: "",
        itemsXXX: [
        {
      name: "Agomelatina XXXXXXXX",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Amoxapina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Amitriptyline",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Bupropiona",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Citalopram",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Clomipramina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Desipramina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Desvenlafaxina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Doxepina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Duloxetina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Escitalopram",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Fluoxetina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Fluvoxamina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Imipramina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Mirtazapina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Nortriptilina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Paroxetina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Protriptilina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Selegilina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Sertralina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Trazodona",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Trimipramina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Venlafaxina",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Vilazodona",
      type: "ANTIDEPRESSIVO"
    },
    {
      name: "Vortioxetina",
      type: "ANTIDEPRESSIVO"
    },



    /** ANSIOLITICOS */
    {
    name: "Alprazolam",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Buspirona",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Clonazepam",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Clobazam",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Diazepam",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Lorazepam",
    type: "ANSIOLÍTICOS"
    },
    {
    name: "Oxazepam",
    type: "ANSIOLÍTICOS"
    },

/** ESTABILIZADOR DE HUMOR */
    {
      name: "Fenitoína",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Fosfenitoína",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Lamotrigina",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Oxcarbazepina",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Ácido valproico",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Brivaracetam",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Carbamazepina",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Fenobarbital",
      type: "ANTICONV. / ESTAB. HUMOR"
    },
    {
      name: "Lítio",
      type: "ANTICONV. / ESTAB. HUMOR"
    },


    /** ***************** ANTIPSICÓTICOS **************** */
    {
      name: "Aripiprazol Lauroxil",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Asenapina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Brexpiprazol",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Flufenazina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Haloperidol",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Lurasidona",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Perfenazina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Quetiapina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Amissulprida",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Aripiprazol",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Clozapina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Iloperidona",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Olanzapina",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Paliperidona",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Pimozida",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Risperidona",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Ziprasidona",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Zuclopentixol",
      type: "ANTIPSICÓTICOS"
    },
    {
      name: "Tioridazina",
      type: "ANTIPSICÓTICOS"
    }
        ],
      }),
      
      methods: {
        itemProps (item) {
          return {
            title: item.name,
            subtitle: item.type,
          }
        },
      },
    }
  </script>