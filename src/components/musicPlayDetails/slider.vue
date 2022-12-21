<template>
  <view class="container">
    <view class="container_currentTime">00:00</view>
    <slider
      backgroundColor="rgb(201, 197, 197)"
      activeColor="#fff"
      block-size="12"
      style="width: 500rpx"
    ></slider>
    <view class="container_allTime">03:08</view>
  </view>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  color: #fff;
  &_currentTime,
  &_allTime {
    font-size: 24rpx;
    line-height: 76rpx;
  }
}
</style>
