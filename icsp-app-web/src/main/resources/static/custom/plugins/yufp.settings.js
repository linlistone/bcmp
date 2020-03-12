/**
 * Created by jiangcheng on 2016/11/25.
 */
(function (yufp, window, factory) {
  // 判断是否支持模块定义
  var hasDefine = typeof define === 'function';
  if (hasDefine) {
    // 获取对象
    var exports = factory(yufp);
    // 定义模块
    define(exports);
    // 安装插件(兼容非模块的访问方式)
    window.yufp.settings = exports;
  } else {
    // 获取对象
    var exports = factory(yufp);
    // 安装插件
    window.yufp.settings = exports;
  }
}(yufp, window, function (yufp) {
  // 定义配置对象
  var settings = {

    /**
         * 设置配置
         * @param args
         */
    config: function (args) {
      yufp.extend(this, args);
    }

  };
  return settings;
}));