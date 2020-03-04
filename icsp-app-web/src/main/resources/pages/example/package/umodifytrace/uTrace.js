
define([
  './custom/widgets/js/ElFormXU.js',
  './custom/widgets/js/ElTableXU.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.lookup.reg('ENV_STS');
    var vm = yufp.custom.vue({
      el: '#WfiWorkflowOrgGroup',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.ncmisAppCommonService + '/api/smodifydemo/selectSModifyDemoByParam',
            createSaveUrl: backend.ncmisAppCommonService + '/api/smodifydemo/addSModifyDemo',
            updateSaveUrl: backend.ncmisAppCommonService + '/api/smodifydemo/updateSModifyDemo',
            mTraceListUrl: backend.ncmisAppCommonService + '/api/utrace/selectSModifyTraceWithPage'
          },
          queryFileds: [
            { placeholder: '状态', field: 'orgCode', type: 'select', dataCode: 'ENV_STS' },
            { placeholder: '机构名称', field: 'orgName', type: 'input' },
            { placeholder: '流程名称', field: 'wfname', type: 'input' }
          ],
          query: {
            orgCode: '',
            orgName: '',
            wfname: ''
          },
          TraceServerName: backend.ncmisAppCommonService,
          dataParams: {},
          uKeyPref: 'WfiWorkflowOrgGroupWfiWorkflowOrgForm',
          uKeyField: 'pkvalue',
          mTraceParams: {},
          tableFilters: {
            applTypeFilter: function (value) {
              if (!value) {
                return '';
              }
              return yufp.lookup.convertKey('ZB_BIZ_CATE', value);
            },
            orgCodeFilter: function (value) {
              if (!value) {
                return '';
              }
              return yufp.lookup.convertKey('ENV_STS', value);
            }
          },
          tableColumns: [
            { label: '关联ID', prop: 'pkvalue', hidden: true },
            { label: '机构名称', prop: 'orgName', resizable: true },
            { label: '发布时间', prop: 'wfsign', resizable: true },
            { label: '流程名称', prop: 'wfname', resizable: true },
            {
              label: '申请类型',
              prop: 'applType',
              resizable: true,
              dataCode: 'ZB_BIZ_CATE',
              template: function () {
                return '{{ scope.row.applType | applTypeFilter}}';
              }
            },
            {
              label: '状态',
              prop: 'orgCode',
              resizable: true,
              dataCode: 'ENV_STS',
              template: function () {
                return '{{ scope.row.orgCode | orgCodeFilter}}';
              }
            },
            { label: '备注', prop: 'remark', resizable: true }
          ],
          mTraceTableColumns: [
            { label: '被修改的域', prop: 'mFieldNm', resizable: true },
            { label: '修改前', prop: 'mOldDispV', resizable: true },
            { label: '修改后', prop: 'mNewDispV', resizable: true },
            { label: '修改人', prop: 'usrId', resizable: true },
            { label: '修改时间', prop: 'mDatetime', resizable: true }
          ],
          dialogFormVisible: false,
          dialogVisible_mTrace: false,
          dialogStatus: '',
          formDisabled: false,
          textMap: {
            update: '修改',
            creat: '新增',
            detail: '查看'
          },
          mTrace: '修改痕迹信息',
          oldFormModel: {},
          uPkValue: 'WfiWorkflowOrgGroupWfiWorkflowOrgForm',
          updateFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'orgName', label: '所属机构名称', type: 'input', rules: { required: true, message: '必填项', trigger: 'blur' }
              },
              {
                field: 'applType', label: '申请类型', type: 'select', clearable: false, dataCode: 'ZB_BIZ_CATE', rules: { required: true, message: '必填项', trigger: 'blur' }
              },
              {
                field: 'wfsign', label: '发布时间', type: 'date', rules: { required: true, message: '必填项', trigger: 'blur', type: 'date' }
              },
              {
                field: 'wfname', label: '流程名称', type: 'input', rules: { required: true, message: '必填项', trigger: 'blur' }
              },
              {
                field: 'orgCode', label: '状态', type: 'radio', dataCode: 'ENV_STS', rules: { required: true, message: '必填项', trigger: 'blur' }
              },
              { field: 'pkvalue', label: '关联ID', type: 'input', hidden: true },
              { field: 'instuCode', label: '金融机构', type: 'input', hidden: true }
            ]
          }, {
            columnCount: 1,
            fields: [
              {
                field: 'remark',
                label: '备注',
                type: 'textarea',
                rows: 3,
                rules: [
                  { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              }
            ]
          }]
        };
      },
      methods: {
        customClick: function (row) {
          yufp.logger.debug(row);
        },
        openCreateFn: function () { // 打开新增页面
          this.opType('creat', false);
          this.$nextTick(function () {
            this.$refs.WfiWorkflowOrgForm.resetFields();
          });
        },
        beforeClose: function () {
          var me = this;
          var updateFields = me.updateFields;
          for (var i = 0; i < updateFields.length; i++) {
            var fields = me.updateFields[i].fields;
            for (var k = 0; k < fields.length; k++) {
              fields[k].uFlag = false;
              fields[k].message = '';
            }
          }
          this.$refs.WfiWorkflowOrgForm.resetFields();
        },

        getDate: function (strDate) { // 日期时间格式化
          var a = strDate.split('-');
          var date = new Date(a[0], a[1] - 1, a[2]);
          return date;
        },

        openEditFn: function () { // 打开修改页面
          var me = this;
          if (this.$refs.WfiWorkflowOrgList.selections.length !== 1) {
            this.$message({ message: '请选择一条数据!', type: 'warning' });
            return false;
          }
          var row = this.$refs.WfiWorkflowOrgList.selections[0];
          me.uPkValue = 'WfiWorkflowOrgGroupWfiWorkflowOrgForm' + row.pkvalue;
          me.oldFormModel = row;
          me.opType('update', false);
          me.$nextTick(function () {
            me.$refs.WfiWorkflowOrgForm.resetFields();
            yufp.extend(me.$refs.WfiWorkflowOrgForm.formModel, row);
            me.$refs.WfiWorkflowOrgForm.formModel.wfsign = me.getDate(row.wfsign);
            me.$refs.WfiWorkflowOrgForm.rebuildFn();
          });
        },
        openDetailFn: function (row) { // 查看详情
          var me = this;
          if (this.$refs.WfiWorkflowOrgList.selections.length !== 1) {
            this.$message({ message: '请选择一条数据!', type: 'warning' });
            return false;
          }
          var row = this.$refs.WfiWorkflowOrgList.selections[0];
          me.uPkValue = 'WfiWorkflowOrgGroupWfiWorkflowOrgForm' + row.pkvalue;
          this.opType('detail', true);
          this.$nextTick(function () {
            this.$refs.WfiWorkflowOrgForm.resetFields();
            yufp.extend(this.$refs.WfiWorkflowOrgForm.formModel, row);
            me.$refs.WfiWorkflowOrgForm.formModel.wfsign = me.getDate(row.wfsign);
            me.$refs.WfiWorkflowOrgForm.rebuildFn();
          });
        },
        opType: function (type, disabled) {
          this.dialogFormVisible = true;
          this.dialogStatus = type;
          this.formDisabled = disabled;
        },

        saveCreateFn: function () { // 新增保存
          var me = this;
          me.$refs.WfiWorkflowOrgForm.formModel.instuCode = yufp.session.instu.code;
          var myform = me.$refs.WfiWorkflowOrgForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.createSaveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  me.$message({ message: response.data.message, type: response.data.flag });
                  if (response.data.flag == 'success') {
                    me.dialogFormVisible = false;
                    me.$refs.WfiWorkflowOrgList.remoteData();
                  }
                }
              });
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          });
        },
        saveEditFn: function () { // 修改保存
          var me = this;
          var myform = me.$refs.WfiWorkflowOrgForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.updateSaveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  me.$message({ message: response.data.message, type: response.data.flag });
                  if (response.data.flag == 'success') {
                    me.dialogFormVisible = false;
                    // 保存修改痕迹
                    myform.saveUTrace(me.oldFormModel);
                  }
                }
              });
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          });
        },
        aftersaveu: function () {
          this.$refs.WfiWorkflowOrgList.remoteData();
        },
        deleteFn: function () { // 删除
          if (this.$refs.WfiWorkflowOrgList.selections.length > 0) {
            var row = this.$refs.WfiWorkflowOrgList.selections[0];
            var id = '';
            for (var i = 0; i < this.$refs.WfiWorkflowOrgList.selections.length; i++) {
              var row = this.$refs.WfiWorkflowOrgList.selections[i];
              id = id + row.pkvalue;
            }
            var me = this;
            this.$confirm('您确定需要删除该条记录吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.ncmisAppCommonService + '/api/smodifydemo/deleteSModifyDemo?pkvalue=' + id,
                callback: function (code, message, response) {
                  me.$message({ message: response.data.message, type: response.data.flag });
                  me.$refs.WfiWorkflowOrgList.remoteData();
                }
              });
            });
          } else {
            this.$message({ message: '请先选择要删除的数据', type: 'warning' });
            return false;
          }
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});