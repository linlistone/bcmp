/**
 * @created by zhangkun
 * @updated
 * @description 模板示例—— 云图
 */
define(['libs/wordcloud/wordcloud2.js', 'libs/wordcloud/worldcloud2Plugin.js', 'custom/widgets/js/YufpWordCloud.js'], function (require, exports) {
  var list = [];
  for (var i = 0; i < 50; i++) {
    list.push(['美丽' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 10; i++) {
    list.push(['高' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 0; i++) {
    list.push(['好人' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 10; i++) {
    list.push(['会做饭' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 10; i++) {
    list.push(['有豪车' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 10; i++) {
    list.push(['高冷范' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 10; i++) {
    list.push(['胖胖的' + i, Math.ceil(Math.random() * 5)]);
  }
  for (var i = 0; i < 1; i++) {
    list.push(['资产过亿' + i, Math.ceil(Math.random() * 5)]);
  }
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          options: {
            list: list,
            rotateRatio: 0.4,
            minRotation: 45,
            maxRotation: 60,
            tooltip: {
              show: true,
              formatter: function (item) {
                return '展示_' + item[0];
              }
            },
            shape: 'themes/common/images/wordcloud/7.png',
            click: function (item, dimension, event) {
              _this.$alert('您点击了' + item[0], '提示');
            },
            weightFactor: function (size) {
              var f = Math.pow(size, 2.3) * document.getElementById('canvas').width / 1024;
              if (f < 15) {
                return 15;
              }
              if (f > 25) {
                return 25;
              }
              return f;
            }
          }
        };
      },
      methods: {
        // TODO
      },
      mounted: function () {
      }
    });
  };
});