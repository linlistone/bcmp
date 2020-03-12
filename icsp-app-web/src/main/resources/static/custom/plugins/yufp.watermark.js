/**
 * @created by wy 2018-11-14
 * @updated by
 * @description 水印
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.watermark = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 水印
   * @constructor
   */
  function Watermark () {
    var _options = {
      watermarkText: yufp.session.userCode + ' _' + yufp.session.userName, // 水印内容，默认为用户编码_用户姓名
      fontFamily: '微软雅黑', // 文字字体，默认为微软雅黑
      fontColor: 'rgba(0,0,0,0.20)', // 文字颜色，默认为黑色20%透明
      fontSize: 14, // 水印文字字号，默认14px
      watermarkBox: ['.yu-idxTabBox', '.yu-box', '.el-table', '.el-dialog', '.el-dialog-x', '.el-tree', '.el-select-dropdown__list', '.el-form', '.el-collapse', '.el-tabs', '.el-message-box', '.el-transfer-panel' ] // 水印显示区域为组件或容器的id或className，默认已设置tab工作区、dialog弹出窗口等容器、面板类组件，需根据客户化需求配置
    };
    yufp.extend(this, _options);
    this.init();
  };

  /**
   * 初始化
   */
  Watermark.prototype.init = function () {
    // 开启水印时默认给body加入yu-watermark类名，便于UI扩展控制
    document.querySelector('body').className += 'yu-watermark';
    this.setWatermark();
  };

  /**
   * 获取水印图片
   */
  var getWatermarkPic = function (text, fontColor, fontSize, fontFamily) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.measureText(text).width;
    canvas.height = fontSize;
    context.font = fontSize + 'px ' + fontFamily;
    context.textBaseline = 'middle';
    context.fillText(text, 0, fontSize / 2);
    canvas.width = context.measureText(text).width;
    canvas.height = canvas.width;
    context.fillStyle = fontColor;
    context.font = fontSize + 'px ' + fontFamily;
    context.textBaseline = 'middle';
    context.rotate(-45 * Math.PI / 180);
    context.fillText(text, -canvas.width / 2, (canvas.width / 2) + (fontSize * 2));
    context.fillText(text, -fontSize, -fontSize / 2);
    return canvas.toDataURL('image/png');
  };

  /**
   * 设置水印
   * @param options {text,fontSize,fontColor,fontFamily,dom}
   * @param text  水印文字内容，可选
   * @param fontSize  水印字号，可选
   * @param fontColor  水印文字颜色，可选
   * @param fontFamily  水印文字字体，可选
   * @param dom  待显示水印的dom对象，可选
   */
  Watermark.prototype.setWatermark = function (options) {
    var _options = options || {};
    var _text = _options.text ? _options.text : this.watermarkText;
    var _fontColor = _options.fontColor ? _options.fontColor : this.fontColor;
    var _fontSize = _options.fontSize ? _options.fontSize : this.fontSize;
    var _fontFamily = _options.fontFamily ? _options.fontFamily : this.fontFamily;
    if (_options.dom) {
      options.dom.style.backgroundImage = 'url(' + getWatermarkPic(_text, _fontColor, _fontSize, _fontFamily) + ')';
    } else {
      var style = document.createElement('style');
      style.innerHTML = this.watermarkBox.join(',') + '{background-image: url(' + getWatermarkPic(_text, _fontColor, _fontSize, _fontFamily) + ');}';
      document.querySelector('head').appendChild(style);
    }
  };
  return new Watermark();
}));
