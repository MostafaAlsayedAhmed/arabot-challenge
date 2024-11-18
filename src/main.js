import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue' // import App from './TemplateMessage.vue';
import router from './router'
import i18n from './i18n';

// import '@/assets/styles/main.scss'


const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(pinia);
app.use(i18n);

// Attach `t` globally - {{ $t('welcome_message') }}
app.config.globalProperties.$t = i18n.global.t;

app.mount('#app')




