<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- slot 都用div包裹，因为slot是整体被替换，如果在slot设置一些class，
        被传入的标签替换后，不会起作用，传入的标签不包含class，
        用div包裹后，div是不会被替换的，所以后续替换的标签依旧遵循外层div的class
         -->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="isActiveStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    data() {
        return {
            // noActive:true
        }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red',
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      isActiveStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods: {
      itemClick(){
        // console.log('itemClick');
        this.$router.push(this.path)
      }
    },
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    
  }
  .tab-bar-item img{
      height: 24px;
      width: 24px;
      margin-top: 2px;
      vertical-align: middle;
  }
</style>