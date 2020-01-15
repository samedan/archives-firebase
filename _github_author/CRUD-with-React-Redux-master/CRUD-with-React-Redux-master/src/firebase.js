var firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyBb378v7ZmE1ymhb2uuo95PERfOMMhAecU',
  authDomain: 'revents-e7a3f.firebaseapp.com',
  databaseURL: 'https://revents-e7a3f.firebaseio.com',
  projectId: 'revents-e7a3f',
  storageBucket: 'revents-e7a3f.appspot.com',
  messagingSenderId: '344739448962',
  appId: '1:344739448962:web:e90b0866b46ead165c8c9b'
};

firebase.initializeApp(config);

export default firebase;
