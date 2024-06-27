// exampleMixin.js
/* eslint-disable */
export const UtilsMixin = {
    data() {
      return {
        mixinMessage: "Hello from the mixin!",
      };
    },
    methods:            
    {
      cifraSenha( senhaPlana ) 
      {
        var cifrada = btoa( senhaPlana );
        console.log("Senha " + senhaPlana + ", cifrada =>> " + cifrada );
        return cifrada;
      },
      decifraSenha( senhaCifrada ) 
      {
        var senhaPlana = atob( senhaCifrada );
        console.log("Senha cifrada " + senhaCifrada + ", plana =>> " + senhaPlana );
        return senhaPlana;
      },
      async getDataHoraAtual( key = 'data' ) /* data, or hora */
      {
            const response = await fetch("https://worldtimeapi.org/api/timezone/UTC");
            const data = await response.json();
            const dta = new Date( data.datetime );

            if ( key == 'hora' )    {
                // Get the time components
                const hours = dta.getHours();
                const minutes = dta.getMinutes();
                const seconds = dta.getSeconds();
                // Format the time

                return `${hours}:${minutes}`;
            } else {
  
                // Extract the date components (year, month, and day)
                const y = dta.getFullYear();
                const m = String(dta.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
                const d = String(dta.getDate()).padStart(2, '0');
    
                // Format the date as "YYYY-MM-DD"
                var date = `${y}-${m}-${d}`; 
                return date;
                 
            }
        },
        /* Calcula a diferença em dias, entre duas datas. */
        difDiasEntreDatas( dateString1, dateString2 )   {
            
            // Convert date strings to Date objects
            let date1 = new Date(dateString1);
            let date2 = new Date(dateString2);

            // Calculate the difference in milliseconds
            let differenceMs = date2 - date1;

            // Convert milliseconds to days
            let differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
            return differenceDays;
        },
        convertDate( date )     
        {
            const [year, month, day] = date.split("-").map(Number);
            return `${year}-${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}`;
        },

        convertUSToBRDate( usDateString ) 
        {
            const parts  =  usDateString.split("-");
            const day    =  parts[2];
            const month  =  parts[1];
            const year   =  parts[0];
            return `${day}/${month}/${year}`;
        },
    },
    created()           {
        // alert("Mixin's created hook called !!!!!!!");
    },
  };
  export default UtilsMixin;
  