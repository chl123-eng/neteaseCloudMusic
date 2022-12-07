<template>
  <view></view>
</template>
<script>
export default {
  data() {
    return {
      recommendSongs: [],
    };
  },
  methods: {
    async getRecommendSongs() {
      const res = await this.$api.$homeApi.getRecommendSongs();
      console.log(res);
    },
  },
  mounted() {
    this.getRecommendSongs();
  },
};
</script>
