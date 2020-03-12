/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——普通表单（编辑）
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY,YESNO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          editFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'title',
                label: '信息标题',
                placeholder: '5到25个字符',
                type: 'input',
                rules: [{ required: true, message: '请输入信息标题', trigger: 'blur' },
                  { min: 5, max: 25, message: '长度在5到25个字符', trigger: 'blur' }]
              },
              {
                field: 'type',
                label: '类型',
                type: 'select',
                dataCode: 'NATIONALITY',
                rules: [{ required: true, message: '请选择类型', trigger: 'blur' }]
              },
              { field: 'status', label: '状态', type: 'select', dataCode: 'PUBLISH_STATUS' },
              { field: 'author', label: '作者', type: 'input', placeholder: ' 编辑人姓名' },
              { field: 'telNumber', label: '联系电话', type: 'input', placeholder: ' 编辑人联系电话' },
              { field: 'time', label: '发布时间', type: 'daterange', placeholder: '设置自动发布时间' },
              {
                field: 'tags',
                label: '所属标签',
                type: 'checkbox',
                dataCode: 'NATIONALITY',
                change: function (val) {
                  // TODO
                }
              },
              {
                field: 'isTop',
                label: '是否置顶',
                type: 'radio',
                dataCode: 'YESNO',
                change: function (val) {
                  // TODO
                }
              }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '内容', placeholder: '2000个字符以内', type: 'textarea', rows: 6 }
            ]
          }],
          buttons: [
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  _this.$msgbox.alert(model, '提示');
                  // TODO
                }
              }
            },
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              click: function () {
                // TODO
              }
            },
            {
              label: '重置',
              type: 'primary',
              icon: 'yx-loop2',
              op: 'reset',
              click: function (model) {
                // TODO
              }
            }
          ]
        };
      },
      methods: {
        // TODO
      }
    });
  };
});