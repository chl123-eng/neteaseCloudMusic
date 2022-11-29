<template>
  <view class="content">
    <view class="content_searchBox">
      <hl-icon
        icon="icon-fanhuijiantou"
        customClass="content_searchBox_backTo"
        @click="backTo"
      ></hl-icon>
      <uni-search-bar
        radius="100"
        bgColor="#eee"
        :style="searchBarStyle"
        v-model="searchStr"
        @cancel="cancelSearch"
        @focus="focusSearch"
        cancelButton="none"
      />
      <view @click="search">搜索</view>
    </view>
    <view class="content_history">
      <view class="content_history_title">
        <view>历史</view>
        <hl-icon icon="icon-shanchu" size="40rpx"></hl-icon>
      </view>
      <view class="content_history_content">
        <view
          v-for="(item, index) in searchHistoryList"
          :key="index"
          class="content_history_content_item"
        >
          <text>{{ item }}</text>
          <text style="margin-left: 20rpx" @click="deleteItem(index)">x</text>
        </view>
      </view>
      <view
        class="content_history_icon"
        @click="clickHostoryIcon"
        v-if="hisIconVisible"
      >
        <hl-icon :icon="historyIcon" size="32rpx"></hl-icon>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      searchStr: "",
      searchBarStyle: {},
      searchHistoryList: [],
      isUp: false,
      historyIcon: "icon-down",
      hisIconVisible: false,
    };
  },
  methods: {
    focusSearch() {
      this.searchBarStyle = "width: 82%;";
    },
    backTo() {
      uni.navigateTo({
        url: "/pages/home/index",
      });
    },
    clickHostoryIcon() {
      this.isUp = !this.isUp;
      this.historyIcon = this.isUp ? "icon-up" : "icon-down";
    },
    search() {
      this.searchHistoryList.unshift(this.searchStr);
    },
    deleteItem(index) {
      this.searchHistoryList.splice(index, 1);
    },
  },
  mounted() {
    this.searchBarStyle = "width: 82%;";
  },
};
</script>
<style lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 40rpx;
  background-color: rgb(252, 250, 250);
  &_searchBox {
    width: 100%;
    height: 112rpx;
    display: flex;
    align-items: center;
  }
  &_history {
    &_title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;
    }
    &_content {
      display: flex;
      flex-wrap: wrap;
      &_item {
        width: fit-content;
        padding: 5rpx 10rpx;
        margin: 0 10rpx;
        background-color: #fff;
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #999;
      }
    }
    &_icon {
      width: 50rpx;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
      background-color: #fff;
    }
  }
}
</style>
