<template>
  <view class="container">
    <view class="container_currentTime">{{ currPlayTime }}</view>
    <slider
      backgroundColor="rgb(201, 197, 197)"
      activeColor="#fff"
      block-size="12"
      style="width: 500rpx"
      @change="changeTime"
      :value="sliderValue"
    ></slider>
    <view class="container_allTime">{{ allTime }}</view>
  </view>
</template>
<script>
import { getTimeFormat } from "../../utils/slider";
export default {
  data() {
    return {
      allTime: 0,
      oneOfTime: 0,
      currPlayTime: "00:00",
      sliderValue: 0, //进度条数值
    };
  },
  watch: {
    "$store.state.hlAudio.currentSongAllTime"(val) {
      //计算等分成一百份，一份时间是多少
      this.oneOfTime = val / 100;
      this.allTime = getTimeFormat(val);
    },
    "$store.state.hlAudio.currentSongPlayTime"(val) {
      //当前播放时间能整出oneOfTime，进度条数值就加一
      this.sliderValue = val / this.oneOfTime;
      if (
        getTimeFormat(val) ==
          getTimeFormat(this.$store.state.hlAudio.currentSongAllTime) ||
        val == 0
      ) {
        this.currPlayTime = "00:00";
        this.sliderValue = 0;
        this.$store.state.hlAudio.currentSongPlayTime = 0;
      }
      this.currPlayTime = getTimeFormat(val);
    },
  },
  methods: {
    changeTime(e) {
      this.$store.state.hlAudio.currentSongPlayTime =
        e.detail.value * this.oneOfTime;
      //定位到当前播放的音乐位置
      this.$store.state.hlAudio.innerAudioContext.seek(
        this.$store.state.hlAudio.currentSongPlayTime / 1000
      );
      this.$store.state.hlAudio.innerAudioContext.onSeeked(() => {
        //解决重新定位音乐后onTimeUpdate失效问题
        this.$store.state.hlAudio.innerAudioContext.pause();
        this.$store.state.hlAudio.innerAudioContext.play();
      });

      this.currPlayTime = getTimeFormat(
        this.$store.state.hlAudio.currentSongPlayTime
      );
    },
  },
  mounted() {},
};
</script>
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
