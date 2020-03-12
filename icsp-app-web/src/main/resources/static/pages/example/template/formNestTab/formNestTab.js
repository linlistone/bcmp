/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——表单内嵌套Tabs
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS,GENDER,EDUCATION_TYPE,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          tabName: 'base',
          baseFields: [{
            columnCount: 2,
            fields: [
              { field: 'name', label: '姓名' },
              { field: 'gender', label: '性别', type: 'select', dataCode: 'GENDER' },
              { field: 'education', label: '学历', type: 'select', dataCode: 'EDUCATION_TYPE' },
              { field: 'cardType', label: '证件类型', type: 'select', dataCode: 'IDENT_TYPE' },
              { field: 'barthday', label: '出生日期', type: 'date' },
              { field: 'cardNo', label: '证件号码' },
              { field: 'company', label: '公司' },
              { field: 'email', label: '邮箱' }
            ]
          }],
          tableColumns: [
            { label: '编码', prop: 'id', width: 110 },
            { label: '名称', prop: 'title', width: 200, sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '作者', prop: 'author', width: 110 },
            { label: '审核人', prop: 'auditor', width: 110 },
            { label: '阅读数', prop: 'pageviews', width: 100 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: '时间', prop: 'createAt' }
          ]
        };
      }
    });
  };
});