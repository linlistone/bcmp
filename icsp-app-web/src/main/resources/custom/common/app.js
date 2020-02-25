/* 这里本项目得工具类方法放置的地方*/

define(function (require, exports) {
  // 记录exports
  yufp.custom = exports;

  /**
   * vue扩展定义方法
   * @param args
   * @returns {*}
   */
  exports.vue = function (args) {
    // 根据标志导入多语言
    if (yufp.settings.multiLanguage) {
      var message = {};
      var selectLanguage = null;
      var languageList = yufp.clone(yufp.frame.baseFrameOptions.languageList, []);
      for (var i = 0; i < languageList.length; i++) {
        var element = languageList[i];
        if (element.mapping) {
          message[element.id] = window['lang' + element.mapping.substr(0, 1).toLocaleUpperCase() + element.mapping.substring(1)];
        } else {
          message[element.id] = window['lang' + element.id.substr(0, 1).toLocaleUpperCase() + element.id.substring(1)];
        }
        if (element.checked) {
          selectLanguage = element.id;
        }
      }
      if (selectLanguage == null) {
        // 语言list有数据才处理的时候
        if (languageList.length > 0) {
          selectLanguage = languageList[0].id;
        } else {
          selectLanguage = 'zh';
        }
      }
      var storageLanguage = yufp.localStorage.get('language');
      if (storageLanguage) {
        selectLanguage = storageLanguage;
      }
      var lang = Vue.config.lang ? Vue.config.lang : selectLanguage;
      args.i18n = new window.VueI18n({
        locale: lang,
        messages: message
      });
      // 指定elementUI 的多语言
      if (window.YUFPWP) {
        window.YUFPWP.locale(message[lang]);
      } else if (window.ELEMENT) {
        window.ELEMENT.locale(message[lang]);
      }
    }

    return new Vue(args);
  };

  /**
   * 获取有效数据
   * @param data
   */
  exports.getData = function (data) {
    var resData = {};

    for (var key in data) {
      // 以m_开头的数据为page中的元数据、以$开头的数据为virtual model的保留数据
      if (key.indexOf('m_') === 0 || key.indexOf('$') === 0) {
        continue;
      }
      // 获取value
      var val = data[key];
      // 忽略function
      if (typeof val === 'function') {
        continue;
      }
      resData[key] = data[key];
    }
    return resData;
  };

  /**
   * 设置数据
   * @param srcData
   * @param targetData
   */
  exports.setData = function (srcData, targetData) {
    for (var key in srcData) {
      targetData[key] = srcData[key];
    }
    return targetData;
  };

  /**
   * 获取可见区域
   * @returns {{width: number, height: number}}
   */
  exports.viewSize = function viewSize () {
    return yufp.frame.size();
  };
});
