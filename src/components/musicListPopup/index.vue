<template>
  <uni-popup
    ref="popup"
    type="bottom"
    class="musicListPopup"
    @maskClick="maskClick"
  >
    <view class="container">
      <view class="container_title">
        <text class="container_title_info">当前播放</text>
        <text class="container_title_num">{{ `(${musicList.length})` }}</text>
      </view>
      <view class="container_btns">
        <view class="container_btns_left" @click="changePlaySeq">
          <hl-icon :icon="iconName" size="40rpx" color="#666"></hl-icon>
          <text class="container_btns_left_info">{{ playMethods }}</text>
        </view>
      </view>
      <view class="container_musics">
        <view
          class="container_musics_music"
          v-for="(item, index) in musicList"
          :key="index"
          @click="selectOneSong(item, index)"
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
              <text class="container_musics_music_left_singer">{{
                item.ar[0].name ? `-${item.ar[0].name}` : ""
              }}</text>
            </view>
          </view>

          <view class="container_musics_music_right" @click="deleteSong(index)">
            <hl-icon
              icon="icon-shoucang"
              size="40rpx"
              color="#c7c4c4"
            ></hl-icon>
            <view class="container_musics_music_right_delete">X</view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script>
import { changeMusicList, changeCurrentMusic } from "../../utils/changeSong";
export default {
  data() {
    return {
      musicList: [],
      iconName: "icon-liebiaoxunhuan",
      playMethods: "列表播放",
      playSeq: 1,
    };
  },
  watch: {
    "$store.state.hlAudio.playSeq"(val) {
      this.methodsIconChange(val);
    },
    "$store.state.recommendList.openMusicList"(val) {
      if (val) {
        this.open();
      } else {
        this.$refs.popup.close();
      }
    },
    "$store.state.hlAudio.musicList"(val) {
      if (val.length > 0) {
        this.musicList = val;
        this.musicList = changeMusicList(this.musicList);
      }
    },
    "$store.state.hlAudio.currentMusic"(val) {
      this.musicList = changeCurrentMusic(val, this.musicList);
      this.$forceUpdate();
    },
  },
  methods: {
    open() {
      this.$refs.popup.open("bottom");
    },
    selectOneSong(item, index) {
      this.$store.state.hlAudio.currentMusic = item;
      this.$store.state.hlAudio.currentIndex = index;
    },
    methodsIconChange(val) {
      this.playMethods =
        val == 1 ? "列表播放" : val == 2 ? "单曲播放" : "随机播放";
      this.iconName =
        val == 1
          ? "icon-liebiaoxunhuan"
          : val == 2
          ? "icon-danquxunhuan"
          : "icon-suijibofang";
    },
    changePlaySeq() {
      this.playSeq++;
      if (this.playSeq == 4) {
        this.playSeq = 1;
      }
      this.methodsIconChange(this.playSeq);
      this.$store.state.hlAudio.playSeq = this.playSeq;
    },
    //删除
    deleteSong(index) {
      this.musicList.splice(index, 1);
    },
    maskClick() {
      this.$store.state.recommendList.openMusicList = false;
    },
  },
  mounted() {
    this.musicList = this.$store.state.hlAudio.musicList;
    this.playSeq = this.$store.state.hlAudio.playSeq;
    this.methodsIconChange(this.playSeq);
    this.$store.state.recommendList.openMusicList = false;
  },
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
          display: flex;
          &_delete {
            margin-left: 20rpx;
          }
        }
      }
    }
  }
}
</style>
