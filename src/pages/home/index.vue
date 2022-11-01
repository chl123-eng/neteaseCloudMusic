<template>
  <div class="content">
    <div class="content_searchBox">
      <input class="content_searchBox_input" v-model="data.searchStr" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const data = {
      searchStr: "",
    };
    return {
      data,
    };
  },
};
</script>
<style lang="scss">
.content {
  width: 100%;
  height: 100%;
  background: rgb(252, 250, 250);
  padding: 32rpx;
  &_searchBox {
    margin-bottom: 30rpx;
    &_input {
      border-radius: 60rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: #fff;
    }
  }
}
</style>
