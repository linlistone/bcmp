/**
 * Created by helin3 on 2017/11/17.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#example_tab',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: {
        activeName: 'CRE'
      },
      methods: {
        showCreatedTimes: function () {
          this.createdTimes = this.createdTimes + 1;
        }
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