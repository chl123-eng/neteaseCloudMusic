<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-04 15:22:17
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-02 17:51:10
-->
<template>
  <view class="banner">
    <view class="swiper-box">
      <!-- autoplay -->
      <swiper circular class="swiper">
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
  .swiper {
    width: 100%;
    height: 100%;
    .swiper-item {
    }
  }
}
</style>
<style lang="scss" scoped>
.bannner {
  width: 100vw;
  height: 200rpx;
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 32rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }
}
</style>
