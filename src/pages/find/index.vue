<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-03 16:09:42
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-07 16:53:50
-->
<template>
  <view class="content">
    <view class="content_searchBox">
      <uni-search-bar
        radius="100"
        bgColor="#fff"
        cancelButton="none"
        @focus="focusSearchBox"
      />
    </view>
    <view class="content_main">
      <view class="content_main_swiper">
        <my-swiper></my-swiper>
      </view>
      <view class="content_main_recommendList">
        <recommend-list></recommend-list>
      </view>
      <view class="content_main_recommendSong">
        <recommend-songs></recommend-songs>
      </view>
    </view>
  </view>
</template>
<script>
import mySwiper from "./mySwiper.vue";
import recommendList from "./recommendList/index.vue";
import recommendSongs from "./recommendSongs/index.vue";
export default {
  components: {
    mySwiper,
    recommendList,
    recommendSongs,
  },
  data() {
    return {
      searchStr: "",
      recommendMusic: {},
    };
  },
  methods: {
    focusSearchBox() {
      uni.navigateTo({
        url: "/pages/search/index",
      });
    },
  },
};
</script>
<style lang="scss">
.content {
  width: 100%;
  height: 100%;
  background: rgb(248, 247, 247);
  display: flex;
  flex-direction: column;
  &_searchBox {
    width: 100%;
    height: 112rpx;
  }
  &_swiper {
    flex: 1;
    overflow: auto;
  }
}
</style>
