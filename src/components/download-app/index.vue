<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="download-app">
      <div class="download-app-logo">
        <img src="https://gw.alicdn.com/tfs/TB1q4GmRFXXXXcnXVXXXXXXXXXX-111-111.png" alt="logo">
      </div>
      <div class="download-app-text">
        <h2 class="download-app-text-title">
          不一样的电竞
        </h2>
        <p class="download-app-text-sub">
          beyond电竞
        </p>
      </div>
      <div class="download-app-btn" @click="goDownload">
        去下载
      </div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
  data () {
    return {
      downloadUrl: 'beyond.alisports.com/download/app.php'
    }
  },
  methods: {
    goDownload(){
      window.location.href = `http://${this.downloadUrl}`;
    }
  }
}
</script>

