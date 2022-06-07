import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCAgCp4WumIUsBlo9JyCguaz6uD_KXti3Q',
  authDomain: 'fir-auth-ecommerce.firebaseapp.com',
  projectId: 'fir-auth-ecommerce',
  storageBucket: 'fir-auth-ecommerce.appspot.com',
  messagingSenderId: '916278946982',
  appId: '1:916278946982:web:b94ef743d210209c695867',
  measurementId: 'G-4DRXKSDYHS',
});

const auth = getAuth(firebaseApp);
// onAuthStateChanged(auth, (user) => {
//   //   user === null ? (isLogin = false) : (isLogin = true);
// });
let currUser;
const signIn = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Success : ' + userCredential);
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('invalid-user').innerHTML = error.message;
    });
};

onAuthStateChanged(auth, (user) => {
  currUser = user;
});

const getCurrUser = () => currUser;

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};

const checkSignIn = () => {
  currUser === null && (window.location.href = 'login.html');
};

window.getCurrUser = getCurrUser;
window.logOut = logOut;

document.getElementById('btn-login')?.addEventListener('click', signIn);
document.getElementById('btn-buy')?.addEventListener('click', checkSignIn);
