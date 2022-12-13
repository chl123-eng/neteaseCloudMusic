<template>
  <view class="container">
    <view class="container_title">
      <text>推荐歌曲</text>
      <view class="container_title_btn" @click="play">播放全部</view>
    </view>
    <view class="container_content">
      <swiper class="swiper">
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in recommendSongs"
          :key="index"
        >
          <view
            class="swiper-item_content"
            v-for="(i, iIndex) in item"
            :key="iIndex"
            @click="selectSong(i)"
          >
            <view class="swiper-item_content_left">
              <img :src="i.picUrl" />
            </view>
            <view class="swiper-item_content_right">
              <view class="swiper-item_content_right_songName">{{
                i.name
              }}</view>
              <!-- <view class="swiper-item_content_right_top_singer">&nbsp;-&nbsp;{{
                  i.name
                }}</view> -->
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import {
  playAllMusic,
  selectOneSong,
  changeMusicList,
} from "../../../utils/changeSong.js";
export default {
  data() {
    return {
      resResult: [],
      recommendSongs: [],
    };
  },
  methods: {
    async getRecommendSongs() {
      const res = await this.$api.$homeApi.getRecommendSongs();
      if (res.code == 200) {
        this.resResult = res.result;
        let arr = [];
        res.result.forEach((item, index) => {
          arr.push(item);
          if (index % 3 == 2) {
            this.recommendSongs.push(arr);
            arr = [];
          }
        });
      }
    },
    selectSong(i) {
      selectOneSong(i);
    },
    play() {
      this.$store.state.hlAudio.musicList = this.resResult;

      playAllMusic(this.resResult);
      this.resResult = changeMusicList(this.resResult);
    },
  },
  mounted() {
    this.getRecommendSongs();
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 20rpx;
  padding-top: 1rpx;
  width: 100%;
  height: 450rpx;
  background: #fff;
  border-radius: 20rpx;
  &_title {
    margin: 20rpx 36rpx;
    font-size: 40rpx;
    display: flex;
    justify-content: space-between;
    &_btn {
      font-size: 28rpx;
      width: fit-content;
      padding: 10rpx 20rpx;
      border: 1px solid #eee;
      border-radius: 40rpx;
      display: flex;
    }
  }
  &_content {
    width: 100%;
    height: 100% !important;
    .swiper {
      width: 100%;
      height: 100% !important;
      .swiper-item {
        width: 650rpx !important;
        padding-right: 40rpx;
        &_content {
          width: 100%;
          border-radius: 40rpx;
          display: flex;
          padding: 10rpx 36rpx;
          border-bottom: 1px solid rgb(248, 247, 247);
          &_left {
            width: 120rpx;
            height: 120rpx;
            border-radius: 40rpx;
            img {
              width: 100%;
              height: 100%;
              border-radius: 20rpx;
            }
          }
          &_right {
            margin-left: 20rpx;
            height: 120rpx;
            line-height: 120rpx;
            &_songName {
              width: 500rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 32rpx;
            }
          }
        }
      }
    }
  }
}
</style>
