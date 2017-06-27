<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess-ranking">
    <div class="guess-ranking-tab">
      <tab-bar :isRanking="true"
      ></tab-bar>
    </div>
    <div class="guess-ranking-list">
      <rank-list :activity="activity"
                 :list="list"
                 :player="player"></rank-list>
    </div>
    <guess-rule></guess-rule>
    <div class="padding-bottom"></div>
    <div class="modal" v-if="openAlert"></div>
    <alert-mobilecheck v-if="openAlert"
                       :isRank="true"
                       @closeBox="finishLogin"></alert-mobilecheck>
  </div>
</template>

<script type="text/babel">
import tabBar from '@/components/tab-bar';
import guessRule from '@/components/guess-rule';
import rankList from '@/components/rank-list';
import axios from 'axios';
import api from '@/libs/urlHost';
import alertMobilecheck from '@/components/alert-mobilecheck';
import { Toast } from 'mint-ui';

export default {
  components:{
    tabBar,guessRule,rankList,alertMobilecheck
  },
  data () {
    return {
      openAlert: false,
      activity:{},
      list:[],
      player:[{
        rank:'100',
        nick:'',
        avatar:''
      }]
    }
  },
  methods:{
    checkLogin(){
      this.openAlert = !this.openAlert;
    },
    finishLogin(mobile,success){
      if(success){
        this.getRank(1);
        Toast('登录成功');
      }else{
        Toast('登录失败,请重新登录');
        this.checkLogin();
      }
    },
    getRank(activeID){
      axios.get(api.apiURL.rank+'?activity_id='+activeID,{withCredentials:true})
        .then(response=> {
          let data = response.data.data;
          console.log('b',data);
          if(response.data.res_code==3016){
            this.checkLogin();
          }else{
            this.activity = data.activity;
            this.list = data.list;
            this.player = data.player;
          }
        })
        .catch(error=> {
          console.log(error);
        });
    }
  },
  created(){
    this.getRank(1);
  }
}
</script>

