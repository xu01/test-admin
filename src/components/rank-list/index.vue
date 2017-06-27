<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="rank-list">
    <div class="rank-list__title">
      <h2>{{activity.full_name}}</h2>
    </div>
    <div class="rank-list__list">
      <div class="head">
        <span class="avator">头像</span>
        <span class="nickname">昵称</span>
        <span class="money">盈利</span>
      </div>
      <ul class="body">
        <div class="user" v-if="userLogin">
          <div class="user-num">
            <div class="decimal">{{ranking}}</div>
          </div>
          <div class="user-avator">
            <img :src="userimg">
          </div>
          <div class="user-nickname">{{username}}</div>
          <div class="user-money">{{usermoney}}</div>
        </div>
        <li class="list" v-for="(item,index) in list">
          <div class="list-num">
            <div class="decimal">{{index+1}}</div>
          </div>
          <div class="list-avator">
            <div class="content">
              <img :src="item.avatar">
            </div>
          </div>
          <div class="list-nickname">{{item.nick}}</div>
          <div class="list-money">{{item.sum_reward}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
  props:{
    activity:{
      type:Object,
      default:{}
    },
    list:{
      type:Array,
      default:[]
    },
    player:{
      type:Array,
      default:[]
    },

  },
  computed:{
    ranking(){
      return this.player[0].rank>99?'99+':this.player[0].rank;
    },
    username(){
      return this.player[0].nick;
    },
    usermoney(){
      return this.player[0].sum_reward;
    },
    userimg(){
      return this.player[0].avatar;
    }
  },
  data () {
    return {
      userLogin:true,
      rankList:[
        {
          avatar:"http://pic.qiantucdn.com/58pic/19/17/72/31m58PICzqg_1024.jpg",
          name:"王小明的华丽熊猫拳熊猫拳熊猫拳熊猫拳",
          money:"800000"
        },
        {
          avatar:"http://pic.qiantucdn.com/58pic/19/17/72/31m58PICzqg_1024.jpg",
          name:"王小明的华丽",
          money:"700000"
        },
        {
          avatar:"http://pic.qiantucdn.com/58pic/19/17/72/31m58PICzqg_1024.jpg",
          name:"王小明的华丽",
          money:"600000"
        },
        {
          avatar:"http://pic.qiantucdn.com/58pic/19/17/72/31m58PICzqg_1024.jpg",
          name:"王小明的华丽",
          money:"4000"
        },
        {
          avatar:"http://pic.qiantucdn.com/58pic/19/17/72/31m58PICzqg_1024.jpg",
          name:"王小明的华丽",
          money:"900"
        },
      ],
      endTime:"2017-06-06 12:00"
    }
  },
  methods: {
    openDetail(prm){
      this.$emit('openDetail',prm);
    }
  },
  created(){

  }
}
</script>

