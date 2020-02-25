/**
 * Created by 樊苏超 on 2018/05/01.
 */
define(function (require, exports) {
  // 数据源
  var vmData = {

  };
    // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    let vm = yufp.custom.vue({
      el: cite.el,
      data: vmData,
      methods: {
      },
      watch: {
      },
      mounted: function () {

      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});