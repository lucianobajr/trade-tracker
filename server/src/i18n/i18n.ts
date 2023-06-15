import i18n from 'i18next';
import expressMiddleware from 'i18next-express-middleware';

i18n
  .use(expressMiddleware.LanguageDetector)
  .init({
    detection: {
      order: ['header'],
      caches: false,
    },
    resources: {
      en: {
        translation: require('./locales/en.json')
      },
      'pt-BR': {
        translation: require('./locales/pt-BR.json')
      }
    },
    fallbackLng: 'en',
    preload: ['en', 'pt-BR'],
    saveMissing: true,
  });

export default i18n;
