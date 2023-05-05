"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const store = common_vendor.useStore();
    const account = common_vendor.ref("");
    const password = common_vendor.ref("");
    const captchas = common_vendor.ref();
    const code = common_vendor.ref();
    let isMp = common_vendor.ref();
    let userInfo = common_vendor.ref();
    common_vendor.onLoad(() => {
      getCaptchas();
      let sysInfo = common_vendor.index.getSystemInfoSync();
      let reg = new RegExp("mp", "gm");
      isMp.value = reg.test(sysInfo.uniPlatform);
    });
    const valid = (item) => {
      let reg = new RegExp("1[3|5|7|8|9][1-9]{4}[0-9]{5}", "gm");
      return reg.test(item);
    };
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
      let flag = valid(account.value);
      console.log(password);
      if (isMp.value) {
        if (flag) {
          common_vendor.index.request({
            url: "/mock/login",
            method: "post",
            data: {
              username: account.value,
              password: password.value
            },
            success: (res) => {
              userInfo.value = res.data;
              if (userInfo.value.code === "400") {
                common_vendor.index.showToast({
                  title: "密码错误",
                  duration: 2e3,
                  icon: "error"
                });
              } else {
                store.commit("user/getUserInfo", userInfo.value);
                common_vendor.index.switchTab({
                  url: "/pages/user/user"
                });
              }
            }
          });
        } else {
          common_vendor.index.showToast({
            title: "手机号格式错误",
            duration: 2e3,
            icon: "error"
          });
        }
      } else {
        let res = await utils_request.request({
          url: "v2/login",
          method: "post",
          data: {
            username: account.value,
            password: password.value,
            captcha_code: captchas.value
          }
        });
        alert(res.message);
      }
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
        i: common_vendor.o(valid),
        j: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/login/login.vue"]]);
wx.createPage(MiniProgramPage);
