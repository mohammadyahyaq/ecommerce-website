// this file is resposible for setting up the i18next library, which will locale our website
import i18n from 'i18next';
import Backend from 'i18next-http-backend'; // this package will load the translation based on the user location!
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend).use(languageDetector).use(initReactI18next).init({
    supportedLngs: ['ar', 'en'],
    fallbackLng: 'en',
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        caches: ['cookie']
    },
    backend: {
        loadPath: '/locales/{{lng}}.json'
    }
});

export default i18n;
