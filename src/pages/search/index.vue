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
        <hl-icon
          icon="icon-shanchu"
          size="40rpx"
          @click="deleteHistoruList"
        ></hl-icon>
      </view>
      <view class="content_history_content">
        <view v-for="(item, index) in searchHistoryList" :key="index">
          <view class="content_history_content_item" v-if="item.isVisible">{{
            item.val
          }}</view>
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
    <view class="content_rankings"> <rankings></rankings> </view>
  </view>
</template>
<script>
import rankings from "./rangking.vue";
export default {
  components: {
    rankings,
  },
  data() {
    return {
      searchStr: "",
      searchBarStyle: {},
      searchHistoryList: [],
      isUp: false,
      historyIcon: "icon-down",
      hisIconVisible: false,
      searchHistoryEles: [],
      viewPortWidth: 0,
    };
  },
  watch: {
    searchHistoryList(val) {
      if (val) {
        this.$nextTick(() => {
          uni
            .createSelectorQuery()
            .selectAll(".content_history_content_item")
            .boundingClientRect((data) => {
              this.searchHistoryEles = data;
            })
            .exec();
        });
      }
    },
    searchHistoryEles(val) {
      if (val) {
        this.isDaYuViewPort();
        this.$forceUpdate();
      }
    },
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
      if (this.isUp) {
        this.searchHistoryList.forEach((item) => {
          item.isVisible = true;
        });
      } else {
        this.isDaYuViewPort();
      }
      this.$forceUpdate();
    },
    search() {
      let param = {
        val: this.searchStr,
        isVisible: true,
      };
      this.searchHistoryList.unshift(param);
    },
    //判断搜索历史字段是否大于可视界面宽度,进行展开和收起
    isDaYuViewPort() {
      let sumWidth = 0;
      let jieZhiIndex = [];
      this.searchHistoryEles.forEach((item, index) => {
        sumWidth = sumWidth + item.width + 40;
        if (sumWidth > this.viewPortWidth) {
          this.hisIconVisible = true;
          jieZhiIndex.push(index);
        } else {
          this.hisIconVisible = false;
        }
      });
      this.searchHistoryList.forEach((item, index) => {
        if (jieZhiIndex.length == 0) {
          item.isVisible = true;
        } else {
          item.isVisible = index < jieZhiIndex[0] ? true : false;
        }
      });
    },
    deleteHistoruList() {
      this.searchHistoryList = [];
      this.hisIconVisible = false;
    },
  },
  mounted() {
    this.searchBarStyle = "width: 82%;";
    uni
      .createSelectorQuery()
      .select(".content_history_content")
      .boundingClientRect((data) => {
        this.viewPortWidth = data.width;
      })
      .exec();
  },
};
</script>
<style lang="scss" scoped>
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
        max-width: 200rpx;
        padding: 5rpx 10rpx;
        margin: 0 10rpx;
        background-color: #fff;
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
