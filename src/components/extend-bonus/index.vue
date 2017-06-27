<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="extend-bonus">
    <div class="extend-bonus__title">
      <div class="inner">
        可能获得以下奖励
      </div>
      <div class="star-left">
        <img src="../../assets/star-small.png">
      </div>
      <div class="star-right">
        <img src="../../assets/star-small.png">
      </div>
    </div>
    <ul class="extend-bonus__content">
      <li v-for="item in itemList">
        <div class="box" :style="{backgroundImage: 'url('+item.src+')'}">
          <p>{{item.text}}</p>
        </div>
      </li>
    </ul>
    <div class="extend-bonus__hint">
      <span></span>至Beyond电竞APP福利中心查看更多奖品<span></span>
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import axios from 'axios';

export default {
  props:{
    itemList:{
      type:Array,
      default:[]
    }
  },
  data () {
    return {
      test: ''
    }
  },
  methods: {
    goDownload(){
      console.log('app');
    }
  },
  created(){

  },
}
</script>

