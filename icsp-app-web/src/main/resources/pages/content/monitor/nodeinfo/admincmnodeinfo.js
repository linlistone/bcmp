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
      dataUrl: backend.bcmpService + '/nodeinfo/index',
      buttonName: '', // 弹出框提交按钮名称
      dialogVisible: false, // 弹出框层是否可见
      rules: { // 校验规则配置
        hostIp: [{ // 节点主机IP
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        nodeType: [{ // 节点类型
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        nodeName: [{ // 节点名称
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
        applyPath: [{ // 应用路径
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        updateDirectory: [{ // 更新目录
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        applyPort: [{ // 应用端口
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        httpPort: [{ // HTTP端口
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        jvmPort: [{ // JVM端口
          required: true,
          message: '必填项',
          trigger: 'blur'
        }]
      }
    };
    yufp.lookup.reg('FOX_NODETYPE,YESNO', false);
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
          this.$confirm('确定要删除【' + viewData.nodeId + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 调用删除提交服务
            var nodeId = viewData.nodeId;
            var delData = {
              'nodeId': nodeId
            };
            yufp.service.request({
              method: 'POST',
              data: delData,
              name: backend.bcmpService + '/nodeinfo/delete',
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
            name: backend.bcmpService + '/nodeinfo/create',
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
            name: backend.bcmpService + '/nodeinfo/update',
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
        // 加载主机配置
        getHostList: function () {
          var querModel = {
            page: 1,
            size: 999
          };
          yufp.service.request({
            method: 'GET',
            data: querModel,
            name: backend.bcmpService + '/hostinfo/index',
            callback: function (code, message, response) {
              if (code === 0) {
                var list = [];
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                  var item = {
                    key: data[i].hostIp,
                    value: data[i].hostIp
                  };
                  list.push(item);
                }
                yufp.lookup.storageDataCodePut('HOSTLIST', list);
              }
            }
          });
        }
      },
      // 加载后处理
      mounted: function () {
        this.getHostList();
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