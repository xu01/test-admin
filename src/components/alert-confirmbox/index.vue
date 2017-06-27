<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="confirmbox">
    <h2 class="confirmbox__title">确认要投注吗?</h2>
    <div class="confirmbox__confirm">
      <button class="confirmbox__confirm-btn confirmbox__confirm-btn-confirm"
              @click="confirmGuess">确认投注</button>
      <button class="confirmbox__confirm-btn confirmbox__confirm-btn-cancel"
              @click="cancel">取消</button>
    </div>

  </div>
</template>

<script>
import router from '@/router';

export default {
  data () {
    return {

    }
  },
  methods: {
    confirmGuess(){
      console.log('confirm');
    },
    cancel(){
      this.$emit('cancel','heiheihei');
    }
  }
}
</script>

