<template>
  <view :class="['content', { sumContent: isSum }]" v-if="songsNum > 0">
    <view class="content_title" v-if="!isSum">
      <view class="content_title_left"> 单曲 </view>
    </view>
    <view class="content_main">
      <view
        class="content_main_item"
        v-for="(item, index) in songList"
        :key="index"
        v-show="!isSum ? index < 4 : index > -1"
        @click="selectOneSong(item)"
      >
        <view
          class="content_main_item_songName"
          :class="{ content_main_item_match: match(item.name) }"
          >{{ item.name }}</view
        >
        <view class="content_main_item_singers">
          <view
            v-for="(i, index) in item.ar"
            :key="index"
            :class="{ content_main_item_match: match(i.name) }"
            class="content_main_item_singer"
          >
            {{ i.name }}<text v-if="index < item.ar.length - 1">/</text></view
          >
        </view>
      </view>
      <view class="content_main_tip" @click="getTotal" v-if="!isSum"
        >查看全部{{ songsNum }}首单曲</view
      >
    </view>
  </view>
</template>
<script>
export default {
  inject: ["searchStrValue"],
  props: {
    isSumValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      songList: [],
      songsNum: 0,
      isSum: false,
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
    isSumValue(val) {
      this.isSum = val;
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
        if (this.songsNum == 0) {
          this.$emit("noSongs", true);
        } else {
          this.$emit("noSongs", false);
        }
      }
    },
    match(str) {
      return str.includes(this.searchStr);
    },
    getTotal() {
      this.isSum = true;
      this.$emit("getTotal", this.isSum);
    },
    //选择一首单曲
    selectOneSong(i) {
      this.$store.state.hlAudio.currentMusic = i;
      this.$store.state.hlAudio.currentIndex++;
      //在播放器中的播放列表中添加
      this.$store.state.hlAudio.musicList.splice(
        this.$store.state.hlAudio.currentIndex,
        0,
        this.$store.state.hlAudio.currentMusic
      );
    },
  },
  mounted() {
    this.isSum = this.isSumValue;
    this.getSongList();
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
      &_match {
        color: rgb(8, 132, 163) !important;
      }
      &_singers {
        display: flex;
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: noWrap;
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
