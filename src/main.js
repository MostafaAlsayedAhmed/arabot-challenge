import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue' // import App from './TemplateMessage.vue';
import router from './router'
import i18n from './i18n';

import './assets/bootstrap/css/bootstrap.min.css'
// import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(pinia);
app.use(i18n);

app.mount('#app')




