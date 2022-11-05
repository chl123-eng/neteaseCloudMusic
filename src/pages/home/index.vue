<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-11-03 16:09:42
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-05 17:51:56
-->
<template>
  <view class="content">
    <view class="content_searchBox">
      <uni-search-bar radius="100" bgColor="#fff" v-model="searchStr" />
    </view>
    <view class="content_swiper">
      <my-swiper></my-swiper>
    </view>
    <view class="content_audioPlayer"> <my-audio></my-audio> </view>
  </view>
</template>
<script>
import mySwiper from "./mySwiper.vue";
import myAudio from "./myAudio.vue";
export default {
  components: {
    mySwiper,
    myAudio,
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
