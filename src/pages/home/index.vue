<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-03 16:09:42
 * @LastEditors: chl
 * @LastEditTime: 2022-11-04 16:27:09
-->
<template>
  <view class="content">
    <view class="content_searchBox">
      <uni-search-bar radius="100" bgColor="#fff" v-model="searchStr" />
    </view>
    <view class="content_swiper">
      <swiper></swiper>
    </view>
  </view>
</template>
<script>
import swiper from "./swiper.vue";
export default {
  components: {
    swiper,
  },
  data() {
    return {
      searchStr: "",
    };
  },
};
</script>
<style lang="scss">
.content {
  width: 100%;
  height: 100%;
  background: rgb(235, 234, 234);
}
</style>
