<template>
  <v-app>
    IS_MOBILE_APP {{ this.IS_DISPOSITIVO_MOVEL }}
    <v-app-bar v-if="!this.IS_DISPOSITIVO_MOVEL" height="120" app >
      
      <v-container class="fundo">
        <v-row align="center" no-gutters>
          <!-- Logo on the left -->
          <v-col cols="auto">
            <v-img
              class="mx-auto"
              width="150"
              height="auto"
              :src="require('@/assets/logo.jpeg')"
            ></v-img>
          </v-col>
          <v-col class="ml-10" cols="auto">
            <v-toolbar-title>Gestão Clínica em <p>Saúde Mental</p></v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <!-- Navigation buttons -->
          <v-col cols="auto">
            <v-btn text to="/login">Acesso ao Psibetter</v-btn>
            <v-btn text :href="'#sobre'">Sobre</v-btn>
            <v-btn text :href="'#funcionalidades'">Funcionalidades</v-btn>
            <v-btn text :href="'#planos'">Planos</v-btn>
            <v-btn text :href="'#contato'">Contato</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>



    <v-app-bar v-else height="400" app >
      <v-container class="fundo">
        <v-row justify="center" no-gutters>
          <!-- Logo on the left -->
          <v-col cols="auto">
            <v-img
              class="mx-auto"
              width="150"
              height="auto"
              :src="require('@/assets/logo.jpeg')"
            ></v-img>
            <v-toolbar-title class="ma-2" style="font-size: 10;"><b>Gestão Clínica em Saúde Mental</b></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>


        <!-- Navigation buttons -->
        <v-row justify="center">
            <v-btn text to="/login">Acesso ao Psibetter</v-btn>
        </v-row>
        <v-row justify="center">
            <v-btn text :href="'#sobre'">Sobre</v-btn>
        </v-row>
        <v-row justify="center">
            <v-btn text :href="'#funcionalidades'">Funcionalidades</v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn text :href="'#planos'">Planos</v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn text :href="'#contato'">Contato</v-btn>
        </v-row>
        
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row v-if="!this.IS_DISPOSITIVO_MOVEL">
          <v-carousel 
            cycle
            interval="5000"
            show-arrows="hover">
            <v-carousel-item
            :src="require('@/assets/website/banner1.jpeg')"
              cover
            ></v-carousel-item>
            <v-carousel-item
            :src="require('@/assets/website/banner2.jpeg')"
              cover
            ></v-carousel-item>
            <v-carousel-item
            :src="require('@/assets/website/banner3.jpeg')"
              cover
            ></v-carousel-item>
            <v-carousel-item
            :src="require('@/assets/website/banner4.jpeg')"
              cover
            ></v-carousel-item>
            <v-carousel-item
            :src="require('@/assets/website/banner5.jpeg')"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-row>

        <v-row>
          <v-col>

            <!-- #################################################################################### -->
              <!-- #################################################################################### -->
              <!-- ################################## SOBRE/BENEFÍCIOS ################################ -->
              <!-- #################################################################################### -->
              <!-- #################################################################################### -->
            <v-sheet class="py-5" id="sobre">
              <v-subheader><h1  class="titulo"> Sobre o Psibetter </h1></v-subheader>
              <p>Entre em contato para uma demonstração e descubra como o Psibetter pode transformar a administração da sua clínica de psicologia/psiquiatria.</p>
              <br>
              <v-row class="mt-10">
                <!-- Anotações Clínicas -->
                <v-col cols="12" md="4">
                  <v-sheet :elevation="10" class="pa-5">
                    <v-img
                      class="mx-auto" width="100" height="auto"
                      :src="require('@/assets/website/registros-icone.jpg')"
                    ></v-img>
                    <h3>1. Anotações Clínicas Rápidas e Eficientes</h3>
                    <p>Registre e gerencie informações clínicas de forma ágil e organizada. Nossa interface intuitiva facilita a documentação rápida e precisa.</p>
                  </v-sheet>
                </v-col>

                <!-- Acesso Flexível -->
                <v-col cols="12" md="4">
                  <v-sheet :elevation="10" class="pa-5">
                    <v-img
                      class="mx-auto" width="100" height="auto"
                      :src="require('@/assets/website/dispositivos-icone.png')"
                    ></v-img>
                    <h3>2. Acesso Flexível em Qualquer Dispositivo</h3>
                    <p>Gerencie sua clínica de qualquer lugar. O Psibetter é acessível de computadores, tablets e celulares, oferecendo flexibilidade total.</p>
                  </v-sheet>
                </v-col>

                <!-- Armazenamento na Nuvem -->
                <v-col cols="12" md="4">
                  <v-sheet :elevation="10" class="pa-5">
                    <v-img
                      class="mx-auto" width="100" height="auto"
                      :src="require('@/assets/website/cloud-icone.png')"
                    ></v-img>
                    <h3>3. Armazenamento Seguro e Centralizado na Nuvem</h3>
                    <p>Centralize todos os seus dados em um só lugar. Mantenha registros seguros e acessíveis na nuvem, garantindo proteção e disponibilidade.</p>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>

            <!-- #################################################################################### -->
            <!-- #################################################################################### -->
            <!-- ################################## FUNCIONALIDADES  ################################ -->
            <!-- #################################################################################### -->
            <!-- #################################################################################### -->

            <!-- Funcionalidades -->
            <v-sheet :elevation="10" class="py-5" id="funcionalidades">
              <v-subheader><h1 class="titulo">Funcionalidades do Psibetter</h1></v-subheader>
              <p>Explore as principais funcionalidades do Psibetter e descubra como nossa solução pode otimizar a gestão da sua clínica.</p>

              <!-- Prontuário -->
              <v-row no-gutters class="mt-10">
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/prontuario.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-10" >
                    <div class="textoFuncoesDireita">
                    <h2 class="subtitulo">Gestão Centralizada de Prontuários</h2>
                    <p>Armazene de modo centralizado os prontuários de todos seus pacientes com rápido acesso online, em qualquer dispositivo.</p>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>

              <!-- Agenda -->
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <div class="textoFuncoesEsquerda">
                    <h2  class="subtitulo">Agenda de Consultas Intuitiva</h2>
                    <p>Organize e gerencie suas consultas de forma eficiente. Nossa agenda facilita o acompanhamento e a coordenação dos atendimentos.</p>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/agenda.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
              </v-row>

              <!-- Estatísticas -->
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/estatisticas.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <div class="textoFuncoesDireita">
                    <h2  class="subtitulo">Painéis Estatísticos Avançados</h2>
                    <p>Visualize as principais métricas da sua clínica com gráficos intuitivos. Monitore finanças e tendências comportamentais.</p>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>

              <!-- Finanças -->
              <v-row no-gutters >
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <div class="textoFuncoesEsquerda">
                    <h2  class="subtitulo">Gestão Financeira Simplificada</h2>
                    <p>Armazene todos os pagamentos e comprovantes, mantendo um controle financeiro preciso e eficiente.</p>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/financas.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
              </v-row>

              <!-- Registros de Consultas -->
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/registro.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <div class="textoFuncoesDireita">
                    <h2  class="subtitulo">Registro de Consultas</h2>
                    <p>Documente cada atendimento com precisão. Registre detalhes e intervenções, e emita relatórios detalhados.</p>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>

              <!-- Receituário -->
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <div class="textoFuncoesEsquerda">
                    <h2  class="subtitulo">Receituário Eficiente</h2>
                    <p>Emita receitas e prescreva medicamentos de forma prática e organizada.</p>
                  </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <v-sheet class="pa-5">
                    <v-img
                      class="mx-auto" width="250" height="auto"
                      :src="require('@/assets/website/receituario.jpg')"
                    ></v-img>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>


            <!-- #################################################################################### -->
              <!-- #################################################################################### -->
              <!-- ################################## PLANOS ################################ -->
              <!-- #################################################################################### -->
              <!-- #################################################################################### -->
              <v-sheet>
    <v-subheader>
      <h1 class="titulo">Planos</h1>
    </v-subheader>
    <p>
      Customizamos nossa aplicação e serviços para as suas necessidades clínicas, em três planos de serviços.
    </p>
    
    <v-row class="mt-10">
      <!-- Free Plan -->
      <v-col cols="12" md="4">
        <v-sheet :elevation="10" class="pa-5">
          <v-card>
            <v-card-title class="text-h5">Plano Gratuito</v-card-title>
            <v-divider></v-divider>
            <label class="numPacientes"> até 30 pacientes </label>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Cadastro de Prontuários</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Agenda de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Registro de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Gestão Financeira</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Painéis Estatísticos</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Receituário</v-list-item-content>
              </v-list-item>
              
            </v-list>
          </v-card>
          <br>
          <label class="preco"> 0,00 R$/mês </label>
        </v-sheet>
      </v-col>

      <!-- Plus Plan -->
      <v-col cols="12" md="4" id="planos">
        <v-sheet :elevation="10" class="pa-5">
          <v-card>
            <v-card-title class="text-h5">Plano Plus</v-card-title>
            <v-divider></v-divider>
            <label class="numPacientes"> até 50 pacientes </label>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Cadastro de Prontuários</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Agenda de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Registro de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Gestão Financeira</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Painéis Estatísticos</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Receituário</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <br>
          <label class="preco"> 400,00 R$/mês </label>
        </v-sheet>
      </v-col>

      <!-- Premium Plan -->
      <v-col cols="12" md="4">
        <v-sheet :elevation="10" class="pa-5">
          <v-card>
            <v-card-title class="text-h5">Plano Premium</v-card-title>
            <v-divider></v-divider>
            <label class="numPacientes"> até 100 pacientes </label>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Cadastro de Prontuários</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Agenda de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Registro de Consultas</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Gestão Financeira</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Painéis Estatísticos</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Receituário</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <br>
          <label class="ma-10 preco"> 600,00 R$/mês </label>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>


          <!-- Contato -->
          <v-sheet class="py-5" id="contato">
            <v-subheader><h1 class="titulo">Contato</h1></v-subheader>
            <p>Para mais informações ou dúvidas, entre em contato conosco.</p>
            (83) 99612-1818 | paulo.fariaspaiva@gmail.com 
          </v-sheet>


            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'WebSite',
  computed: {
    IS_DISPOSITIVO_MOVEL()    {
        return ( document.documentElement.clientWidth < 620 ) ? true : false;
    },
    USUARIO_AUTENTICADO() 
      {
          return this.$store.state.isUsuAutenticado;
      }, 
      PATH_ATUAL()
      {
          return this.$route.name;
      },
      PATH_ATUAL_PARAM()      {
        return this.$route.query.page; // 'default' is a fallback value
      },
      APLICAR_FUNDO_LOGIN()
      {
          return ( ( this.$route.name == 'login' ) || ( this.$route.name == 'registro-usuario' ) || ( this.$route.name == 'registro-paciente' ) )
      },
      IS_REGISTRAR_USUARIO()
      {
        return ( ( this.PATH_ATUAL == 'registro-usuario' ) && ( !this.USUARIO_AUTENTICADO  ) );
      }, 
  },
  mounted()   {
        if ( !this.USUARIO_AUTENTICADO ) 
        {    
             if ( (  this.PATH_ATUAL != "registro-usuario" ) || (  this.PATH_ATUAL == undefined )  )  { 
                   // alert("indo login");
                   this.$router.push({ path: '/servicos', replace:true  });
             } 
             if ( this.IS_REGISTRAR_USUARIO )  { 
                  this.$router.push({ path: '/registro-usuario', replace:true  });
             }
        }
  }

}

</script>

<style>
html {
  scroll-behavior: smooth;
}

.fundo {
  background: linear-gradient(to left, #5a9e00, #b2e48a); /* Gradient colors */
  width: 100%;
}

 

.textoFuncoesDireita  {
  border-radius: 30px;
  border-width: 2px;
  background: linear-gradient(to right, #ffffff, #caebaf);
  padding: 20px;
}


.textoFuncoesEsquerda {
  border-radius: 30px;
  border-width: 2px;
  background: linear-gradient(to left, #ffffff, #caebaf);
  padding: 20px;
}

.imgFuncoes {
  background: white;
  padding: 10px;
}

.subtitulo {
  font-size: 1.5rem;
}

.titulo {
  color: #66aa0e;
}
.numPacientes {
  font-size: 14px;
  color: red;
}
.preco {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  padding: 10px;
}

@media (max-width: 600px) {
  .textFuncoesDireita, .textFuncoesEsquerda {
    padding: 10px;
  }

  .imgFuncoes img {
    width: 100%;
  }

  h2, h1 {
    font-size: 1.2rem;
  }
}
</style>
