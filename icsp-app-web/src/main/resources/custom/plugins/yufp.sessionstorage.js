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
    yufp.sessionStorage = exports;
  } else {
    // 获取对象
    var exports = factory(yufp, window);
    // 安装插件
    yufp.sessionStorage = exports;
  }
}(yufp, window, function (yufp, window) {
  /**
     * session storage
     * @constructor
     */
  function SessionStorage () {

  }

  /**
     * Types
     * @type {{stringType: string, numberType: string, booleanType: string, jsonType: string}}
     */
  SessionStorage.Types = {
    stringType: '00',
    numberType: '01',
    booleanType: '02',
    jsonType: '03'
  };

  /**
     * 系统配置
     * @type {string}
     */
  SessionStorage.SystemReadyOnly = '_$sys_session_readyOnly';

  /**
     * 判断是否为系统key
     * @param key
     * @returns {boolean}
     */
  SessionStorage.prototype.isSystemKey = function (key) {
    if (key && key.indexOf('_$sys_session_') == 0) {
      return true;
    }
    return false;
  };

  /**
     * 设置值
     * @param key
     * @param value
     * @param readyOnly
     */
  SessionStorage.prototype.put = function put (key, value, readyOnly) {
    // 获取key类型
    var keyType = yufp.type(key);
    if (keyType != 'string') {
      console.error('the type of key is not string');
      return;
    }

    // 判断key值是否和系统保留值冲突
    if (this.isSystemKey(key)) {
      console.error('the key name is illegal');
      return;
    }

    // 获取只读key配置
    var readyOnlyKeys = window.sessionStorage.getItem(SessionStorage.SystemReadyOnly);
    if (!readyOnlyKeys) {
      readyOnlyKeys = [];
    } else {
      readyOnlyKeys = JSON.parse(readyOnlyKeys);
    }

    // 判断key是否为只读
    if (readyOnlyKeys.indexOf(key) != -1) {
      console.error('the key is ready only');
      return;
    }


    // 定义参数
    var param;
    // 获取value类型
    var valueType = yufp.type(value);
    if (valueType == 'object') {
      var s = JSON.stringify(value);
      param = SessionStorage.Types.jsonType + s;
    } else if (valueType == 'string') {
      param = SessionStorage.Types.stringType + value;
    } else if (valueType == 'number') {
      param = SessionStorage.Types.numberType + value;
    } else if (valueType == 'boolean') {
      param = SessionStorage.Types.booleanType + value;
    } else {
      console.error('the type of value is not supported');
      return;
    }

    // 保存只读key集合
    if (readyOnly && readyOnly == true) {
      readyOnlyKeys.push(key);
      readyOnlyKeys = JSON.stringify(readyOnlyKeys);
      window.sessionStorage.setItem(SessionStorage.SystemReadyOnly, readyOnlyKeys);
    }
    // 设置值
    window.sessionStorage.setItem(key, param);
  };

  /**
     * 获取值
     * @param key
     * @returns {*}
     */
  SessionStorage.prototype.get = function get (key) {
    // 获取key类型
    var keyType = typeof key;
    if (keyType != 'string') {
      console.error('the type of key is not string');
      return undefined;
    }
    // 获取value
    var param = window.sessionStorage.getItem(key);

    if (param == null || param == undefined) {
      return param;
    }
    // 获取value类型
    var valueType = param.substring(0, 2);
    // 获取value
    var value = param.substring(2, param.length);
    if (valueType == SessionStorage.Types.jsonType) {
      value = JSON.parse(value);
    } else if (valueType == SessionStorage.Types.numberType) {
      value = Number(value);
    } else if (valueType == SessionStorage.Types.booleanType) {
      value = Boolean(value);
    }
    return value;
  };

  /**
     * 移除项
     * @param key
     * @returns {undefined}
     */
  SessionStorage.prototype.remove = function remove (key) {
    // 获取key类型
    var keyType = typeof key;
    if (keyType != 'string') {
      console.error('the type of key is not string');
      return undefined;
    }

    // 判断key值是否和系统保留值冲突
    if (this.isSystemKey(key)) {
      console.error('the key name is illegal');
      return undefined;
    }
    // 获取只读key配置
    var readyOnlyKeys = window.sessionStorage.getItem(SessionStorage.SystemReadyOnly);
    if (!readyOnlyKeys) {
      readyOnlyKeys = [];
    } else {
      readyOnlyKeys = JSON.parse(readyOnlyKeys);
    }

    // 判断key是否为只读
    if (readyOnlyKeys.indexOf(key) != -1) {
      console.error('the key is ready only');
      return;
    }

    window.sessionStorage.removeItem(key);
  };

  /**
     * 清空所有的项
     * @returns {undefined}
     */
  SessionStorage.prototype.clear = function clear () {
    // 获取只读key配置
    var readyOnlyKeys = window.sessionStorage.getItem(SessionStorage.SystemReadyOnly);
    if (!readyOnlyKeys) {
      readyOnlyKeys = [];
    } else {
      readyOnlyKeys = JSON.parse(readyOnlyKeys);
    }

    // 临时缓存
    var tmpCache = {};
    // 保存ready only key
    for (var i = 0; i < readyOnlyKeys.length; i++) {
      var key = readyOnlyKeys[i];
      var value = window.sessionStorage.getItem(key);
      tmpCache[key] = value;
    }

    // 清空
    window.sessionStorage.clear();

    if (readyOnlyKeys) {
      // 还原ready only key
      for (var i = 0; i < readyOnlyKeys.length; i++) {
        var key = readyOnlyKeys[i];
        var value = tmpCache[key];
        window.sessionStorage.setItem(key, value);
      }
      // 保存ready only keys
      readyOnlyKeys = JSON.stringify(readyOnlyKeys);
      window.sessionStorage.setItem(SessionStorage.SystemReadyOnly, readyOnlyKeys);
    }
  };

  // 定义session storage
  var sessionStorage = new SessionStorage();
  // 返回session storage
  return sessionStorage;
}));