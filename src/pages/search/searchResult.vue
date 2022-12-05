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
    <view class="content_bottom"> <single-song></single-song> </view>
  </view>
</template>
<script>
import singleSong from "./singleSong.vue";
export default {
  components: {
    singleSong,
  },
  props: {
    searchStr: {
      type: String,
      default: "",
    },
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
    };
  },
  methods: {
    selectTab(i) {
      this.acitveTab = i;
      this.tabList.filter((item) => {
        item.lineVisible = item.id == this.acitveTab;
      });
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
