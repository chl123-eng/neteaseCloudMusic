<template>
  <view class="container">
    <view class="container_currentTime">00:00</view>
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
    };
  },
  watch: {
    "$store.state.hlAudio.currentSongAllTime"(val) {
      //计算等分成一百份，一份时间是多少
      this.oneOfTime = val / 100;

      this.getTimeFormat(val);
    },
  },
  methods: {
    //调整时间格式
    getTimeFormat(timeValue) {
      let time = "";
      let timeArr = [];
      time = (timeValue / 1000 / 60).toFixed(2);
      timeArr = time.split(".");
      if (parseInt(timeArr[0]) < 10) {
        timeArr[0] = "0" + timeArr[0];
      }
      timeArr[1] = (parseInt(timeArr[1]) * 60) / 100;
      if (parseInt(timeArr[1]) < 10) {
        timeArr[1] = timeArr[1] + "0";
      }
      this.allTime = timeArr[0] + ":" + timeArr[1].toFixed(0);
    },
    changeTime(e) {
      this.$store.state.hlAudio.currentSongPlayTime =
        e.detail.value * this.oneOfTime;
      this.getTimeFormat(this.$store.state.hlAudio.currentSongPlayTime);
    },
  },
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
