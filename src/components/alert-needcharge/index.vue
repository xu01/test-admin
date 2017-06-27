<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="needCharge">

    <div class="needCharge__title">
      <div class="img"><img v-lazy="img"></div>很遗憾
    </div>
    <div class="needCharge__text">
      当前账户余额不足请到app参与任务获得贝壳
    </div>
    <button class="needCharge__confirm"
             @click="goBack">我知道了</button>
  </div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
  data () {
    return {
      img:'https://gw.alicdn.com/tfs/TB1NUtLRVXXXXcdXVXXXXXXXXXX-122-90.png'
    }
  },
  methods: {
    goBack(){
      this.$emit('goBack','hohoho');
    }
  }
}
</script>

