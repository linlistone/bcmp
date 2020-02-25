/**
 * @created by wy 2018-01-18
 * @updated by
 * @description 图标Icons查询
 */
define(['./custom/common/app.data.icon.js'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          iconData: icons,
          keywords: '',
          sum: icons.length
        };
      },
      methods: {
        search: function () {
          var list = [], kw = this.keywords.replace(/(^\s*)|(\s*$)/g, '');
          if (kw != '') {
            for (var i = 0; i < icons.length; i++) {
              var id = icons[i].id, tag = icons[i].tag;
              if (id.indexOf(kw) > -1 || tag.replace('、', '').indexOf(kw) > -1) {
                list.push(icons[i]);
              }
            }
            this.iconData = list;
            this.sum = list.length;
          }
        },
        reset: function () {
          this.iconData = icons;
          this.keywords = '';
          this.sum = icons.length;
        },
        copy: function (id) {
          var cd = window.clipboardData;
          if (cd) {
            cd.setData('Text', id);
            this.$message('复制成功！');
          } else {
            this.$message({message: '浏览器不支持，请手动复制！', type: 'warning'});
          }
        }
      },
      mounted: function () {

      }
    });
  };

  /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
  exports.onmessage = function (type, message) {
  };

  /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
  exports.destroy = function (id, cite) {
  };
});