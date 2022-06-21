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
    x-data ="{
      cartNumber : [],
      userId : '',
      productCategory : [],
      formatMoney(money) {
        return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      },
    }"
    x-init="productCategory = await (await fetch('https://fakestoreapi.com/products')).json()"
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
      <div class="modal fade" id="cart" tabindex="-1" aria-labelledby="cartLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartLabel" x-text="userId?.email"></h5>
            <a class="px-2" onclick="logOut()" data-bs-dismiss="modal" x-text="userId === null ? '' :'log out' "></a>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="cartItems">
              <template x-for="item,idx in cartNumber">
                <template
                  x-if="productCategory.find(productCategory => productCategory.id === item.productId) && item.quantity"
                >
                  <div class="p-2">
                    <div
                      class="row pb-2"
                      x-data="{newProduct : productCategory.find(productCategory => productCategory.id === item.productId)}"
                    >
                      <div class="col align-self-center">
                        <img :src="newProduct.image" style="height: 60px; width: 60px" />
                      </div>
                      <div class="col-3 line-clamp-1 align-self-center">
                        <p x-text="newProduct.title"></p>
                      </div>
                      <div class="col align-self-center">
                        <span x-text="formatMoney(newProduct.price)"></span>
                      </div>
                      <div class="col align-self-center">
                        <i class="bi bi-dash" @click="sumTotal(-newProduct.price), item.quantity--"></i>
                        <span x-text="item.quantity"></span>
                        <i class="bi bi-plus" @click="item.quantity++, sumTotal(newProduct.price)"></i>
                      </div>
                      <div class="col align-self-center">
                        <span
                          x-text="formatMoney(newProduct.price * item.quantity)"
                          x-data="sumTotal(newProduct.price * item.quantity)"
                        ></span>
                      </div>
                    </div>
                    <hr />
                  </div>
                </template>
              </template>
              <div class="container">
                <div class="row total justify-content-between">
                  <div class="col-3 align-self-start">Total</div>
                  <div class="col-3">
                    <span x-money="productPrice" x-text="formatMoney(total)"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" id="btn-buy" class="btn btn-primary" data-bs-dismiss="modal">Buy</button>
          </div>
        </div>
      </div>
    </div>
      </div>
      
    `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div
    class="footer"
    x-data="{
    footer : [{title : 'SHOP', subTitle:['New In','Women','Men','Shoes','Bags & Accessories','Top Brands','Sale & Special Offers','Lookbook']},
    {title : 'INFORMATION', subTitle:['About','Customer Service','Reward Program','Shipping & Returns','Privacy Policy','Bulk Editor','Blog']},
    {title : 'CUSTOMER SERVICE', subTitle:['Search Terms','Advanced Search','Orders and Returns','Contact Us','Theme FAQs','Consultant','Store Locations']}
    ],
    preferCardVisa:'https://cdn.shopify.com/s/files/1/0071/4755/2866/files/',
    listImgCardVisa : ['Visa_Inverted_x32.png?v=1541586136','MasterCard_x32.png?v=1541586157','American-Express_x32.png?v=1541586174','Cirrus_Inverted_x32.png?v=1541586249','Discover_x32.png?v=1541586268','PayPal_x32.png?v=1541586200','Western_Union_x32.png?v=1541586300'],
  }"
  >
    <div class="row text-start px-4">
      <template x-for="f in footer">
        <div class="col">
          <div class="footer__title" x-text="f.title"></div>
          <template x-for="s in f.subTitle">
            <div class="footer__subTitle" x-text="s"></div>
          </template>
        </div>
      </template>
      <div class="col-12 col-sm-8 col-lg-5 col-xl-4">
        <div class="footer__title py-2 py-lg-0">STAY CONNECT</div>
        <div class="row">
          <div class="col py-3 footer__icon">
            <i class="col bi-facebook px-1"></i>
            <i class="col bi-instagram px-1"></i>
            <i class="col bi-youtube px-1"></i>
          </div>
          <div class="col col-sm-7 align-self-center">
            <div class="footer__title">LIKE US ON FACEBOOK</div>
            <div>
              <button class="footer__likeShare btn btn-primary">
                <i class="bi bi-hand-thumbs-up-fill px-1"></i>Like 26k
              </button>
              <button class="footer__likeShare btn btn-primary">Share</button>
            </div>
          </div>
        </div>
        <div class="footer__title py-3">SIGN UP FOR OUR NEWSLETTER</div>
        <div class="row m-0">
          <input
            class="footer__inputForm form-control me-2 py-2"
            placeholder="enter your email address"
            type="text"
          />
          <button class="col-3 col-lg-3 footer__submit btn btn-dark">SUBMIT</button>
        </div>
      </div>
    </div>
    <div class="footer__subTitle">
      <hr />
      <div>
        © 2020 Ella Demo. All Rights Reserved. <br />
        Ecommerce Software by Shopify. Shopify Themes by HaloThemes.com.
      </div>

      <template x-for="visa in listImgCardVisa">
        <img class="footer__cardVisa m-1" :src="preferCardVisa + visa " alt="" />
      </template>
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
