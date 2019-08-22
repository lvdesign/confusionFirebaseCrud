// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { config } from './config';

/* export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBCRaLlgMFosmlDbPkm2xfJ9UB98XsL16I',
    authDomain: 'angularconfusion.firebaseapp.com',
    databaseURL: 'https://angularconfusion.firebaseio.com',
    projectId: 'angularconfusion',
    storageBucket: 'angularconfusion.appspot.com',
    messagingSenderId: '301355377555',
  }
}; */



export const environment = {
  production: false,

  firebase: {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
  }
};



