<template>
  <div class="toast">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    props:{
        message:{type:String,default:''}
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: antiquewhite;
    z-index: 100;
}
</style>