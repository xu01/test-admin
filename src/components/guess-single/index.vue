<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess-single">
    <div class="guess-single__title">
      {{matchInfo.matchName}}
    </div>
    <div class="guess-single__content" :style="{backgroundSize:size}">
      <div class="guess-single__content-info">
        <div class="info left">
          <div class="team-logo">
            <img v-lazy="matchInfo.team1_logo">
          </div>
          <p class="team-name">
            {{matchInfo.team1_name}}
          </p>
        </div>
        <div class="mid">
          <div class="mid-time">
            {{matchInfo.start_at}}
          </div>
          <div class="mid-hint">
            {{matchInfo.match_rule}}
          </div>
          <div class="mid-score">
            {{matchInfo.team1_score}}-{{matchInfo.team2_score}}
          </div>
          <div class="mid-hint">
            {{matchInfo.status_msg}}
          </div>
        </div>
        <div class="info right">
          <div class="team-logo">
            <img v-lazy="matchInfo.team2_logo">
          </div>
          <p class="team-name">
            {{matchInfo.team2_name}}
          </p>
        </div>
      </div>
      <div class="guess-single__content-head" v-if="hasSingleBet">
        <div class="guess-single__content-head-text">
          <div class="inner">
            {{singleData.name}}
          </div>
          <div class="star-left">
            <img src="../../assets/star-small.png">
          </div>
          <div class="star-right">
            <img src="../../assets/star-big.png">
          </div>
        </div>
        <div class="guess-single__content-head-sub">
          {{singleData.member_count}}人参与竞猜
        </div>
      </div>
      <div class="guess-single__content-body" v-if="hasSingleBet">
        <div class="box">
          <div class="box-left" @click="openDetail(singleData.first_bet.guessId,singleData.first_bet.id,singleData.first_bet.odds)">
            <h5>{{singleData.first_bet.item.name}}</h5>
            <p>赔率{{singleData.first_bet.odds}}</p>
            <span>{{singleData.first_bet.standfor}}%人竞猜</span>
          </div>
          <div class="box-center" v-if="thirdChoice" @click="openDetail(singleData.second_bet.guessId,singleData.second_bet.id,singleData.second_bet.odds)">
            <h5>{{secondName}}</h5>
            <p>赔率{{secondOdds}}</p>
            <span>{{secondRate}}%人竞猜</span>
          </div>
          <div class="box-right" @click="openDetail(singleData.first_bet.guessId,singleData.first_bet.id,singleData.first_bet.odds)">
            <h5>{{singleData.third_bet.item.name}}</h5>
            <p>赔率{{singleData.third_bet.odds}}</p>
            <span>{{singleData.third_bet.standfor}}%人竞猜</span>
          </div>
        </div>
      </div>
      <div class="guess-single__content-foot" v-if="hasSingleBet">
        <span>{{singleData.status_msg}}</span>截止时间:{{singleData.end_at}}
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import {isExpired, date2str, timeDistance} from '@/libs/dateHelper';


export default {
  props:{
    matchInfo:{
      type:Object,
      default:{}
    },
    hasSingleBet:{
      type:Boolean,
      default:false
    },
    thirdChoice:{
      type:Boolean,
      default:false
    },
    singleData:{
      type:Object,
      default:{}
    },
  },
  computed:{
    size(){
      return this.hasSingleBet?'contain':'cover';
    },
    secondName(){
      if(this.singleData.second_bet){
        return this.singleData.second_bet.item.name
      }else{
        return ''
      }
    },
    secondOdds(){
      if(this.singleData.second_bet){
        return this.singleData.second_bet.odds
      }else{
        return ''
      }
    },
    secondRate(){
      if(this.singleData.second_bet){
        return this.singleData.second_bet.standfor
      }else{
        return ''
      }
    },
  },
  data () {
    return {
      people: '20365',
      cardList:[
        {
          title:"IG",
          betRate:"1.35",
          userRate:"52"
        },
        {
          title:"EG",
          betRate:"2.35",
          userRate:"42"
        },
        {
          title:"BG",
          betRate:"4.35",
          userRate:"32"
        },
        {
          title:"LS",
          betRate:"1.11",
          userRate:"12"
        },
        {
          title:"XD",
          betRate:"3.35",
          userRate:"49"
        },
      ],
      endTime:"2017-06-06 12:00"
    }
  },
  methods: {
    openDetail(...prm){
      this.$emit('openDetail',...prm);
    }
  }
}
</script>

