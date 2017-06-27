<script src="router/index.js"></script>
<style lang="less" src="@/styles/common.less"></style>
<style lang="css" src="mint-ui/lib/style.css"></style>
<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
