<template>
  <view class="audio">
    <view
      class="audio_img"
      :class="{ musicImgRotate: isPlay, pause: !isPlay }"
      @click="openMusicDetail"
    >
      <img :src="currentSong.al.picUrl || currentSong.picUrl" />
    </view>
    <view class="audio_mid" @click="openMusicDetail">
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
    <musicPlayDetails></musicPlayDetails>
  </view>
</template>
<script>
import musicListPopup from "@/components/musicListPopup/index.vue";
import musicPlayDetails from "@/components/musicPlayDetails/index.vue";
export default {
  components: {
    musicListPopup,
    musicPlayDetails,
  },
  data() {
    return {
      isPlay: false,
      currentSongUrl: {},
      currentSong: {},
      currentIndex: 0,
      num: 0, //跳转次数
      timeNum: 0, //监听音乐更新次数
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
    "$store.state.hlAudio.isPlay"(val) {
      this.isPlay = val;
      if (val) {
        this.$store.state.hlAudio.innerAudioContext.play();
      } else {
        this.$store.state.hlAudio.innerAudioContext.pause();
      }
    },
    "$store.state.hlAudio.currentSongPlayTime"(val) {
      this.$store.state.hlAudio.innerAudioContext.seek(val / 1000);
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
        this.$store.state.hlAudio.currentSongAllTime = res.data[0].time;
        this.$store.state.hlAudio.innerAudioContext.src =
          this.$store.state.hlAudio.currentSongUrl;

        this.$store.state.hlAudio.innerAudioContext.onTimeUpdate(() => {
          this.timeNum++;
          if (this.timeNum == 4) {
            this.$store.state.hlAudio.currentSongPlayTime =
              (this.$store.state.hlAudio.currentSongPlayTime + 1) * 1000;
            this.timeNum = 0;
          }
        });
        //选择歌曲立即播放
        // this.$store.state.hlAudio.innerAudioContext.play();
        // this.isPlay = true;
        this.AudioContextOnEnded();

        this.$forceUpdate();
        this.num = 0;
      }
    },
    openMusicDetail() {
      this.$store.state.recommendList.openMusicDetail = true;
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
  .musicImgRotate {
    animation: App-logo-spin infinite 20s linear;
  }
}
.pause {
  -webkit-animation: none !important;
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
    img {
      width: 100%;
      height: 100%;
    }
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
