/**
 * @created by helin3 2018-01-07
 * @updated by
 * @description 演示打开菜单页签或自定义页签
 */
define(function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {};
      },
      methods: {
        clickFn: function (type) {
          var routeId, customKey;
          if (type == 1) {
            // TODO 若菜单已打开，并且需要传递参数，则需要刷新菜单，系统主页面的菜单刷新逻辑还要调整
            var menuId = 'gm-21000'; // 空白模板的菜单ID
            routeId = 'blank'; // 空白模板的路由ID
            yufp.frame.addTab({
              id: routeId, // 菜单功能ID（路由ID）
              key: menuId, // 'menu_'前缀加菜单ID
              title: '空白模板', // 页签名称
              data: {} // 传递的业务数据，可选配置
            });
          } else if (type == 2) {
            customKey = 'custom_20180107203900'; // 请以custom_前缀开头，并且全局唯一
            routeId = 'exampleQuery'; // 模板示例->普通查询的路由ID
            yufp.frame.addTab({
              id: routeId, // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '自定义增删改查', // 页签名称
              data: { custId: '1001001' } // 传递的业务数据，可选配置
            });
          } else {
            customKey = 'custom_' + new Date().getTime(); // 请以custom_前缀开头，并且全局唯一
            routeId = 'elformx'; // 模板示例->普通查询的路由ID
            yufp.frame.addTab({
              id: routeId, // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '自定义增删改查2', // 页签名称
              data: { custId: '1001001' } // 传递的业务数据，可选配置
            });
          }
        }
      }
    });
  };
});