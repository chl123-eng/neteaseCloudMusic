<template>
  <view class="content">
    <view class="content_title">
      <view class="content_title_left"> 单曲 </view>
    </view>
    <view class="content_main">
      <view
        class="content_main_item"
        v-for="(item, index) in songList"
        :key="index"
        v-show="isSum && index < 4"
      >
        <view
          class="content_main_item_songName"
          :class="{ content_main_item_match: match(item.name) }"
          >{{ item.name }}</view
        >
        <view class="content_main_item_singer">
          <view
            v-for="(i, index) in item.ar"
            :key="index"
            :class="{ content_main_item_match: match(i.name) }"
            >{{ i.name }}<text v-if="index < item.ar.length - 1">/</text></view
          >
        </view>
      </view>
      <view class="content_main_tip">查看全部{{ songsNum }}首单曲</view>
    </view>
  </view>
</template>
<script>
export default {
  inject: ["searchStrValue"],
  data() {
    return {
      songList: [],
      isSum: true,
      songsNum: 0,
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
  },

  methods: {
    async getSongList() {
      let params = {
        keywords: this.searchStr,
        type: 1,
      };
      const res = await this.$api.$searchApi.searchMultimatch(params);
      if (res.code == 200) {
        this.songList = res.result.songs;
        this.songsNum = res.result.songCount;
      }
    },
    match(str) {
      return str.includes(this.searchStr);
    },
  },
  mounted() {
    this.getSongList();
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 800rpx;
  background-color: #fff;
  border-radius: 30rpx;
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
      &_match {
        color: rgb(8, 132, 163) !important;
      }
      &_singer {
        display: flex;
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
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
