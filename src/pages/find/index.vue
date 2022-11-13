<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-03 16:09:42
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-11-13 10:39:37
-->
<template>
  <view class="content">
    <view class="content_searchBox">
      <uni-search-bar radius="100" bgColor="#fff" v-model="searchStr" />
    </view>
    <view class="content_main">
      <view class="content_main_swiper">
        <my-swiper></my-swiper>
      </view>
      <view class="content_main_recommendList">
        <recommend-list></recommend-list>
      </view>
    </view>
  </view>
</template>
<script>
import mySwiper from "./mySwiper.vue";
import recommendList from "./recommendList/index.vue";
export default {
  components: {
    mySwiper,
    recommendList,
  },
  data() {
    return {
      searchStr: "",
      recommendMusic: {},
    };
  },
  methods: {},
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
