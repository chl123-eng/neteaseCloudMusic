<template>
  <uni-popup ref="popup" type="bottom" class="musicListPopup">
    <view class="container">
      <view class="container_title">
        <text class="container_title_info">当前播放</text>
        <text class="container_title_num">{{ `()` }}</text>
      </view>
      <view class="container_btns">
        <view class="container_btns_left">
          <hl-icon :icon="iconName" size="40rpx" color="#666"></hl-icon>
          <text class="container_btns_left_info">{{ playMethods }}</text>
        </view>
        <view class="container_btns_right">
          <hl-icon icon="icon-shanchu" size="50rpx" color="#666"></hl-icon>
        </view>
      </view>
      <view class="container_musics">
        <view
          class="container_musics_music"
          v-for="(item, index) in musicList"
          :key="index"
        >
          <view class="container_musics_music_left">
            <view class="container_musics_music_left_title">{{
              item.name
            }}</view>
            <view class="container_musics_music_left_singer"
              >-{{ item.ar[0].name }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script>
export default {
  data() {
    return {
      musicList: [],
      iconName: "icon-liebiaoxunhuan",
      playMethods: "列表播放",
    };
  },
  watch: {
    "$store.state.recommendList.openMusicList"(val) {
      if (val) {
        this.open();
      }
    },
    "$store.state.recommendList.musicList"(val) {
      if (val.length > 0) {
        this.musicList = val;
        console.log(this.musicList);
      }
    },
  },
  methods: {
    open() {
      this.$refs.popup.open("bottom");
      this.$store.state.recommendList.openMusicList = false;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.musicListPopup {
  .container {
    width: 680rpx;
    height: 800rpx;
    margin: 0 auto;
    margin-bottom: 40rpx;
    background-color: #fff;
    border-radius: 30rpx;
    padding: 40rpx 30rpx;
    &_title {
      &_info {
        font-size: 40rpx;
      }
      &_num {
        color: #999;
      }
    }
    &_btns {
      margin: 30rpx 0;
      display: flex;
      justify-content: space-between;
      &_left {
        display: flex;
        &_info {
          margin-left: 10rpx;
          font-size: 34rpx;
          color: rgb(114, 114, 114);
          margin-top: -2rpx;
        }
      }
    }
    &_musics {
      width: 100%;
      height: 670rpx;
      overflow: auto;
      &_music {
        margin: 0 0 30rpx 0;
        display: flex;
        justify-content: space-between;
        &_left {
          width: 70%;
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: noWrap;
          &_singer {
            margin-top: 9rpx;
            font-size: 24rpx;
            color: rgb(114, 114, 114);
          }
        }
      }
    }
  }
}
</style>
