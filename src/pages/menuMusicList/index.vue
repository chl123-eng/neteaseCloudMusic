<template>
  <view class="content">
    <view class="content_title">
      <hl-icon icon="icon-fanhuijiantou" color="#fff" @click="goBack"></hl-icon>
      <view class="content_title_name">歌单</view>
    </view>
    <scroll-view scroll-y="true" class="scroll-Y" @scroll="scroll">
      <view
        class="content_profile"
        :style="{ '--bgimg': 'url(' + menuDetails.coverImgUrl + ')' }"
        :class="musicListFixed == true ? 'hidden' : ''"
      >
        <view class="content_profile_left">
          <img :src="menuDetails.coverImgUrl" />
        </view>
        <view class="content_profile_right">
          <view class="content_profile_right_name">
            {{ menuDetails.name }}</view
          >
          <view class="content_profile_right_bottom">
            <view class="content_profile_right_bottom_autorImg">
              <img :src="menuDetails.creator.avatarUrl" />
            </view>
            <view class="content_profile_right_bottom_author">
              {{ menuDetails.creator.nickname }}</view
            >
          </view>

          <view class="content_profile_right_keyWords"> </view>
        </view>
      </view>
      <view
        class="content_musicList"
        :class="musicListFixed == true ? 'isFixed' : ''"
      >
        <view class="content_musicList_title" @click="playAll"> 播放全部 </view>
        <view
          class="content_musicList_list"
          :class="musicListFixed == true ? 'isScroll' : ''"
        >
          <view
            class="content_musicList_list_item"
            v-for="(item, index) in musicList"
            :key="index"
            @click="selectOne(item)"
          >
            <hl-icon
              icon="icon-yinfuhao"
              size="50rpx"
              color="red"
              v-if="item.isPlay"
            ></hl-icon>
            <view class="content_musicList_list_item_index" v-if="!item.isPlay"
              >{{ index + 1 }}
            </view>
            <view class="content_musicList_list_item_right">
              <view
                class="content_musicList_list_item_right_name"
                :class="{
                  content_musicList_list_item_right_name_active: item.isPlay,
                }"
                >{{ item.name }}</view
              >
              <view class="content_musicList_list_item_right_singer">
                <view v-for="(i, index) in item.ar" :key="index">
                  {{ i.name
                  }}<text v-if="index < item.ar.length - 1">/</text></view
                >
              </view>
            </view>
          </view>
        </view>
      </view></scroll-view
    >
    <view class="content_audio" v-if="currentMusic">
      <my-audio></my-audio>
    </view>
  </view>
</template>
<script>
import myAudio from "@/components/myAudio/index.vue";
import {
  selectOneSong,
  changeCurrentMusic,
  changeMusicList,
  playAllMusic,
} from "../../utils/changeSong";
export default {
  components: {
    myAudio,
  },
  data() {
    return {
      menuId: "",
      menuDetails: {},
      musicList: [],
      musicListFixed: false,
      currentMusic: null,
    };
  },
  watch: {
    "$store.state.hlAudio.currentMusic"(val) {
      this.currentMusic = val;
      this.musicList = changeCurrentMusic(val, this.musicList);
      this.$store.state.recommendList.musicList = this.musicList;
      this.$forceUpdate();
    },
  },
  methods: {
    //返回
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    //获取歌单详情
    async getMenuDetails() {
      const res = await this.$api.$homeApi.playList(this.menuId);
      if (res.code == 200) {
        this.menuDetails = res.playlist;
        this.musicList = res.playlist.tracks;
        this.$store.state.recommendList.musicList = this.musicList;
        this.musicList = changeMusicList(this.musicList);
      }
    },
    playAll() {
      this.$store.state.recommendList.musicList = this.musicList;
      this.$store.state.hlAudio.musicList =
        this.$store.state.recommendList.musicList;
      this.musicList = changeMusicList(this.musicList);
      playAllMusic(this.musicList);
    },
    scroll(e) {
      if (e.detail.scrollTop > 50) {
        this.musicListFixed = true;
      } else {
        this.musicListFixed = false;
      }
    },
    selectOne(i) {
      selectOneSong(i);
    },
  },

  onLoad(options) {
    this.menuId = options.id;
  },
  mounted() {
    this.getMenuDetails();
    this.currentMusic = this.$store.state.hlAudio.currentMusic;
  },
};
</script>
<style lang="scss" scoped>
.content_profile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bgimg);
  // background: url("https://p1.music.126.net/WPHAmuqQaaQGIcx199t5XQ==/3272146613241669.jpg");
  background-size: cover;
  // 核心代码：
  filter: blur(150rpx);
  transform: scale(2);
}
.isFixed {
  position: fixed !important;
  top: 100rpx !important;
}
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
  &_title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100rpx;
    position: fixed;
    padding: 0 40rpx;
    z-index: 1;
    color: #fff;
    // opacity: 0.8;
    &_name {
      font-size: 38rpx;
      margin-left: 40rpx;
    }
  }
  .scroll-Y {
    height: 100%;
    .hidden {
      margin-top: -340rpx;
    }
    .isScroll {
      overflow: auto !important;
      height: calc(100vh - 200rpx) !important;
    }
  }
  &_profile {
    width: 100%;
    height: 520rpx;
    padding-top: 140rpx;
    // position: relative;
    overflow: hidden;
    padding-left: 40rpx;
    padding-right: 40rpx;
    box-sizing: border-box;
    &_left {
      width: 200rpx;
      height: 200rpx;
      position: absolute;
      img {
        width: 100%;
        height: 100%;
        border-radius: 40rpx;
      }
    }
    &_right {
      width: calc(100% - 300rpx);
      position: absolute;
      margin-left: 220rpx;
      &_name {
        font-size: 36rpx;
        color: #fff;
      }
      &_bottom {
        height: 60rpx;
        line-height: 60rpx;
        display: flex;
        margin-top: 20rpx;
        &_autorImg {
          width: 50rpx;
          height: 50rpx;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50rpx;
          }
        }
        &_author {
          height: 100%;
          font-size: 28rpx;
          margin-left: 16rpx;
          color: rgb(209, 209, 209);
        }
      }
    }
  }
  &_musicList {
    width: 100%;
    padding-top: 30rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    border-radius: 40rpx 40rpx 0 0;
    position: relative;
    background-color: #fff;
    &_title {
      font-size: 36rpx;
      padding-bottom: 30rpx;
    }
    &_list {
      &_item {
        display: flex;
        width: 100%;
        height: 100rpx;
        margin-bottom: 20rpx;
        &_index {
          margin-right: 30rpx;
          line-height: 100rpx;
          color: rgb(114, 113, 113);
        }
        &_right {
          &_name {
            font-size: 36rpx;
            width: 600rpx;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &_active {
              color: red;
            }
          }
          &_singer {
            display: flex;
            font-size: 26rpx;
            color: rgb(114, 113, 113);
          }
        }
      }
    }
  }
  &_audio {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
  }
}
</style>
