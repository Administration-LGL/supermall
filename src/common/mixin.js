import { debounce } from './utils'

export const itemListenerMixin = {
    data() {
        return {
            doRefresh: null,
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        this.doRefresh = () => { refresh() }
        this.$bus.$on('itemImageLoad', this.doRefresh)
            // console.log("我是混入的内容");
    },
    activated() {

        this.$refs.scroll.scrollTo(0, this.scrollY * 1, 0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.scrollY = this.$refs.scroll.getScrollY()
            // console.log(this.scrollY);
        this.$bus.$off('itemImageLoad', this.doRefresh)
    },
}

import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,

        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1000)
        },
    },
}