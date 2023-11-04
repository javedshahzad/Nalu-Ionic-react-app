import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import  i18next  from 'i18next';
import CourseInnerOverviewEU from "../public/locales/CourseInnerOverview/en/translation.json"
// import LoginEU from "../public/locales/Login/en/translation.json"

import CourseInnerOverviewDE from "../public/locales/CourseInnerOverview/de/translation.json"
// import LoginDE from "../public/locales/Login/de/translation.json"
import Login from './pages/Login/Login';


// const availableLanguages = ['en','chi'];
// const option ={
//     order:['navigator','htmlTag','path','subdomail'],
//     checkWhitelist: true,
// }

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
const resources = {
  en: {
    translation: CourseInnerOverviewEU,

  },
  de: {
    translation: CourseInnerOverviewDE
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: { 
      useSuspense: false 
    },
   fallbackLng: false,
    lng: 'de',
    resources,

    //debug: true,
    // whitelist: availableLanguages,
    //detection: option,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // debug: true,
    // lng: 'en',
    // // nsSeparator: false,
    // // keySeparator: false,
    // fallbackLng: false,
    // whitelist: availableLanguages,
    // detection: option,
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },

    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json', // Check this path
    // },

  });


export default i18n;