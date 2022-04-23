<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control-top" v-show='isTabControlShow' @tabClick='tabClick' ref="tabControl1" ></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'


import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      GoodsListItem,
      Scroll,
      // BackTop,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        isTabControlShow:false,
              
        scrollY:0,
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('new')
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
    },
    mounted(){
      // console.log('mounted');
    },
    activated(){
      this.$bus.$on('itemImageLoad',this.doRefresh)
      this.$refs.scroll.scrollTo(0,this.scrollY*1,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.scrollY=this.$refs.scroll.getScrollY()
      // console.log(this.scrollY);
      this.$bus.$off('itemImageLoad',this.doRefresh)
    },
    methods:{
      /* 事件监听相关方法 */
      tabClick(index){
        switch(index){
          case 0:this.currentType='pop';
          break;
          case 1:this.currentType='new';
          break;
          case 2:this.currentType='sell'

        }
        this.$refs.tabControl.currentIndex=index
        this.$refs.tabControl1.currentIndex=index
      },
      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0,1000)
      // },
      contentScroll(position){
        this.isShowBackTop=-position.y>1000
        this.isTabControlShow=((-position.y)+40)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
      },
      

      /* 网络请求相关方法 */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
          const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
        
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* position: sticky;
    top: 0;
    z-index: 10; */
  }
  tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
  .tab-control-top{
    position:fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
  }
  .content{
    height: calc(100% - 93px);
    /* height: 300px; */
    overflow: hidden;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>