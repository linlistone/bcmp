/**
 * @Created by 林立 20190906
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    var vmData = {
      /** 按钮区域定义*/
      m_btn: {
        createButton: !yufp.session.checkCtrl('addFincalOrg'), // 新增按钮控制
        editButton: !yufp.session.checkCtrl('editFincalOrg'), // 修改按钮控制
        deleteButton: !yufp.session.checkCtrl('deleteFincalOrg'), // 删除按钮控制
        useButton: !yufp.session.checkCtrl('useFincalOrg'), // 启用按钮控制
        unuseButton: !yufp.session.checkCtrl('unuseFincalOrg') // 停用按钮控制
      },
      /** 表格区域定义*/
      m_table: {
        dataUrl: backend.appOcaService + '/api/adminsminstu/querypage'
      },
      rules: { // 校验规则配置
        instuCde: [{ // 机构代码
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 10,
          message: '最大长度不超过10个字符',
          trigger: 'blur'
        }, {
          validator: fox.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        instuName: [{ // 机构名称
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最大长度不超过50个汉字',
          trigger: 'blur'
        }, {
          validator: fox.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        zipCde: [{ // 邮编
          max: 100,
          message: '最大长度不超过100个字符',
          trigger: 'blur'
        }, {
          validator: fox.validator.postcode,
          message: '请输入正确信息',
          trigger: 'blur'
        }],
        contUsr: [{ // 联系人
          max: 100,
          message: '最大长度不超过50个汉字',
          trigger: 'blur'
        }],
        contTel: [{ // 手机号码
          validator: fox.validator.mobile,
          message: '请输入正确信息',
          trigger: 'blur'
        }],
        instuAddr: [{ // 地址
          max: 200,
          message: '最大长度不超过100个汉字',
          trigger: 'blur'
        }]
      },
      /** 表单域定义*/
      formdata: {},
      viewType: 'DETAIL',
      viewTitle: fox.lookup.find('CRUD_TYPE', false),
      dialogVisible: false,
      formDisabled: false,
      saveBtnShow: true,
      hiddenItem: true
    };
    yufp.lookup.reg;
    // 注册功能要用到的数据字典 数据字典名称在数据字典中定义
    let vm = new Vue({
      el: cite.el,
      data: vmData,
      computed: {},
      methods: {
        /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.hiddenItem = editable; // 隐藏字段
        },
        /**
                 * 取消
                 */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.$refs['refTable'].clearSelection();
        },
        /**
                 * 新增按钮
                 */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
            _this.formdata.instuSts = 'W';
            _this.formdata.joinDt = new Date();
          });
        },
        /**
                 * 修改
                 */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs['refTable'].selections.length != 1) {
            _this.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          _this.switchStatus('EDIT', true);
          var obj = _this.$refs['refTable'].selections[0];
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            fox.clone(obj, _this.formdata);
          });
        },
        /**
                 * 详情
                 */
        infoFn: function (viewData) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
            fox.clone(viewData, _this.formdata);
          });
        },
        // 弹出框按钮提交事件
        submitFn: function () {
          var _this = this;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            this.insertFn();
          } else {
            // 走修改接口
            this.updateFn();
          }
        },
        /**
                 * 添加
                 */
        insertFn: function () {
          var _this = this;
          var model = {};
          fox.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          delete model.instuId;
          model.sysId = backend.sysId;
          model.lastChgUsr = fox.localsession.getUserInfo().userId;
          fox.service.request({
            method: 'POST',
            data: model,
            url: backend.appOcaService + '/api/adminsminstu/insertinfo',
            callback: function (code, message, response) {
              if (code === 0) {
                if (response.data.code == 2) {
                  vm.$message({
                    message: response.data.message,
                    type: 'warning'
                  });
                } else {
                  _this.$message('数据保存成功!');
                  _this.dialogVisible = false;
                  // 重新查询，刷新列表数据
                  _this.$refs['refTable'].remoteData();
                }
              } else {
                vm.$alert('服务端请求失败!\n' + message, '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                  }
                });
              }
            }
          });
        },
        // 修改提交
        updateFn: function () {
          var _this = this;
          var model = {};
          fox.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = fox.localsession.getUserInfo().userId;
          fox.service.request({
            method: 'POST',
            data: model,
            url: backend.appOcaService + '/api/adminsminstu/update',
            callback: function (code, message, response) {
              if (code === 0) {
                if (response.data.code == 2) {
                  vm.$message({
                    message: response.data.message,
                    type: 'warning'
                  });
                } else {
                  vm.$message({
                    message: '数据更新成功！'
                  });
                  // 隐藏弹出框
                  _this.dialogVisible = false;
                  // 重新查询，刷新列表数据
                  _this.$refs['refTable'].remoteData();
                }
              } else {
                vm.$alert('服务端请求失败!', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                  }
                });
              }
            }
          });
        },
        // 批量删除
        deleteFn: function () {
          let selections = this.$refs['refTable'].selections;
          if (selections.length == 0) {
            this.$message({
              message: '请先选择要删除的数据',
              type: 'warning'
            });
            return;
          }
          var id = '';
          for (var i = 0; i < selections.length; i++) {
            var row = selections[i];
            if (row.instuSts !== 'A') {
              id = id + ',' + row.instuId;
            } else {
              this.$message({
                message: '只能删除失效或者待生效的数据',
                type: 'warning'
              });
              return;
            }
          }
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 开始删除
            var idArr = [];
            for (var i = 0; i < selections.length; i++) {
              idArr.push(selections[i].instuId);
            }
            // 调用删除提交服务
            vm.deleteTableData(idArr);
          }).catch(function () {
          });
        },
        // 删除提交
        deleteTableData: function (idArr) {
          var _this = this;
          var listArr = [];
          for (var i = 0; i < idArr.length; i++) {
            var rowid = idArr[i];
            listArr.push(rowid);
          }
          var selectedList = listArr.join(',');
          fox.service.request({
            method: 'POST',
            name: backend.appOcaService + `/api/adminsminstu/deletebatch?ids=${selectedList}`,
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: response.data.message
                });
                vmData.m_table.multipleSelection = [];
                _this.$refs['refTable'].remoteData();
              } else {
                vm.$alert('删除失败，请联系系统管理员', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                  }
                });
              }
            }
          });
        },
        // 启用事件
        useDataFn: function () {
          let selections = this.$refs['refTable'].selections;
          if (selections.length == 0) {
            this.$message({
              message: '请先选择要启用的数据',
              type: 'warning'
            });
            return;
          }
          var id = '';
          for (var i = 0; i < selections.length; i++) {
            var row = selections[i];
            if (row.instuSts !== 'A') {
              id = id + ',' + row.instuId;
            } else {
              this.$message({
                message: '只能启用失效或者待生效的数据',
                type: 'warning'
              });
              return;
            }
          }
          this.$confirm('确定要启用该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 开始启用
            var idArr = [];
            for (var i = 0; i < selections.length; i++) {
              idArr.push(selections[i].instuId);
            }
            // 调用启用提交服务
            vm.useTableData(idArr);
          }).catch(function () {
          });
        },
        // 启用提交
        useTableData: function (idArr) {
          var _this = this;
          var listArr = [];
          for (var i = 0; i < idArr.length; i++) {
            var rowid = idArr[i];
            listArr.push(rowid);
          }
          var lastChgUsr = fox.localsession.getUserInfo().userId;
          var selectedList = listArr.join(',');
          fox.service.request({
            method: 'POST',
            data: {
              id: selectedList,
              lastChgUsr: lastChgUsr
            },
            name: backend.appOcaService + `/api/adminsminstu/usebatch?ids=${selectedList}&lastChgUsr=${lastChgUsr}`,
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: response.data.message
                });
                _this.$refs['refTable'].remoteData();
              } else {
                vm.$alert('启用失败，请联系系统管理员', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                  }
                });
              }
            }
          });
        },
        // 停用事件
        unuseDataFn: function () {
          let selections = this.$refs['refTable'].selections;
          if (selections.length == 0) {
            this.$message({
              message: '请先选择要停用的数据',
              type: 'warning'
            });
            return;
          }
          var id = '';
          for (var i = 0; i < selections.length; i++) {
            var row = selections[i];
            if (row.instuSts === 'A') {
              id = id + ',' + row.instuId;
            } else {
              this.$message({
                message: '只能停用失效的数据',
                type: 'warning'
              });
              return;
            }
          }
          this.$confirm('确定要停用吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 开始停用
            var idArr = [];
            for (var i = 0; i < selections.length; i++) {
              idArr.push(selections[i].instuId);
            }
            // 调用停用提交服务
            vm.unuseTableData(idArr);
          }).catch(function () {
          });
        },
        // 停用提交
        unuseTableData: function (idArr) {
          var _this = this;
          var listArr = [];
          for (var i = 0; i < idArr.length; i++) {
            var rowid = idArr[i];
            listArr.push(rowid);
          }
          var lastChgUsr = fox.localsession.getUserInfo().userId;
          var selectedList = listArr.join(',');
          fox.service.request({
            method: 'POST',
            data: {
              id: selectedList,
              lastChgUsr: lastChgUsr
            },
            name: backend.appOcaService + `/api/adminsminstu/unusebatch?ids=${selectedList}&lastChgUsr=${lastChgUsr}`,
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: response.data.message
                });
                _this.$refs['refTable'].remoteData();
              } else {
                vm.$alert('停用失败，请联系系统管理员', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                  }
                });
              }
            }
          });
        }
      },
      mounted: function () {
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