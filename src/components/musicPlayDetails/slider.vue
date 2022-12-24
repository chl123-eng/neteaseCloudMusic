<template>
  <view class="container">
    <view class="container_currentTime">{{ currPlayTime }}</view>
    <slider
      backgroundColor="rgb(201, 197, 197)"
      activeColor="#fff"
      block-size="12"
      style="width: 500rpx"
      @change="changeTime"
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
    };
  },
  watch: {
    "$store.state.hlAudio.currentSongAllTime"(val) {
      //计算等分成一百份，一份时间是多少
      this.oneOfTime = val / 100;

      this.allTime = this.getTimeFormat(val);
    },
    "$store.state.hlAudio.currentSongPlayTime"(val) {
      console.log(val);
      this.currPlayTime = this.getTimeFormat(val);
    },
  },
  methods: {
    //调整时间格式
    getTimeFormat(timeValue) {
      let minute = 0;
      let second = 0;
      minute = parseInt(timeValue / 1000 / 60);
      second = timeValue.toFixed(2) % (1000 * 60);

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
