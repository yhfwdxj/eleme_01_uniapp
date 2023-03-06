"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const account = common_vendor.ref();
    const password = common_vendor.ref();
    const captchas = common_vendor.ref();
    const code = common_vendor.ref();
    common_vendor.onLoad(() => {
      getCaptchas();
    });
    const getCaptchas = async () => {
      let res = await utils_request.request({
        url: "v1/captchas",
        method: "post"
      });
      code.value = res.code;
    };
    const changeCode = () => {
      getCaptchas();
    };
    const login = async () => {
      let res = await utils_request.request({
        url: "v2/login",
        method: "post",
        data: {
          username: account.value,
          password: password.value,
          captcha_code: captchas.value
        }
      });
      console.log(res);
    };
    return (_ctx, _cache) => {
      return {
        a: account.value,
        b: common_vendor.o(($event) => account.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: captchas.value,
        f: common_vendor.o(($event) => captchas.value = $event.detail.value),
        g: code.value,
        h: common_vendor.o(changeCode),
        i: common_vendor.o(login)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/login/login.vue"]]);
wx.createPage(MiniProgramPage);
