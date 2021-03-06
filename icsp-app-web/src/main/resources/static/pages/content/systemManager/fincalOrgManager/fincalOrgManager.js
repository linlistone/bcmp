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
      formDisabled: true,
      saveBtnShow: true,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 表单数据
      formdata: {},
      dataUrl: backend.appOcaService + '/adminSmInstu/index',
      buttonName: '', // 弹出框提交按钮名称
      dialogVisible: false, // 弹出框层是否可见
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
          validator: yufp.validator.speChar,
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
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }],
        zipCde: [{ // 邮编
          max: 100,
          message: '最大长度不超过100个字符',
          trigger: 'blur'
        }, {
          validator: yufp.validator.postcode,
          message: '请输入正确信息',
          trigger: 'blur'
        }],
        contUsr: [{ // 联系人
          max: 100,
          message: '最大长度不超过50个汉字',
          trigger: 'blur'
        }],
        contTel: [{ // 手机号码
          validator: yufp.validator.mobile,
          message: '请输入正确信息',
          trigger: 'blur'
        }],
        instuAddr: [{ // 地址
          max: 200,
          message: '最大长度不超过100个汉字',
          trigger: 'blur'
        }]
      }
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
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.instuSts = 'W';
            _this.formdata.joinDt = new Date();
          });
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
          this.$confirm('确定要删除【' + viewData.instuId + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 调用删除提交服务
            var instuId = viewData.instuId;
            yufp.service.request({
              method: 'POST',
              // data: delData,
              name: backend.appOcaService + '/adminSmInstu/delete/' + instuId,
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
            name: backend.appOcaService + '/adminSmInstu/create',
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
            name: backend.appOcaService + '/adminSmInstu/update',
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
        // 启用
        useFn: function () {
          this.doUserorUnuserFn('usebatch', '启用', '只能选择失效或待生效的数据');
        },
        // 停用
        unUseFn: function () {
          this.doUserorUnuserFn('unusebatch', '停用', '只能选择生效的数据');
        },
        // 启用或停用方法
        doUserorUnuserFn: function (action, actionName, title) {
          var _this = this;
          if (this.$refs.refTable.selections.length > 0) {
            var id = '';
            var userId = yufp.session.userId;
            for (var i = 0; i < this.$refs.refTable.selections.length; i++) {
              var row = this.$refs.refTable.selections[i];
              var useCheck = row.instuSts === 'W' || row.instuSts === 'I';
              var unUserCheck = row.instuSts === 'A';
              if (action === 'usebatch' ? useCheck : unUserCheck) {
                id = id + ',' + row.roleId;
              } else {
                _this.$message({
                  message: title,
                  type: 'warning'
                });
                return;
              }
            }
            this.$confirm('此操作将' + actionName + '该法人机构, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.appOcaService + '/adminSmInstu/' + action,
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