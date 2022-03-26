import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(router);
app.config.globalProperties.axios=axios;
app.mount('#app');
