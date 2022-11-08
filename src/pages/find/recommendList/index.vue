<template>
  <view class="container">
    <view class="container_title">
      <text>推荐歌单</text>
    </view>
    <view class="container_content">
      <view class="container_content_items"> </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async getRecommendList() {
      const res = await this.$api.$homeApi.recommendList();
      console.log(res);
    },
    async getPlayList() {
      const res = await this.$api.$homeApi.playList("2042205655");
      console.log(res);
    },
    async getSongUrl() {
      const res = await this.$api.$homeApi.getSongUrl("10562");
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
<style lang="scss">
.container {
  margin-top: 20rpx;
  padding: 36rpx;
  width: 100%;
  height: 400rpx;
  background: #fff;
  border-radius: 20rpx;
  &_title {
    font-size: 40rpx;
    margin-bottom: 36rpx;
  }
}
</style>
