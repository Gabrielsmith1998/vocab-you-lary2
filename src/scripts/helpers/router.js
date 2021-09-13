import firebase from 'firebase';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import firebaseConfig from '../../api/apiKeys';
import startApp from '../views/startApp';

const checkLoginStatus = () => {
  // This line initializes your firebase app using the values from your .env file
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      startApp(user);
    } else {
      loginButton();
    }
  });
};

export default checkLoginStatus;