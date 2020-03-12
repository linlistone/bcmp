/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——树+查询
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          async: false,
          param: { UNITID: '0000', LEVELUNIT: '1' },
          queryFields: [
            { placeholder: '标题', field: 'title', type: 'input' },
            { placeholder: '类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' }
          ],
          tableColumns: [
            { label: '编码', prop: 'id', width: 80 },
            { label: '名称', prop: 'title', width: 250, sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '阅读数', prop: 'pageviews', width: 100 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: '时间', prop: 'createAt' }
          ],

          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'title', label: '名称' },
              { field: 'createAt', label: '时间', type: 'date' },
              { field: 'author', label: '作者' },
              { field: 'auditor', label: '审核人' },
              { field: 'type', label: '类型', type: 'select', dataCode: 'NATIONALITY' },
              { field: 'status', label: '状态', type: 'select', dataCode: 'PUBLISH_STATUS' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '点评', type: 'textarea', rows: 3 }
            ]
          }],
          updateButtons: [
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                _this.dialogVisible = false;
                _this.$msgbox.alert(model, '提示');
                // 请调用服务进行后台保存
              }
            },
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.dialogVisible = false;
              }
            }
          ],
          height: yufp.frame.size().height,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        /**
         * 控制保存按钮、dialog-x、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          this.viewType = viewType;
          this.dialogVisible = true;
          this.formDisabled = !editable;
          this.updateButtons[0].hidden = !editable;
          this.updateButtons[1].hidden = !editable;
        },
        nodeClickFn: function (nodeData, node, self) {
          this.$refs.tableInstance.remoteData();
        },
        /**
         * 新增
         */
        addFn: function () {
          this.switchStatus('ADD', true);
          this.$nextTick(function () {
            this.$refs.formRef.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          if (this.$refs.tableInstance.selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.$refs.formRef.formModel = yufp.clone(this.$refs.tableInstance.selections[0], {});
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          if (this.$refs.tableInstance.selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            this.$refs.formRef.formModel = yufp.clone(this.$refs.tableInstance.selections[0], {});
          });
        }
      }
    });
  };
});