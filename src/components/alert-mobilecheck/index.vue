<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="mobilecheck">
    <h2 class="mobilecheck__title">请输入手机号码进行验证</h2>
    <div class="mobilecheck__form">
      <div class="mobilecheck__form-mobile">
        <input id="mobile"
               type="number"
               v-model="mobile"
               placeholder="请输入手机号"
               @input="isMobileOK">
      </div>
      <div class="mobilecheck__form-sessionid">
        <input id="sessionid"
               type="number"
               v-model.trim="sessionid"
               placeholder="短信验证码">
        <div class="mobilecheck__form-sessionid-btn"
                :disabled="mobileOK">
              <span v-if="startcount" @click="sendsms">发送验证码</span>
              <span v-else>{{count}}s</span>
        </div>
      </div>
      <button class="mobilecheck__form-confirm"
              :disabled="mobileOK"
              @click="login"
              v-if="isRank">登录</button>
      <button class="mobilecheck__form-confirm"
              :disabled="mobileOK"
              @click="confirm"
              v-else>确认投注</button>
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import axios from 'axios';
import api from '@/libs/urlHost';
import { Toast } from 'mint-ui';
import { mapState,mapMutations } from 'vuex';

export default {
  props:{
    guessId:{
      type:[String,Number],
      default:0
    },
    oddId:{
      type:[String,Number],
      default:0
    },
    odds:{
      type:[String,Number],
      default:0
    },
    isRank:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      mobile: '',
      sessionid: '',
      mobileOK:true,
      sessionidOK:true,
      startcount:true,
      count:40,
    }
  },
  computed:{
    ...mapState({
      phone:state=>state.phone
    })
  },
  methods: {
    login(){
      let datas = 'phone='+this.mobile+'&'+'code='+this.sessionid;
      axios.post(api.apiURL.login,datas,{withCredentials:true})
        .then(response=>{
          console.log(response);
          if(response.data.res_code==1){
            Toast(response.data.res_msg);
            this.$emit('closeBox','',false);
            return
          }
          if(response.data.res_code==0){
            let obj={};
            obj.phone = response.data.data.phone;
            obj.login = 0;
            this.changeState(obj);
            this.$emit('closeBox',this.mobile,true);
          }
        })
        .catch(e=>{
          Toast(e);
          this.$emit('closeBox','',false);
        })
    },
    sendsms() {
      var self = this;
      let str = 'phone=' + this.mobile;
      axios.post(api.apiURL.sendsms,str)
        .then(response=> {
          console.log(response);
        })
        .catch(error=> {
          console.log(error);
        });
      this.startcount = false;
      var timer = setInterval(function () {
        if(self.count==0){
          clearInterval(timer);
          self.count = 40;
          self.startcount = true;
        }else{
          self.count--
        }
      },1000)

    },
    confirm() {
      console.log(this.guessId,this.oddId,this.odds);
      let datas = 'phone='+this.mobile+'&'+'code='+this.sessionid;
      axios.post(api.apiURL.login,datas,{withCredentials:true})
        .then(response=>{
          console.log(response);
          if(response.data.res_code==1){
            Toast(response.data.res_msg);
            this.$emit('closeBox','',false);
            return
          }
          if(response.data.res_code==0){
            let obj={};
            obj.phone = response.data.data.phone;
            obj.login = 0;
            this.changeState(obj);
            this.postBet();
          }
        })
        .catch(e=>{
          Toast(e);
          this.$emit('closeBox','',false);
        })

    },
    postBet(){
      let params = 'guess_id='+this.guessId+'&'+'odd_id='+this.oddId+'&'+'odds='+this.odds;
      axios.post(api.apiURL.bet,params,{withCredentials:true})
        .then(response=> {
          console.log("a",response);
          if(response.data.res_code==3016){
            this.openLogin = true;
            return
          }
          if(response.data.res_code==3101){
            this.$emit('closeBox',this.mobile,false,3101);
          }else{
            this.$emit('closeBox',this.mobile,true);
          }
        })
        .catch(error=> {
          console.log(error);
          Toast(error);
          this.$emit('closeBox','',false);
        });
    },
    isMobileOK() {
      this.mobileOK = this.isMobileValid()? false : true;
    },
    isMobileValid() {
      let isValid = /^1[34578][0-9]{9}$/.test(this.mobile);
      return isValid;
    },
    ...mapMutations(['changeState','getLock'])
  }
}
</script>

