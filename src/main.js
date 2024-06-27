 import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import '../node_modules/vuetify/dist/vuetify.min.css';
import { createVuetify } from 'vuetify'
import router from './router/router.js';
import store  from './store/store.js';
import UtilsMixin from '@/utils/UtilsMixin.js'; // Adjust path as necessary
import ListasMixin from '@/utils/ListasMixin.js'; // Adjust path as necessary


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})


// createApp(App).use(vuetify).mount('#app')
const app = createApp(App)

app.config.globalProperties.$APP_NAME = 'Psibetter®';
app.config.globalProperties.$IS_MOBILE_APP = ( document.documentElement.clientWidth < 620 ) ? true : false;	
app.config.globalProperties.$SERVICES_ENDPOINT_URL = "http://localhost/psibetter/services-api.php";
app.config.globalProperties.$DEBUG_ON   = true;


app.config.globalProperties.$PRIMARY_COLOR   = 'lightgreen';
app.config.globalProperties.$SECONDARY_COLOR = '#DCEDC8';
// app.config.globalProperties.$TERCIARY_COLOR  = 


// Register the mixin globally
app.mixin( UtilsMixin );
app.mixin( ListasMixin );

import EventBus from '@/utils/eventBus'; // Adjust the path as necessary
app.use(EventBus);

import calendar from '@/plugins/vuetify';
app.use(calendar);

app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
