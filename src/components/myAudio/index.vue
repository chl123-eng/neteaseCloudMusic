<template>
  <view class="audio">
    <view class="audio_img" :class="{ musicPic: isPlay }">
      <img :src="currentSong.al.picUrl || currentSong.picUrl" />
    </view>
    <view class="audio_mid">
      <text class="audio_mid_name">{{ currentSong.name }}</text>
      <text class="audio_mid_author">{{
        currentSong.ar[0].name ? `-${currentSong.ar[0].name}` : ""
      }}</text>
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
      currentSongUrl: {},
      currentSong: {},
      currentIndex: 0,
      num: 0, //跳转次数
    };
  },
  watch: {
    "$store.state.hlAudio.currentMusic"(val) {
      this.currentSong = val;
      this.getSongInfo(val.id);
    },
    "$store.state.hlAudio.currentIndex"(val) {
      this.currentIndex = val;
    },
    isPlay(val) {
      this.$store.state.hlAudio.isPlay = val;
    },
  },
  methods: {
    InitAudio() {
      this.$store.state.hlAudio.innerAudioContext =
        this.$store.getters["hlAudio/innerAudioContext"];

      this.currentSong = this.$store.state.hlAudio.currentMusic;
      this.isPlay = this.$store.state.hlAudio.isPlay;
      if (!this.$store.state.hlAudio.currentSongUrl) {
        this.getSongInfo(this.$store.state.hlAudio.currentMusic.id);
      }
    },
    changePlayBtn() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$store.state.hlAudio.innerAudioContext.play();
      } else {
        this.$store.state.hlAudio.innerAudioContext.pause();
      }
    },
    clickMusicList() {
      this.$store.state.recommendList.openMusicList = true;
    },
    //列表播放
    inOrderSongPlay() {
      this.currentIndex =
        this.currentIndex + 1 == this.$store.state.hlAudio.musicList.length
          ? 0
          : this.currentIndex + 1;
      this.$store.state.hlAudio.currentMusic =
        this.$store.state.hlAudio.musicList[this.currentIndex];
    },
    //随机播放
    randomSongPlay() {
      this.currentIndex =
        this.currentIndex + 1 == this.$store.state.hlAudio.musicList.length
          ? 0
          : Math.floor(Math.random() * 20);
      this.$store.state.hlAudio.currentMusic =
        this.$store.state.hlAudio.musicList[this.currentIndex];
    },
    //监听音乐结束
    AudioContextOnEnded() {
      this.$store.state.hlAudio.innerAudioContext.onEnded(() => {
        this.num++;
        if (this.num == 1) {
          if (this.$store.state.hlAudio.playSeq == 2) {
            this.$store.state.hlAudio.innerAudioContext.play();
          } else if (this.$store.state.hlAudio.playSeq == 1) {
            this.inOrderSongPlay();
          } else {
            this.randomSongPlay();
          }
        }
      });
    },
    async getSongInfo(id) {
      const res = await this.$api.$homeApi.getSongUrl(id);
      if (res.code == 200) {
        this.currentSongUrl = res.data[0].url;
        this.$store.state.hlAudio.currentSongUrl = res.data[0].url;
        this.$store.state.hlAudio.innerAudioContext.src =
          this.$store.state.hlAudio.currentSongUrl;
        this.$store.state.hlAudio.innerAudioContext.play();
        this.AudioContextOnEnded();
        this.isPlay = true;
        this.$forceUpdate();
        this.num = 0;
      }
    },
  },
  mounted() {
    this.InitAudio();
  },
};
</script>
<style lang="scss">
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .musicPic {
    animation: App-logo-spin infinite 20s linear;
  }
}
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
