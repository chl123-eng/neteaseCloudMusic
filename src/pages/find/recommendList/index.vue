<template>
  <view class="container">
    <view class="container_title">
      <text>推荐歌单</text>
    </view>
    <scroll-view
      class="scroll-view_H container_content"
      enable-flex="true"
      scroll-x="true"
    >
      <view
        class="container_content_item"
        v-for="(item, index) in recommendList"
        :key="index"
      >
        <view class="container_content_item_img">
          <img :src="item.picUrl" alt="" />
        </view>

        <view class="container_content_item_text"> {{ item.name }}</view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      recommendList: [],
    };
  },
  methods: {
    async getRecommendList() {
      const res = await this.$api.$homeApi.recommendList(6);
      if (res.code == 200) {
        this.recommendList = res.result;
      }
    },
    async getPlayList() {
      const res = await this.$api.$homeApi.playList("2042205655");
      console.log(res);
    },
    async getSongUrl() {
      const res = await this.$api.$homeApi.getSongUrl("1888168180");
      console.log(res);
    },
  },
  mounted() {
    this.getRecommendList();
    this.getPlayList();
    this.getSongUrl();
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 20rpx;
  padding-top: 1rpx;
  width: 100%;
  height: 400rpx;
  background: #fff;
  border-radius: 20rpx;
  &_title {
    margin: 20rpx 36rpx;
    font-size: 40rpx;
  }
  &_content {
    margin: 20rpx 36rpx;
    width: calc(100vw - 72rpx);
    height: 300rpx;
    display: flex;
    &_item {
      width: 200rpx;
      height: 100%;
      margin-right: 20rpx;
      &_img {
        width: 200rpx;
        height: 200rpx;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20rpx;
        }
      }
      &_text {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        -webkit-line-clamp: 2; //显示几行
        font-size: 25rpx;
        margin-top: 10rpx;
      }
    }
  }
}
</style>
