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
          <scroll-view scroll-y="true" class="container_center_lyric_scroll">
            <view
              class="container_center_lyric_item"
              v-for="(item, index) in lyricArr"
              :key="index"
              >{{ item }}</view
            >
          </scroll-view>
          <!-- <view class="container_center_lyric_line"></view> -->
        </view>
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
export default {
  components: {
    scrollText,
    slider,
    buttons,
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
    },
  },
  data() {
    return {
      musicName: "",
      lyricShow: false,
      lyricArr: [],
      singerName: "",
      picUrl: "",
      lyric: "",
    };
  },
  methods: {
    closePopup() {
      this.$store.state.recommendList.openMusicDetail = false;
      this.$refs.popup.close();
    },
    async getLyric() {
      const res = await this.$api.$searchApi.getLyric(
        this.$store.state.hlAudio.currentMusic.id
      );
      if (res.code == 200) {
        // this.lyric =
        // "[00:00.00]feat：曾涵江Cup↵[00:02.53]作词:李尔新 曾涵江↵[00:03.44]作曲:李尔新 曾涵江↵[00:04.25]↵[00:04.91]李尔新verse↵[00:05.85]走路带着风↵[00:07.14]人群围绕相机捕捉我的面孔 好帅↵[00:09.62]飞机顺着节奏颠簸↵[00:11.01]天文望远镜望不到我的巅峰↵[00:13.31]我的lifestyle就像鹿丸很少发力↵[00:15.56]想要开上大g我也懂得蹭热打铁↵[00:17.51]周梓倩说我歌一半牛逼一半垃圾↵[00:19.70]像朴宰范这帅哥也只会纹一半花臂↵[00:21.79]same shit↵[00:22.62]why cant get in boy 酒吧的锅↵[00:24.10]小奶狗一边一边去 she wanna wolf↵[00:26.36]平面太多确实想不出来摆其他的pose↵[00:28.42]歌词从不炫富那是对未来许下的诺言↵[00:30.60]腰解开发带 爱陪到我耍帅 chianz装一麻袋↵[00:34.08]爱这逍遥whywhy↵[00:35.24]天蝎小眼如果无法招架住↵[00:37.30]叼根雪茄给你cosplay爆发户↵[00:39.11]↵[00:39.49]李尔新hook↵[00:39.91]哥们快准狠才办事靠谱↵[00:41.73]五星酒店吃完早餐跑路↵[00:44.97]商务车后座放她的宝物↵[00:47.35]hundred shoot never get loose↵[00:49.29]准备和每一个人拥抱↵[00:51.29]再给bad gitls 点忠告↵[00:53.41]cdc im back in town↵[01:14.43]↵[01:14.91]曾涵江verse↵[01:23.17]我只出没在晚上↵[01:24.30]我每天都开专场 啥子话题我都敢讲↵[01:26.61]优 先是转账↵[01:27.55]把钞票全都带上↵[01:28.60]我档期才会开放↵[01:29.69]只要我一发歌 朋友圈里都是感想↵[01:31.78]那些艺 人 做梦 都想得到我的verse↵[01:34.05]演出 现场里 我还 没登场都在turn↵[01:36.17]全国 到处飞↵[01:37.04]但是我的地标还是这儿↵[01:38.30]网红些 每天都在问我 你在哪儿↵[01:40.71]不要看那些转赞评↵[01:41.84]几百块钱买的 圈子没有我的emeny↵[01:43.87]全部是崇拜者↵[01:44.71]在party↵[01:45.41]太多妹↵[01:45.90]我很顶↵[01:46.47]喝不醉↵[01:47.01]身边一帮弟娃儿围到我全身都是纯白色↵[01:49.40]街头shinning feel like 黄金 不止 嘻哈 生意any more撕咬beat像animal↵[01:53.62]fake rapper I will kill em all↵[01:55.10]如果有一天 我突然离开 我会成为传奇 永远没人代替我↵[01:57.91]↵[01:58.41]李尔新hook↵[01:58.68]哥们快准狠才办事靠谱↵[02:00.34]五星酒店吃完早餐跑路↵[02:02.71]商务车后座放她的宝物↵[02:05.89]hundred shoot never get loose↵[02:08.03]准备和每一个人拥抱↵[02:09.92]再给bad gitls 点忠告↵[02:12.17]cdc im back in town↵[02:29.40]↵[02:30.53]编曲:Alex  G23  ↵[02:31.81]混音: 恩德↵";
        this.lyric = res.lrc.lyric;
        console.log(res.lrc.lyric);
        console.log(this.lyric);
        this.lyricOperation(this.lyric);
      }
    },
    //获取每行歌词的时间
    lyricOperation(str) {
      let timeArr = []; //未截取的时间数组
      let timeArr1 = []; //截取后的时间数组

      //获取截取后时间数组操作
      timeArr = str.match(/\[.*?\]/g);
      timeArr.forEach((item) => {
        timeArr1.push(item.substring(1, 6));
      });

      //获取截取后歌词数组操作
      str = str.replace(/\[.*?\]/g, "");
      this.lyricArr = str.split("↵");
      console.log(this.lyricArr);
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
        }
        &_line {
          position: absolute;
          height: 1rpx;
          width: 100%;
          background-color: rgb(230, 228, 228);
          opacity: 0.3;
          top: 50%;
        }
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
