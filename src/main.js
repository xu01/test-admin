// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./libs/flexible');
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
// supports both of Vue 1.0 and Vue 2.0
import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  /*error: 'dist/error.png',
  loading: 'dist/loading.gif',
  try: 3 // default 1*/
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

//test
/*
class baseModel {
  constructor(options, data) { // class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
  }

  getName() { // class method
    console.log(`Class name: ${this.name}`);
  }
}
class AccountModel extends baseModel {
  constructor(options, data) {
    super({private: true}, ['32113123123', '524214691']); //call the parent method with super
    this.name = 'Account Model';
    this.url +='/accounts/';
  }

  get accountsData() { //calculated attribute getter
    // ... make XHR
    return this.data;
  }
}

let accounts = new AccountModel(5);
accounts.getName();
console.log('Data is %s', accounts.accountsData);
*/
