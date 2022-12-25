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
      this.allTime = this.getTimeFormat(val);
    },
    "$store.state.hlAudio.currentSongPlayTime"(val) {
      //当前播放时间能整出oneOfTime，进度条数值就加一
      this.sliderValue = val / this.oneOfTime;
      if (
        this.getTimeFormat(val) ==
          this.getTimeFormat(this.$store.state.hlAudio.currentSongAllTime) ||
        val == 0
      ) {
        this.currPlayTime = "00:00";
        this.sliderValue = 0;
        this.$store.state.hlAudio.currentSongPlayTime = 0;
      }
      this.currPlayTime = this.getTimeFormat(val);
    },
  },
  methods: {
    //调整时间格式
    getTimeFormat(timeValue) {
      let minute = 0;
      let second = 0;
      minute = parseInt(timeValue / 1000 / 60);
      second = (timeValue % (1000 * 60)) / 1000;

      if (String(second).indexOf(".") > -1) {
        second = second.toFixed(0);
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      return minute + ":" + second;
    },
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

      this.currPlayTime = this.getTimeFormat(
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
