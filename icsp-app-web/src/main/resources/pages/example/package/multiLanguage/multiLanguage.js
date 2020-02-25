/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——普通查询
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
    if (!yufp.settings.multiLanguage) {
      yufp.util.globalVm.$message({message: '应用未启用多语言！', type: 'error'});
      throw new Error('应用未启用多语言！');
    }
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          baseParams: {
            condition: {
              userId: 'admin'
            },
            nonCondParam1: '1',
            nonCondParam2: '2'
          },
          queryFields: [
            { placeholder: this.$t('multiLanguage.bt'), field: 'title', type: 'input' },
            { placeholder: this.$t('multiLanguage.sj'), field: 'createAt', type: 'date' },
            { placeholder: this.$t('multiLanguage.lx'), field: 'type', type: 'select', dataCode: 'NATIONALITY' }
          ],
          queryButtons: [
            {
              label: this.$t('multiLanguage.ss'),
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: this.$t('multiLanguage.zz'), op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: this.$t('multiLanguage.bm'), prop: 'id', width: 110 },
            { label: this.$t('multiLanguage.mc'), prop: 'title', width: 200, sortable: true, resizable: true },
            { label: this.$t('multiLanguage.lx'), prop: 'type', width: 110, dataCode: 'NATIONALITY'},
            { label: this.$t('multiLanguage.cyr'),
              headerAlign: 'center',
              children: [
                { label: this.$t('multiLanguage.zz'), prop: 'author', width: 110 },
                { label: this.$t('multiLanguage.shr'), prop: 'auditor', width: 110 }
              ]
            },
            { label: this.$t('multiLanguage.yds'), prop: 'pageviews', width: 100 },
            { label: this.$t('multiLanguage.zt'), prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' },
            { label: this.$t('multiLanguage.sj'), prop: 'createAt' }
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'title',
                label: this.$t('multiLanguage.mc'),
                rules: [
                  { required: true, message: this.$t('multiLanguage.btx'), trigger: 'blur' }
                ]
              },
              { field: 'createAt', label: this.$t('multiLanguage.sj'), type: 'date' },
              { field: 'author', label: this.$t('multiLanguage.zz') },
              { field: 'auditor', label: this.$t('multiLanguage.shr') },
              { field: 'type', label: this.$t('multiLanguage.lx'), type: 'select', dataCode: 'NATIONALITY' },
              { field: 'status', label: this.$t('multiLanguage.zt'), type: 'select', dataCode: 'PUBLISH_STATUS' },
              {
                field: 'pageviews',
                label: this.$t('multiLanguage.yds'),
                rules: [
                  { validator: yufp.validator.number, message: this.$t('multiLanguage.sz'), trigger: 'blur' }
                ]
              },
              { field: 'yourField', label: this.$t('multiLanguage.zdy'), type: 'custom', is: 'yufp-demo-selector' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: this.$t('multiLanguage.dp'), type: 'textarea', rows: 3 }
            ]
          }],
          updateButtons: [
            {
              label: this.$t('multiLanguage.bc'),
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
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/save',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message(this.$t('multiLanguage.czcg'));
                      _this.dialogVisible = false;
                    }
                  }
                });
              }
            },
            {
              label: this.$t('multiLanguage.qx'),
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
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          selectFlag: true
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
            _this.$refs.reform.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: this.$t('multiLanguage.qxxzytjl'), type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            this.$refs.reform.formModel = yufp.clone(obj, {}); // 使用深复制
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var selectionsAry = this.$refs.reftable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: this.$t('multiLanguage.qxxzytjl'), type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            this.$refs.reform.formModel = yufp.clone(selectionsAry[0], {});
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          if (selections.length < 1) {
            _this.$message({ message: this.$t('multiLanguage.qxxzytjl'), type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm(this.$t('multiLanguage.cczjyjscgwjsfjx'), this.$t('multiLanguage.ts'), {
            confirmButtonText: this.$t('multiLanguage.qd'),
            cancelButtonText: this.$t('multiLanguage.qx'),
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/delete',
                  data: {
                    ids: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message(this.$t('multiLanguage.czcg'));
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          yufp.util.exportExcelByTable({
            fileName: this.$t('multiLanguage.xzwj'),
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
            ref: this.$refs.reftable,
            url: '/trade/example/list',
            param: {}
          });
        }
      }
    });
  };
});
