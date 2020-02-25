/**
 * @Created by 林立 20190905
 * @updated by
 * @description {{pageDesc}}
 */
define([
  './custom/widgets/js/yufpExtTree.js', './custom/common/app.data.icon.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // vue data
    var orderValidate = function (rule, value, callback) {
      var reg = /^\d{0,4}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入整数(0-9999)'));
        return;
      }
      callback();
    };
    let vmData = {
      createButton: true,
      editButton: true,
      currClickNode: '', // 当前选中节点
      currClickName: '', // 当前选中节点名称
      addFlag: false,
      filterNode: '',
      tempCheckNode: '',
      iconDialogVisible: false,
      // 功能列表请求
      funcdataUrl: backend.adminService + '/adminSmBusiFunc/index',
      // 菜单树请求URL
      treeUrl: backend.adminService + '/adminSmMenu/tree?sysId=' + backend.sysId,
      // 机构树请求参数
      treeParam: {},
      // 权构树高度
      treeHeight: yufp.custom.viewSize().height - 100,
      // 机构树加载方式
      treeAsync: false,
      rules: {
        menuName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 23,
          message: '最大长度不超过23个字符',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.speChar,
          message: '输入信息包含特殊字符',
          trigger: 'blur'
        }
        ],
        menuOrder: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          validator: orderValidate,
          trigger: 'blur'
        }],
        menuTip: [{
          max: 23,
          message: '最大长度不超过23个字符',
          trigger: 'blur'
        }]
      },
      expandCollapseName: ['funcList'],
      modOptions: [], // 模块列表
      modMap: {}, // 模块名称
      icons: window.icons
    };
    // 创建vue model
    const vm = new Vue({
      el: cite.el,
      // 数据
      data: vmData,
      // 计算属性
      computed: {

      },
      // 方法
      methods: {
        init: function () {
          var _this = this;
          var conditions = {
            isApp: 'N'
          };
          var condition = JSON.stringify(conditions);
          let reqData = { condition, page: 1, size: 999 };
          // 查询所有模块数据 ，显示为下接框
          yufp.service.request({
            type: 'GET',
            data: reqData,
            name: backend.adminService + '/adminSmFuncMod/index',
            callback: function (code, message, response) {
              if (code === 0) {
                for (var i = 0; i < response.data.length; i++) {
                  var _option = {
                    'key': response.data[i].modId,
                    'value': response.data[i].modName
                  };
                  _this.modMap[_option.key] = _option.value;
                  _this.modOptions.push(_option);
                }
              }
            }
          });
        },
        // 点击新增按钮后的响应事件
        createFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({
              message: '请先选择菜单节点',
              type: 'warning'
            });
            return;
          }
          _this.addFlag = true;
          var temp = {
            menuName: '',
            funcName: '',
            menuOrder: '',
            menuIcon: '',
            upMenuName: _this.currClickName,
            menuTip: ''
          };
          _this.$refs.menuForm.formdata = yufp.extend({}, temp);
          _this.$refs.menuForm.formdata.funcId = '';
          delete _this.$refs.menuForm.formdata.menuId;
        },
        // 删除菜单
        deleteFn: function () {
          let _this = this;
          if (vm.addModulAdd) {
            _this.$message({
              message: '请先选择菜单节点',
              type: 'warning'
            });
            return;
          }
          _this.$confirm('确定要 [' + _this.currClickName + '] 菜单节点及其以下节点删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 开始删除
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/adminSmMenu/delete/' + _this.currClickNode,
              callback: function (code, message, data) {
                if (code === 0) {
                  _this.$message({
                    message: data.message
                  });
                  _this.$refs.menuTree.remoteData();
                  _this.$refs.upMenuTree.remoteData();
                } else {
                  _this.$alert('删除失败，请联系系统管理员', '提示', {
                    confirmButtonText: '确定',
                    callback: function () { }
                  });
                }
              }
            });
          });
        },
        // 切换到功能列表
        focusFuncNameFn: function () {
          this.expandCollapseName = [];
          this.expandCollapseName.push('funcList');
        },
        // 切换到上级x菜单
        focusUpMenuNameFn: function () {
          this.expandCollapseName = [];
          this.expandCollapseName.push('upMenu');
        },
        // 功能选择
        clickFuncNameFn: function () {
          // this.$refs.menuForm.formdata.funcId = '';
          // this.$refs.menuForm.formdata.funcName = '';
        },
        // 弹出图标选择框
        focusMenuIconFn: function () {
          this.iconDialogVisible = true;
        },
        // 清空图标选择
        clickMenuIconFn: function () {
          this.$refs.menuForm.fromdata.menuIcon = '';
        },
        // 选择左侧树
        nodeClickFn: function (nodeData, node, self) {
          this.currClickNode = nodeData.id;
          this.currClickName = nodeData.label;
          this.filterNode = nodeData.id;
          this.addFlag = false;
          // 当选择为主应用时
          if (nodeData.id == '0') {
            _this.$refs.menuForm.formdata.upMenuName = '主应用';
            _this.$refs.menuForm.formdata.upMenuId = '0';
            return;
          }
          var param = {
            'menuId': nodeData.id
          };
          var _this = this;
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.adminService + '/adminSmMenu/show',
            callback: function (code, message, response) {
              if (code == '0' && response.code == 0) {
                var formModel = yufp.extend({}, response.data);
                if (nodeData.pid == '0') {
                  formModel.upMenuName = _this.$refs.menuTree.data[0].label;
                }
                _this.$refs.menuForm.formdata = formModel;
                _this.$refs.menuForm.formdata.menuOrder = '' + formModel.menuOrder;
              }
            }
          });
        },
        // 右侧菜单树，点击选择上层菜单
        upMenuClickFn: function (nodeData, node, self) {
          this.currClickNode = nodeData.id;
          this.currClickName = nodeData.label;
          var formModel = yufp.extend({}, this.$refs.menuForm.formdata);
          formModel.upMenuId = nodeData.id;
          formModel.upMenuName = nodeData.label;
          this.$refs.menuForm.formdata = yufp.extend({}, formModel);
        },
        // 右侧菜单树节点过滤：修改时菜单自身节点及子节点不能作为其上层菜单,因此过滤不展示
        filterFn: function (value, data) {
          var _this = this;
          if (_this.tempCheckNode.indexOf(',' + data.id + ',') >= 0 || _this.tempCheckNode.indexOf(',' + data.pid + ',') >= 0) {
            _this.tempCheckNode += data.id + ',';
            return false;
          } else {
            return true;
          }
        },
        // 图标点击事件
        handleIconClick: function () {
          this.iconDialogVisible = true;
        },
        // 获取图标
        iconSelect: function (event) {
          var iconName = event.target.className;
          var formModel = yufp.extend({}, this.$refs.menuForm.formdata);
          formModel.menuIcon = iconName;
          this.$refs.menuForm.formdata = yufp.extend({}, formModel);
          this.iconDialogVisible = false;
        },
        // 业务功能列表选择
        funcSelect: function (row) {
          var _this = this;
          var formModel = yufp.extend({}, this.$refs.menuForm.formdata);
          formModel.modId = row.modId;
          formModel.modName = _this.modMap[row.modId];
          formModel.funcId = row.funcId;
          formModel.funcName = row.funcName;
          this.$refs.menuForm.formdata = yufp.extend({}, formModel);
        },
        // 菜单表单重置
        resetFn: function () {
          let _this = this;
          _this.$nextTick(function () {
            _this.$refs.menuForm.formModel.upMenuId = '';
            _this.$refs.menuForm.formModel.funcId = '';
            _this.$refs.menuForm.resetFields();
          });
        },
        // 菜单保存
        saveFn: function () {
          let _this = this;
          var validate = false;
          _this.$refs.menuForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            _this.$message({
              message: '请检查输入项是否合法',
              type: 'warning'
            });
            return;
          }
          var formModel = yufp.extend({}, _this.$refs.menuForm.formdata);
          formModel.lastChgUsr = yufp.session.userId;
          if (_this.addFlag || formModel.menuId == undefined) { // 新增
            formModel.sysId = backend.sysId;
            formModel.upMenuId = _this.currClickNode;
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/adminSmMenu/create',
              data: formModel,
              callback: function (code, message, response) {
                if (code == '0' && response.code == 0) {
                  _this.$message({
                    message: '数据保存成功！'
                  });
                  _this.$refs.menuTree.remoteData();
                  _this.$refs.upMenuTree.remoteData();
                  _this.$refs.menuForm.resetFields();
                  _this.$refs.menuForm.formModel.funcId = '';
                  delete _this.$refs.menuForm.formdata.menuId;
                }
              }
            });
            _this.addFlag = false;
          } else { // 修改
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/adminSmMenu/update',
              data: formModel,
              callback: function (code, message, response) {
                if (code == '0' && response.code == 0) {
                  _this.$message({
                    message: '数据保存成功！'
                  });
                  _this.$refs.menuTree.remoteData();
                  _this.$refs.upMenuTree.remoteData();
                  _this.$refs.menuForm.resetFields();
                  _this.$refs.menuForm.formdata.funcId = '';
                  _this.$refs.menuForm.formdata.funcId = '';
                  delete _this.$refs.menuForm.formdata.menuId;
                }
              }
            });
          }
        }
      },
      // 加载后处理
      mounted: function () {
        this.init();
      }
    });
  };
  // 消息处理
  exports.onmessage = function (type, message, cite) { };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) { };
});