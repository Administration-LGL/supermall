<template>
  <div class="wraper" ref="wraper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{
            bscroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.bscroll=new BScroll(this.$refs.wraper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        if(this.probeType===2||this.probeType===3){
                this.bscroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })
        }

        if(this.pullUpLoad){
            this.bscroll.on('pullingUp',()=>{
                this.$emit("pullingUp")
            })
        }
    },
    methods:{
        scrollTo(x,y,time=0){
            this.bscroll.scrollTo(x,y,time)
        },
        refresh(){
            this.bscroll.refresh()
        },
        finishPullUp(){
            this.bscroll.finishPullUp()
        }
    }
}
</script>

<style scoped>



</style>