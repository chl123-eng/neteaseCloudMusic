<template>
  <view class="content">
    <view class="content_title">
      <hl-icon icon="icon-fanhuijiantou" color="#fff"></hl-icon>
      <view class="content_title_name">歌单</view>
    </view>
    <view
      class="content_profile"
      :style="{ '--bgimg': 'url(' + menuDetails.coverImgUrl + ')' }"
    >
      <view class="content_profile_left">
        <img :src="menuDetails.coverImgUrl" />
      </view>
      <view class="content_profile_right">
        <view class="content_profile_right_name"> {{ menuDetails.name }}</view>
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
  </view>
</template>
<script>
export default {
  data() {
    return {
      menuId: "",
      menuDetails: {},
      musicList: [],
    };
  },
  methods: {
    //获取歌单详情
    async getMenuDetails() {
      const res = await this.$api.$homeApi.playList(this.menuId);
      if (res.code == 200) {
        this.menuDetails = res.playlist;
        this.musicList = res.playlist.tracks;
        this.$store.state.hlAudio.musicList = this.musicList;
      }

      // this.$store.state.recommendList.changeOrderMusicList = true;
    },
  },

  onLoad(options) {
    this.menuId = options.id;
  },
  mounted() {
    this.getMenuDetails();
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
.content {
  width: 100vw;
  &_title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100rpx;
    position: fixed;
    padding: 0 40rpx;
    z-index: 1;
    color: #fff;
    &_name {
      font-size: 38rpx;
      margin-left: 40rpx;
    }
  }
  &_profile {
    width: 100%;
    height: 420rpx;
    padding-top: 140rpx;
    position: relative;
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
          width: 60rpx;
          height: 60rpx;
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
}
</style>
