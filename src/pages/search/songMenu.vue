<template>
  <view :class="['content', { sumContent: isSum }]" v-if="songMenuNum > 0">
    <view class="content_title" v-if="!isSum">
      <view class="content_title_left"> 歌单</view>
    </view>
    <view class="content_main">
      <view
        class="content_main_item"
        v-for="(item, index) in songMenuList"
        :key="index"
        v-show="!isSum ? index < 4 : index > -1"
        @click="getMusicList(item)"
      >
        <view style="display: flex">
          <view class="content_main_item_left">
            <img :src="item.coverImgUrl" />
          </view>
          <view class="content_main_item_right">
            <view
              class="content_main_item_right_songName"
              :class="{ content_main_item_match: match(item.name) }"
              >{{ item.name }}
            </view>
            <view class="content_main_item_right_detail">
              <view class="content_main_item_right_detail_songNum"
                >{{ item.trackCount }}首，</view
              >
              <view class="content_main_item_right_detail_creator"
                >by&nbsp;{{ item.creator.nickname }}，</view
              >
              <view class="content_main_item_right_detail_creator"
                >播放{{ (item.playCount / 1000).toFixed(1) }}万次</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="content_main_tip" @click="getTotal" v-if="!isSum"
      >查看全部{{ songMenuNum }}首单曲</view
    >
  </view>
</template>
<script>
export default {
  inject: ["searchStrValue"],
  props: {
    isMenuSumValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      songMenuList: [],
      isSum: false,
      songMenuNum: 0,
    };
  },
  computed: {
    searchStr() {
      return this.searchStrValue();
    },
  },
  watch: {
    searchStr(val) {
      if (val) {
        this.getSongList();
      } else {
        this.songList = [];
      }
    },
    isMenuSumValue(val) {
      this.isSum = val;
    },
  },

  methods: {
    async getSongList() {
      let params = {
        keywords: this.searchStr,
        type: 1000,
      };
      const res = await this.$api.$searchApi.searchMultimatch(params);
      if (res.code == 200) {
        this.songMenuList = res.result.playlists;
        this.songMenuNum = res.result.playlistCount;
        if (this.songMenuNum == 0) {
          this.$emit("noSongMenus", true);
        } else {
          this.$emit("noSongMenus", false);
        }
      }
    },
    match(str) {
      return str.includes(this.searchStr);
    },
    getTotal() {
      this.isSum = true;
      this.$emit("getMenuTotal", this.isSum);
    },
    async getMusicList(item) {
      uni.navigateTo({
        url: "/pages/menuMusicList/index?id=" + item.id,
      });
    },
  },
  mounted() {
    this.getSongList();
    this.isSum = this.isMenuSumValue;
  },
};
</script>
<style lang="scss" scoped>
.sumContent {
  height: 100% !important;
  background-color: rgb(252, 250, 250) !important;
}
.content {
  width: 100%;
  background-color: #fff;
  border-radius: 30rpx;
  margin-bottom: 40rpx;
  &_title {
    font-size: 40rpx;
    padding: 40rpx;
    padding-bottom: 30rpx;
    border-bottom: 1px solid #eee;
  }
  &_main {
    &_item {
      padding: 30rpx;
      border-bottom: 1px solid rgb(243, 241, 241);
      // &_match {
      //   color: rgb(8, 132, 163) !important;
      // }
      &_left {
        width: 120rpx;
        height: 120rpx;
        border-radius: 20rpx;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 20rpx;
        }
      }
      &_right {
        margin-left: 20rpx;
        margin-top: 10rpx;
        &_detail {
          display: flex;
          font-size: 24rpx;
          color: #999;
          margin-top: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: noWrap;
        }
      }
    }
    &_tip {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>
