/**
 * @created by zhangkun6 on 2017-12-07
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——查询+表格（主从表）
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          queryFields: [
            { placeholder: '角色名称', field: 'title', type: 'input' }
          ],
          height: yufp.frame.size().height - 103 - 92, // 默认103+两行标题36*2
          tableColumnsR: [
            { label: '编码', prop: 'id', width: 80 },
            { label: '角色名称', prop: 'title', sortable: true, resizable: true }
          ],
          tableColumnsP: [
            { label: '编码', prop: 'id', width: 80 },
            { label: '权限名称', prop: 'title', sortable: true, resizable: true }
          ]
        };
      },
      methods: {
        /**
         * 角色信息查询
         * @param row 行数据对象
         * @param event
         */
        search: function (row, event) {
          var params = {
            id: row.id
          };
          this.$refs.powerTable.remoteData(params);
        }
      }
    });
  };
});