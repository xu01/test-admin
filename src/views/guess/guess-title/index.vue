<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess-title">
    <!--<div style="color:#FFF">-->
      <!--hello {{phone}}  {{username}}-->
    <!--</div>-->
    <match-info :matchInfo="matchInfo"
                :needLogin="log"
                :username="username"></match-info>
    <guess-single @openDetail="detail"
                  :matchInfo="matchInfo"
                  :hasSingleBet="hasSingleBet"
                  :thirdChoice="thirdChoice"
                  :singleData="singleData"></guess-single>
    <div v-if="hasPluralBet" v-for="item in plurlData">
      <guess-plural :plurlData="item"
                    @openDetail="detail"></guess-plural>
    </div>
    <div class="nobet" v-if="noBet">
      <no-bet></no-bet>
    </div>
    <guess-rule></guess-rule>
    <div class="padding-bottom"></div>
    <div class="modal" v-if="openAlert" @click="checkMobile"></div>
    <alert-mobilecheck v-if="openLogin"
                       :guessId="guessId"
                       :oddId="oddId"
                       :odds="odds"
                       @closeBox="finishBet"></alert-mobilecheck>
    <alert-confirmbox v-if="openConfirm"
                      @cancel="back"></alert-confirmBox>
    <alert-needcharge v-if="openCharge"
                      @goBack="back"></alert-needcharge>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import matchInfo from '@/components/match-info'
import guessSingle from '@/components/guess-single'
import guessPlural from '@/components/guess-plural'
import guessRule from '@/components/guess-rule'
import noBet from '@/components/no-bet';
import alertMobilecheck from '@/components/alert-mobilecheck';
import alertConfirmbox from '@/components/alert-confirmbox';
import alertNeedcharge from '@/components/alert-needcharge';
import axios from 'axios';
import api from '@/libs/urlHost';
import { date2str,formatDate } from '@/libs/dateHelper';
import { mapState,mapMutations,mapActions } from 'vuex';
import { mobileMasking } from '@/libs/userHelper';
import lockr from 'lockr';
import store from '@/vuex/store';



export default {
  components:{
    alertMobilecheck,alertConfirmbox,alertNeedcharge,matchInfo,guessSingle,guessPlural,guessRule,noBet
  },
  data () {
    return {
      openAlert: false,
      openLogin: false,
      openCharge: false,
      openConfirm: false,
      betParams:{
        guess_id:1,
        odd_id:1,
        odds:1.00,
        bet_num:100,
        bet_type:0
      },
      matchInfo:{},
      hasSingleBet:false,
      hasPluralBet:true,
      singleData:{},
      thirdChoice:false,
      plurlData:[],
      noBet:false,
      guessId:'',
      oddId:'',
      odds:'',
    }
  },
  computed:{
    username(){
      if(this.phone == ''){
        this.getLock();
        if(this.phone == ''){
          return ''
        }
      }else{
        return this.phone;
      }
    },
    log(){
      return this.needlogin;
    },
    ...mapState({
      needlogin:state=>state.login,
      phone:state=>state.phone
    })
  },
  methods: {
    checkMobile(){
      this.openAlert = !this.openAlert;
      this.openLogin = false;
      this.openCharge = false;
      this.openConfirm = false;
    },
    detail(...args){
      this.betting(...args);
      this.checkMobile();
    },
    finishBet(mobile,success,code){
      if(code && code == 3101){
        this.openLogin = false;
        this.openCharge = true;
        this.openConfirm = false;
        /*let obj={};
        obj.phone = mobile;
        obj.login = 0;
        this.changeState(obj);*/
        lockr.set('username',mobile);
        lockr.set('login',0);
      }else{
        this.checkMobile();
        if(success && mobile){

          router.push({
            name: 'guess-success'
          });
        }
      }
    },
    back(string){
      this.checkMobile();
      //this.hoho = string;
    },
    goBonus(){
      router.push({
        name: 'guess-ranking',
        params: {
          ...this.$route.params,
          courseID: this.$route.params.courseID || 0
        },
        query: {
          ...this.$route.query,
          orderID: this.$route.query.orderID || ''
        }
      });
    },
    goTitle(){
      router.push({
        name: 'guess-title'
      });
    },
    goRanking(){
      router.push({
        name: 'guess-ranking'
      });
    },
    getMathInfo(id){
      axios.get(api.apiURL.match+'/'+id)
        .then(response=> {
          let data = response.data.data
          console.log(data);
          if(data.live_info){
            this.matchInfo = {
              subTitle:'',
              matchName:data.match_title,
              team1_name:data.team1.shortname,
              team1_logo:data.team1.logo,
              team2_name:data.team2.shortname,
              team2_logo:data.team2.logo,
              status_msg:data.status_msg,
              team1_score:data.team1_score,
              team2_score:data.team2_score,
              match_rule:data.match_rule,
              start_at:this.formTime(data.start_at),
              subtitle:data.sub_title,
              live_name:data.live_info.name,
              live_url:data.live_info.address,
              hasLive:true,
            }
          }else{
            this.matchInfo = {
              subTitle:'',
              matchName:data.match_title,
              team1_name:data.team1.shortname,
              team1_logo:data.team1.logo,
              team2_name:data.team2.shortname,
              team2_logo:data.team2.logo,
              status_msg:data.status_msg,
              team1_score:data.team1_score,
              team2_score:data.team2_score,
              match_rule:data.match_rule,
              start_at:this.formTime(data.start_at),
              subtitle:data.sub_title,
              hasLive:false,
            }
          }

          //console.log(this.matchInfo);
        })
        .catch(error=> {
          console.log(error);
        });
    },
    getBetInfo(id){
      axios.get(api.apiURL.guessMatch+'/'+id)
        .then(response=> {
          if(response.data.data.length==0){
            this.noBet = true;
            return
          }
          let data = response.data.data
          //console.log(data);
          for(let val of data){
          //for(let i=0;i<data.length;i++){
            if(val.type==1){
            //if(data[i].type==1){
              this.hasSingleBet=true;   //有单项投注
              let info = val.data;
              //let info = data[i].data;
              if(info.guess_odds.length>2){   //有平局选项
                this.thirdChoice = true;
                this.singleData={
                  end_at:this.formTime(info.bet_end_at,true),
                  first_bet:info.guess_odds[0],
                  second_bet:info.guess_odds[1],
                  third_bet:info.guess_odds[2],
                  status_msg:info.status_msg,
                  member_count:info.member_count,
                  name:info.name,
                };
                //console.log(this.singleData);
              }else{                          //无平局选项
                this.singleData={
                  end_at:this.formTime(info.bet_end_at,true),
                  first_bet:info.guess_odds[0],
                  second_bet:'',
                  third_bet:info.guess_odds[1],
                  status_msg:info.status_msg,
                  member_count:info.member_count,
                  name:info.name,
                };
                //console.log(this.singleData);
              }

            }else if(val.type==2){      //有多选项投注
            //}else if(data[i].type==2){      //有多选项投注
              this.hasPluralBet=true;
              let info = val.data;
              //let info = data[i].data;
              let info2 = {
                end_at:this.formTime(info.bet_end_at,true),
                name:info.name,
                member_count:info.member_count,
                status_msg:info.status_msg,
                odds:info.guess_odds,
              }
              this.plurlData.push(info2);
              console.log(this.plurlData);
            }
          }
        })
        .catch(error=> {
          console.log(error);
        })
    },
    betting(...args){
      this.guessId=args[0];
      this.oddId=args[1];
      this.odds=args[2];
      let params = 'guess_id='+args[0]+'&'+'odd_id='+args[1]+'&'+'odds='+args[2];
      axios.post(api.apiURL.bet,params,{withCredentials:true})
        .then(response=> {
          console.log('b',response);
          if(response.data.res_code==3016){
            this.openLogin = true;
            return
          }else if(response.data.res_code==3101){
            this.openCharge = true;
            return
          }else{
            this.checkMobile();
            router.push({
              name: 'guess-success'
            });
          }
        })
        .catch(error=> {
          console.log(error);
        });
    },
    formTime(time,YYYY){
      let outcome = formatDate(time,YYYY);
      return outcome;
    },
    ...mapMutations(['changeState','getLock'])
  },
  created(){
    this.getMathInfo(186);
    this.getBetInfo(33);
    console.log(localStorage.length);
    console.log(store);
  }
}
</script>

