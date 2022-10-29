<script>
export default {
  onLaunch: function () {
    if (
      uni.getStorageSync("account") &&
      uni.getStorageSync("bindings") &&
      uni.getStorageSync("profile")
    ) {
      this.$store.commit("login/SET_ACCOUNT", uni.getStorageSync("account"));
      this.$store.commit("login/SET_BINDINGS", uni.getStorageSync("bindings"));
      this.$store.commit("login/SET_PROFILE", uni.getStorageSync("profile"));
    }
  },
};
</script>

<style>
/*每个页面公共css */
</style>
