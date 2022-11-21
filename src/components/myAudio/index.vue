<template>
  <view class="audio">
    <view class="audio_img">
      <img :src="currentSong.al.picUrl" />
    </view>
    <view class="audio_mid">
      <text class="audio_mid_name">{{ currentSong.name }}</text>
      <text class="audio_mid_author">-&nbsp;{{ currentSong.ar[0].name }}</text>
    </view>
    <view class="audio_playBtn" @click="changePlayBtn">
      <hl-icon
        :icon="!isPlay ? 'icon-bofang' : 'icon-zanting'"
        customClass="iconClass"
        size="50rpx"
      ></hl-icon>
    </view>
    <view class="audio_list" @click="clickMusicList">
      <hl-icon icon="icon-yinleliebiao-"></hl-icon>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isPlay: false,
      openMusicList: false,
      currentSongUrl: {},
      currentSong: {},
    };
  },
  watch: {
    "$store.state.hlAudio.currentMusic"(val) {
      this.$store.state.hlAudio.changeMusic++;
      if (this.$store.state.hlAudio.changeMusic == 1) {
        this.$store.state.hlAudio.innerAudioContext =
          this.$store.getters["hlAudio/innerAudioContext"];
      }
      this.currentSong = val;
      this.getSongInfo(val.id);
    },
  },
  methods: {
    changePlayBtn() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$store.state.hlAudio.innerAudioContext.play();
      } else {
        this.$store.state.hlAudio.innerAudioContext.pause();
      }
    },
    clickMusicList() {
      this.openMusicList = !this.openMusicList;
      this.$store.state.recommendList.openMusicList = true;
    },
    async getSongInfo(id) {
      const res = await this.$api.$homeApi.getSongUrl(id);
      if (res.code == 200) {
        this.currentSongUrl = res.data[0].url;
        this.$store.state.hlAudio.currentSongUrl = res.data[0].url;
        this.$store.state.hlAudio.innerAudioContext.src =
          this.$store.state.hlAudio.currentSongUrl;
        this.$store.state.hlAudio.innerAudioContext.play();
        this.isPlay = true;
      }
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
    &_author {
      font-size: 24rpx;
      color: rgb(114, 114, 114);
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
