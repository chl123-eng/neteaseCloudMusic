<template>
  <view class="content_bottom_list">
    <view
      class="content_bottom_list_item"
      v-for="(item, index) in searchStrList"
      :key="index"
    >
      <hl-icon icon="icon-search"></hl-icon>
      <view class="content_bottom_list_item_name"></view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    searchStr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchStrList: ["1111"],
    };
  },
  watch: {
    searchStr(val) {
      if (val) {
        this.getSearchStrList();
      }
    },
  },
  methods: {
    //获取搜索匹配的值
    async getSearchStrList() {
      const res = await this.$api.$searchApi.searchMultimatch(this.searchStr);
      console.log(res);
    },
  },
  mounted() {},
};
</script>
