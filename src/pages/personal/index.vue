<template>
  <view class="container">
    <view class="container_profile">
      <img :src="profile.avatarUrl" />
    </view>
    <view class="container_personalInfo">
      <view class="container_personalInfo_nickName">
        {{ profile.nickname }}
      </view>
      <view class="container_personalInfo_detail">
        <view class="container_personalInfo_detail_follows">
          {{ profile.follows }}&nbsp;关注
        </view>
        <view class="container_personalInfo_detail_followeds">
          {{ profile.followeds }}&nbsp;粉丝
        </view>
        <view class="container_personalInfo_detail_gender">
          Lv.{{ profile.gender }}
        </view>
      </view>
    </view>
    <view class="container_functions">
      <view class="container_functions_function">
        <hl-icon
          icon="icon-24gf-playCircle"
          color="rgb(241, 110, 110)"
          size="60rpx"
        ></hl-icon
        ><text>最近播放</text>
      </view>
      <view class="container_functions_function">
        <hl-icon
          icon="icon-xiaoxi-xiaoxi"
          color="rgb(241, 110, 110)"
          size="60rpx"
        ></hl-icon>
        <text>我的消息</text>
      </view>
      <view class="container_functions_function">
        <hl-icon
          icon="icon-haoyou"
          color="rgb(241, 110, 110)"
          size="60rpx"
        ></hl-icon>
        <text>好友</text>
      </view>
    </view>
    <view class="container_myLoveMusic">
      <view class="container_myLoveMusic_profile">
        <img :src="profile.avatarUrl" />
        <view class="container_myLoveMusic_profile_bg"> </view>
        <view class="container_myLoveMusic_profile_icon">
          <hl-icon icon="icon-aixin1" color="#fff" size="60rpx"></hl-icon>
        </view>
      </view>
      <view class="container_myLoveMusic_right">
        <view class="container_myLoveMusic_right_info">我喜欢的音乐</view>
        <view class="container_myLoveMusic_right_num">220首</view>
      </view>
    </view>
    <view class="container_myMusicList">
      <view class="container_myMusicList_info"> 收藏歌单(1个) </view>
      <view class="container_myMusicList_item">
        <view class="container_myMusicList_item_profile">
          <img :src="profile.avatarUrl" />
        </view>
        <view class="container_myMusicList_item_right">
          <view class="container_myMusicList_item_right_name"
            >我喜欢的音乐</view
          >
          <view class="container_myMusicList_item_right_num"
            >220首，by花色游戏</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      account: {},
      profile: {},
    };
  },
  methods: {},
  mounted() {
    this.account = this.$store.state.login.account;
    this.profile = this.$store.state.login.profile;
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40rpx;
  box-sizing: border-box;
  background-color: rgb(250, 244, 244);
  &_profile {
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    left: 50%;
    margin-left: -60rpx;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &_functions,
  &_myLoveMusic,
  &_personalInfo,
  &_myMusicList {
    width: 100%;
    background-color: #fff;
    border-radius: 30rpx;
    margin-top: 40rpx;
  }
  &_personalInfo {
    box-sizing: border-box;
    padding-top: 70rpx;
    margin-top: 60rpx;
    height: 200rpx;

    &_nickName {
      width: fit-content;
      font-size: 38rpx;
      margin: auto;
    }
    &_detail {
      display: flex;
      width: fit-content;
      height: 30rpx;
      line-height: 30rpx;
      margin: auto;
      color: #666;
      font-size: 24rpx;
      margin-top: 20rpx;
      &_followeds {
        padding: 0 30rpx;
        border-left: 1px solid rgb(146, 143, 143);
        border-right: 1px solid rgb(146, 143, 143);
      }
      &_follows {
        padding-right: 30rpx;
      }
      &_gender {
        padding-left: 30rpx;
      }
    }
  }

  &_functions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200rpx;
    &_function {
      color: #666;
      text {
        display: inline-block;
        margin-top: 10rpx;
      }
    }
  }
  &_myLoveMusic,
  &_myMusicList {
    padding: 30rpx;
    box-sizing: border-box;
  }
  &_myLoveMusic {
    display: flex;
    align-items: center;
    height: 200rpx;
    &_profile {
      position: relative;
      width: 130rpx;
      height: 130rpx;
      border-radius: 40rpx;
      margin-right: 20rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 30rpx;
      }
      &_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        top: 0;
        border-radius: 30rpx;
        opacity: 0.3;
      }
      &_icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30rpx;
        margin-top: -30rpx;
      }
    }
    &_right {
      &_info {
        font-size: 34rpx;
        margin-bottom: 8rpx;
      }
      &_num {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
  &_myMusicList {
    &_info {
      color: #666;
      margin-bottom: 30rpx;
    }
    &_item {
      display: flex;
      align-items: center;
      &_profile {
        position: relative;
        width: 130rpx;
        height: 130rpx;
        border-radius: 40rpx;
        margin-right: 20rpx;
        img {
          width: 100%;
          height: 100%;
          border-radius: 30rpx;
        }
      }
      &_right {
        width: calc(100% - 210rpx);
        &_name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 34rpx;
          margin-bottom: 8rpx;
        }
        &_num {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
}
</style>
