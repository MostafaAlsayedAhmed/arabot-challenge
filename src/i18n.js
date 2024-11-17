import { createI18n } from 'vue-i18n';
// TODO: split the languages into json files, 
// import enUS from '@/data/locales/en_US.json';
// import arSA from '@/data/locales/ar_SA.json'; 

const messages = {
  en_US: {
    templateDetails: {
      title: 'Template Details',
      name: 'Template Name',
      nameHelp: 'Template Name (Maximum 50 charachter) ',
      language: 'Language',
      description: 'Define your template name and language'
    },
    category: {
      title: 'Category',
      description: 'Choose your message template',
      marketing: {
        title: 'Marketing',
        description: 'Send promotions and information about your products, services or business.',
      },
      utility: {
        title: 'Utility',
        description: 'Send messages about an existing order or account.',
      },
    },

    header: {
      title: 'Header',
      type: 'Header Type',
      none: 'None',
      text: 'Text',
      image: 'Image',
      textInput: 'Header Text',
      textHelp: 'Enter the text for your header',
      imageInput: 'Header Image URL',
      imageHelp: 'Enter the URL of your header image'
    },
    body: {
      title: 'Body',
      input: 'Body Text',
      help: 'Enter the main content of your message'
    },
    footer: {
      title: 'Footer',
      input: 'Footer Text',
      help: 'Enter optional footer text (e.g., disclaimers)'
    },
    buttons: {
      title: 'Buttons',
      type: 'Button Type',
      text: 'Button Text',
      url: 'URL',
      call: 'Phone Number',
      add: 'Add Button',
      remove: 'Remove Button'
    },
    preview: {
      title: 'Preview'
    },
    save: 'Save Template'
  },

  ar_SA: {
    templateDetails: {
      title: 'تفاصيل القالب',
      name: 'اسم القالب',
      language: 'اللغة',
      nameHelp: 'أدخل اسمًا لقالبك (بحد أقصى 50 حرفًا)',
      description: 'أدخل اسمًا لقالبك (بحد أقصى 50 حرفًا)',
    },
    category: {
      title: 'الفئة',
      description: 'اختر فئة القالب',
      marketing: {
        title: '654 القالب',
        description: 'Send promotions and information about your products, services or business.',
      },
      utility: {
        title: 'القالب 22',
        description: 'Send messages about an existing order or account.',
      },
    },
    header: {
      title: 'الترويسة',
      type: 'نوع الترويسة',
      none: 'بدون',
      text: 'نص',
      image: 'صورة',
      textInput: 'نص الترويسة',
      textHelp: 'أدخل النص الخاص بالترويسة',
      imageInput: 'رابط صورة الترويسة',
      imageHelp: 'أدخل رابط صورة الترويسة'
    },
    body: {
      title: 'المحتوى',
      input: 'نص المحتوى',
      help: 'أدخل المحتوى الرئيسي لرسالتك'
    },
    footer: {
      title: 'التذييل',
      input: 'نص التذييل',
      help: 'أدخل نص التذييل الاختياري (مثل إخلاء المسؤولية)'
    },
    buttons: {
      title: 'الأزرار',
      type: 'نوع الزر',
      text: 'نص الزر',
      url: 'رابط الموقع',
      call: 'رقم الهاتف',
      add: 'إضافة زر',
      remove: 'إزالة الزر'
    },
    preview: {
      title: 'معاينة'
    },
    save: 'حفظ القالب'
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',

  messages
});

export default i18n;