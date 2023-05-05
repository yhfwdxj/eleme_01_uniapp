"use strict";
const common_vendor = require("../common/vendor.js");
const loading = () => {
  return common_vendor.index.showToast({
    title: "加载中",
    icon: "loading"
  });
};
exports.loading = loading;
