<template>
  <view class="content">
    <view class="content_item" v-for="(item, index) in rankings" :key="index">
      <view class="content_item_title">{{ item.title }}</view>
      <view class="content_item_list">
        <view class="content_item_list_num"></view>
        <view class="content_item_list_name"></view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      rankings: [
        {
          title: "热搜榜",
        },
        {
          title: "话题榜",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  &_item {
    width: 600rpx;
    height: 1000rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-right: 20rpx;
  }
}
</style>
