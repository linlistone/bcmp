/**
 * yufp service xy
 * Created by helin3 on 2017/11/25.
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.service = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 定义Service
   * @constructor
   */
  function Service () {
    this.options = {
      method: 'POST', // 默认POST，支持4种访问类型 GET/POST/PUT/DELETE
      async: true, // 异步请求
      data: {}, // 请求数据
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }, // http请求头
      dataType: 'json', // 默认返回数据类型
      timeout: 90000, // 默认超时时间
      cache: false, // 是否缓存
      needToken: true, // 是否传认证Token值去后台
      callback: false // 回调方法
    };
    this._filters = []; // 过滤器集合
    this.basePath = ''; // 应用名
    this.tokenId = 'Authorization'; // TOKEN 名
    this.tokenVal = ''; // TOKEN 值
  }

  /**
   *
   * @param options
   */
  Service.prototype.request = function (options) {
    var _this = this;
    var _options = yufp.extend({}, _this.options, options);
    _options.url = _this.getUrl(_options);

    var deferred = new yufp.core.Deferred();
    var event = {
      data: _options.data
    };
    // before过滤
    if (_this._doFilter(0, event) === false) {
      event.code = event.code ? event.code : 2;
      deferred.reject(event.code, event.message, event.data);
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
      return deferred;
    }
    _options.data = event.data.data;
    _options.headers = yufp.extend({}, event.data.headers || {}, _options.headers);
    if (_options.needToken) {
      var sessionStroageToken = _this.getToken();
      var tokentype = yufp.type(sessionStroageToken);
      var token;
      if (tokentype == 'object') {
        token = sessionStroageToken.access_token;
      } else {
        token = sessionStroageToken;
      }
      _options.headers[_this.tokenId] = 'Bearer ' + token;
    }
    _options.type = options.method;
    _options.async = options.async;
    _options.success = function (data, status, xhr) {
      // -------------------------------- recorder 模式 -----------------------------------------
      if (yufp.settings.recorderModel && yufp.settings.recorderScope.indexOf('yufp.service') != -1) {
        yufp.logger.info('[service receive]  url:' + _options.url + ' ,response:' + JSON.stringify(data));
      }
      // -------------------------------- recorder 模式 -----------------------------------------

      // 定义过滤事件
      var event = { code: 0, message: 'success', data: data };
      // after过滤器
      // 过滤器中断调用处理
      if (_this._doFilter(1, event) === false) {
        var code = event.code ? event.code : 1;
        // 通知调用失败
        deferred.reject(code, event.message, event.data);
        if (_options.callback) {
          _options.callback(code, event.message, event.data);
        }
        return;
      }
      // 通知调用成功
      deferred.resolve(event.code, event.message, event.data);
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
    };
    _options.error = function (xhr, status) {
      var msg = xhr.responseText;
      msg = !msg ? status : msg;

      // 定义过滤事件
      var event = { code: 1, message: msg, xhr: xhr };
      // exception过滤
      if (_this._doFilter(2, event) === false) {
        // 通知调用失败
        deferred.reject(event.code, event.message, event.data);
        return;
      }

      event.code = event.code ? event.code : 1;
      // 通知调用失败
      deferred.reject(event.code, event.message, event.data);
      // 判断是否存在回调函数
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
    };
    yufp.core.ajax(_options);
  };

  /**
         * 获取最终访问的完整URL
         * @param param {url }
         * @returns {string}
         */
  Service.prototype.getUrl = function (param) {
    param.url = param.url ? param.url : param.name;
    if (param.url) {
      if (yufp.settings.url) {
        param.url = param.url.charAt(0) == '/' ? param.url : '/' + param.url;
        var url = yufp.settings.ssl ? 'https://' : 'http://';
        url += yufp.settings.url;
        url += this.basePath ? this.basePath : '';
        if (param.url && (param.url.indexOf('http://') > -1 || param.url.indexOf('https://') > -1)) {
          // param.url 为http或https 情况时需要将前面拼接的/去掉
          url = param.url.substr(1);
        } else {
          url += param.url;
        }
      } else {
        url = param.url;
      }
      return url;
    } else if (param.path) {
      let msurl = '';
      if (yufp.settings.msUrl) {
        param.path = param.path.charAt(0) == '/' ? param.path : '/' + param.path;
        msurl = yufp.settings.msSSL ? 'https://' : 'http://';
        msurl += yufp.settings.msUrl;
        msurl += this.basePath ? this.basePath : '';
        if (param.path && (param.path.indexOf('http://') > -1 || param.path.indexOf('https://') > -1)) {
          // param.url 为http或https 情况时需要将前面拼接的/去掉
          msurl = param.path.substr(1);
        } else {
          msurl += param.path;
        }
      } else {
        url = param.path;
      }
      return msurl;
    } else {
      throw new Error('未设置请求msURL');
    }
  };

  Service.prototype.getToken = function () {
    return yufp.sessionStorage.get('UFP-' + this.tokenId) || '';
  };

  Service.prototype.putToken = function (token) {
    yufp.sessionStorage.put('UFP-' + this.tokenId, token);
  };

  Service.prototype.removeToken = function () {
    yufp.sessionStorage.remove('UFP-' + this.tokenId);
  };

  Service.prototype.addFilter = function (obj) {
    if (typeof obj != 'object') {
      yufp.logger.error('filter args must been json object');
      return;
    }
    if (!obj.name) {
      yufp.logger.error('filter args must have name attribute');
      return;
    }
    if (!obj.before || typeof obj.before !== 'function') {
      yufp.logger.error('filter args must have before function');
      return;
    }
    if (!obj.after || typeof obj.after !== 'function') {
      yufp.logger.error('filter args must have after function');
      return;
    }
    if (!obj.exception || typeof obj.exception !== 'function') {
      yufp.logger.error('filter args must have exception function');
      return;
    }
    this._filters.push(obj);
  };

  Service.prototype.removeFilter = function (obj) {
    var name = typeof obj == 'string' ? obj : obj.name;
    var i = 0;
    for (; i < this._filters.length; i++) {
      if (name == this._filters[i].name) {
        break;
      }
    }
    if (i < this._filters.length) {
      this._filters.splice(i, 1);
    }
  };

  Service.prototype._doFilter = function (type, event) {
    var fname = 'exception';
    fname = type == 0 ? 'before' : fname;
    fname = type == 1 ? 'after' : fname;
    for (var i = 0; i < this._filters.length; i++) {
      if (!this._filters[i][fname]) {
        continue;
      }
      var res = this._filters[i][fname](event);
      if (res === false) {
        return false;
      }
    }
  };

  return new Service();
})
);
