/**
 * @created by jiangcheng 2017-11-15
 * @updated by helin3 2018-04-24
 *   1)、去除define方式，便于main.js中提前使用
 *   2)、通过script方式引用，禁用此文件缓存，保证版本号参数真正生效
 * @description 系统参数配置
 */
(function (window) {
  var YUFP_SYS_CONFIG = {
    // url: '139.196.162.66:9100', // 请求URL
    url: '127.0.0.1:9100',
    // 是否启用SSL
    ssl: false,
    // web socket 通信方式
    webSocketType: 'get',
    // 默认root id
    defaultRootId: '_rootDiv',
    // 开始页面
    startPage: 'login',
    // 录制模式
    recorderModel: false,
    // 录制范围
    recorderScope: ['yufp.service'],
    // 调试模式
    debugModel: true,
    // 调试范围
    debugScope: ['yufp.service'],
    // 模拟数据模式
    mockModel: false,
    // 紧凑模式
    compactMode: false,
    // h5到打包成客户端时，标注是否启用数果可视化埋点
    sugoModel: false,
    // 是否支持多语言的开关
    multiLanguage: false,
    // 开启水印
    watermark: false,
    // 文件编码
    charset: 'UTF-8',
    // 版本号
    version: '1.1.0'
  };

  window.YUFP_SYS_CONFIG = YUFP_SYS_CONFIG;
}(window));
