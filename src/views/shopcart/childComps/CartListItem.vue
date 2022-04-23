<template>
  <div>
      <div class="cartItem">
        <div @click="checkBtn">
      <img
        src="~assets/img/cart/tick.svg"
        alt=""
        :style="{ backgroundColor: shopItem.check ? '#ff8e96' : 'gray' }"
      />
    </div>
    <div><img :src="shopItem.image" alt="" /></div>
    <div>
      <p>{{ shopItem.title }}</p>
      <div class="itemInfo">
        <div>￥{{ getPrice }}</div>
        <div>X{{ shopItem.count }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    props: {
    shopItem: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // isCheck: Boolean,
    };
  },
  // updated() {
  //   this.isCheck = this.shopItem.check;
  // },
  computed: {
    getPrice() {
      return this.shopItem.price * this.shopItem.count;
    },
  },
  methods: {
    //不用在这监听刷新，因为加入购物车和查看购物车不是一个页面，完全可以在购物车activated钩子上更新betterscroll
    // onLoad() {
    //   this.$bus.$emit("cartLoad");
    //   console.log(111);
    // },
    checkBtn() {
      // console.log(this.shopItem.check, this.isCheck);
      // 这里如果考虑回mutation修改的话就太麻烦了，要遍历或者传id做find查找，人懒了，直接本地改了
      // this.$store.commit('checkChange',shopItem)
      this.shopItem.check = !this.shopItem.check;
      if (!this.shopItem.check) {
      }
    },
  },
};
</script>

<style>
.cartItem {
  margin: 10px 10px 0;
  padding-bottom: 10px;
  display: flex;
  border-bottom: 1px solid #dbd9d9;
}
.cartItem img {
  width: 100%;
  border-radius: 10px;
  vertical-align: middle;
}
.cartItem > div:first-child {
  flex: 1;
  display: flex;
  align-items: center;
}
.cartItem > div:first-child > img {
  /* background-color: gray; */
  width: 80%;
}
.cartItem > div:nth-child(2) {
  flex: 3;
}
.cartItem > div:nth-child(3) {
  flex: 8;
}
.cartItem div:nth-child(3) p {
  margin: 5px 10px;
  font-size: 16px;
  line-height: 25px;
  color: #343434;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.itemInfo {
  margin: 30px 10px 0;
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.itemInfo div:first-child {
  color: #eb6d4d;
}
</style>