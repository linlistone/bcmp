/**
 * Created by yourEmail on 2017/11/17.
 */
define([
  './custom/widgets/js/YufpDemoSelector.js'
],
function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#demo_selector',
      data: {
        yourVal: 'ABCD',
        rawValue: '汉字'
      },
      methods: {
        normalFn: function () {
          this.$alert(this.yourVal + ' | ' + this.$refs.demoSelector.getRawValue());
        }
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