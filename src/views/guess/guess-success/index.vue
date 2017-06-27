<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="guess-success">
    <div class="guess-success__content">
      <div class="guess-success__content-text downapp"
           @click="goDownload">
        <div class="title">
          下载APP
        </div>
        <div class="text">
          <p>下载APP后</p>
          <p>可查看获奖记录</p>
          <p>以及更多奖励哦</p>
        </div>
      </div>
      <div class="guess-success__content-text goranking"
           @click="goRanking">
        <div class="title">
          查看排名
        </div>
        <div class="text">
          <p>有机会免费到场</p>
          <p>观看WESG</p>
          <p>亚洲区中国总决赛</p>
        </div>
      </div>
    </div>
    <extend-bonus :itemList="bonusList"></extend-bonus>
    <download-app></download-app>
    <div class="padding-bottom"></div>
  </div>
</template>

<script type="text/babel">
import router from '@/router';
import downloadApp from '@/components/download-app';
import extendBonus from '@/components/extend-bonus';

export default {
  components: {
    downloadApp,extendBonus
  },
  data () {
    return {
      bonusList: [
        {
          text:'DOTA2-泪水之罐',
          src:'https://gw.alicdn.com/tfs/TB1ppYXRVXXXXXUXXXXXXXXXXXX-160-160.png'
        },
        {
          text:'CS-武器箱钥匙',
          src:'https://gw.alicdn.com/tfs/TB1p85DRVXXXXbPXVXXXXXXXXXX-160-160.png'
        },
        {
          text:'达尔优电竞套装',
          src:'https://gw.alicdn.com/tfs/TB1m3qVRVXXXXb7XpXXXXXXXXXX-160-160.png'
        },
        {
          text:'雷蛇电竞耳机',
          src:'https://gw.alicdn.com/tfs/TB1cLeiRVXXXXaNapXXXXXXXXXX-160-160.png'
        },
      ],
      downloadUrl: 'beyond.alisports.com/download/app.php'
    }
  },
  methods: {
    goBack(){
      history.go(-1);
    },
    goDownload(){
      window.location.href = `http://${this.downloadUrl}`;
    },
    goRanking(){
      router.push({
        name: 'guess-ranking'
      });
    }
  },
  activated(){

  }
}
</script>
