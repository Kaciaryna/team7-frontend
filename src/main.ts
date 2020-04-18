import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {grpc} from "@improbable-eng/grpc-web";

Vue.config.productionTip = false;
grpc.setDefaultTransport(grpc.WebsocketTransport());

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
