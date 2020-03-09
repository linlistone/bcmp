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
      locationDialogVisible: false,
      locationDataUrl: backend.adminService + '/bcmpSmDeviceLocation/index',
      linkDataUrl: backend.bcmpService + '/bcmpSmDeviceUser/index',
      linkBaseParams: {},
      linkDialogVisible: false,
      linkListDialogVisible: false,
      formDisabled: true,
      saveBtnShow: true,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 表单数据
      formdata: {},
      linkformdata: {},
      rules: {
        deviceNumber: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 30,
          message: '最大长度不超过30个字符',
          trigger: 'blur'
        }, {
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        deviceOrg: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最大长度不超过20个字符',
          trigger: 'blur'
        }, {
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        deviceComment: [{
          max: 50,
          message: '最大长度不超过50个字符',
          trigger: 'blur'
        }, {
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        lastRecUser: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最大长度不超过20个字符',
          trigger: 'blur'
        }, {
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }]
      },
      dataUrl: backend.adminService + '/bcmpSmDevice/index',
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
        // 新增按钮事件
        addFn: function (data) {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.formdata.deviceStatus = '0';
          _this.formdata.buyDate = new Date();
          _this.formdata.creatorUser = yufp.session.userId;
          _this.formdata.lastChgUser = yufp.session.userId;
        },
        // 设备启用
        unlockFn: function (data) {
          this.doUserorUnuserFn('usebatch', '启用', '只能选择未启用的数据');
        },
        // 设备停用
        lockFn: function (data) {
          this.doUserorUnuserFn('unusebatch', '停用', '只能选择启用的数据');
        },
        // 设备注销
        closeFn: function (data) {
          this.doUserorUnuserFn('logoffbatch', '注销', '只能选择停用的数据');
        },
        // 启用或停用方法
        doUserorUnuserFn: function (action, actionName, title) {
          var _this = this;
          if (this.$refs.refTable.selections.length > 0) {
            var id = '';
            var userId = yufp.session.userId;
            for (var i = 0; i < this.$refs.refTable.selections.length; i++) {
              var row = this.$refs.refTable.selections[i];
              var useCheck = row.deviceStatus === '0';
              var unUserCheck = row.deviceStatus === '1';
              var logoffCheck = row.deviceStatus === '2';
              if (action === 'usebatch' && useCheck) {
                id = id + ',' + row.deviceId;
              } else if (action === 'unusebatch' && unUserCheck) {
                id = id + ',' + row.deviceId;
              } else if (action === 'logoffbatch' && logoffCheck) {
                id = id + ',' + row.deviceId;
              } else {
                _this.$message({
                  message: title,
                  type: 'warning'
                });
                return;
              }
            }
            this.$confirm('此操作将' + actionName + '该设备, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.appOcaService + '/bcmpSmDevice/' + action,
                data: {
                  id: id,
                  userId: userId
                },
                callback: function (code, message, response) {
                  _this.$message({
                    message: response.data
                  });
                  _this.$refs['refTable'].remoteData();
                  _this.$refs['refTable'].clearSelection();
                }
              });
            });
          } else {
            this.$message({
              message: '请先选择要' + actionName + '的数据',
              type: 'warning'
            });
            return;
          }
        },
        // 设备领用
        linkFn: function (viewData) {
          if (viewData.deviceStatus != 1) {
            vm.$message({
              message: '只能领用启用设备',
              type: 'warning'
            });
            return;
          }
          var _this = this;
          this.linkDialogVisible = true;
          this.linkBaseParams = {
            condition: JSON.stringify({
              deviceId: viewData.deviceId
            })
          };
          _this.$nextTick(function () {
            _this.$refs.reflinkForm.resetFields();
            yufp.clone(viewData, _this.linkformdata);
            _this.linkformdata.lastChgUser = yufp.session.userId;
            _this.linkformdata.lastRecDate = new Date();
            this.$refs['refLinkTable'].remoteData();
          });
        },
        linkListFn: function (viewData) {
          var _this = this;
          this.linkBaseParams = {
            condition: JSON.stringify({
              deviceId: viewData.deviceId
            })
          };
          this.linkListDialogVisible = true;
          _this.$nextTick(function () {
            this.$refs['reflocationTable'].remoteData();
          });
        },
        // 定位记录
        locationListFn: function (viewData) {
          var _this = this;
          this.linkBaseParams = {
            condition: JSON.stringify({
              deviceId: viewData.deviceId
            })
          };
          this.locationDialogVisible = true;
          _this.$nextTick(function () {
            this.$refs['refLinkTable'].remoteData();
          });
        },
        // 停用提交
        linkSubmitFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.linkformdata, model);
          var validate = false;
          _this.$refs.reflinkForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/bcmpSmDevice/link',
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: '数据更新成功！'
                });
                _this.linkDialogVisible = false;
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
        },

        // 修改数据按钮
        modifyFn: function (viewData) {
          if (viewData.deviceStatus != 0) {
            vm.$message({
              message: '只能修改未启用数据',
              type: 'warning'
            });
            return;
          }
          var _this = this;
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(viewData, _this.formdata);
            _this.formdata.lastChgUser = yufp.session.userId;
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
          if (viewData.deviceStatus != 0) {
            vm.$message({
              message: '只能删除未启用数据',
              type: 'warning'
            });
            return;
          }
          this.$confirm('确定要删除【' + viewData.deviceId + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 调用删除提交服务
            var deviceId = viewData.deviceId;
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/bcmpSmDevice/delete/' + deviceId,
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
            name: backend.adminService + '/bcmpSmDevice/create',
            callback: function (code, message, response) {
              if (response.code === 0) {
                vm.$message({
                  message: '数据保存成功！'
                });
                _this.dialogVisible = false;
                _this.$refs['refTable'].remoteData();
                _this.$refs['refTable'].clearSelection();
              } else {
                vm.$alert('服务端请求失败!' + response.message, '提示', {
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
            name: backend.adminService + '/bcmpSmDevice/update',
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
        }
      },
      // 加载后处理
      mounted: function () {
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