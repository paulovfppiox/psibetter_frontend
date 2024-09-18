// exampleMixin.js
 import axios from 'axios';

/* eslint-disable */
export const UtilsMixin = {
    data() {
      return {
        mixinMessage: "Hello from the mixin!",
      };
    },
    methods:            
    {
      
      translateCalendar( modoVisaoAtual )           {

        // alert("TRADUZINDO EM " + modoVisaoAtual );

        // ######################################################################
        // Day names translation mapping
        const dayNameMappings = {
          'Sunday': 'Dom',
          'Monday': 'Seg',
          'Tuesday': 'Ter',
          'Wednesday': 'Qua',
          'Thursday': 'Qui',
          'Friday': 'Sex',
          'Saturday': 'Sáb'
        };
  
        // Select all day header cells
        const dayHeaderCells = this.$refs.calendarRef.$el.querySelectorAll('.fc-col-header-cell');
  
        dayHeaderCells.forEach((cell) => {
          const originalDayName = cell.querySelector('.fc-col-header-cell-cushion').getAttribute('aria-label');
          const translatedDayName = dayNameMappings[originalDayName];
          if (translatedDayName) {
            cell.querySelector('.fc-col-header-cell-cushion').innerText = translatedDayName;
          }
        });
  
        // Month names translation
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const translatedMonthNames = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
   
        monthNames.forEach((monthName, index) => {
          const monthTopElements = this.$refs.calendarRef.$el.querySelectorAll(`.fc-month-view .fc-day-top[data-date*='${monthName}']`);
          monthTopElements.forEach((monthTopElement) => {
            translatedMonthNames.forEach((translatedMonthName, translatedIndex) => {
              if (monthTopElement.innerText.includes(monthNames[translatedIndex])) {
                monthTopElement.innerText = monthTopElement.innerText.replace(monthNames[translatedIndex], translatedMonthName);
              }
            });
          });
        });
  
        // ############################# Translate buttons #############################
        const buttonsToTranslate = {
          'fc-prev-button': 'Anterior',
          'fc-next-button': 'Próximo',
          'fc-today-button': 'Hoje',
          'fc-dayGridMonth-button': 'Mês',
          'fc-timeGridWeek-button': 'Semana',
          'fc-timeGridDay-button': 'Dia'
        };
  
        Object.entries(buttonsToTranslate).forEach(([className, translation]) => {
          const buttonElement = this.$refs.calendarRef.$el.querySelector(`.${className}`);
          if (buttonElement) {
            buttonElement.innerText = translation;
          }
        });
        // ########################################################################
        /*const elements = document.querySelectorAll('[id^="fc-dom-"]');
        const anoAtual = new Date().getFullYear();
        var counter = 0;

        elements.forEach(element => {
          // Check if the element is an <h2> and has a specific class, for example
          if ( element.tagName === 'H2' && element.classList.contains('fc-toolbar-title') )
               if (element.textContent.includes("January") ) 
                   element.textContent = 'Janeiro ' + anoAtual;
               if (element.textContent.includes("February") ) 
                   element.textContent = 'Fevereiro ' + anoAtual;    
          });*/

          /* ################################ TRADUZ O TÍTULO DO CALENDÁRIO (Começa com o ID= fc-dom)###################
          if ( ( modoVisaoAtual == "MES" ) || ( modoVisaoAtual == null ) )  {

              const elements = document.querySelectorAll('[id^="fc-dom-"]');
              const anoAtual = new Date().getFullYear();

              elements.forEach(element => {
                if (element.tagName === 'H2' && element.classList.contains('fc-toolbar-title')) {
                  monthNames.forEach((month, index) => {
                    if (element.textContent.includes(month)) {
                      element.textContent = `${translatedMonthNames[index]} ${anoAtual}`;
                    }
                  });
                }
              });
          }*/

      },
      isDataTimeFimMaior( dateTimeIniObject, dateTimeFimObject )  {

          // alert("Comparando datas...");

          // Get time in milliseconds since epoch
          const timeInMillis1 = dateTimeIniObject.getTime();
          const timeInMillis2 = dateTimeFimObject.getTime();

          // Compare the times
          if (timeInMillis1 < timeInMillis2) {
              // console.log("T1 < T2 ");
              return true;
          } else {
            // console.log("T1 >= T2 ");
            return false;
          }
      },
      cifraSenha( senhaPlana ) 
      {
        var cifrada = btoa( senhaPlana );
        //console.log("Senha " + senhaPlana + ", cifrada =>> " + cifrada );
        return cifrada;
      },
      decifraSenha( senhaCifrada ) 
      {
        var senhaPlana = atob( senhaCifrada );
        // console.log("Senha cifrada " + senhaCifrada + ", plana =>> " + senhaPlana );
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
            if ( usDateString != null )   {
                 const parts  =  usDateString.split("-");
                 const day    =  parts[2];
                 const month  =  parts[1];
                 const year   =  parts[0];
                 return `${day}/${month}/${year}`;
            }
            return '-';
        },

        convertBRToUSDate(brDateString) 
        {
          if ( ( brDateString != null ) && ( brDateString != '-' ) )   {
               // Split the Brazilian date string into parts
               const parts = brDateString.split("/");
               const day = parts[0];
               const month = parts[1];
               const year = parts[2];
               // Return the date in USA format (MM-DD-YYYY)
               return `${year}-${month}-${day}`;
          }
          return '-';
        },

        async consultaIDPacienteByNome( usuarioObj, nomePaciente )  {
           /** 3- Consultar o ID do usuário selecionado */
              const dados = {
                "nome" : nomePaciente
            };
            var resp = await usuarioObj.consultarUsuario( dados );
            var idPaciente;
            if ( resp.code == 0 )      {
                 idPaciente = resp.data.id;
                 // alert("Nome: " + nomePaciente + " || ID = " +  idPaciente );
            }
            return idPaciente;
        },
        async consultaPacienteByNome( usuarioObj, nomePaciente )  {
          /** 3- Consultar o ID do usuário selecionado */
             const dados = {
               "nome" : nomePaciente
           };
           var resp = await usuarioObj.consultarUsuario( dados );
           
           if ( resp.code == 0 )      {
                return resp.data;
           }
           return false;
        },
        async consultaDadosUsuario( userEmail )  
        {
          
            var sendData = {
                data:  {
                    entity: 'usuarios',
                    operation: 'consultar',
                    object: {
                        email: userEmail  
                    }
                }
            };
          
            axios.post( this.$SERVICES_ENDPOINT_URL , sendData )
             .then( response => {
               // console.log('-Response DATA Email ?!? == ' + JSON.stringify( response.data ) );
                var responseData = response.data;

                if ( responseData.code == '0' )      {
                     var dadosUser = responseData.data;
                     //console.log("-- Dados User complet? " + JSON.stringify( dadosUser ));
                     this.$store.commit( 'setUser', dadosUser );
                }
            })
        },
        validaData( data )              {
          if ( (data == "0000-00-00" ) || ( data == "00/00/0000" ) ||  (data == null ) || 
               ( data == "dd/mm/aaaa" ) ||  ( data == "" ) )  {
                 return false;
          }
          return true;
        }
    },
    created()           {
        // alert("Mixin's created hook called !!!!!!!");
    },
  };
  export default UtilsMixin;
  