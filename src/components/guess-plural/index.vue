<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess-plural">
    <div class="guess-plural__head">
      <div class="guess-plural__head-text">
        <div class="inner">
          {{plurlData.name}}
        </div>
        <div class="star-left">
          <img src="../../assets/star-small.png">
        </div>
        <div class="star-right">
          <img src="../../assets/star-big.png">
        </div>
      </div>
      <div class="guess-plural__head-sub">
          {{plurlData.member_count}}人参与竞猜
      </div>
    </div>
    <div class="guess-plural__content">
      <div class="guess-plural__content-card" v-for="item in plurlData.odds">
        <div class="guess-plural__content-card-text"
             @click="openDetail(item.guessId,item.id,item.odds)">
          <h5>{{item.item.name}}</h5>
          <p>赔率{{item.odds}}</p>
        </div>
        <div class="guess-plural__content-card-sub">
          <p>{{item.standfor}}%人竞猜</p>
        </div>
      </div>
    </div>
    <div class="guess-plural__foot">
      <span>{{plurlData.status_msg}}</span>截止时间:{{plurlData.end_at}}
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import {isExpired, date2str, timeDistance} from '@/libs/dateHelper';

export default {
  props:{
    plurlData:{
      type:Object,
      default:{}
    }
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
    openDetail(...args){
      this.$emit('openDetail',...args);
    }
  }
}
</script>

