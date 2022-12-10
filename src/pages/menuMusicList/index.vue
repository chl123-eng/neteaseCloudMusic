<template>
  <view class="content">
    <view class="content_title">
      <hl-icon icon="icon-fanhuijiantou"></hl-icon>
      <view class="content_title_name">歌单</view>
    </view>
    <view class="content_profile">
      <view class="content_profile_left">
        <img :src="menuDetails.coverImgUrl" />
      </view>
      <view class="content_profile_right">
        <view class="content_profile_right_name"> {{ menuDetails.name }}</view>
        <view class="content_profile_right_author">
          {{ menuDetails.creator.nickname }}</view
        >
        <view class="content_profile_right_keyWords"> </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      menuId: "158010361",
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

  // onLoad(options) {
  //   this.menuId = options.id;
  // },
  mounted() {
    this.getMenuDetails();
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 40rpx;
  &_title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100rpx;
    position: fixed;
    &_name {
      font-size: 38rpx;
      margin-left: 40rpx;
    }
  }
  &_profile {
    display: flex;
    width: 100%;
    height: 400rpx;
    padding-top: 140rpx;
    &_left {
      width: 200rpx;
      height: 200rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 40rpx;
      }
    }
  }
}
</style>
