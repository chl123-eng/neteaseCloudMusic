<template>
  <view class="swiper-box">
    <swiper class="swiper" @change="change" :current="swiperIndex">
      <swiper-item
        class="swiper-item"
        v-for="(item, index) in rankings"
        :key="index"
        :style="index == 0 ? styleObject1 : styleObject2"
      >
        <view class="content">
          <view class="content_title">{{ item.title }}</view>
          <view
            v-for="(i, iIndex) in item.list"
            :key="iIndex"
            :class="[
              {
                content_list_hottest: iIndex == 0 || iIndex == 1 || iIndex == 2,
              },
              'content_list',
            ]"
            @click="selectOne(i)"
          >
            <view class="content_list_num">{{ iIndex + 1 }}</view>
            <view class="content_list_name">{{ i.first || i.albumName }}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  data() {
    return {
      rankings: [
        {
          title: "热搜榜",
          list: [],
        },
        {
          title: "专辑周榜",
          list: [],
        },
      ],
      swiperIndex: 0,
      styleObject1: {},
      styleObject2: {},
    };
  },
  methods: {
    //热搜榜
    async getSearchHot() {
      const res = await this.$api.$searchApi.searchHot();
      if (res.code == 200) {
        this.rankings[0].list = res.result.hots;
      }
    },
    //话题榜
    async getSearchAlbum() {
      const res = await this.$api.$searchApi.hotAlbum();
      if (res.code == 200) {
        res.products.forEach((e, i) => {
          if (i < 10) {
            this.rankings[1].list.push(e);
          }
        });
      }
    },
    //切换榜单
    change(e) {
      this.swiperIndex = e.detail.current;
      if (this.swiperIndex == 1) {
        this.styleObject1 =
          "transform: translate(30%, 0px) translateZ(0px) !important;position: absolute;";
        this.styleObject2 =
          "transform: translate(130%, 0px) translateZ(0px) !important;position: absolute;";
      } else {
        this.styleObject1 =
          "transform: translate(0%, 0px) translateZ(0px) !important;position: absolute;";
        this.styleObject2 =
          "transform: translate(100%, 0px) translateZ(0px) !important;position: absolute;";
      }
    },
    //点击选择
    selectOne(item) {
      this.$emit("rankSelectOne", item);
    },
  },
  mounted() {
    this.getSearchHot();
    this.getSearchAlbum();
  },
};
</script>
<style lang="scss">
.swiper-box {
  padding-top: 40rpx;
  .swiper {
    width: 100%;
    height: 1000rpx !important;
    .swiper-item {
      width: 500rpx !important;
      padding-right: 40rpx;
      background-color: rgb(252, 250, 250);
      .content {
        width: 100%;
        background-color: #fff;
        border-radius: 40rpx;
        &_title {
          padding: 40rpx;
          font-size: 34rpx;
          border-bottom: 1px solid #eee;
        }
        &_list {
          padding: 20rpx 40rpx;
          display: flex;
          &_hottest {
            color: red;
          }
          &_num {
            margin-right: 20rpx;
          }
          &_name {
            width: 360rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: noWrap;
          }
        }
      }
    }
  }
}
</style>
