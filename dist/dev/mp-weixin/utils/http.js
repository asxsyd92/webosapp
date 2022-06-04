"use strict";
var common_vendor = require("../common/vendor.js");
var config = require("../config.js");
class Http {
  get(url, params, _object = {}) {
    return new Promise((resolve, reject) => {
      var token = common_vendor.index.getStorageSync("token");
      console.log(token);
      common_vendor.index.request({
        url,
        data: params,
        method: "GET",
        success: (res) => {
          if (res.statusCode == 401) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({ url: "/pages/login/login" });
          }
          resolve(res.data);
        },
        fail: (err) => {
          common_vendor.index.showToast({ title: "\u8BF7\u6C42\u9519\u8BEF" });
          reject(err);
        }
      });
    });
  }
  post(url, params, _object = {}, msg, _msg = "", headers) {
    return new Promise((resolve, reject) => {
      common_vendor.index.showLoading({
        title: msg == void 0 ? "\u52A0\u8F7D\u4E2D" : msg
      });
      var token = common_vendor.index.getStorageSync("token");
      console.log(token);
      common_vendor.index.request({
        url: config.config.host + url,
        data: params,
        method: "POST",
        header: headers == void 0 ? {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": "bearer " + token
        } : headers,
        success: (res) => {
          common_vendor.index.hideLoading();
          if (res.statusCode == 401) {
            common_vendor.index.setStorageSync("islogin", false);
            common_vendor.index.reLaunch({ url: "/pages/login/login" });
          }
          resolve(res.data);
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "\u8BF7\u6C42\u9519\u8BEF" });
          reject(err);
        }
      });
    });
  }
}
var http = new Http();
exports.http = http;
