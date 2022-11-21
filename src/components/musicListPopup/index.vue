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
          @click="selectOneSong(item)"
        >
          <view class="container_musics_music_left">
            <hl-icon
              icon="icon-yinfuhao"
              size="50rpx"
              color="red"
              v-if="item.isPlay"
            ></hl-icon>
            <view
              class="container_musics_music_left_content"
              :class="{ container_musics_music_left_active: item.isPlay }"
            >
              <text class="container_musics_music_left_title">{{
                item.name
              }}</text>
              <text class="container_musics_music_left_singer"
                >-{{ item.ar[0].name }}</text
              >
            </view>
          </view>
          <view class="container_musics_music_right">
            <view>X</view>
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
        this.musicList.forEach((i) => {
          i.isPlay = false;
        });
        this.$store.state.hlAudio.currentMusic = val[0];
      }
    },
    "$store.state.hlAudio.currentMusic"(val) {
      this.musicList.forEach((i) => {
        i.isPlay = i.id == val.id;
      });
      this.$forceUpdate();
    },
  },
  methods: {
    open() {
      this.$refs.popup.open("bottom");
      this.$store.state.recommendList.openMusicList = false;
    },
    selectOneSong(item) {
      this.$store.state.hlAudio.currentMusic = item;
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
          display: flex;
          width: 70%;
          &_active {
            color: red;
          }
          &_content {
            width: 60%;
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
        &_right {
          color: rgb(201, 201, 201);
        }
      }
    }
  }
}
</style>
