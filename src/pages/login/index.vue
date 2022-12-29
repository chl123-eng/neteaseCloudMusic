<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-29 13:29:38
-->
<template>
  <view class="login">
    <view class="login_form">
      <view class="login_form_phone">
        <text class="login_form_phone_text">手机号：</text>
        <uni-easyinput
          class="login_form_phone_input"
          v-model="form.phone"
          placeholder="请输入手机号"
        ></uni-easyinput>
        <span></span>
      </view>
      <view class="login_form_captcha" v-if="currentStatus == 'register'">
        <text class="login_form_captcha_text">验证码：</text>
        <uni-easyinput
          class="login_form_captcha_input"
          v-model="form.captcha"
          placeholder="请输入验证码"
          @blur="verifyCaptcha"
        ></uni-easyinput>
        <button class="login_form_captcha_button" @click="sendCaptcha">
          获取验证码
        </button>
      </view>
      <text
        class="login_form_captcha_tip"
        v-if="currentStatus == 'register' && !isCaptchaCorrect"
        >验证码错误</text
      >
      <view class="login_form_password">
        <text class="login_form_phone_text">密码：</text>
        <uni-easyinput
          class="login_form_phone_input"
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></uni-easyinput>
        <span></span>
      </view>
      <view
        class="login_form_register"
        @click="currentStatus = currentStatus == 'login' ? 'register' : 'login'"
      >
        <text>{{ currentStatus == "login" ? "注册" : "登录" }}</text>
      </view>
      <button
        class="login_form_button"
        @click="login"
        v-if="currentStatus == 'login'"
      >
        登录
      </button>
      <button
        class="login_form_button"
        @click="register"
        v-if="currentStatus == 'register'"
      >
        注册
      </button>
    </view>
  </view>
</template>

<script>
import md5 from "js-md5";
import { Validator } from "@/utils/validate";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      currentStatus: "login",
      isCaptchaCorrect: true,
      form: {
        phone: "18825482506",
        password: "123456",
        captcha: "",
      },
    };
  },
  onLoad() {},
  methods: {
    ...mapMutations({ SET_ACCOUNT: "login/SET_ACCOUNT" }),
    ...mapMutations({ SET_BINDINGS: "login/SET_BINDINGS" }),
    ...mapMutations({ SET_PROFILE: "login/SET_PROFILE" }),
    //策略模式-表单验证
    validate() {
      var validate = new Validator();

      validate.add(this.form.phone, [
        {
          strategy: "isMobile",
          errMsg: "请输入正确的手机号",
        },
      ]);
      validate.add(this.form.password, [
        {
          strategy: "require",
          errMsg: "密码不能为空",
        },
        {
          strategy: "minLength:6",
          errMsg: "密码至少六位",
        },
      ]);

      let errMsg = validate.start();
      uni.showToast({
        icon: "error",
        title: errMsg,
      });
      return errMsg;
    },
    async login() {
      let errMsg = this.validate();
      if (!errMsg) {
        let params = {
          phone: this.form.phone,
          password: md5(this.form.password),
        };
        const res = await this.$api.$loginApi.login(params);
        if (res.code == 502) {
          uni.showToast({
            icon: "error",
            title: res.msg,
          });
        }
        // if (res.code == 200) {
        //   uni.setStorage({
        //     key: "account",
        //     data: res.account,
        //   });
        //   uni.setStorage({
        //     key: "bindings",
        //     data: res.bindings,
        //   });
        //   uni.setStorage({
        //     key: "profile",
        //     data: res.profile,
        //   });
        //   this.SET_ACCOUNT(res.account);
        //   this.SET_BINDINGS(res.bindings);
        //   this.SET_PROFILE(res.profile);
        // }

        uni.navigateTo({
          url: "/pages/home/index",
        });
      }
    },
    async sendCaptcha() {
      const res = await this.$api.$loginApi.sendCaptcha(this.form.phone);
      if (res.code == 400) {
        uni.showToast({
          icon: "error",
          title: "请输入正确的手机号",
        });
      }
    },
    async verifyCaptcha() {
      let params = {
        phone: this.form.phone,
        captcha: this.form.captcha,
      };
      const res = await this.$api.$loginApi.verifyCaptcha(params);
      if (!res.data) {
        this.isCaptchaCorrect = false;
      }
    },
    async register() {
      let errMsg = this.validate();
      if (!errMsg) {
        let params = {
          phone: this.form.phone,
          password: md5(this.form.password),
          captcha: this.form.captcha,
        };
        const res = await this.$api.$loginApi.register(params);
        if (res.code == 200) {
          this.currentStatus = "login";
          uni.setStorage({
            key: "account",
            data: res.account,
          });
          uni.setStorage({
            key: "bindings",
            data: res.bindings,
          });
          uni.setStorage({
            key: "profile",
            data: res.profile,
          });
          this.SET_ACCOUNT(res.account);
          this.SET_BINDINGS(res.bindings);
          this.SET_PROFILE(res.profile);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  &_form {
    width: 100%;
    padding: 50rpx;
    margin-top: 200rpx;
    &_phone,
    &_password,
    &_captcha {
      display: flex;
      justify-content: center;
      &_text {
        width: 160rpx;
        display: flex;
        justify-content: flex-end;
      }
    }
    &_phone {
      margin-bottom: 40rpx;
    }
    &_password {
      margin-top: 40rpx;
    }
    &_register {
      display: flex;
      justify-content: flex-end;
      margin: 20rpx 0;
      color: rgb(90, 90, 249);
    }
    &_captcha {
      &_button {
        font-size: 24rpx;
        border-radius: 40rpx;
      }
      &_tip {
        margin-left: 136rpx;
        color: red;
      }
    }
    &_button {
      margin-top: 40rpx;
      background-color: #f76c6c;
      border-radius: 40rpx;
    }
  }
}
</style>
