<template>
  <view class="container">
    <view class="container_content">
      <personal v-if="activeTab == 'personal'"></personal>
      <interest v-else-if="activeTab == 'interest'"></interest>
      <find v-else></find>
    </view>
    <view class="container_audio" v-if="currentMusic">
      <my-audio></my-audio>
    </view>
    <view class="container_navigation">
      <navigation @changeTab="getTabValue"></navigation>
    </view>
    <view class="container_musicPlayPopup">
      <musicList-popup></musicList-popup>
    </view>
  </view>
</template>
<script>
import navigation from "@/components/navigation/index.vue";
import find from "../find/index.vue";
import interest from "../interest/index.vue";
import personal from "../personal/index.vue";
import myAudio from "@/components/myAudio/index.vue";
import musicListPopup from "@/components/musicListPopup/index.vue";
export default {
  components: {
    navigation,
    find,
    interest,
    personal,
    myAudio,
    musicListPopup,
  },
  data() {
    return {
      activeTab: "find",
      currentMusic: null,
    };
  },
  watch: {
    "$store.state.hlAudio.currentMusic"(val) {
      if (val) {
        this.currentMusic = val;
      }
    },
  },
  methods: {
    getTabValue(val) {
      this.activeTab = val;
    },
  },
  mounted() {
    this.currentMusic = this.$store.state.hlAudio.currentMusic;
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh);
  flex-direction: column;
  &_content {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
  &_audio {
    width: 100%;
    height: 140rpx;
    border-top: 1px solid #eee;
    // bottom: 106rpx;
  }
  &_navigation {
    width: 100%;
    height: 106rpx;
    bottom: 0rpx;
  }
}
</style>
