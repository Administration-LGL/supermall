<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :shopItem=item></cart-list-item>
      </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
    name:'CartList',
    computed:{
        ...mapGetters(['cartList'])
    },
    components:{
        scroll,
        CartListItem
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 93px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>