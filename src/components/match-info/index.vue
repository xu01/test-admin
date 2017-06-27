<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="match-info">
    <div class="match-info__top">
      <div class="match-info__top-content">
        <div class="match-info__top-content-tab">
          <div :class="['btn',{'active':isBonus}]"
               @click="goBonus">
            竞猜奖励
          </div>
          <div :class="['btn',{'active':isTitle}]"
               @click="goUrl(matchInfo.live_url)"
                v-if="matchInfo.hasLive">
            {{matchInfo.live_name}}
          </div>
          <div :class="['btn',{'active':isRanking}]"
               @click="goRanking">
            排行榜
            <div class="username">
              <span v-if="log">您还未登陆</span>
              <span v-else>{{username}}</span>
            </div>
          </div>
        </div>
        <div class="match-info__top-content-title">
          <img src="../../assets/bg-top-title.png">
        </div>
        <div class="match-info__top-content-sub">
          <div class="tag-left"></div>
          <div class="subtitle">
            {{matchInfo.subtitle}}
          </div>
          <div class="tag-right"></div>
        </div>
        <div class="match-info__top-content-more">
          <div class="more-btn" v-if="hasMore">
            更多竞猜
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import { mobileMasking } from '@/libs/userHelper';
import tabBar from '@/components/tab-bar';
import { mapState,mapActions } from 'vuex';

export default {
  components:{
    tabBar
  },
  props:{
    matchInfo:{
      type:Object,
      default:{}
    },
    needLogin:{
      type:[String,Number],
      default:''
    },
    username:{
      type:String,
      default:''
    }
  },
  computed: {
    log(){
      if(this.needLogin == 0){
        return false
      }else{
        return true
      }
    }
  },
  data () {
    return {
      isBonus: false,
      isTitle: true,
      isRanking: false,
      hasMore:false,
    }
  },
  methods: {
    goUrl(url){
      location.href = url;
    },
    goTitle(){
      router.push({
          name: 'guess-title',
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
    goRanking(){
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
    goBonus(){
      router.push({
          name: 'extend-bonus',
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
  },
  created(){
  }
}
</script>

