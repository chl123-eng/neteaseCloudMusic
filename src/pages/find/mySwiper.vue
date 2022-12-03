<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-04 15:22:17
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-03 10:35:45
-->
<template>
  <view class="banner">
    <view class="swiper-box">
      <swiper circular autoplay class="swiper">
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in bannerData"
          :key="index"
        >
          <image :src="item.pic"></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      bannerData: [],
    };
  },
  methods: {
    async getBanner() {
      const { banners } = await this.$api.$homeApi.getBanner();
      this.bannerData = banners;
    },
  },
  mounted() {
    this.getBanner();
  },
};
</script>
<style lang="scss">
.swiper-box {
  image {
    height: 100%;
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.banner {
  .swiper-box {
    margin: 0 32rpx;
    overflow: hidden;
    border-radius: 20rpx;
  }
}
</style>
