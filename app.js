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
      location.reload();
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};

const checkSignIn = () => {
  currUser === null && (window.location.href = 'login.html');
};

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div 
  >    
    <nav
        x-data="{navbarList : ['LAYOUTS', 'CATEGORY', 'FEATURES', 'TESTIMONIALS' ,'SUPPORT NEW']}"
        class="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      >
        <div class="container-fluid">
          <a class="navbar-brand px-6" href="/index.html">wokiee</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav mx-auto">
              <template x-for="nav in navbarList">
                <li class="nav-item" :key="nav">
                  <a class="nav-link animation-underline" href="/category.html" x-text="nav"></a>
                </li>
              </template>
            </ul>
            <form class="d-flex justify-content-center">
              <button class="btn btn-success btn-purchase m-2" type="submit">PURCHASE WOKIEE</button>
              <div>
                <button
                  class="btn btn-danger m-2"
                  type="button"
                  id="btn-cart"
                  data-bs-toggle="modal"
                  data-bs-target="#cart"
                >
                  <i class="bi bi-cart"></i>
                </button>
                <div
                  class="cart-circle"
                  x-text="cartNumber.reduce((previousValue, currentValue) => previousValue + currentValue.quantity,0)"
                ></div>
              </div>
            </form>
          </div>
        </div>
      </nav>
      </div>
    `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <div class="col">
    <h3>Support System</h3>
    <img
      class="footer__img"
      src="https://images.ctfassets.net/hrltx12pl8hq/31f9j3A3xKasyUMMsuIQO8/6a8708add4cb4505b65b1cee3f2e6996/9db2e04eb42b427f4968ab41009443b906e4eabf-people_men-min.jpg?fit=fill&w=368&h=207"
      alt=""
    />
    <div class="footer__content">
      All requests will be processed manually by our developer or our support staff during
      <div style="font-weight: 700">24 hours (Monday - Friday, 10.00 - 20.00 GMT+2)</div>
      We will try to reply as fast as we can. Will be in touch.
    </div>
    <button class="btn btn-success footer__question">
      <i class="col bi-question-circle-fill" style="padding: 5px"></i>
      ASK A QUESTION
    </button>

    <div class="footer__overwrite">© Wokiee 2022. All Rights Reserved.</div>
    <div class="row d-flex justify-content-center">
      <div class="col-2 d-flex justify-content-center">
        <i class="col bi-facebook"></i>
        <i class="col bi-instagram"></i>
        <i class="col bi-youtube"></i>
      </div>
    </div>
  </div>`;
  }
}
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);

window.getCurrUser = getCurrUser;
window.logOut = logOut;

document.getElementById('btn-login')?.addEventListener('click', signIn);
document.getElementById('btn-buy')?.addEventListener('click', checkSignIn);
