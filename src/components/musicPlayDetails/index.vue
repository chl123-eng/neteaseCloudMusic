<template>
  <uni-popup ref="popup" type="bottom" class="musicDetailPopup">
    <view class="container">
      <view class="container_top">
        <view class="container_top_icon"
          ><hl-icon icon="icon-down" @click="closePopup" color="#fff"></hl-icon
        ></view>
        <view class="container_top_center">
          <view class="container_top_center_name"
            ><scrollText :text="musicName"></scrollText
          ></view>
          <!-- <view class="container_top_center_singer">456</view> -->
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import scrollText from "@/components/common/scrollText";
export default {
  components: {
    scrollText,
  },
  watch: {
    "$store.state.recommendList.openMusicDetail"(val) {
      if (val) {
        this.$refs.popup.open("bottom");
      }
    },
  },
  data() {
    return {
      musicName: "123",
    };
  },
  methods: {
    closePopup() {
      this.$store.state.recommendList.openMusicDetail = false;
      this.$refs.popup.close();
    },
  },
  mounted() {
    this.$refs.popup.open("bottom");
  },
};
</script>
<style lang="scss" scoped>
.musicDetailPopup {
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url("https://p1.music.126.net/WPHAmuqQaaQGIcx199t5XQ==/3272146613241669.jpg")
      no-repeat;
    background-size: cover;
    background-position: center;
    &_top {
      width: 100%;
      height: 180rpx;
      position: absolute;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      &_icon {
        z-index: 1;
      }
      &_center {
        width: 100%;
        margin-left: -50rpx;
        &_name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
          font-size: 40px;
          border: 1px solid lightblue;
          margin: 40px;
          color: #fff;
          // width: 200rpx;
          // margin: 0 auto;
          // text-align: center;
          // font-size: 40rpx;
          // overflow: hidden;
        }

        &_singer {
          width: 200rpx;
          margin: 0 auto;
          color: rgb(201, 197, 197);
        }
      }
    }
  }
  .container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(60px);
  }
}
</style>
