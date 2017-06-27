<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="tab-bar">
    <div :class="['btn','more',{'active':isTitle}]"
         @click="goTitle" v-if="hasMore">
      更多竞猜
    </div>
    <div :class="['btn','bonus',{'active':isBonus}]"
         @click="goBonus">
      竞猜奖励
    </div>
    <div :class="['btn','rank',{'active':isRanking}]"
         >
      <span @click="goRanking">排行榜1111</span>
      <!--<div class="username">-->
        <!--<span v-if="needlogin">您还未登陆</span>-->
        <!--<span v-else>{{username}}</span>-->
      <!--</div>-->
    </div>
    </div>
</template>

<script type="text/babel">
import router from '@/router';
import { mobileMasking } from '@/libs/userHelper';
import { mapState,mapActions } from 'vuex';


export default {
  props:{
    isBonus: {
      type:Boolean,
      default:false
    },
    isTitle: {
      type:Boolean,
      default:false
    },
    isRanking: {
      type:Boolean,
      default:false
    },
    needLogin1:{
      type:Boolean,
      default:true
    },
    username1:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      hasMore:false,
      //needLogin:false,
      //mobile:13918088888,
    }
  },
  computed: {
    username(){
      return this.phone;
    },
    ...mapState({
      needlogin:state=>state.login,
      phone:state=>state.phone
    })
  },
  methods: {
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
            username: this.username || 0
          },
          query: {
            ...this.$route.query,
            orderID: this.$route.query.orderID || ''
          }
        });
    },
    goBonus(){
      router.push({
          name: 'extend-bonus'
      });
    },
  }
}
</script>
