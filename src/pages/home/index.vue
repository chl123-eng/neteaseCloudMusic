<template>
  <view>
    <view class="content">
      <personal v-if="activeTab == 'personal'"></personal>
      <interest v-else-if="activeTab == 'interest'"></interest>
      <find v-else></find>
    </view>
    <view class="content_audio">
      <my-audio></my-audio>
    </view>
    <view class="content_navigation">
      <navigation @changeTab="getTabValue"></navigation>
    </view>
  </view>
</template>
<script>
import navigation from "@/components/navigation/index.vue";
import find from "../find/index.vue";
import interest from "../interest/index.vue";
import personal from "../personal/index.vue";
import myAudio from "@/components/myAudio/index.vue";
export default {
  components: {
    navigation,
    find,
    interest,
    personal,
    myAudio,
  },
  data() {
    return {
      activeTab: "find",
    };
  },
  methods: {
    getTabValue(val) {
      this.activeTab = val;
      console.log(this.activeTab, this.activeTab == "find");
    },
  },
};
</script>
<style lang="scss">
.content {
  position: relative;
  &_audio {
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 106rpx;
  }
  &_navigation {
    position: absolute;
    bottom: 0;
  }
}
</style>
