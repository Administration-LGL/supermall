<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name:'BackTop'
}
</script scoped>

<style>
.back-top{
    z-index: 999;
    position: fixed;
    bottom: 60px;
    right: 10px;
}
.back-top img{
    height: 43px;
    width: 43px;
}
</style>