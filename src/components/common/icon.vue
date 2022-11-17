<template>
  <i
    :class="[`iconfont ${icon}`, customClass]"
    :style="{
      fontSize: size,
      color: color,
    }"
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
      type: String,
      default: "",
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
