<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-04 15:22:17
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-05 18:29:21
-->
<template>
  <view class="banner">
    <view class="swiper-box">
      <swiper autoplay circular>
        <swiper-item v-for="(item, index) in bannerData" :key="index">
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
.swiper-box {
  margin: 0 32rpx;
  border-radius: 20rpx;
  overflow: hidden;
}
</style>
