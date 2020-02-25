/**
 * @Created by 林立 20190906
 */
define(['./custom/widgets/js/yufpExtTree.js'], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // vue data
    let vmData = {
      // 表单数据
      lookuptypeFormdata: {},
      // 字项条目列
      filterFormdata: {},
      // 字典项列表
      lookupItemFormdata: {},
      // 数据字典类别
      treeHeight: yufp.custom.viewSize().height - 80,
      typeUrl: backend.adminService + '/adminSmLookupType/tree',
      // 当前数据目录节点 ID
      currentTypeId: '',
      // 当前数据目录节点 Name
      currentTypeName: '',
      // 当前数据目录节点 数据
      currentTypeData: '',
      // 当前数据目录节点 级别
      currentTypeLevel: '',
      // 上级节点data
      parentTypeData: '',
      /** 按钮区域定义*/

      // 字典分类
      createLookuptypeButton: true, // 新增按钮控制
      editLookuptypeButton: true, // 修改按钮控制
      deleteLookuptypeButton: true, // 删除按钮控制
      // 字典类别
      createFilterButton: true, // 新增按钮控制
      editFilterButton: true, // 修改按钮控制
      deleteFilterButton: true, // 删除按钮控制
      // 字典内容
      createLkItemButton: true, // 新增按钮控制
      editLkItemButton: true, // 修改按钮控制
      deleteLkItemButton: true, // 删除按钮控制

      /** 中间表格区域定义*/
      // 类别表格url
      lookupUrl: backend.adminService + '/adminSmLookup/index',
      // 内容url
      lookupitemUrl: backend.adminService + '/adminSmLookupItem/index',
      // 字典项查询条件
      filterQueryform: {},
      // 字典内容查询条件
      itemQueryform: {},
      /** 左边弹出框属性域定义*/
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      lkTypeDialogVisible: false,
      lkTypeDialogDisabled: true,
      lkTypeDialogSaveBtnShow: true,

      lookuptypeVisible: false,
      lookuptypeDisabled: true,
      lookuptypeSaveBtnShow: true,

      lookupItemVisible: false,
      lookupItemDisabled: true,
      lookupItemSaveBtnShow: true,

      // 字典目录规则
      lkTypeRules: {
        // 目录名称
        lookupTypeName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '最大长度不超过50个字符',
          trigger: 'blur'
        }
        ]
      },
      // 字典分类规则
      lookuptypeRules: {
        // 目录名称
        lookupCode: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '最大长度不超过50个字符',
          trigger: 'blur'
        }
        ],
        lookupName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '最大长度不超过50个字符',
          trigger: 'blur'
        }
        ]
      },
      // 字典ITEM规则
      lookupItemRules: {
        // 字典代码
        lookupItemCode: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '最大长度不超过50个英文字符',
          trigger: 'blur'
        }
        ],
        // 字典名称
        lookupItemName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 50,
          message: '最大长度不超过50个英文字符',
          trigger: 'blur'
        }],
        // 类别英文别名
        lookupCode: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          max: 50,
          message: '最大长度不超过50个英文字符',
          trigger: 'blur'
        }],
        // 字典备注说明
        lookupItemComment: [{
          max: 100,
          message: '最大长度不超过100个英文字符',
          trigger: 'blur'
        }],
        // 字典排序号
        lookupItemOrder: [{
          validator: yufp.validator.number,
          message: '请输入数字',
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
      computed: {

      },
      // 方法
      methods: {
        // 选择字典分类树节点
        nodeClickFn: function (obj, node, nodeComp) {
          this.currentTypeId = node.data.lookupTypeId;
          this.currentTypeName = node.data.lookupTypeName;
          this.currentTypeData = node.data;
          this.currentTypeLevel = node.level;
          this.parentTypeData = node.parent.data;
          // 获取数据字典类别TABLE start
          var _this = this;
          if (node.data.pid == '0000') { // 如果点击根节点，清空条件，查询所有数据字典
            _this.currentTypeId = null;
          }
          var param = {
            condition: JSON.stringify({
              lookupTypeId: _this.currentTypeId
            })
          };
          _this.filterQueryform.lookupTypeId = _this.currentTypeId;
          _this.$refs.filterTable.remoteData(param);
          _this.currentTypeId = node.data.lookupTypeId;
          // 获取数据字典类别TABLE  end
        },
        // 字典内容
        filterSelect: function (row) {
          let _this = this;
          // 获取内容目录 start
          var param = {
            condition: JSON.stringify({
              lookupCode: row.lookupCode
            })
          };
          _this.itemQueryform.lookupCode = row.lookupCode;
          _this.$refs.itemTable.remoteData(param);
        },

        /** ***********字典目录 **************** */

        // 字典目录 新增
        createLkTypeFn: function () {
          let _this = this;
          if (_this.currentTypeId == null || _this.currentTypeId == '') {
            vm.$message({
              message: '请选择目录节点!',
              type: 'warning'
            });
            return false;
          }
          // 挂在当前选中目录下面
          _this.upLookupTypeId = _this.currentTypeId;
          _this.upLookupTypeName = _this.currentTypeName;
          _this.lkTypeDialogVisible = true;
          _this.viewType = 'ADD';
          _this.$nextTick(function () {
            _this.$refs.lookupTypeForm.resetFields();
            _this.$refs.lookupTypeForm.formdata.upLookupTypeId = _this.currentTypeId;
            _this.$refs.lookupTypeForm.formdata.upLookupTypeName = _this.currentTypeName;
          });
        },
        // 字典目录 修改
        updateLkTypeFn: function () {
          let _this = this;
          var lkTypeId = _this.currentTypeId;
          if (lkTypeId == null) {
            _this.$message({
              message: '请选择目录节点!',
              type: 'warning'
            });
            return false;
          }
          if (_this.currentTypeLevel == 1) {
            _this.$message({
              message: '目录根节点不支持修改!',
              type: 'warning'
            });
            return false;
          }
          _this.viewType = 'EDIT';
          _this.lkTypeDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.lookupTypeForm.formdata = yufp.extend({}, _this.currentTypeData);
            _this.$refs.lookupTypeForm.formdata.upLookupTypeName = _this.parentTypeData.lookupTypeName;
          });
        },
        // 字典目录 删除
        deleteLkTypeFn: function () {
          let _this = this;
          var lookupTypeId = _this.currentTypeId;
          if (lookupTypeId == null) {
            vm.$message({
              message: '请选择目录节点!',
              type: 'warning'
            });
            return false;
          }
          var nodeData = _this.currentTypeData;
          var getAllId = function (node, arr) {
            arr.push(node.id);
            var cList = node.children;
            if (cList && cList.length > 0) {
              for (var i in cList) {
                getAllId(cList[i], arr);
              }
            } else {
              return;
            }
          };
          var arr = [];
          getAllId(nodeData, arr);
          var delData = {
            data: arr
          };
          _this.$confirm('确认删除该类别目录以及目录下的类别?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              url: backend.adminService + '/adminSmLookupType/delete',
              method: 'post',
              data: delData,
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.$message({
                    message: '删除成功!'
                  });
                  // 刷新树
                  _this.$refs.lookuptypetree.remoteData();
                  _this.$refs.filterTable.remoteData();
                  _this.$refs.itemTable.remoteData();
                } else {
                  _this.$message({
                    message: '删除失败!'
                  });
                }
              }
            });
          });
        },
        // 字典目录 按钮提交
        lkTypeSubmitFn: function () {
          let _this = this;
          var validate = false;
          _this.$refs.lookupTypeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.$refs.lookupTypeForm.formdata, model);
          model.lastChgUsr = yufp.session.userId;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            _this.saveLookUpType(model);
          } else {
            // 走编辑接口
            _this.updateLookUpType(model);
          }
        },
        // 新增目录保存
        saveLookUpType: function (model) {
          let _this = this;
          delete model.lookupTypeId;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookupType/create',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({
                  message: '保存成功!'
                });
                _this.lkTypeDialogVisible = false;
                // 刷新树
                _this.$refs.lookuptypetree.remoteData();
              } else {
                _this.$message({
                  message: '保存失败!'
                });
              }
            }
          });
        },
        // 修改目录保存
        updateLookUpType: function (model) {
          let _this = this;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookupType/update',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({
                  message: '保存成功!'
                });
                _this.lkTypeDialogVisible = false;
                // 刷新树
                _this.$refs.lookuptypetree.remoteData();
              } else {
                _this.$message({
                  message: '保存失败!'
                });
              }
            }
          });
        },

        /** ***********字典目录 **************** */
        /** ***********字典类别  *************** */
        // 字典类别 新增
        createFilterFn: function () {
          let _this = this;
          if (_this.currentTypeId === null || _this.currentTypeId === '') {
            vm.$message({
              message: '请选择目录!',
              type: 'warning'
            });
            return false;
          }
          _this.lookuptypeVisible = true;
          _this.viewType = 'ADD';
          _this.$nextTick(function () {
            _this.$refs.datafilterForm.resetFields();
            _this.$refs.datafilterForm.switch('lookupCode', 'disabled', false);
            _this.$refs.datafilterForm.formdata.lookupTypeId = _this.currentTypeId;
          });
        },
        // 字典类别 修改
        updateFilterFn: function () {
          let _this = this;
          var currentRow = _this.$refs.filterTable.selections;
          if (currentRow.length != 1) {
            vm.$message({
              message: '请选择一条字典类别记录!',
              type: 'warning'
            });
            return false;
          }
          _this.lookuptypeVisible = true;
          _this.viewType = 'EDIT';
          _this.$nextTick(function () {
            // _this.$refs.datafilterForm.switch('lookupCode', 'readonly', true);
            _this.$refs.datafilterForm.formdata = yufp.extend({}, currentRow[0]);
          });
        },
        // 字典类别 删除
        deleteFilterFn: function () {
          let _this = this;
          var currentRow = _this.$refs.filterTable.selections;
          if (currentRow.length != 1) {
            _this.$message({
              message: '请选择一条字典类别记录!',
              type: 'warning'
            });
            return false;
          }
          _this.$confirm('确认删除该字典类别以及类别下的字典内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              url: backend.adminService + '/adminSmLookup/delete',
              method: 'post',
              data: {
                lookupId: currentRow[0].lookupId,
                lookupCode: currentRow[0].lookupCode
              },
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.$message({
                    message: '删除成功!'
                  });
                  _this.queryInitFn();
                  _this.$refs.itemTable.remoteData();
                } else {
                  _this.$message({
                    message: '删除失败!'
                  });
                }
              }
            });
          });
        },
        // 通过typeId初始化查询类别TABLE
        queryInitFn: function () {
          var _this = this;
          var param = {
            condition: JSON.stringify({
              lookupTypeId: _this.currentTypeId
            })
          };
          // 发起请求
          _this.$refs.filterTable.remoteData(param);
        },
        // 字典类别 提交
        lookuptypeSubmitFn: function () {
          let _this = this;
          var validate = false;
          _this.$refs.datafilterForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.$refs.datafilterForm.formdata, model);
          model.lastChgUsr = yufp.session.userId;
          model.lookupTypeId = _this.currentTypeId;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            _this.lookuptableCreateFn(model);
          } else {
            // 走编辑接口
            _this.lookuptableUpdateFn(model);
          }
        },
        // 保存新增字典类别
        lookuptableCreateFn: function (model) {
          let _this = this;
          delete model.lookupId;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookup/create',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                if (response.code == '2000') {
                  _this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                  return false;
                } else {
                  _this.$message({
                    message: '保存成功!'
                  });
                  _this.queryInitFn();
                  _this.lookuptypeVisible = false;
                  _this.$refs.filterTable.remoteData();
                }
              } else {
                _this.$message({
                  message: '保存失败!'
                });
              }
            }
          });
        },
        // 修改字典类别保存
        lookuptableUpdateFn: function (model) {
          let _this = this;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookup/update',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({
                  message: '保存成功!'
                });
                _this.queryInitFn();
                _this.lookuptypeVisible = false;
                _this.$refs.filterTable.remoteData();
              } else {
                _this.$message({
                  message: '修改失败!'
                });
              }
            }
          });
        },

        /** ***********字典类别  *************** */
        /** ***********字典ITEM  *************** */
        // 字典ITEM 新增
        createItemFn: function () {
          // 挂在当前选中目录下面
          let _this = this;
          var currentRow = _this.$refs.filterTable.selections;
          if (currentRow == null) {
            _this.$message({
              message: '请选择类别!',
              type: 'warning'
            });
            return false;
          }
          _this.lookupItemVisible = true;
          _this.viewType = 'ADD';
          _this.$nextTick(function () {
            _this.$refs.lookupItemForm.resetFields();
            _this.$refs.lookupItemForm.formdata.lookupCode = currentRow[0].lookupCode;
          });
        },
        // 字典ITEM 修改
        updateItemFn: function () {
          let _this = this;
          var currentItemRow = _this.$refs.itemTable.selections;
          if (currentItemRow.length != 1) {
            vm.$message({
              message: '请选择数据字典内容!',
              type: 'warning'
            });
            return false;
          }
          _this.lookupItemVisible = true;
          _this.viewType = 'EDIT';
          _this.$nextTick(function () {
            this.$refs.lookupItemForm.formdata = yufp.extend({}, currentItemRow[0]);
          });
        },
        // 字典ITEM 删除
        deleteItemFn: function () {
          let _this = this;
          var currentItemRow = _this.$refs.itemTable.selections;
          if (currentItemRow.length != 1) {
            vm.$message({
              message: '请选择数据字典内容!',
              type: 'warning'
            });
            return false;
          }
          _this.$confirm('确认删除该字典内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              url: backend.adminService + '/adminSmLookupItem/delete/' + currentItemRow[0].lookupItemId,
              method: 'POST',
              // data: lookupItem,
              callback: function (code, message, response) {
                if (code == '0') {
                  vm.$message({
                    message: '删除成功!'
                  });
                  // 刷新树
                  var param = {
                    condition: JSON.stringify({
                      lookupCode: currentItemRow[0].lookupCode
                    })
                  };
                  // 刷新树
                  vm.$refs.itemTable.remoteData(param);
                } else {
                  vm.$message({
                    message: '删除失败!'
                  });
                }
              }

            });
          });
        },
        // 字典ITEM提交
        lookupItemSubmitFn: function () {
          let _this = this;
          var validate = false;
          _this.$refs.lookupItemForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.$refs.lookupItemForm.formdata, model);
          model.lastChgUsr = yufp.session.userId;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            _this.saveLookUpItem(model);
          } else {
            // 走编辑接口
            _this.updateLookUpItem(model);
          }
        },
        // 新增数据字典内容保存
        saveLookUpItem: function (model) {
          let _this = this;
          delete model.lookupItemId;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookupItem/create',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({
                  message: '保存成功!'
                });
                _this.lookupItemVisible = false;
                var param = {
                  condition: JSON.stringify({
                    lookupCode: model.lookupCode
                  })
                };
                // 刷新树
                _this.$refs.itemTable.remoteData(param);
              } else {
                _this.$message({
                  message: '保存失败!'
                });
              }
            }
          });
        },
        // 修改数据字典内容保存
        updateLookUpItem: function (model) {
          let _this = this;
          yufp.service.request({
            url: backend.adminService + '/adminSmLookupItem/update',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({
                  message: '保存成功!'
                });
                _this.lookupItemVisible = false;
                var param = {
                  condition: JSON.stringify({
                    lookupCode: model.lookupCode
                  })
                };
                // 刷新树
                _this.$refs.itemTable.remoteData(param);
              } else {
                _this.$message({
                  message: '保存失败!'
                });
              }
            }
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