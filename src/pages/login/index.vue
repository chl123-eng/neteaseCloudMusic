<!--
 * @Descripttion: 
 * @version: 
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-10-19 20:58:33
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
        ></uni-easyinput>
      </view>
      <view
        class="login_form_register"
        v-if="currentStatus == 'login'"
        @click="currentStatus = 'register'"
      >
        <text>注册</text>
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
const md5 = require("js-md5");
var checkResult = {
  errTip: function (dom, errMsg) {
    var errDom;
    var errmsgT = dom.parentElement.querySelector(".err-msg");
    if (!errmsgT) {
      errDom = document.createElement("span");
      errDom.className = "err-msg";
      errDom.innerText = errMsg;
      dom.parentElement.appendChild(errDom);
    }
  },
  ok: function (dom) {
    dom.classList.remove("error");
    dom.classList.add("valid");
    var errMsgT = dom.parentElement.querySelector(".err-msg");
    if (errMsgT) {
      dom.parentElement.querySelector(".err-msg").remove();
    }
  },
  no: function (dom, errMsg) {
    dom.classList.remove("valid");
    dom.classList.add("err");
    this.errTip(dom, errMsg);
  },
};
export default {
  data() {
    return {
      currentStatus: "login",
      isCaptchaCorrect: true,
      form: {
        phone: "",
        password: "",
        captcha: "",
      },
    };
  },
  onLoad() {},
  methods: {
    //策略模式-表单验证

    async login() {
      let params = {
        phone: this.form.phone,
        password: md5(this.form.password),
      };
      const res = await this.$api.$loginApi.login(params);
      console.log(res, 11);
    },
    async sendCaptcha() {
      const res = await this.$api.$loginApi.sendCaptcha(this.form.phone);
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
    async register() {},
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  &_form {
    margin-top: 100px;
    height: 170px;
    &_phone,
    &_password,
    &_captcha {
      display: flex;
      justify-content: center;
      &_text {
        width: 70px;
        display: flex;
        justify-content: flex-end;
      }
    }
    &_phone {
      margin-bottom: 20px;
    }
    &_password {
      margin-top: 20px;
    }
    &_register {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      color: rgb(90, 90, 249);
    }
    &_captcha {
      &_button {
        font-size: 12px;
        border-radius: 20px;
      }
      &_tip {
        margin-left: 68px;
        color: red;
      }
    }
    &_button {
      margin-top: 20px;
      background-color: #f76c6c;
      border-radius: 20px;
    }
  }
}
</style>
