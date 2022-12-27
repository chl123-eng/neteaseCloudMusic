<template>
  <uni-popup ref="popup" type="bottom" class="musicDetailPopup">
    <view class="container" :style="{ '--bgimg': 'url(' + picUrl + ')' }">
      <view class="container_top">
        <view class="container_top_icon"
          ><hl-icon icon="icon-down" @click="closePopup" color="#fff"></hl-icon
        ></view>
        <view class="container_top_center">
          <view class="container_top_center_name"
            ><scrollText :text="musicName"></scrollText
          ></view>
          <view class="container_top_center_singer">{{ singerName }}</view>
        </view>
      </view>
      <view class="container_center" @click="lyricShow = !lyricShow">
        <view class="container_center_bgImg" v-if="!lyricShow">
          <img src="../../static/img/cd.png" />
        </view>
        <view class="container_center_Img" v-if="!lyricShow">
          <img :src="picUrl" />
        </view>
        <view class="container_center_lyric" v-show="lyricShow">
          <scroll-view
            show-scrollbar="true"
            scroll-y="true"
            class="container_center_lyric_scroll"
            :scroll-top="scrollTop"
            :scroll-with-animation="true"
            @scroll="scroll"
          >
            <view
              class="container_center_lyric_scroll_item"
              v-for="(item, index) in lyricArr"
              :key="index"
              ><view :class="{ lyricIsPlay: item.isPlay }">{{
                item.str
              }}</view></view
            >
          </scroll-view>
        </view>
      </view>
      <!-- 播放线 -->
      <view class="container_playFlag" v-if="lyricShow" @click="selectOnePlay">
        <view class="container_playFlag_line"></view>
        <hl-icon icon="icon-icon-bfq-bofang1x1" color="#cdcdcd"></hl-icon>
      </view>
      <view class="container_bottom">
        <slider></slider>
        <buttons></buttons>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import scrollText from "@/components/common/scrollText";
import slider from "./slider.vue";
import buttons from "./buttons.vue";
import { getSeconds } from "@/utils/slider";
export default {
  components: {
    scrollText,
    slider,
    buttons,
  },

  data() {
    return {
      musicName: "",
      lyricShow: false,
      lyricArr: [],
      singerName: "",
      picUrl: "",
      lyric: "",
      lyricTimeArr: [], //截取后的时间数组
      timeInterval: [0, 0], //当前播放歌词的时间间隔,
      lyricIndex: 0, //匹配到的lyric的index
      scrollTop: 0,
      scrollViewHeight: 100, //滚动视图的高度
      lyricLineHeight: 0,
      selectLyricIndex: 0,
    };
  },
  watch: {
    "$store.state.recommendList.openMusicDetail"(val) {
      if (val) {
        this.$refs.popup.open("bottom");
      } else {
        this.$refs.popup.close();
      }
    },
    "$store.state.hlAudio.currentMusic"(val) {
      this.musicName = val.name;
      this.getSingers();
      this.getLyric();
    },
    "$store.state.hlAudio.currentSongPlayTime"(val) {
      let currentSongPlayTime = (val / 1000).toFixed(0);

      this.lyricTimeArr.forEach((item, index) => {
        if (getSeconds(item) == currentSongPlayTime) {
          this.lyricIndex = index;
          this.timeInterval[0] = currentSongPlayTime;
          this.timeInterval[1] = getSeconds(this.lyricTimeArr[index + 1]);
        }
        if (
          this.timeInterval[0] <=
          currentSongPlayTime <
          this.timeInterval[1]
        ) {
          this.lyricArr[this.lyricIndex].isPlay = true;
        }
      });
      this.lyricArr.forEach((item, index) => {
        if (index != this.lyricIndex) {
          item.isPlay = false;
        }
      });
    },
    lyricIndex() {
      //当前播放的滚动到试视图中央
      this.scrollToMiddle();
    },
  },
  methods: {
    closePopup() {
      this.$store.state.recommendList.openMusicDetail = false;
      this.$refs.popup.close();
    },
    //当前播放歌曲一直高亮在第一行
    scrollToMiddle() {
      this.$nextTick(() => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(".lyricIsPlay")
          .boundingClientRect(() => {
            this.scrollTop = this.lyricIndex * 32;
          })
          .exec();
      });
    },
    async getLyric() {
      this.lyricArr = [];
      this.lyricTimeArr = [];
      this.scrollTop = 0;
      const res = await this.$api.$searchApi.getLyric(
        this.$store.state.hlAudio.currentMusic.id
      );
      if (res.code == 200) {
        this.lyric = res.lrc.lyric;
        this.lyricOperation(this.lyric);
      }
    },
    //获取每行歌词的时间
    lyricOperation(str) {
      let timeArr = []; //未截取的时间数组
      let lyricArr1 = [];

      //获取截取后时间数组操作
      timeArr = str.match(/\[.*?\]/g);
      if (timeArr) {
        timeArr.forEach((item) => {
          this.lyricTimeArr.push(item.substring(1, 6));
        });

        //获取截取后歌词数组操作
        str = str.replace(/\[.*?\]/g, "");
      }

      lyricArr1 = str.split("\n");

      //去空
      lyricArr1.forEach((item, index) => {
        if (!item) {
          lyricArr1.splice(index, 1);
          this.lyricTimeArr.splice(index, 1);
        }
      });

      lyricArr1.forEach((item) => {
        let param = {
          isPlay: false,
          str: item,
        };
        this.lyricArr.push(param);
      });
    },
    //获取歌手\背景图片
    getSingers() {
      let arr = [];
      let singerArr = [];
      if (this.$store.state.hlAudio.currentMusic.song) {
        arr = this.$store.state.hlAudio.currentMusic.song.artists;
        this.picUrl = this.$store.state.hlAudio.currentMusic.picUrl;
      }
      if (this.$store.state.hlAudio.currentMusic.ar) {
        arr = this.$store.state.hlAudio.currentMusic.ar;
        this.picUrl = this.$store.state.hlAudio.currentMusic.al.picUrl;
      }

      arr.forEach((item) => {
        singerArr.push(item.name);
      });
      this.singerName = singerArr.join("/");
    },
    scroll(e) {
      uni
        .createSelectorQuery()
        .in(this)
        .select(".container_center_lyric_scroll_item")
        .boundingClientRect((data) => {
          this.lyricLineHeight = data.height;
        })
        .exec();
      this.lyricArr.forEach((item, index) => {
        if (
          this.lyricLineHeight * index <= e.detail.scrollTop &&
          e.detail.scrollTop <= this.lyricLineHeight * (index + 1)
        ) {
          this.selectLyricIndex = index;
        }
      });
    },
    selectOnePlay() {
      // this.lyricArr.forEach((item, index) => {
      //   if (index != this.selectLyricIndex + 1) {
      //     item.isPlay = false;
      //   }
      // });
      // this.lyricArr[this.selectLyricIndex + 1].isPlay = true;
      this.$store.state.hlAudio.currentSongPlayTime =
        getSeconds(this.lyricTimeArr[this.selectLyricIndex + 1]) * 1000;
      //定位到当前播放的音乐位置
      this.$store.state.hlAudio.innerAudioContext.seek(
        this.$store.state.hlAudio.currentSongPlayTime / 1000
      );
      this.$store.state.hlAudio.innerAudioContext.onSeeked(() => {
        if (this.$store.state.hlAudio.isPlay) {
          //解决重新定位音乐后onTimeUpdate失效问题
          this.$store.state.hlAudio.innerAudioContext.pause();
          this.$store.state.hlAudio.innerAudioContext.play();
        }
      });
    },
  },
  mounted() {
    this.getLyric();
    this.musicName = this.$store.state.hlAudio.currentMusic.name;
    this.getSingers();
  },
};
</script>
<style lang="scss" scoped>
.musicDetailPopup {
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: var(--bgimg) no-repeat;
    background-size: cover;
    background-position: center;
    &_top {
      width: 100%;
      height: 180rpx;
      position: absolute;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      &_icon {
        z-index: 1;
      }
      &_center {
        width: 100%;
        margin-left: -50rpx;
        &_name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 300rpx;
          font-size: 40rpx;
          margin: 0 auto;
          color: rgb(206, 206, 206);
          text-align: center;
        }

        &_singer {
          width: 200rpx;
          margin: 0 auto;
          color: rgb(201, 197, 197);
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &_center {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 15%;
      width: 100%;
      height: 60%;
      &_bgImg {
        margin-top: -200rpx;
        width: 480rpx;
        height: 388rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &_Img {
        position: absolute;
        margin-top: -200rpx;
        width: 200rpx;
        height: 200rpx;
        margin-left: -100rpx;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100rpx;
        }
      }
      &_lyric {
        height: 100%;
        position: absolute;
        color: rgb(201, 197, 197);
        flex-direction: columns !important;
        line-height: 60rpx;
        text-align: center;
        &_scroll {
          height: 100%;
          &_item {
            .lyricIsPlay {
              color: #fff !important;
            }
          }
        }
      }
    }
    &_playFlag {
      position: absolute;
      top: 190rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      &_line {
        height: 1rpx;
        width: 80%;
        background-color: #cdcdcd;
        opacity: 0.3;
      }
    }
    &_bottom {
      position: absolute;
      width: 100%;
      height: 300rpx;
      bottom: 0;
      padding: 30rpx;
      box-sizing: border-box;
    }
  }
  .container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(60px);
  }
}
</style>
