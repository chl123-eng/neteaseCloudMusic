<template>
  <view class="audio">
    <view class="audio_img">
      <img
        src="http://p1.music.126.net/3CiwBcXtsK-uQddowrgWCA==/109951168030415320.jpg"
      />
    </view>
    <view class="audio_mid">
      <text class="audio_mid_name">because of you(因为你)</text>
      <text class="audio_mid_author">-&nbsp;王菲王菲</text>
    </view>
    <view class="audio_playBtn" @click="changePlayBtn">
      <hl-icon
        :icon="!isPlay ? 'icon-bofang' : 'icon-zanting'"
        customClass="iconClass"
        size="50rpx"
      ></hl-icon>
    </view>
    <view class="audio_list">
      <hl-icon icon="icon-yinleliebiao-"></hl-icon>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isPlay: false,
    };
  },
  methods: {
    changePlayBtn() {
      this.isPlay = !this.isPlay;
    },
  },
};
</script>
<style lang="scss">
.audio {
  width: 100%;
  height: 100rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  &_img {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50rpx;
    overflow: hidden;
  }
  &_mid {
    width: 60%;
    height: 100rpx;
    line-height: 100rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: noWrap;
    &_name {
      margin: 0 10rpx 0 20rpx;
    }
  }
  &_playBtn {
    margin-left: 20rpx;
    .iconClass {
      font-size: 40rpx !important;
    }
  }
  &_list {
    position: absolute;
    float: right;
    right: 70rpx;
  }
}
</style>
