<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <toast message="toast meg"></toast>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
       
      </scroll>
       <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

import Toast from 'components/common/toast/Toast'

export default {
    name:"Detail",
    mixins:[itemListenerMixin, backTopMixin],
    data() {
        return {
            iid:'',
            topImages:null,
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            currentIndex:0,

        }
    },
    created(){
        this.iid=this.$route.params.iid
        getDetail(this.iid).then(res=>{
            // console.log(res);
            const data=res.result
            this.topImages=data.itemInfo.topImages

            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services) 

            this.shop=new Shop(data.shopInfo)

            this.detailInfo=data.detailInfo

            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

            if(data.rate.cRate!==0){
                this.commentInfo=data.rate.list[0]
            }

            this.$nextTick(()=>{
                
            })

            // setTimeout(()=>{
            //     this.themeTopYs=[]
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.themeTopYs)
            // },5000)
        })
        getRecommend().then(res=>{
            this.recommends=res.data.list
        })
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
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        Toast
    },
    mounted(){
    },
    updated(){
        
    },
    methods:{
        imgLoad(){
            this.$refs.scroll.refresh()
            
            this.themeTopYs=[]
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                console.log(this.themeTopYs)
        },
        titleClick(index){
            console.log(this.themeTopYs[index]);
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)

        },
        contentScroll(position){
            const positionY=-position.y
            // console.log(positionY);
            let length=this.themeTopYs.length
            for(let i=0;i<length;i++){
                if(this.currentIndex!=i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1)&&positionY>=this.themeTopYs[i])){
                    this.$refs.nav.currentIndex=i
                    this.currentIndex=i
                    // console.log(i);
                }
            }
             this.isShowBackTop=-position.y>1000
        },
        addToCart(){
            const product={}
            product.image=this.topImages[0]
            product.title=this.goods.title
            // product.desc=this.detailInfo.desc
            product.desc=this.goods.desc
            product.price=this.goods.realPrice
            product.iid=this.iid
            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
        }
    }
    
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 20;
    background-color: #fff;
}
.content{
    height: calc(100% - 93px);
}
</style>