/**
 * @created by liujie 2018-09-06
 * @updated by
 * @description 系统主页面-左侧竖向菜单模式
 * frameComp.js 为框架组件，
 * 引用了yufp-common-tab(tabComp.js) 页签组件 ， yu-common-menu(menuComp.js) 菜单组件
 */
define([
  './custom/widgets/js/yu-base-frame.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var vm = yufp.custom.vue({
      el: cite.el
    });
    yufp.frame.baseFrame = vm.$refs.refFrame;
    if (cite.options) {
      cite.options.func(vm);
    }
  };

  exports.destroy = function (id, cite) {
    yufp.frame.baseframe = null;
  };
});