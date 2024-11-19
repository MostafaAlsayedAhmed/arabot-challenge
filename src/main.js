import { createApp } from 'vue'
import { createPinia } from 'pinia';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import i18n from './i18n';

// Import Bootstrap and Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@/assets/styles/main.scss'


const app = createApp(App)
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia);
app.use(i18n);

app.config.globalProperties.$t = i18n.global.t; // Attach `t` globally - {{ $t('welcome_message') }}

app.mount('#app')




