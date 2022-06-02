"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_notice_bar2 + _component_uni_section + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const list = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      init();
    });
    const change = function(e) {
      let {
        index
      } = e.detail;
      common_vendor.index.showToast({
        title: `\u70B9\u51FB\u7B2C${index + 1}\u4E2A\u5BAB\u683C`,
        icon: "none"
      });
    };
    const init = function() {
      console.log("\u5F00\u59CB\u8BF7\u6C42");
      utils_http.http.post("https://asxsyd92.com/api/applets/GetBycode", { "code": "asxsydboke" }, "\u8BF7\u7A0D\u7B49").then((res) => {
        console.log(res);
        if (res.success) {
          list.value = res.data;
        }
      }).catch((resp) => {
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          ["show-get-more"]: true,
          color: "#2979FF",
          ["background-color"]: "#EAF2FF",
          text: "uni-app \u7248\u6B63\u5F0F\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\uFF0C\u540C\u65F6\u53D1\u5E03iOS\u3001Android\u3001H5\u3001\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5934\u6761\u5C0F\u7A0B\u5E8F\u7B497\u5927\u5E73\u53F0\u3002"
        }),
        b: common_vendor.p({
          title: "\u6587\u5B57\u6EDA\u52A8",
          subTitle: "\u4F7F\u7528 scrollable \u5C5E\u6027\u4F7F\u901A\u544A\u6EDA\u52A8,\u6B64\u65F6 single \u5C5E\u6027\u5C06\u5931\u6548,\u59CB\u7EC8\u5355\u884C\u663E\u793A",
          type: "line"
        }),
        c: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: "8ae7f758-6-" + i0 + "," + ("8ae7f758-5-" + i0),
            b: common_vendor.t(item.title),
            c: index,
            d: "8ae7f758-5-" + i0 + ",8ae7f758-4",
            e: common_vendor.p({
              index
            })
          };
        }),
        d: common_vendor.p({
          type: "image",
          size: 30,
          color: "#777"
        }),
        e: common_vendor.o(change),
        f: common_vendor.p({
          column: 4,
          highlight: true
        }),
        g: common_vendor.p({
          title: "\u6ED1\u52A8\u89C6\u56FE",
          type: "line",
          padding: true
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Work/vue/webosapp/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
