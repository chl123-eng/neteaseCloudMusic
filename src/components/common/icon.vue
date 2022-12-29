<template>
  <i
    :class="[`iconfont ${icon}`, customClass]"
    :style="{
      fontSize: size,
      color: color,
    }"
    @click="$emit('click')"
  ></i>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    customClass: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: "50rpx",
    },
    color: {
      type: String,
      default: "#000",
    },
  },
};
</script>
<style lang="scss" scoped>
i {
  display: flex;
  justify-content: center;
}
</style>
