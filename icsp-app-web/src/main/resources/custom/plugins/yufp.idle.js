/**
 * Created by jiangcheng on 2016/09/01.
 */
(function (yufp, window, factory) {
  // 判断是否支持模块定义
  var hasDefine = typeof define === 'function';
  if (hasDefine) {
    // 获取对象
    var exports = factory(window, yufp);
    // 定义模块
    define(exports);
    // 安装插件(兼容非模块的访问方式)
    yufp.idle = exports;
  } else {
    // 获取对象
    var exports = factory(window, yufp);
    // 安装插件
    yufp.idle = exports;
  }
}(yufp, window, function (window, yufp) {
  var document = window.document;

  /**
     * 空闲监控器
     * @constructor
     */
  function Idle (interval) {
    // 记录最后操作时间
    this.lastOpsTime = new Date().getTime();
    // id种子
    this.seed = -1;
    // time注册表
    this.timeRegister = {};
    // clock注册表
    this.clockRegister = {};
    // 检查间隔
    if (interval) {
      this.interval = interval;
    } else {
      this.interval = 200;
    }
  }

  /**
     * 获取timer id
     */
  Idle.prototype._getTimerId = function _getTimerId () {
    this.seed++;
    if (this.seed < 0) {
      this.seed = 0;
    }
    var name = this.seed.toString();
    return name;
  };

  /**
     * 设置最后操作时间
     * @param time
     */
  Idle.prototype.setLastOpsTime = function setLastOpsTime (time) {
    this.lastOpsTime = time;
  };

  /**
     * 获取最后操作时间
     * @returns {number|*}
     */
  Idle.prototype.getLastOpsTime = function getLastOpsTime () {
    return this.lastOpsTime;
  };


  /**
     * 设置空闲执行任务
     * @param fn(执行代码)
     * @param timeout(空闲执行时间)
     */
  Idle.prototype.setTimeout = function setTimeout (fn, timeout) {
    // 初始化
    if (!this.timer) {
      var _this = this;
      // 启动timer
      this.timer = window.setInterval(function () {
        // 获取当前时间
        var curTime = new Date().getTime();
        // 获取最近时间
        var lastTime = _this.getLastOpsTime();
        // 获取时间间隔
        var time = curTime - lastTime;

        for (var id in _this.timeRegister) {
          // 获取记录
          var rec = _this.timeRegister[id];

          if (time >= rec.timeout) {
            // 删除记录
            delete _this.timeRegister[id];
            // 调用函数
            window.setTimeout(rec.callback, 0);
          }
        }
      }, this.interval);
    }

    // 定义记录
    var rec = {
      // 回调函数
      callback: fn,
      // timeout
      timeout: timeout
    };
    // 获取ID
    var id = this._getTimerId();
    // 加入注册表
    this.timeRegister[id] = rec;

    return id;
  };


  /**
     * 清空timeout
     * @param id
     */
  Idle.prototype.clearTimeout = function clearTimeout (id) {
    // 删除记录
    delete this.timeRegister[id];
  };

  /**
     *  清空所用的timeout
     * @type {clearAll}
     */
  Idle.prototype.clearAllTimeout = function clearAllTimeout () {
    // 清空timer
    this.timeRegister = [];
  };

  /**
     * 设置空闲时钟
     * @param stepFn
     * @param pauseFn
     * @param timeout
     * @param interval
     */
  Idle.prototype.setClock = function setClock (stepFn, startFn, stopFn, timeout, interval) {
    // 适配没事startFn和stopFn的情况
    if (yufp.type(startFn) == 'number') {
      timeout = startFn;
      interval = stopFn;
      startFn = undefined;
      stopFn = undefined;
    }


    // 初始化
    if (!this.clocker) {
      var _this = this;
      // 启动timer
      this.clocker = window.setInterval(function () {
        // 获取当前时间
        var curTime = new Date().getTime();
        // 获取最近时间
        var lastTime = _this.getLastOpsTime();
        // 获取时间间隔
        var time = curTime - lastTime;

        for (var id in _this.clockRegister) {
          try {
            // 获取记录
            var rec = _this.clockRegister[id];

            if (time >= rec.timeout) {
              if (rec.state == 'wait') {
                // 设置状态
                rec.state = 'running';
                // 调用start方法
                if (rec.startFn) {
                  rec.startFn();
                }
                // 调用step函数
                var id = window.setInterval(rec.stepFn, rec.interval);
                // 记录ID
                rec.id = id;
              }
            } else if (rec.state == 'running') {
              // 删除记录
              delete _this.clockRegister[id];
              // 设置状态
              rec.state = 'close';
              // 清除interval
              window.clearInterval(rec.id);
              // 调用stop方法
              rec.stopFn();
            }
          } catch (e) {
            // 打印日志
            yufp.logger.error(e.message, e);
          }
        }
      }, this.interval);
    }

    // 定义记录
    var rec = {
      // step回调函数
      stepFn: stepFn,
      // start回调函数
      startFn: startFn,
      // stop回调函数
      stopFn: stopFn,
      // timeout
      timeout: timeout,
      // 间隔
      interval: interval,
      // 记录状态(wait,running)
      state: 'wait'
    };
    // 获取ID
    var id = this._getTimerId();
    // 加入注册表
    this.clockRegister[id] = rec;

    return id;
  };

  /**
     * 清空clock
     * @param id
     */
  Idle.prototype.clearClock = function clearClock (id) {
    // 获取记录
    var rec = this.clockRegister[id];
    // 删除记录
    delete this.clockRegister[id];

    // 清除interval
    if (rec && rec.id) {
      try {
        window.clearInterval(rec.id);
      } catch (ex) {
        // do nothing
      }
    }
  };

  /**
     *  清空所用的clock
     * @type {clearAll}
     */
  Idle.prototype.clearAllClock = function clearAllClock () {
    // 清空clock
    for (var id in this.clockRegister) {
      this.clearClock(id);
    }
  };


  // 创建idle
  var idle = new Idle();

  /**
     * mouse down
     * @param event
     */
  document.onmousedown = function (event) {
    var time = new Date().getTime();
    // yufp.logger.debug('onmousedown time'+time);//debug
    idle.setLastOpsTime(time);
  };

  /**
     * mouse move
     * @param event
     */
  document.onmousemove = function (event) {
    var time = new Date().getTime();
    // yufp.logger.debug('onmousemove time'+time);//debug
    idle.setLastOpsTime(time);
  };

  /**
     * key down
     * @param event
     */
  document.onkeydown = function (event) {
    var time = new Date().getTime();
    // yufp.logger.debug('onkeydown time'+time);//debug
    idle.setLastOpsTime(time);
  };

  return idle;
}));