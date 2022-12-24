<template>
  <view>
    <view class="container">
      <view class="container_playSeq" @click="changePlaySeq">
        <hl-icon :icon="seqIconName" color="rgb(201, 197, 197)"></hl-icon>
      </view>
      <view class="container_lastOne" @click="playLastOne">
        <hl-icon icon="icon-left" color="rgb(201, 197, 197)"></hl-icon>
      </view>
      <view class="container_play">
        <hl-icon
          :icon="!isPlay ? 'icon-bofang' : 'icon-zanting'"
          color="#fff"
          size="80rpx"
          @click="isPlay = !isPlay"
        ></hl-icon>
      </view>
      <view class="container_nextOne" @click="playNextOne">
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
    isPlay(val) {
      this.$store.state.hlAudio.isPlay = val;
    },
    "$store.state.hlAudio.isPlay"(val) {
      this.isPlay = val;
    },
  },
  methods: {
    clickMusicList() {
      this.$store.state.recommendList.openMusicList = true;
    },
    //改变播放顺序方式
    changePlaySeq() {
      this.playSeq++;
      if (this.playSeq == 4) {
        this.playSeq = 1;
      }
      this.$store.state.hlAudio.playSeq = this.playSeq;
    },
    //播放上一首
    playLastOne() {
      if (this.$store.state.hlAudio.currentIndex == 0) {
        this.$store.state.hlAudio.currentIndex =
          this.$store.state.hlAudio.musicList.length - 1;
      } else {
        this.$store.state.hlAudio.currentIndex = --this.$store.state.hlAudio
          .currentIndex;
      }
      this.$store.state.hlAudio.currentMusic =
        this.$store.state.hlAudio.musicList[
          this.$store.state.hlAudio.currentIndex
        ];
    },
    //播放下一首
    playNextOne() {
      if (
        this.$store.state.hlAudio.currentIndex ==
        this.$store.state.hlAudio.musicList.length - 1
      ) {
        this.$store.state.hlAudio.currentIndex = 0;
      } else {
        this.$store.state.hlAudio.currentIndex = ++this.$store.state.hlAudio
          .currentIndex;
      }
      this.$store.state.hlAudio.currentMusic =
        this.$store.state.hlAudio.musicList[
          this.$store.state.hlAudio.currentIndex
        ];
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
