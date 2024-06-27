import { createWebHistory, createRouter } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
 import HomePage from '@/pages/HomePage.vue'
import MeusPacientesPage from '@/pages/MeusPacientesPage.vue'
import RegistroUsuarioPage from '@/pages/RegistroUsuarioPage.vue'
import NovaSenhaPage from '@/pages/NovaSenhaPage.vue'
import MinhaContaPage from '@/pages/MinhaContaPage.vue'
import AgendaPage from '@/pages/AgendaPage.vue'
import ConsultaProntuarioPage from '@/pages/ConsultaProntuarioPage.vue'

const routes = [
    { 
      path: '/login',
      name: 'login',
      component: LoginPage,
      default: true
    },
    { 
      path: '/home',
      name: 'home',
      component: HomePage 
    }, 
    { 
      path: '/meus-pacientes', 
      name: 'meus-pacientes',
      component: MeusPacientesPage 
    },
    { 
      path: '/registro-usuario', 
      name: 'registro-usuario',
      component: RegistroUsuarioPage 
    },
    { 
      path: '/nova-senha', 
      name: 'nova-senha',
      component: NovaSenhaPage 
    },
    { 
      path: '/agenda', 
      name: 'agenda',
      component: AgendaPage 
    },
    { 
      path: '/minha-conta', 
      name: 'minha-conta',
      component: MinhaContaPage 
    },
    { 
      path: '/consulta-prontuario', 
      name: 'consulta-prontuario',
      component: ConsultaProntuarioPage 
    },
]

/*
* NOTA !!! createWebHistory() - Faz com que as páginas/paths funcionem ok. */
const router = createRouter({
    history: createWebHistory(),
    routes,
    mode:'history' /** hash */
})
export default router;

