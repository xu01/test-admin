<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess">
    <download-app></download-app>
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">
import router from '@/router';

import downloadApp from '@/components/download-app';


export default {
  components: {
    downloadApp
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

