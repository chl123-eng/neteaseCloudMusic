<template>
  <view>
    <view class="container">
      <view class="container_playSeq" @click="changePlaySeq">
        <hl-icon :icon="seqIconName" color="rgb(201, 197, 197)"></hl-icon>
      </view>
      <view class="container_lastOne">
        <hl-icon icon="icon-left" color="rgb(201, 197, 197)"></hl-icon>
      </view>
      <view class="container_play">
        <hl-icon
          :icon="!isPlay ? 'icon-bofang' : 'icon-zanting'"
          color="#fff"
          size="80rpx"
        ></hl-icon>
      </view>
      <view class="container_nextOne">
        <hl-icon icon="icon-right" color="rgb(201, 197, 197)"></hl-icon>
      </view>
      <view class="container_musicList" @click="clickMusicList">
        <hl-icon icon="icon-yinleliebiao-" color="rgb(201, 197, 197)"></hl-icon>
      </view>
    </view>
    <view class="musicPlayPopup">
      <musicList-popup></musicList-popup>
    </view>
  </view>
</template>
<script>
import musicListPopup from "@/components/musicListPopup/index.vue";
export default {
  components: {
    musicListPopup,
  },
  data() {
    return {
      isPlay: false,
      seqIconName: "icon-liebiaoxunhuan",
      playSeq: 1,
    };
  },
  watch: {
    "$store.state.hlAudio.playSeq"(val) {
      this.seqIconName =
        val == 1
          ? "icon-liebiaoxunhuan"
          : val == 2
          ? "icon-danquxunhuan"
          : "icon-suijibofang";
    },
  },
  methods: {
    clickMusicList() {
      this.$store.state.recommendList.openMusicList = true;
    },
    changePlaySeq() {
      this.playSeq++;
      if (this.playSeq == 4) {
        this.playSeq = 1;
      }
      this.$store.state.hlAudio.playSeq = this.playSeq;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  line-height: 100rpx;
}
</style>
