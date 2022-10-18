"use strict";
var common_vendor = require("../common/vendor.js");
const baseUrl = "https://elm.cangdu.org/";
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url,
      method: "get",
      data: options.data || {},
      header: options.header || {},
      success: (res) => {
        return resolve(res.data);
      },
      fail(err) {
        return reject("err");
      }
    });
  });
};
exports.request = request;
