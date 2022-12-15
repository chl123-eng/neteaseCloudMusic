<template>
  <uni-popup ref="popup" type="bottom" class="musicDetailPopup">
    <view class="container">
      <view class="container_top">
        <view class="container_top_icon"
          ><hl-icon icon="icon-down" @click="closePopup" color="#fff"></hl-icon
        ></view>
        <view class="container_top_center">
          <view class="container_top_center_name"
            ><scrollText :text="musicName"></scrollText
          ></view>
          <view class="container_top_center_singer"
            >林俊杰林俊杰林俊杰林俊杰林俊杰</view
          >
        </view>
      </view>
      <view class="container_center">
        <view class="container_center_bgImg" v-if="!lyricShow">
          <img src="../../static/img/cd.png" />
        </view>
        <view class="container_center_Img" v-if="!lyricShow">
          <img
            src="https://p1.music.126.net/RtN6VzXNzOPAOhCiQSfjkQ==/109951163754607895.jpg"
          />
        </view>
        <view class="container_center_lyric" v-show="lyricShow">
          <view
            class="container_center_lyric_item"
            v-for="(item, index) in lyricArr"
            :key="index"
            >{{ item }}</view
          ></view
        >
      </view>
    </view>
  </uni-popup>
</template>

<script>
import scrollText from "@/components/common/scrollText";
export default {
  components: {
    scrollText,
  },
  watch: {
    "$store.state.recommendList.openMusicDetail"(val) {
      if (val) {
        this.$refs.popup.open("bottom");
      }
    },
  },
  data() {
    return {
      musicName: "答案答案答案答案答案",
      lyricStr:
        "[00:00.000] 作词 : 彭坦↵[00:01.000] 作曲 : 彭坦/吴涛↵[00:02.000] 编曲 : 达达乐队↵[00:03.000] 制作人 : 吴涛/彭坦↵[00:04.000] 主唱/吉他 : 彭坦↵[00:05.000] 吉他 : 吴涛↵[00:06.000] 贝斯 : 魏飞↵[00:07.000] 鼓 : 张明↵[00:08.000] 录音 : 吴涛/王海琛↵[00:09.000] 缩混/母带 : 吴涛↵[00:10.000] 录音棚 : TAO Studio/Modernsky Studio↵[02:09.00]喝一口时间的酒↵[02:13.14]向一阵烟雾里走↵[02:17.49]短暂或者漫长↵[02:21.60]失去就不再拥有↵[02:25.89]你牵着我的手↵[02:30.09]眼光里一片宇宙↵[02:34.38]你要我撕破这网↵[02:38.64]和你奔向自由↵[02:41.58] Hello↵[02:41.76]挣脱纠缠↵[02:45.99]轮回循环↵[02:50.25]丛林的海荆棘的船↵[02:54.51]吹起混沌之帆↵[03:01.92] Hello↵[03:02.04]光阴如泥↵[03:02.94]重塑记忆↵[03:07.20]回到未来寻找意义↵[03:11.49]倒影了无痕迹↵",
      lyricShow: false,
      lyricArr: [],
      musicId: "2006430117",
    };
  },
  methods: {
    closePopup() {
      this.$store.state.recommendList.openMusicDetail = false;
      this.$refs.popup.close();
    },
    async getLyric() {
      const res = await this.$api.$searchApi.getLyric(this.musicId);
      if (res.code == 200) {
        this.lyricOperation(this.lyricStr);
        // this.lyric = this.lyric.replace(/(\n|\r|\r\n|↵)/g, "<br />");

        this.lyricShow = true;
      }
    },
    //获取每行歌词的时间
    lyricOperation(str) {
      let timeArr = []; //未截取的时间数组
      let timeArr1 = []; //截取后的时间数组
      let wordsArr = []; //截取的每行歌词

      //获取截取后时间数组操作
      timeArr = str.match(/\[.*?\]/g);
      timeArr.forEach((item) => {
        timeArr1.push(item.substring(1, 6));
      });

      //获取截取后歌词数组操作
      console.log(str);
      str = str.replace(/\[.*?\]/g, "");
      console.log(str);
      wordsArr = str.match(/(\S*)↵/g);
      console.log(wordsArr);
      wordsArr.forEach((item) => {
        this.lyricArr.push(item.replace(/↵/g, ""));
      });
    },
  },
  mounted() {
    this.$refs.popup.open("bottom");
    this.getLyric();
  },
};
</script>
<style lang="scss" scoped>
.musicDetailPopup {
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url("https://p1.music.126.net/WPHAmuqQaaQGIcx199t5XQ==/3272146613241669.jpg")
      no-repeat;
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
          color: #fff;
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
      &_bgImg {
        margin-top: 80rpx;
        width: 480rpx;
        height: 388rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &_Img {
        position: absolute;
        margin-top: 80rpx;
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
        color: rgb(201, 197, 197);
        flex-direction: columns !important;
      }
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
