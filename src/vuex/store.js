/**
 * Created by linwh on 2017/6/21.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import lockr from 'lockr';

Vue.use(Vuex);

const state = {
  login:1,
  phone:'',
}

const mutations = {
  changeState(state,obj){
    state.login = obj.login;
    state.phone = obj.phone;
  },
  getLock(state){
    if(lockr.get('login')){
      state.login = lockr.get('login');
    }
    state.phone = lockr.get('username');
  }
}

const getters = {

}

const actions = {

}

export default new Vuex.Store({
  state,mutations,getters,actions
})
