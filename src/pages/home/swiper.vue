<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-04 15:22:17
 * @LastEditors: chl
 * @LastEditTime: 2022-11-04 16:30:15
-->
<template>
  <div class="banner">
    <swiper class="swiper-box">
      <swiper-item v-for="(item, index) in bannerData" :key="index">
        <view class="swiper-item" :class="'swiper-item' + index">
          <image :src="item.pic"></image>
        </view>
      </swiper-item>
    </swiper>
  </div>
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
<style lang="scss" scoped>
.swiper-box {
  margin: 0 32rpx;
}
</style>
