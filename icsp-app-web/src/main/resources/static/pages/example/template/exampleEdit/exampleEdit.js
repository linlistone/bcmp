/**
 * @created by
 * @updated by taoting1 2018-8-15 修改代码规范
 * @description 模板示例——查询+表单（编辑）
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
          queryFields: [
            { placeholder: '标题', field: 'title', type: 'input' },
            { placeholder: '时间', field: 'createAt', type: 'date' },
            { placeholder: '类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' }
          ],
          tableColumns: [
            { label: '编码', prop: 'id', width: 70 },
            { label: '名称', prop: 'title', sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '作者', prop: 'author', width: 110 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: '时间', prop: 'createAt', width: 110 }
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'title', label: '名称' },
              { field: 'createAt', label: '时间', type: 'date' },
              { field: 'author', label: '作者' },
              { field: 'auditor', label: '审核人' },
              { field: 'importance', label: '重要性' },
              { field: 'pageviews', label: '阅读数' },
              { field: 'OPEN_FLAG', label: '有无' },
              { field: 'MEASURE', label: '已未' },
              { field: 'LOCK', label: '锁定' },
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
              hidden: true,
              click: function (model) {
                _this.dialogVisible = false;
                _this.$msgbox.alert(model, '提示');
                // TODO 请调用服务进行后台保存
              }
            }
          ],
          height: yufp.frame.size().height - 103,
          grpFormHeight: yufp.frame.size().height - 103 - 127 + 'px',
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        /**
         * 切换表单输入项的状态，控制表单'取消'按钮的展示/隐藏
         * @param viewType 表单类型
         * @param editable 可编辑,默认false
         */
        switchStatus: function (viewType, editable) {
          this.viewType = viewType;
          this.formDisabled = !editable;
          this.updateButtons[0].hidden = !editable;
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.formRef.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var selectionAry = this.$refs.tableInstance.selections;
          if (selectionAry.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.$refs.formRef.formModel = yufp.clone(selectionAry[0], {});
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
            yufp.extend(this.$refs.formRef.formModel, this.$refs.tableInstance.selections[0]);
          });
        }
      }
    });
  };
});