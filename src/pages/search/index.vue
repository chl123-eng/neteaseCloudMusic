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
    <view class="content_bottom">
      <view v-if="searchHomeVisible">
        <search-history :searchStrObj="searchStrObj"></search-history>
        <view class="content_bottom_rankings"> <rankings></rankings> </view>
      </view>
      <view v-if="searchListVisible">
        <search-list :searchStr="searchStr"></search-list>
      </view>
    </view>
  </view>
</template>
<script>
import rankings from "./rangking.vue";
import searchHistory from "./searchHistory.vue";
import searchList from "./searchList.vue";
export default {
  components: {
    rankings,
    searchHistory,
    searchList,
  },
  data() {
    return {
      searchStr: "",
      searchBarStyle: {},
      searchStrObj: {},
      searchHomeVisible: false,
      searchListVisible: true,
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
    search() {
      let param = {
        val: this.searchStr,
        isVisible: true,
      };
      this.searchStrObj = param;
    },
  },
  mounted() {
    this.searchBarStyle = "width: 82%;";
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
  display: flex;
  flex-direction: column;
  &_searchBox {
    width: 100%;
    height: 112rpx;
    display: flex;
    align-items: center;
  }
  &_bottom {
    flex: 1;
    overflow: auto;
    width: 100%;
  }
}
</style>
