/**
 * Created by jiangcheng 2018-02-27.
 * @description 全局配置入口
 * @update 20180601 liujie yufp.config增加debug 参数
 */
(function (window, yufp) {
  var config = window.YUFP_SYS_CONFIG,
    debug = config.debugModel,
    mockModel = config.mockModel;
  yufp.config({
    // 别名配置
    alias: {
      'vue': './libs/vue/vue' + (debug ? '' : '.min') + '-2.5.13.js',
      'mock': './libs/mockjs/mock' + (debug ? '' : '.min') + '.js',
      'jquery': './libs/jquery/jquery' + (debug ? '' : '.min') + '.js',
      'echarts': './libs/echarts/echarts-3.8.5.min.js',
      'jsplumb': './libs/jsPlumb/jsPlumb-1.7.9.js'
    },
    charset: config.charset,
    version: config.version,
    debug: config.debugModel
  });

  // css依赖库
  var libsCss = [
    './libs/element-ui/index.css',
    './custom/widgets/css/components.css',
    './themes/common/icoFonts/icoFonts.css',
    './themes/default/main.css'
  ];

  // js依赖库
  var libsJs = [
    'vue',
    './libs/element-ui/index.js',

    './custom/common/app.data.service.js',
    './custom/widgets/js/components.js',
    './custom/plugins/yufp.settings.js',
    './custom/plugins/yufp.localstorage.js',
    './custom/plugins/yufp.sessionstorage.js',
    './custom/plugins/yufp.service.js',
    './custom/plugins/yufp.validator.js',
    './custom/plugins/yufp.util.js',
    './custom/plugins/yufp.lookup.js',
    './custom/plugins/yufp.session.js',
    './custom/plugins/yufp.frame.js',
    './custom/common/app.js'
  ];

  // 路由表
  var routeTables = [
    './custom/route-tables/route.common.js'
  ];
  // 合并lib
  var libs = libsCss.concat(libsJs, routeTables);
  yufp.require.use(libs).done(function () {
    // yufp别名
    window.yu = window.yufp;
    // 设置配置
    yufp.settings.config(config);
    // mock加载
    if (mockModel) {
      yufp.require.require('./mocks/index.js');
    }
    // 多语言加载
    if (config.multiLanguage) {
      yufp.require.require('./libs/vuei18n/vue-i18n.js');
      var languageList = yufp.clone(yufp.frame.baseFrameOptions.languageList, []);
      var languageLibs = [];
      // 循环遍历，添加公共语言文件。
      for (var i = 0; i < languageList.length; i++) {
        var element = languageList[i];
        languageLibs.push('./themes/lang/' + element.id + '.js');
      }
      if (languageLibs.length > 0) {
        yufp.require.require(languageLibs, function () {
          var locate = {};
          for (var i = 0; i < languageList.length; i++) {
            var element = languageList[i];
            yufp.extend(locate, window['global_' + element.id]);
          }
          Vue.config.locate = locate;
        });
      }
    }
    // 紧凑模式
    if (config.compactMode) {
      yufp.require.require('./themes/common/compact.css');
    }
    var logoutFlag = true;
    // 加入请求过滤器
    yufp.service.addFilter({
      // 过滤器名称
      name: 'messageParser',
      // 请求前触发
      before: function (event) {
        // 定义请求头
        var headers = {};
        // 定义请求数据
        var reqData = {
          // 请求头
          headers: headers,
          // 请求数据
          data: event.data
        };
        // 保存导出数据
        event.code = 0;
        event.data = reqData;
        // 返回处理标志，true则继续处理，false则中断处理
        return true;
      },

      // 数据返回后触发
      after: function (event) {
        // 只处理JSON对象
        if (yufp.type(event.data) == 'object' && yufp.type(event.data.header) != 'undefined') {
          // 获取响应数据
          var rspData = event.data.data;
          if (yufp.type(event.code) == 'undefined' || event.code == 0) {
            // 保存导出数据
            event.code = 0;
            event.message = '';
            event.data = rspData;
            // 返回处理标志，true则继续处理，false则中断处理
            return true;
          } else {
            // 保存导出数据
            event.code = event.code;
            event.message = event.msg;
            event.data = rspData;
            // 返回处理标志，true则继续处理，false则中断处理
            return true;
          }
        }

        // 返回处理标志，true则继续处理，false则中断处理
        return true;
      },
      // HTTP请求异常
      exception: function (event) {
        var status = event.xhr.status;
        var flag = true;
        var globalVm = yufp.util.globalVm;
        globalVm.$loading().close();
        switch (status) {
        case 401:
          yufp.session.logout(logoutFlag);
          flag = false;
          break;
        case 403:
          globalVm.$message({
            message: '您无权限访问，请联系系统管理员!',
            type: 'warning'
          });
          flag = false;
          break;
        case 404:
          globalVm.$message({
            message: '系统错误，请联系系统管理员!',
            type: 'error'
          });
          flag = false;
          break;
        default:
          globalVm.$message({
            message: '系统错误，请联系系统管理员!',
            type: 'error'
          });
          flag = false;
          break;
        }
        return flag;
      }
    });

    // 设置默认root id
    yufp.router.setDefaultRootId(config.defaultRootId);
    // 加入路由过滤器
    yufp.router.addFilter({

      /**
       * 过滤器名称
       */
      name: 'default',

      /**
       * 路由跳转前执行
       * @param code
       * @param cite
       */
      before: function (code, data, cite) {
        if (window.YUFP_SYS_CONFIG.sugoModel && typeof window.sugoio != 'undefined') {
          var sugoLoad = window.sugoio.load;
          cite.options && cite.options.title ? sugoLoad && sugoLoad(code, cite.options) : '';
        }
        if (config.debugModel) {
          var route = yufp.router.getRoute(code) || {};
          yufp.logger.info('【Router-JS】【' + code + '】: ' + route.js);
        }
        // 多语言标志位true 时才设置前缀
        if (config.multiLanguage) {
          var route = yufp.router.getRoute(code) || {};
          var prefix = route.js.substring(0, route.js.lastIndexOf('.'));
          var languageList = yufp.clone(yufp.frame.baseFrameOptions.languageList, []);
          // 循环遍历，添加页面名称相同的带语言类型后缀的js语言文件
          for (var i = 0; i < languageList.length; i++) {
            var element = languageList[i];
            if (element.mapping) {
              yufp.require.require(prefix + '_' + element.mapping + '.js');
            } else {
              yufp.require.require(prefix + '_' + element.id + '.js');
            }
          }
          cite.prefix = code;
        }
        return true;
      },

      /**
       * 加载路由内容前执行
       * @param code
       * @param cite
       */
      mount: function (code, cite) {
      },

      /**
       * ready函数执行
       * @param exports
       * @param code
       * @param data
       * @param cite
       */
      ready: function (exports, code, data, cite) {
      },

      /**
       * 卸载路由内容前执行
       * @param code
       * @param cite
       */
      unMount: function (code, cite) {
        if (window.YUFP_SYS_CONFIG.sugoModel && typeof window.sugoio != 'undefined') {
          var sugoUnLoad = window.sugoio.unload;
          cite.options && cite.options.title ? sugoUnLoad && sugoUnLoad(code, cite.options) : '';
        }
      },

      /**
       * destroy函数执行
       * @param exports
       * @param code
       * @param cite
       */
      destroy: function (exports, code, cite) {
      }
    });

    /**
      * 创建hash处理事件
      */
    var hashFn = function () {
      var hash = location.hash ? location.hash : '';
      var data = {}; // 路由参数
      var route = config.startPage; // 启动路由
      var currRoute = yufp.session.getCurrentRoute();
      route = currRoute || route;
      var sIndex = hash.indexOf('!'), eIndex = hash.indexOf('?');
      if (sIndex != -1) {
        route = eIndex != -1 ? hash.substring(sIndex + 1, eIndex) : hash.slice(sIndex + 1);
      }
      data = yufp.urlParam2Object(location.search); // 问号参数转换
      if (eIndex != -1 && hash.slice(eIndex + 1)) {
        yufp.extend(data, yufp.urlParam2Object(hash.slice(eIndex))); // hash参数转换, 并合并至data路由参数中
      }

      // yufp.logger.info('触发hash事件,hash:' + hash);
      // 调试模式true时，有mocks请求，故延迟加载
      var delay = mockModel ? 300 : 0;
      if (data.debug && route.indexOf('%2F')) {
        // IDE 预览入口
        var idePreview = 'idePreview', url = decodeURIComponent(route), route = 'frame';
        var t = new Date().getTime();
        yufp.router.addRoute(idePreview, { html: url + '.html?t=' + t, js: url + '.js?t=' + t });
        setTimeout(function () {
          yufp.session.loadUserSession(function () {
            var options = {};
            options.func = function (_this) {
              // 清除面包屑信息
              _this.$refs.refFrame.menuPath = [];
              yufp.frame.addTab({
                id: idePreview, // 菜单功能ID（路由ID）
                key: 'custom_' + t, // 自定义唯一页签key,请统一使用custom_前缀开头
                title: 'IDE-自动预览', // 页签名称
                data: data
              });
            };
            yufp.router.to(route, data, '', options);
          });
        }, delay);
      } else if (route == config.startPage) {
        // 主页入口
        setTimeout(function () {
          yufp.router.to(route, data);
        }, delay);
      } else {
        setTimeout(function () {
          yufp.session.loadUserSession(function () {
            yufp.router.to(route, data);
          });
        }, delay);
      }
    };
    // 添加hash change事件
    if (window.addEventListener) {
      window.addEventListener('hashchange', hashFn, false);
    } else if (window.attachEvent) {
      window.attachEvent('on' + 'hashchange', hashFn);
    } else {
      window['onhashchange'] = hashFn;
    }
    // 页面跳转
    hashFn();
  });
}(window, yufp));