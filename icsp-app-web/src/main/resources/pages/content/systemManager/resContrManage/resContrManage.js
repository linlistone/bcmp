/**
 * @Created by 林立 20190906
 * @updated by
 * @description {{pageDesc}}
 */
define([
  './custom/widgets/js/yufpExtTree.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // 业务功能url格式校验
    var urlValidate = function (rule, value, callback) {
      var regEn = /[`~!@#$%^&*()_+=|{}';:"\/[\],.<>?]/im;
      var regCn = /[~！@#￥%……&*（）——|【】‘’“”；：。，、？·《》]/im;
      if (regEn.test(value) && regCn.test(value)) {
        callback(new Error('请输入合法格式'));
        return;
      }
      callback();
    };
    let vmData = {
      // 表单数据
      formdata: {},
      // 树组件参数
      reourceUrl: backend.adminService + '/adminSmResContr/funcTree?sysId=' + backend.sysId,
      loading: false,
      height: yufp.custom.viewSize().height - 40,
      /** 按钮区域定义*/
      createButton: true, // 新增按钮控制
      editButton: true, // 修改按钮控制
      deleteButton: true, // 删除按钮控制
      /** 表格区域定义*/
      searchform: {},
      dataUrl: backend.adminService + '/adminSmResContr/index',
      /** 弹出框属性域定义*/
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      isAddRole: true, // 是否新增 true新增加 false 修改
      buttonName: '', // 弹出框提交按钮名称
      dialogVisible: false, // 弹出框层是否可见
      saveBtnShow: true,
      formDisabled: false, // 是否可编辑
      rules: {
        // 控制操作名称
        contrName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 90,
          message: '输入值过长',
          trigger: 'blur'
        },
        {
          validator: urlValidate,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }
        ],
        // 控制操作代码
        contrCode: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 45,
          message: '输入值过长',
          trigger: 'blur'
        },
        {
          validator: urlValidate,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }
        ],
        // 控制操作URL
        contrUrl: [{
          max: 50,
          message: '输入值过长',
          trigger: 'blur'
        }],
        // 备注
        contrRemark: [{
          max: 450,
          message: '输入值过长',
          trigger: 'blur'
        }]
      }
    };
    // 加载数据字典
    yufp.lookup.reg('HTTP_METHOD_TYPE');
    // 创建vue model
    const vm = new Vue({
      el: cite.el,
      // 数据
      data: vmData,
      // 计算属性
      computed: {},
      // 方法
      methods: {
        // 菜单树加节点样式 add by chenlin 20171229
        renderContent: function () {
          var createElement = arguments[0];
          var type = arguments[1].data.nodeType;
          return createElement('span', [
            createElement('span', {
              attrs: {
                class: 'fox-treeMenuType' + type
              }
            }, type),
            createElement('span', arguments[1].data.label)
          ]);
        },
        // 树节点过滤
        filterNode: function (value, data) {
          if (!value) {
            return true;
          }
          return data.nodeName.indexOf(value) !== -1;
        },
        // 树形左侧联动右侧
        nodeClickFn (nodeData, node, nodeWidget) {
          var _this = this;
          // 设置查询的模块
          _this.searchform.funcId = nodeData.nodeId;
          var condition = {
            condition: {
              funcId: nodeData.nodeId,
              nodeType: nodeData.nodeType
            }
          };
          // 查询用户数据
          _this.$refs['refTable'].remoteData(condition);
        },
        addFn: function () {
          let _this = this;
          if (!_this.searchform.funcId) {
            vm.$alert('请先选择模块', '提示', {
              confirmButtonText: '确定',
              callback: function () { }
            });
            return;
          }
          _this.dialogVisible = true;
          _this.formDisabled = false;
          _this.saveBtnShow = true;
          _this.viewType = 'ADD';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.funcId = _this.searchform.funcId;
          });
        },
        // 功能编辑按钮方法
        modifyFn: function (viewData) {
          var _this = this;
          _this.dialogVisible = true;
          _this.formDisabled = false;
          _this.saveBtnShow = true;
          _this.viewType = 'EDIT';
          var obj = viewData;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(obj, _this.formdata);
          });
        },
        // 查看方法
        infoFn: function (viewData) {
          var _this = this;
          _this.dialogVisible = true;
          _this.formDisabled = true;
          _this.saveBtnShow = false;
          _this.viewType = 'DETAIL';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(viewData, _this.formdata);
          });
        },
        // 删除按钮方法
        deleteFn: function (viewData) {
          var _this = this;
          _this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/adminSmResContr/delete/' + viewData.contrId,
              callback: function (code, message, data) {
                if (code === 0) {
                  vm.$alert(data.message, '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      _this.$refs['refTable'].remoteData();
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
          var reqData = {
            funcId: _this.formdata.funcId ? _this.formdata.funcId : null,
            contrCode: _this.formdata.contrCode ? _this.formdata.contrCode : null
          };
          if (_this.viewType == 'EDIT') {
            reqData.contrId = this.formdata.contrId ? _this.formdata.contrId : null;
          }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/adminSmResContr/ifcoderepeat',
            data: reqData,
            callback: function (code, message, response) {
              if (response.data.length > 0) {
                _this.$message({
                  message: '此业务功能已包含该控制操作代码',
                  type: 'warning'
                });
              } else {
                if (_this.viewType == 'ADD') {
                  // 走添加接口
                  _this.addContrData();
                } else {
                  // 走编辑接口
                  _this.editContrData();
                }
              }
            }
          });
        },
        // 取消按钮
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.$refs['refTable'].clearSelection();
        },
        // 新增加功能
        addContrData: function () {
          var _this = this;
          var model = {};
          delete _this.$refs.refForm.formdata.contrId;
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.funcId = _this.searchform.funcId;
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/adminSmResContr/create',
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
                      _this.dialogVisible = false;
                      _this.$refs['refTable'].remoteData();
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
        editContrData: function () {
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
            name: backend.adminService + '/adminSmResContr/update',
            callback: function (code, message, data) {
              vm.$alert('更新成功!', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  _this.dialogVisible = false;
                  _this.$refs['refTable'].remoteData();
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
  exports.onmessage = function (type, message, cite) {

  };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});