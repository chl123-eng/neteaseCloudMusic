<template>
  <view class="nav">
    <view v-for="(item, index) in tabs" :key="index" @click="changeTab(item)">
      <view class="nav_item" :class="{ nav_active: item.isActive }">
        <view class="nav_item_icon">
          <hl-icon
            :icon="item.iconName"
            :color="item.isActive ? 'rgb(238, 104, 104)' : ''"
          ></hl-icon>
        </view>
        <view class="nav_item_text">
          <text>{{ item.itemName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          iconName: "icon-faxian",
          itemName: "发现",
          itemId: "find",
          isActive: true,
        },
        {
          iconName: "icon-guanzhu",
          itemName: "关注",
          itemId: "interest",
          isActive: false,
        },
        {
          iconName: "icon-yinle",
          itemName: "我的",
          itemId: "personal",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    changeTab(item) {
      this.tabs.map((i) => {
        i.isActive = i.itemName == item.itemName;
      });
      this.$emit("changeTab", item.itemId);
    },
  },
};
</script>
<style lang="scss">
.nav {
  padding: 0 40rpx;
  width: calc(100vw - 80rpx);
  display: flex;
  justify-content: space-between;
  &_item {
    &_icon {
      text-align: center;
    }
  }
  &_active {
    color: rgb(238, 104, 104);
  }
}
</style>
