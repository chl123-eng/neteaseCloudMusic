<template>
  <view class="scrollText" ref="outer">
    <view class="st-inner" :class="{ 'st-scrolling': needToScroll }">
      <text class="st-section" ref="inner">{{ text }}</text>
      <text class="st-section" v-if="needToScroll">{{ text }}</text>
      <!-- 加两条是为了滚动的时候实现无缝衔接 -->
    </view>
  </view>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      needToScroll: false,
      num: 0,
      innerWidth: 0,
      outerWidth: 0,
    };
  },
  watch: {
    num(val) {
      if (val == 2) {
        let flag = this.innerWidth > this.outerWidth;
        this.needToScroll = flag;
      }
    },
  },
  mounted() {
    this.startCheck();
  },
  beforeDestroy() {
    this.stopCheck();
  },
  methods: {
    // 检查当前元素是否需要滚动
    check() {
      this.$nextTick(() => {
        this.isOverflow();
      });
    },

    // 判断子元素宽度是否大于父元素宽度，超出则需要滚动，否则不滚动
    isOverflow() {
      this.$nextTick(() => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(".st-section")
          .boundingClientRect((data) => {
            this.innerWidth = data.width;
            this.num++;
          })
          .exec();

        uni
          .createSelectorQuery()
          .in(this)
          .select(".scrollText")
          .boundingClientRect((data) => {
            this.outerWidth = data.width;
            this.num++;
          })
          .exec();
      });
    },

    // 增加定时器，隔一秒check一次
    startCheck() {
      this._checkTimer = setInterval(this.check, 1000);
      this.check();
    },

    // 关闭定时器
    stopCheck() {
      clearInterval(this._checkTimer);
    },
  },
};
</script>
<style lang="scss" scoped>
.scrollText {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.st-inner {
  display: inline-block;
}
.st-scrolling .st-section {
  padding: 0 5px;
}

// 向左匀速滚动动画
.st-scrolling {
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
