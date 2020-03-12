/**
 * @created by zhangkun6 on 2017-12-06
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——tab页签+查询
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          queryFields: [
            { placeholder: '关键字', field: 'id', type: 'input' },
            { placeholder: '消息类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' }
          ],
          queryButtons2: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.mytable2.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          queryButtons3: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.mytable3.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '编码', prop: 'id', width: 110 },
            { label: '名称', prop: 'title', width: 200, sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '作者', prop: 'author', width: 110 },
            { label: '审核人', prop: 'auditor', width: 110 },
            { label: '阅读数', prop: 'pageviews', width: 100 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: '时间', prop: 'createAt' }
          ],
          dataUrl: '/trade/example/list',
          activeName: 'messageTip'
        };
      },
      methods: {
        handleClick: function (tab, event) {
          // TODO
        }
      }
    });
  };
});