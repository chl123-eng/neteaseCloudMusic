<template>
  <view class="login">
    <!-- <view class="login_img"></view> -->
    <view class="login_form">
      <view class="login_form_phone">
        <text class="login_form_phone_text">手机号：</text>
        <uni-easyinput
          class="login_form_phone_input"
          v-model="form.phone"
          placeholder="请输入手机号"
        ></uni-easyinput>
      </view>
      <view class="login_form_password">
        <text class="login_form_phone_text">密码：</text>
        <uni-easyinput
          class="login_form_phone_input"
          v-model="form.password"
          placeholder="请输入密码"
        ></uni-easyinput>
      </view>
      <button class="login_form_button" @click="login">登录</button>
    </view>
  </view>
</template>

<script>
const md5 = require("js-md5");
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
    };
  },
  onLoad() {},
  methods: {
    async login() {
      let params = {
        phone: this.form.phone,
        password: md5(this.form.password),
      };
      const res = await this.$fetch("/banner?type=1");
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  // &_img {
  //   width: 100%;
  //   height: 30vh;
  //   border-radius: 10% 10% 40% 40%;
  //   background: url(http://p1.music.126.net/PDkAxjUCGdHjsnJcjri1EQ==/109951167969231633.jpg?imageView&quality=89)
  //     no-repeat;
  //   background-size: 100% 100%;
  // }
  &_form {
    margin-top: 200px;
    height: 170px;
    &_phone,
    &_password {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      &_text {
        width: 70px;
        display: flex;
        justify-content: flex-end;
      }
    }
    &_button {
      background-color: #f76c6c;
      border-radius: 20px;
    }
  }
}
</style>
