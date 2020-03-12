/**
 * Created by jiangcheng on 2016/09/21.
 */
(function (yufp, window, factory) {
  // 判断是否支持模块定义
  var hasDefine = typeof define === 'function';
  if (hasDefine) {
    // 获取对象
    var exports = factory(yufp, window);
    // 定义模块
    define(exports);
    // 安装插件(兼容非模块的访问方式)
    yufp.localStorage = exports;
  } else {
    // 获取对象
    var exports = factory(yufp, window);
    // 安装插件
    yufp.localStorage = exports;
  }
}(yufp, window, function (yufp, window) {
  /**
   * local storage
   * @constructor
   */
  function LocalStorage () {

  }

  /**
     * Types
     * @type {{stringType: string, numberType: string, booleanType: string, jsonType: string}}
     */
  LocalStorage.Types = {
    stringType: '00',
    numberType: '01',
    booleanType: '02',
    jsonType: '03'
  };


  /**
     * 设置值
     * @param key
     * @param value
     */
  LocalStorage.prototype.put = function put (key, value) {
    // 获取key类型
    var keyType = yufp.type(key);
    if (keyType != 'string') {
      yufp.logger.error('the type of key is not string');
      return;
    }
    // 定义参数
    var param;
    // 获取value类型
    var valueType = yufp.type(value);
    if (valueType == 'object') {
      var s = JSON.stringify(value);
      param = LocalStorage.Types.jsonType + s;
    } else if (valueType == 'string') {
      param = LocalStorage.Types.stringType + value;
    } else if (valueType == 'number') {
      param = LocalStorage.Types.numberType + value;
    } else if (valueType == 'boolean') {
      param = LocalStorage.Types.booleanType + value;
    } else {
      yufp.logger.error('the type of value is not supported');
      return;
    }
    // 设置值
    window.localStorage.setItem(key, param);
  };

  /**
     * 获取值
     * @param key
     * @returns {*}
     */
  LocalStorage.prototype.get = function get (key) {
    // 获取key类型
    var keyType = typeof key;
    if (keyType != 'string') {
      yufp.logger.error('the type of key is not string');
      return undefined;
    }
    // 获取value
    var param = window.localStorage.getItem(key);

    if (param == null || param == undefined) {
      return param;
    }
    // 获取value类型
    var valueType = param.substring(0, 2);
    // 获取value
    var value = param.substring(2, param.length);
    if (valueType == LocalStorage.Types.jsonType) {
      value = JSON.parse(value);
    } else if (valueType == LocalStorage.Types.numberType) {
      value = Number(value);
    } else if (valueType == LocalStorage.Types.booleanType) {
      value = Boolean(value);
    }
    return value;
  };

  /**
     * 移除项
     * @param key
     * @returns {undefined}
     */
  LocalStorage.prototype.remove = function remove (key) {
    // 获取key类型
    var keyType = typeof key;
    if (keyType != 'string') {
      yufp.logger.error('the type of key is not string');
      return undefined;
    }
    window.localStorage.removeItem(key);
  };

  /**
     * 清空所有的项
     * @param key
     * @returns {undefined}
     */
  LocalStorage.prototype.clear = function clear (key) {
    // 清空
    window.localStorage.clear();
  };

  // 定义local storage
  var localStorage = new LocalStorage();
  // 返回local storage
  return localStorage;
}));