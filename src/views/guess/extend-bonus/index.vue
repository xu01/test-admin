<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="extend-bonus">
    <div class="extend-bonus-tab">
      <tab-bar :isBonus="true"></tab-bar>
    </div>
    <div class="extend-bonus-list">
      <img v-lazy="src">
    </div>
    <div class="padding-bottom"></div>
  </div>
</template>

<script type="text/babel">
import tabBar from '@/components/tab-bar';

export default {
  components:{
    tabBar
  },
  data () {
    return {
      src: 'https://gw.alicdn.com/tfs/TB19cSPRVXXXXbRXpXXXXXXXXXX-705-893.png'
    }
  }
}
</script>

