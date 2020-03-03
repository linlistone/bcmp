/**
 * @created by helin3 2017-12-04
 * @updated by
 * @description 公共数据字典管理器
 * 依赖：custom/plugins/yufp.service.js
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.lookup = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 统一数据字典管理器
   * @constructor
   */
  function Lookup () {
    var _options = {
      lookupMgr: {}, // 内存字典对象
      remoteUrl: backend.appOcaService + '/adminSmLookupItem/weblist', // 远程URL
      remoteParamName: 'lookupCodes', // 远程参数名
      codeKey: 'key', // 对应后台字段key
      codeValue: 'value', // 对应后台字段value
      limit: false, // 是否开启字典长度超过limitlength长度转存
      limitLength: 100, // 字典长度超过100，直接存储于localstorage
      prefix: 'YUFP-LIMIT-TYPE-', // 超长字典前缀
      // loadingQueue: {},      //加载中队列，暂且未考虑
      localPath: [ // 本地字典路径
        './custom/common/app.data.lookup.js'
      ],
      // 存储未注册的数据对象信息
      unRegArray: {}
    };
    yufp.extend(this, _options);
    this.loadLocal();
  }

  /**
   * private
   * 加载所有本地字典
   * @param callback 回调方法(可选参数)
   */
  Lookup.prototype.loadLocal = function (callback) {
    var _this = this, pathArr = _this.localPath;
    yufp.require.require(pathArr, function () {
      for (var i = 0, len = pathArr.length; i < len; i++) {
        var local = yufp.require.use(pathArr[i]);
        yufp.extend(_this.lookupMgr, local.localLookup);
      }
      if (yufp.type(callback) === 'function') {
        callback.call(_this);
      }
    });
  };

  /**
   * private
   * 加载指定远程数据字典
   * @param types  String
   *    GENDER_TYPE
   *    GENDER_TYPE,USER_STATUS,SYSTEM_STATUS
   * @param callback 暂且未处理callback，20180731
   */
  Lookup.prototype.loadRemote = function (types, callback) {
    var _this = this;
    // TODO 暂且未考虑字典请求中队列
    _this.forceLoad(types, function (data) {
      var typeArr = types.split(',');
      types = null; // 闭包手工设置为null
      for (var i = 0, len = typeArr.length; i < len; i++) {
        var type = typeArr[i];
        if (!_this.limit) {
          _this.lookupMgr[type] = data[type] || [];
        } else {
          if (data[type].length < _this.limitLength) {
            _this.lookupMgr[type] = data[type];
          } else {
            _this.storagePut(_this.prefix + type, data[type]);
          }
        }
        // 回调异步未刷新的相关对象，再次执行检查
        _this.updateReg(typeArr[i]);
      }
      callback && callback();
    });
  };
  /**
   * 用于处理表格中异步数据显示文本失败时处理数据
   * @param {*} type 数据字典id
   */
  Lookup.prototype.updateReg = function (type) {
    // 取出相关未注册的表格
    for (var item in this.unRegArray) {
      // 超过1分钟未处理的数据字典就不再处理了
      if (new Date().getTime() - this.unRegArray[item].time > 1 * 60 * 1000) {
        delete this.unRegArray[item];
      } else {
        var arr = yufp.clone(this.unRegArray[item].lookupArray, []);
        // 遍历每个表格的未注册的数据字典
        for (var j = arr.length - 1; j >= 0; j--) {
          var el = arr[j];
          if (el.dataCode === type) {
            // 找到就将以前未注册的字典表格列刷新
            this.unRegArray[item]['fn'] && this.unRegArray[item]['fn'](el);
            // 数据字典处理后就移除
            this.unRegArray[item].lookupArray.splice(j, 1);
          }
        }
        // 当表格的数据字典全部注册后就从unRegArray[item]中移除
        if (this.unRegArray[item].lookupArray.length === 0) {
          this.unRegArray[item].fn = null;
          delete this.unRegArray[item];
        }
      }
    }
  };
  /**
   * private
   * 强制刷新远程字典
   * @param types
   * @param callback
   */
  Lookup.prototype.forceLoad = function (types, callback) {
    var _this = this;
    var param = {};
    param[_this.remoteParamName] = types;
    yufp.service.request({
      url: _this.remoteUrl,
      method: 'get',
      data: param,
      callback: function (code, msg, response) {
        if (code == 0 && response && yufp.type(callback) == 'function') {
          callback.call(this, response.data);
        }
      }
    });
  };

  Lookup.prototype.queueHas = function (type) {
    return !!this.loadingQueue[type];
  };

  Lookup.prototype.queuePush = function (type) {
    this.loadingQueue[type] = true;
  };

  Lookup.prototype.queuePop = function (type) {
    delete this.loadingQueue[type];
    return type;
  };

  Lookup.prototype.storageDataCodePut = function (type, array) {
    var _this = this;
    if (!_this.limit) {
      _this.lookupMgr[type] = array || [];
    } else {
      if (array.length < _this.limitLength) {
        _this.lookupMgr[type] = array;
      } else {
        _this.storagePut(_this.prefix + type, array);
      }
    }
  };

  Lookup.prototype.storagePut = function (type, array) {
    yufp.sessionStorage.put(this.prefix + type, JSON.stringify(array));
  };

  Lookup.prototype.storageGet = function (type) {
    var lookup = yufp.sessionStorage.get(this.prefix + type);
    if (lookup) {
      lookup = JSON.parse(lookup);
    } else {
      lookup = undefined;
    }
    return lookup;
  };

  /**
   * 字段转换方法
   * @param type 字典类型
   * @param sourceVal 要转换的值
   * @param source 源字段
   * @param target 目标字段
   * @returns {*}
   */
  Lookup.prototype.convert = function (type, sourceVal, source, target) {
    var _this = this, targetVal = sourceVal;
    var typeArr = type.split(',');
    var totalLookup = [];
    for (var j = 0; j < typeArr.length; j++) {
      var el = typeArr[j];
      var lookup = _this.lookupMgr[el] || _this.storageGet[el];
      lookup = yufp.extend(true, [], lookup);
      totalLookup = totalLookup.concat(lookup);
    }
    if (!totalLookup) {
      yufp.logger.debug('【' + type + '】字典未加载！');
      return targetVal;
    }
    for (var i = 0, len = totalLookup.length; i < len; i++) {
      var item = totalLookup[i];
      // 不直接使用双等号而使用三等号，原因在于避免0 == false的情况
      if ('' + item[source] === '' + sourceVal) {
        targetVal = item[target];
        break;
      }
    }
    return targetVal;
  };

  /**
   * 将字典注册到字典管理器中
   * @param types string,必须
   *    示例：'GENDER_TYPE'
   *    或：'GENDER_TYPE,USER_STATUS,SYSTEM_STATUS'
   * @param callback ，loadRemote暂且未处理此参数，故无效20180731
   */
  Lookup.prototype.reg = function (types, callback) {
    var _this = this;
    var allArr = types.split(','), needArr = [];
    for (var i = 0, len = allArr.length; i < len; i++) {
      var type = allArr[i];
      if (!_this.lookupMgr[type] && !_this.storageGet[type]) {
        needArr.push(type);
      }
    }
    if (needArr.length > 0) {
      _this.loadRemote.call(this, needArr.join(','), callback);
    }
  };

  /**
   * 将数据字典绑定到对象上
   * @param type 字典类型
   * @param callback 回调方法参数即是字典数组对象
   */
  Lookup.prototype.bind = function (type, callback) {
    var _this = this;
    if (yufp.type(callback) != 'function') {
      yufp.logger.debug('【' + type + '】字典bind方法参数错误');
    }
    var totalLookup = [];
    var typeArr = type.split(',');
    var needArr = [];
    for (var i = 0; i < typeArr.length; i++) {
      var el = typeArr[i];
      var lookup = this.lookupMgr[el] || _this.storageGet[el];
      if (!lookup) {
        needArr.push(el);
      } else {
        totalLookup = totalLookup.concat(lookup);
      }
    }
    if (needArr.length > 0) {
      _this.forceLoad(needArr.join(','), function (data) {
        for (var j = 0; j < needArr.length; j++) {
          _this.lookupMgr[needArr[j]] = lookup = data[needArr[j]];
          lookup = yufp.extend(true, [], lookup);
          totalLookup = totalLookup.concat(lookup);
        }
        callback.call(this, totalLookup);
      });
    } else {
      callback.call(this, totalLookup);
    }
  };

  /**
   * 根据字典类别查找
   * @param type 要查找的字典类型
   * @param isArray 是否返回数组（可选参数）, true: 是，false: 否； 默认true
   */
  Lookup.prototype.find = function (type, isArray) {
    var _this = this;
    isArray = isArray !== false;
    var totalLookup = [];
    var typeArr = type.split(',');
    for (var i = 0; i < typeArr.length; i++) {
      var lookup = this.lookupMgr[typeArr[i]] || _this.storageGet[typeArr[i]];
      lookup = yufp.extend(true, [], lookup);
      totalLookup = totalLookup.concat(lookup);
    }
    if (!isArray) {
      totalLookup = !totalLookup ? {} : _this.array2Map(totalLookup);
    }
    return totalLookup;
  };

  /**
   * 数组转Map
   * @param lookup
   * @returns {Map}
   */
  Lookup.prototype.array2Map = function (lookup) {
    var _this = this;
    lookup = lookup ? lookup.reduce(function (acc, cur) {
      acc[cur[_this.codeKey]] = cur[_this.codeValue];
      return acc;
    }, {}) : {};
    return lookup;
  };

  /**
   * 字典码转换为字典值
   * @param type 字典类型
   * @param key 字典码
   * @returns {*} 字典值
   */
  Lookup.prototype.convertKey = function (type, key) {
    return this.convert(type, key, this.codeKey, this.codeValue);
  };

  /**
   * 字典值转换为字典码
   * @param type 字典类型
   * @param value 字典值
   * @returns {*} 字典码
   */
  Lookup.prototype.convertValue = function (type, value) {
    return this.convert(type, value, this.codeValue, this.codeKey);
  };

  /**
   * 批量字典码转换为字典值
   * @param type 字典类型
   * @param keys 字典码，多个用逗号分隔
   * @param sep 分隔符（可选参数），默认','
   * @returns {*}
   */
  Lookup.prototype.convertMultiKey = function (type, keys, sep) {
    var _this = this;
    var lookup = _this.lookupMgr[type] || _this.storageGet[type];
    if (!lookup) {
      yufp.logger.debug('【' + type + '】字典未加载！');
      return keys;
    }
    sep = !sep ? ',' : sep;
    var keyArr = keys.split(sep), values = [];
    for (var k = 0, kLen = keyArr.length; k < kLen; k++) {
      values.push(_this.convertKey(type, keyArr[k]));
    }
    return values.join(sep);
  };

  /**
   * 批量字典值转换为字典码
   * @param type 字典类型
   * @param values 字典值，多个用逗号分隔
   * @param sep 分隔符（可选参数），默认','
   * @returns {*}
   */
  Lookup.prototype.convertMultiValue = function (type, values, sep) {
    var _this = this;
    var lookup = _this.lookupMgr[type] || _this.storageGet[type];
    if (!lookup) {
      yufp.logger.debug('【' + type + '】字典未加载！');
      return values;
    }
    sep = !sep ? ',' : sep;
    var keyArr = values.split(sep), keys = [];
    for (var k = 0, kLen = keyArr.length; k < kLen; k++) {
      keys.push(_this.convertValue(type, keyArr[k]));
    }
    return keys.join(sep);
  };
  /**
   * 将对象转换成字段数组
   * @param obj 待转换对象
   * @param type 转换类型 true:将键值转 key，值转value，默认值, false:将键值转value，值转key
   * @returns {*}
   */
  Lookup.prototype.convertObjectToArray = function (obj, type) {
    var reArr = [];
    for (var k in obj) {
      var o = {};
      o[this.codeKey] = !type ? obj[k] : k;
      o[this.codeValue] = !type ? k : obj[k];
      reArr.push(o);
    }
    return reArr;
  };

  return new Lookup();
}));