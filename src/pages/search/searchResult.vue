<template>
  <view class="content">
    <view class="content_top">
      <view
        class="content_top_item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="selectTab(item.id)"
      >
        <view class="content_top_item_name">{{ item.name }}</view>
        <view class="content_top_item_line" v-if="item.lineVisible"></view>
      </view>
    </view>
    <view class="content_bottom">
      <single-song
        v-if="singleSongVisible"
        @getTotal="total"
        :isSumValue="sum"
        @noSongs="isNoSongs"
      ></single-song>
      <song-menu
        v-if="songMenuVisible"
        @getMenuTotal="menuTotal"
        :isMenuSumValue="menuSum"
        @noSongMenus="isNoSongMenus"
      >
      </song-menu>
      <view class="content_bottom_nodata" v-if="dataImgVisible()">
        <img src="../../static/img/noData.png" />
      </view>
    </view>
  </view>
</template>
<script>
import singleSong from "./singleSong.vue";
import songMenu from "./songMenu.vue";
export default {
  components: {
    singleSong,
    songMenu,
  },
  data() {
    return {
      tabList: [
        {
          id: "multiple",
          name: "综合",
          lineVisible: true,
        },
        {
          id: "singleSong",
          name: "单曲",
          lineVisible: false,
        },
        {
          id: "songMenu",
          name: "歌单",
          lineVisible: false,
        },
      ],
      acitveTab: "multiple",
      singleSongVisible: true,
      songMenuVisible: true,
      sum: false,
      menuSum: false,
      noSongMenus: false,
      noSongs: false,
    };
  },
  watch: {
    acitveTab(val) {
      switch (val) {
        case "multiple":
          this.sum = false;
          this.menuSum = false;
          this.singleSongVisible = true;
          this.songMenuVisible = true;
          break;
        case "singleSong":
          this.sum = true;
          this.menuSum = false;
          this.singleSongVisible = true;
          this.songMenuVisible = false;
          break;
        case "songMenu":
          this.sum = false;
          this.menuSum = true;
          this.singleSongVisible = false;
          this.songMenuVisible = true;
          break;
      }
      this.tabList.filter((item) => {
        item.lineVisible = item.id == this.acitveTab;
      });
    },
  },
  methods: {
    selectTab(i) {
      this.acitveTab = i;
    },
    total(val) {
      if (val) {
        this.acitveTab = "singleSong";
      }
    },
    menuTotal(val) {
      if (val) {
        this.acitveTab = "songMenu";
      }
    },
    isNoSongs(val) {
      this.noSongs = val;
    },
    isNoSongMenus(val) {
      this.noSongMenus = val;
    },
    dataImgVisible() {
      switch (this.acitveTab) {
        case "multiple":
          return this.noSongs && this.noSongMenus;
        case "singleSong":
          return this.noSongs;
        case "songMenu":
          return this.noSongMenus;
      }
    },
  },
  mounted() {
    this.tabList.filter((item) => {
      item.lineVisible = item.id == this.acitveTab;
    });
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 20rpx;
  width: 100%;
  height: calc(100vh - 140rpx);
  display: flex;
  flex-direction: column;
  &_top {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 80rpx;
    &_item {
      &_line {
        width: 64rpx;
        height: 8rpx;
        border-radius: 10rpx;
        background-color: red;
      }
    }
  }
  &_bottom {
    flex: 1;
    overflow: auto;
    width: 100%;
  }
}
</style>
