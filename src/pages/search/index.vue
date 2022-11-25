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
      <view>搜索</view>
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
          class="content_history_content"
        >
          <view>{{ item }}</view>
        </view>
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
      searchHistoryList: ["123456"],
    };
  },
  methods: {
    focusSearch() {
      this.searchBarStyle = "width: 82%;";
    },
    backTo() {
      console.log(11);
      uni.navigateTo({
        url: "/pages/find/index",
      });
    },
  },
  mounted() {
    this.searchBarStyle = "width: 82%;";
  },
};
</script>
<style lang="scss">
.content {
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
      width: fit-content;
      padding: 5rpx 10rpx;
      background-color: #fff;
      border-radius: 40rpx;
      font-size: 30rpx;
      color: #999;
    }
  }
}
</style>
