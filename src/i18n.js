import { createI18n } from 'vue-i18n';
// TODO: split the languages into json files, 
import enLocale from '@/data/locales/en_US.json';
import arLocale from '@/data/locales/ar_SA.json';

const messages = {
  en_US: enLocale, 
  ar_SA: arLocale
};

const i18n = createI18n({
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',

  messages
});

export default i18n;