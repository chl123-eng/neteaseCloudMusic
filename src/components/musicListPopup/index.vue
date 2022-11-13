<template>
  <view>
    <uni-popup ref="popup" type="top" class="musicListPopup">
      <view class="center"></view>
    </uni-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
      musicItem: {},
      musciList: [],
    };
  },
  watch: {
    "$store.state.recommendList.openMusicList"(val) {
      if (val) {
        this.open();
      }
    },
  },
  methods: {
    open() {
      this.$refs.popup.open("top");
      this.$store.state.recommendList.openMusicList = false;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.musicListPopup {
  .center {
    width: 500rpx;
    height: 500rpx;
    background-color: #fff;
  }
}
</style>
