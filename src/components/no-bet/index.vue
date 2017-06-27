<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="no-bet">
      <div class="no-bet-content">
        <p>{{msg1}}</p>
        <p>{{msg2}}</p>
      </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
  data () {
    return {
      msg1:'当前无比赛竞猜',
      msg2: '请去BEYOND电竞参与更多竞猜'
    }
  },
  methods: {
  }
}
</script>

