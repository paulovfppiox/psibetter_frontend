/*** 
 * 
 * NOTA: Para usar este eventBus, basta seguir os seguintes passos:
 * 
 * Em qualquer local do projeto (emitir):
 *  this.$bus.emit('showModal', msg );
 * 
 * Em qualquer componente recebedor:
 * this.$bus.on('showModal', ( modalMsg ) => {
     alert('data?! ' + modalMsg ); 
   })
*/

import { reactive } from 'vue';

const eventBus = reactive({
  events: {},
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  },
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
});

/** Usar assim, para ter que importar este arquivo em cada componente que deseja usar este bus. */
// export default eventBus; 

/** Usar assim, para exportar o $bus como variável global. Isso permite usarmos this.$bus */
export default {
    install(app) {
      app.config.globalProperties.$bus = eventBus;
    }
  };