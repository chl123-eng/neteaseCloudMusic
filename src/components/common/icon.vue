<template>
  <i
    :class="[`iconfont ${icon}`, customClass]"
    :style="{
      fontSize: size,
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
  },
};
</script>
