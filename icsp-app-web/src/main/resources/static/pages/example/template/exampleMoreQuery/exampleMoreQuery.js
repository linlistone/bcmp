/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——高级查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
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
          forceColumn: true, // 强制列紧随
          thrift: false, // 按钮是否是紧凑按钮，只显示图标
          resetButton: true, // 是否有重置按钮
          displayMode: false, // 高级搜索是否浮动
          moreQueryFields: [
            { placeholder: '标题2', field: 'title2', type: 'input' },
            { placeholder: '时间2', field: 'createAt2', type: 'date' },
            { placeholder: '时间3', field: 'createAt3', type: 'date' },
            { placeholder: '时间4', field: 'createAt4', type: 'date' },
            { placeholder: '时间5', field: 'createAt5', type: 'date' },
            { placeholder: '时间6', field: 'createAt6', type: 'date' },
            { placeholder: '时间7', field: 'createAt7', type: 'date' },
            { placeholder: '类型2', field: 'type2', type: 'select', dataCode: 'NATIONALITY' }
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.refTable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '编码', prop: 'id', width: 110 },
            { label: '名称', prop: 'title', width: 200, sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            {
              label: '参与人',
              headerAlign: 'center',
              children: [
                { label: '作者', prop: 'author', width: 110 },
                { label: '审核人', prop: 'auditor', width: 110 }
              ]
            },
            { label: '阅读数', prop: 'pageviews', width: 100 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: '时间', prop: 'createAt' }
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'title',
                label: '名称',
                disabled: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
              { field: 'createAt', label: '时间', type: 'date' },
              { field: 'author', label: '作者', hidden: true },
              { field: 'auditor', label: '审核人', disabled: true },
              {
                field: 'type',
                label: '类型',
                type: 'select',
                dataCode: 'YESNO',
                change: function (isOuter) {
                  _this.status = isOuter;
                  if (isOuter == '01') {
                    _this.updateFields[0].fields[2].hidden = false;
                    _this.updateFields[0].fields[0].disabled = false;
                    _this.updateFields[0].fields[3].disabled = false;
                    _this.$refs.reform.preTreat();
                  }
                  if (isOuter == '02') {
                    _this.updateFields[0].fields[2].hidden = true;
                    _this.updateFields[0].fields[0].disabled = true;
                    _this.updateFields[0].fields[3].disabled = true;
                    _this.$refs.reform.preTreat();
                  }
                }
              },
              { field: 'status', label: '状态', type: 'select', dataCode: 'PUBLISH_STATUS' },
              { field: 'pageviews', label: '自定义', type: 'custom', is: 'yufp-demo-selector' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '点评', type: 'textarea', rows: 3 }
            ]
          }
          ],
          updateButtons: [
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _this.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/save',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                      _this.dialogVisible = false;
                    }
                  }
                });
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
          height: yufp.frame.size().height - 103,
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
          var _this = this;
          _this.viewType = viewType;
          _this.updateButtons[1].hidden = !editable;
          _this.formDisabled = !editable;
          _this.dialogVisible = true;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.reform.formModel.status = 'draft';
          });
        },
        /**
         * 搜索按钮执行方法
         */
        searchClick: function () {
          this.$msgbox.alert('搜索');
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var selectionsAry = this.$refs.refTable.selections;
          if (selectionsAry.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.$refs.reform.formModel = yufp.clone(selectionsAry[0], {});
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var selectionsAry = this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            this.$refs.reform.formModel = yufp.clone(selectionsAry[0], {});
          });
        },
        /**
         * 删除逻辑
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          yufp.service.request({
            method: 'POST',
            url: '/trade/example/delete',
            data: {
              ids: arr.join(',')
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            }
          });
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          yufp.util.exportExcelByTable({
            fileName: '下载文件',
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
            ref: this.$refs.refTable,
            url: '/trade/example/list',
            param: {}
          });
        }
      }
    });
  };
});