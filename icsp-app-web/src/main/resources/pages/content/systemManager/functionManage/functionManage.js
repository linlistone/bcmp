/**
 * @Created by 林立 20190906
 * @updated by
 * @description {{pageDesc}}
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // 业务功能url格式校验
    var urlValidate = function (rule, value, callback) {
      var reg = /^pages\/([a-zA-Z0-9_]+\/)+[a-zA-Z0-9_]+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入合法格式'));
        return;
      }
      callback();
    };
    // 业务功能顺序校验
    var orderValidate = function (rule, value, callback) {
      var reg = /^\d{0,4}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入整数(0-9999)'));
        return;
      }
      callback();
    };
    // vue data
    let vmData = {
      // 控制点按钮
      m_btn: {
        createButton: true, // 新增按钮控制
        editButton: true, // 修改按钮控制
        deleteButton: true // 删除按钮控制
      },
      // 表格查询URL
      m_table: {
        modDataUrl: backend.adminService + '/adminSmFuncMod/index',
        funcDataUrl: backend.adminService + '/adminSmBusiFunc/index'
      },
      // 功能表单数据
      formdata: {},
      formDisabled: false,
      // 功能弹出框规则
      func: {
        viewTitle: yufp.lookup.find('CRUD_TYPE', false),
        viewType: 'DETAIL',
        dialogVisible: false,
        funcDisabled: true,
        searchform: {},
        rules: {
          // 模块名称规则
          funcName: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '输入值过长',
            trigger: 'blur'
          }
          ],
          // URL规则
          funcUrl: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '输入值过长',
            trigger: 'blur'
          },
          {
            validator: urlValidate,
            trigger: 'blur'
          }
          ],
          // 排序号规则
          funcOrder: [{
            validator: orderValidate,
            trigger: 'blur'
          }],
          // 功能描述
          funcDesc: [{
            max: 100,
            message: '输入值过长',
            trigger: 'blur'
          }]
        }
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
        // 模块选择事件
        modSelect: function (row) {
          let _this = this;
          // 设置查询的模块
          _this.func.searchform.modId = row.modId;
          var condition = {
            condition: {
              modId: row.modId
            }
          };
          // 查询功能数据
          _this.$refs['refFuncTable'].remoteData(condition);
        },
        // 功能新增加按钮方法
        addFn: function () {
          let _this = this;
          if (!_this.func.searchform.modId) {
            vm.$alert('请先选择模块', '提示', {
              confirmButtonText: '确定',
              callback: function () { }
            });
            return;
          }
          _this.func.dialogVisible = true;
          _this.funcDisabled = true;
          _this.func.viewType = 'ADD';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.modId = _this.func.searchform.modId;
          });
        },
        // 功能编辑按钮方法
        infoFn: function (selection) {
          var _this = this;
          _this.func.dialogVisible = true;
          _this.formDisabled = true;
          _this.func.viewType = 'DETAIL';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selection, _this.formdata);
          });
        },
        // 功能编辑按钮方法
        modifyFn: function (selection) {
          var _this = this;
          _this.func.dialogVisible = true;
          _this.formDisabled = false;
          _this.func.viewType = 'EDIT';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selection, _this.formdata);
          });
        },
        // 删除按钮方法
        deleteFn: function (viewData) {
          var _this = this;
          _this.$confirm('确定要删除【' + viewData.funcName + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/adminSmBusiFunc/delete/' + viewData.funcId,
              callback: function (code, message, data) {
                if (code === 0) {
                  vm.$alert(data.message, '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      _this.$refs['refFuncTable'].remoteData();
                    }
                  });
                } else {
                  vm.$alert('删除失败，请联系系统管理员', '提示', {
                    confirmButtonText: '确定',
                    callback: function () { }
                  });
                }
              }
            });
          }).catch(function () { });
        },
        // 提交功能
        submitFn: function () {
          var _this = this;
          if (_this.func.viewType == 'ADD') {
            // 走添加接口
            this.addFunData();
          } else {
            // 走编辑接口
            this.editFunData();
          }
        },
        // 取消按钮
        cancelFn: function () {
          var _this = this;
          _this.func.dialogVisible = false;
          _this.$refs['refFuncTable'].clearSelection();
        },
        // 新增加功能
        addFunData: function () {
          var _this = this;
          var model = {};
          // delete _this.$refs.refForm.formdata.funcId;
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.modId = _this.func.searchform.modId;
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/adminSmBusiFunc/create',
            callback: function (code, message, data) {
              if (code === 0) {
                if (data.data.code == 2) {
                  vm.$message({
                    message: data.data.message,
                    type: 'warning'
                  });
                } else {
                  vm.$alert('添加成功!', '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      _this.func.dialogVisible = false;
                      _this.$refs['refFuncTable'].remoteData();
                    }
                  });
                }
              } else {
                vm.$alert('服务端请求失败!', '提示', {
                  confirmButtonText: '确定',
                  callback: function () { }
                });
              }
            }
          });
        },
        // 修改功能
        editFunData: function () {
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
            name: backend.adminService + '/adminSmBusiFunc/update',
            callback: function (code, message, data) {
              vm.$alert('更新成功!', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  _this.func.dialogVisible = false;
                  _this.$refs['refFuncTable'].clearSelection();
                  _this.$refs['refFuncTable'].remoteData();
                }
              });
            }
          });
        }
      },
      // 加载后处理
      mounted: function () { }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message, cite) { };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) { };
});