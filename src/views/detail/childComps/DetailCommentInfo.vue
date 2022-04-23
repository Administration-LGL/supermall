<template>
  <div class="commentInfo" v-if="Object.keys(commentInfo).length !== 0">
    <div class="commentMore">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="commentDetail">
      <div class="userInfo">
        <img :src="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <p class="commentContent">{{ commentInfo.content }}</p>
      <p class="itemInfo">
        {{ showTime(commentInfo.created) }} {{ commentInfo.style }}
      </p>
      <div class="commentImages">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailCommentInfo',  
  props: {
    commentInfo: {
      type: Object,
      default: {},
    },
  },
  methods: {
    showTime(timestamp) {
      let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日";
      // let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      // let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
      // let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

      // let strDate = Y+M+D+h+m+s;
      let strDate = Y + M + D;
      return strDate;
    },
  },
};
</script>

<style scoped>
.commentMore {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #f0f0f0;
}
.commentMore span {
  font-size: 15px;
  padding: 18px 10px;
}
.userInfo img {
  width: 40px;
  border-radius: 20px;
  vertical-align: middle;
  margin: 10px 10px;
}
.userInfo span {
  font-size: 15px;
}
.itemInfo,
.commentContent {
  font-size: 14px;
  line-height: 20px;
  padding: 5px 10px;
}
.itemInfo {
  color: #999494;
}
.commentImages img {
  margin-inline: 10px;
  width: 30%;
}
.commentImages {
  padding-bottom: 20px;
  border-bottom: 5px solid #f2f5f8;
}
</style>