/**
 * @created by {{username}} on {{sys_date}}
 * @updated by
 * @description {{pageDesc}}
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // vue data
    let vmData = {
      showUploadSuccessMsgTag: false,
      versionQuery: {
        appModId: ''
      },
      appModList: [],
      nodeTypeDic: yufp.lookup.find('HOST_TYPE', true),
      nodeDataUrl: backend.bcmpService + '/bcmpSmNodeinfo/index',
      versionDataUrl: backend.bcmpService + '/bcmpSmVersion/index',
      deployDialogVisiable: false,
      stepDialogVisible: false,
      deployFormData: {
        version: '',
        needRestart: ''
      },
      versionList: [],
      options: [{
        value: 'true',
        label: '需要重启'
      }, {
        value: 'false',
        label: '不需要重启'
      }],
      formDisabled: true,
      saveBtnShow: true,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 表单数据
      formdata: {},
      dataUrl: backend.adminService + '/bcmpSmDeploy/index',
      buttonName: '', // 弹出框提交按钮名称
      dialogVisible: false // 弹出框层是否可见
    };
    // 创建vue model
    const vm = new Vue({
      el: cite.el,
      // 数据
      data: vmData,
      // 计算属性
      computed: {},
      // 方法
      methods: {
        versionSelectFn: function (row) {
          let _this = this;
          var appmod = null;
          for (var i = 0; i < _this.appModList.length; i++) {
            if (_this.appModList[i].appModId == row.appModId) {
              appmod = _this.appModList[i];
              break;
            }
          }
          // 设置查询的模块
          var condition = {
            condition: {
              nodeType: appmod.nodeType
            },
            sort: 'hostIp asc'
          };
          // 查询功能数据
          _this.$refs['refNodeTable'].remoteData(condition);
        },
        formatAppModCode: function (row) {
          let _this = this;
          for (var i = 0; i < _this.appModList.length; i++) {
            if (_this.appModList[i].appModId == row.appModId) {
              return _this.appModList[i].appModCode;
            }
          }
          return row.appModId;
        },
        formatAppModName: function (row) {
          let _this = this;
          for (var i = 0; i < _this.appModList.length; i++) {
            if (_this.appModList[i].appModId == row.appModId) {
              return _this.appModList[i].appModName;
            }
          }
          return row.appModId;
        },
        queryAppListFn: function () {
          let _this = this;
          let reqData = {};
          // 开始版本部署
          yufp.service.request({
            method: 'get',
            data: reqData,
            name: backend.bcmpService + '/bcmpSmAppMod/select',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                _this.appModList = data.data;
              } else {
                this.$message({
                  message: '部署失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        queryVersionListFn: function () {
          if (this.versionQuery.appModId == null || this.versionQuery.appModId == '') {
            this.$message({
              message: '请先选择应用',
              type: 'warning'
            });
            return;
          }
          var params = {
            condition: JSON.stringify({
              appModId: this.versionQuery.appModId
            }),
            sort: 'version_num desc'
          };
          this.$nextTick(function () {
            this.$refs.refVersionTable.remoteData(params);
          });
        },
        // 版本部署
        openDeployFn: function () {
          if (this.$refs.refNodeTable.selections.length == 0) {
            this.$message({
              message: '请先选择需要操作的服务节点',
              type: 'warning'
            });
            return;
          }
          let verSelects = this.$refs.refVersionTable.selections;
          if (verSelects.length == 0) {
            this.$message({
              message: '请先选择需要部署的版本号',
              type: 'warning'
            });
            return;
          }
          var nodeType = '';
          for (var i = 0; i < this.$refs.refNodeTable.selections.length; i++) {
            let row = this.$refs.refNodeTable.selections[i];
            let _nodeType = row.nodetype;
            if (nodeType === '' || nodeType === _nodeType) {
              nodeType = _nodeType;
            } else {
              this.$message({
                message: '请选择同一类型服务节点',
                type: 'warning'
              });
              return;
            }
          }
          // 选中版本号
          this.deployFormData.version = verSelects[0].versionNum;

          vmData.deployDialogVisiable = true;
        },
        // 版本部署
        deploy: function () {
          let _this = this;
          var nodes = [];
          // var nodeType = '';
          for (var i = 0; i < this.$refs.refNodeTable.selections.length; i++) {
            let row = this.$refs.refNodeTable.selections[i];
            nodes.push(row);
          }
          // 选中版本
          let verSelect = this.$refs.refVersionTable.selections[0];
          // 查询部署的版本
          var reqData = {
            nodes: nodes,
            version: verSelect,
            needRestart: this.deployFormData.needRestart,
            userId: yufp.session.userId
          };
          // 开始版本部署
          yufp.service.request({
            method: 'POST',
            data: reqData,
            name: backend.bcmpService + '/cluster/startDeploy',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                _this.deployDialogVisiable = false;
                _this.stepDialogVisible = true;
              } else {
                this.$message({
                  message: '部署失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 新增按钮事件
        addFn: function (data) {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.formdata.joinDt = new Date();
        },
        // 修改数据按钮
        modifyFn: function (viewData) {
          var _this = this;
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(viewData, _this.formdata);
          });
        },
        // 查看数据明细
        infoFn: function (viewData) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
            yufp.clone(viewData, _this.formdata);
          });
        },
        // 批量删除
        deleteFn: function (viewData) {
          var _this = this;
          this.$confirm('确定要删除【' + viewData.deployId + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 调用删除提交服务
            var deployId = viewData.deployId;
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/bcmpSmDeploy/delete/' + deployId,
              callback: function (code, message, response) {
                if (code == '0' && response.code == '0') {
                  vm.$message({
                    message: '数据删除成功！'
                  });
                  _this.$refs['refTable'].remoteData();
                } else {
                  vm.$message({
                    message: '数据删除失败',
                    type: 'warning'
                  });
                }
              }
            });
          }).catch(function () { });
        },
        // 提交功能
        submitFn: function () {
          var _this = this;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            this.addData();
          } else {
            // 走编辑接口
            this.editData();
          }
        },
        // 取消按钮
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          vm.roleNames = [];
          _this.$refs['refTable'].clearSelection();
        },
        // 新增保存
        addData: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/bcmpSmDeploy/create',
            callback: function (code, message, response) {
              if (code === 0) {
                if (response.data.code == 2) {
                  vm.$message({
                    message: response.data.message,
                    type: 'warning'
                  });
                } else {
                  vm.$message({
                    message: '数据保存成功！'
                  });
                  _this.dialogVisible = false;
                  _this.$refs['refTable'].remoteData();
                  _this.$refs['refTable'].clearSelection();
                }
              } else {
                vm.$alert('服务端请求失败!' + message, '提示', {
                  confirmButtonText: '确定',
                  callback: function () { }
                });
              }
            }
          });
        },
        // 修改提交
        editData: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/bcmpSmDeploy/update',
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: '数据更新成功！'
                });
                _this.dialogVisible = false;
                _this.$refs['refTable'].remoteData();
                _this.$refs['refTable'].clearSelection();
              } else {
                vm.$alert('服务端请求失败!', '提示', {
                  confirmButtonText: '确定',
                  callback: function () { }
                });
              }
            }
          });
          this.$refs['refTable'].clearSelection();
        },
        // 弹出框状态控制
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
          });
        },
        // 获取节点应用版本
        getServerVersion: function () {
          yufp.service.request({
            name: backend.bcmpService + '/cluster/getServiceVersion',
            callback: function (code, message, response) {
              if (code === 0) {

              } else {

              }
            }
          });
        },
        // 数据更新，查询代理状态
        onLoadedFn: function (data, total) {
          // let me = this ;
          for (let i = 0; i < data.length; i++) {
            data[i].version = 'UNKNOWN';
          }
          // me.$nextTick(()=>{
          this.getServerVersion();
          // })
        }
      },
      // 加载后处理
      mounted: function () {
        this.queryAppListFn();
      }
    });
  };


  // 消息处理
  exports.onmessage = function (type, message, cite) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});