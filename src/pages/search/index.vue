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
        @cancel="cancelsearchListVisibleSearch"
        @focus="focusSearch"
        cancelButton="none"
      />
      <view @click="search">搜索</view>
    </view>
    <view class="content_bottom">
      <view v-if="searchHomeVisible">
        <search-history
          :searchStrObj="searchStrObj"
          @selectOneHistoryData="setSearchStr"
        ></search-history>
        <view class="content_bottom_rankings">
          <rankings @rankSelectOne="selectRankOne"></rankings>
        </view>
      </view>
      <view v-if="searchResultVisible">
        <search-result :searchStr="searchStr"></search-result>
      </view>
    </view>
  </view>
</template>
<script>
import rankings from "./rangking.vue";
import searchHistory from "./searchHistory.vue";
import searchResult from "./searchResult.vue";
export default {
  components: {
    rankings,
    searchHistory,
    searchResult,
  },

  data() {
    return {
      searchStr: "",
      searchBarStyle: {},
      searchStrObj: {},
      searchHomeVisible: true,
      searchResultVisible: false,
    };
  },
  provide() {
    return {
      searchStrValue: () => this.searchStr,
    };
  },
  watch: {
    searchStr(val) {
      if (!val) {
        this.searchHomeVisible = true;
        this.searchResultVisible = false;
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
    search() {
      let param = {
        val: this.searchStr,
        isVisible: true,
      };
      this.searchStrObj = param;
      let flag = 0;
      this.$store.state.search.searchHistoryList.forEach((item) => {
        if (item.val == param.val) {
          flag = 1;
        }
      });
      if (flag == 0) {
        this.$store.state.search.searchHistoryList.unshift(param);
      }
      this.$nextTick(() => {
        this.searchHomeVisible = false;
        this.searchResultVisible = true;
      });
    },
    setSearchStr(val) {
      this.searchStr = val.val;
      this.search();
    },
    selectRankOne(val) {
      this.searchStr = val.first || val.albumName;
      this.search();
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
