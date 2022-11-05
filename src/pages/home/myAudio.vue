<template>
  <view class="audio">
    <view class="audio_img">
      <img
        src="http://p1.music.126.net/3CiwBcXtsK-uQddowrgWCA==/109951168030415320.jpg"
      />
    </view>
    <view class="audio_name">
      <text>because of you</text>
    </view>
    <view class="play_btn">
      <img src="" alt="" />
    </view>
    <view class="music_list"></view>
  </view>
</template>
<style lang="scss">
.audio {
  width: 100%;
  height: 100rpx;
  padding: 20rpx;
  display: flex;
  &_img {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50rpx;
    overflow: hidden;
  }
  &_name {
    width: 40%;
    height: 100rpx;
    line-height: 100rpx;
    margin-left: 20rpx;
  }
}
</style>
