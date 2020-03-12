/**
 * @created by {{username}} on {{sys_date}}
 * @updated by  蒋信志 20190716
 * @description {{pageDesc}}
 */
define([
  './custom/widgets/js/yufpOrgTree.js', './custom/widgets/js/yufpExtTree.js'
], function (require, exports) {
  yufp.lookup.reg('AUTHOBJ_TYPE');
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    var leafNodes = [];
    var leafAppNodes = [];
    // vue data
    let vmData = {
      typeOptions: yufp.lookup.find('AUTHOBJ_TYPE', true),
      filterText: '', // PC菜单资源过滤关键字
      filterAppText: '', // PAD应用资源过滤关键字
      ifselectData: false, // 是否选中了数据
      activeName: 'pcresouce', // 默认显示PC菜单资源
      nodeCheckNum: 0, // 资源树节点被勾选操作的次数
      // 下拉选对象
      select: {
        showObjectFlag: 'R', // 对象标识
        sourObjectType: 'R', // 复制源类型-默认是角色
        builObjectType: 'R' // 获取复制数据的对象类型-默认是角色
      },
      // 角色信息面板
      roleGrid: {
        query: {
          orgId: '',
          roleCode: '',
          roleName: ''
        },
        // height: yufp.custom.viewSize().height - 155,
        currentRow: null,
        dataUrl: backend.appOcaService + '/adminSmRole/index',
        dataParams: {
          condition: JSON.stringify({
            roleSts: 'A'
          })
        }
      },
      // 机构信息面板
      orgGrid: {
        nowNode: '',
        height: yufp.custom.viewSize().height - 130,
        orgRootId: yufp.session.org.code, // 根节点ID
        treeUrl: backend.appOcaService + '/adminSmOrg/tree?& orgSts=A'
      },
      userGrid: {
        query: {
          userInfo: '',
          orgId: ''
        },
        height: yufp.custom.viewSize().height - 155,
        checkbox: false,
        currentRow: null,
        dataUrl: backend.appOcaService + '/adminSmUser/index',
        dataParams: {
          condition: JSON.stringify({
            userSts: 'A',
            orgId: yufp.session.org.id
          })
        }
      },
      // PC菜单资源树
      menuTree: {
        reourceUrl: backend.appOcaService + '/adminSmAuthteco/menutreequery?sysId=' + yufp.session.logicSys.id,
        loading: false,
        treeCheckBox: true,
        height: yufp.custom.viewSize().height - 130
      },
      // 复制弹出框
      copyGrid: {
        orgTreeNodes: {},
        dialogVisible: false,
        sourObjectId: '', // 复制原ID
        builObjectId: '' // 获取复制数据的对象ID
      },
      /** 按钮区域定义*/
      btnContr: {
        ifTreeButton: false, // 按钮是否可选
        ifPadTreeButton: false, // 按钮是否可选
        copyButton: true, // 复制按钮控制
        selectAllButton: true, // 全选
        setOtherButton: true, // 反选
        resetButton: true // 重置
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
        // 对象类型选择
        change: function (val) {
          this.select.showObjectFlag = val;
          this.select.sourObjectType = val;
          this.select.builObjectType = val;
        },
        // 角色查询
        queryRoleFn: function () {
          let _this = this;
          var params = {
            condition: JSON.stringify({
              orgId: _this.roleGrid.query.orgId ? _this.roleGrid.query.orgId : null,
              roleCode: _this.roleGrid.query.roleCode ? _this.roleGrid.query.roleCode : null,
              roleName: _this.roleGrid.query.roleName ? _this.roleGrid.query.roleName : null,
              roleSts: 'A'
            })
          };
          _this.$refs.roleTable.remoteData(params);
          _this.$refs.menuTree.setCheckedKeys([]);
          _this.roleGrid.currentRow = null;
        },
        // 角色查询条件重置
        resetQueryRoleFn: function () {
          this.roleGrid.query = {
            orgId: '',
            roleCode: '',
            roleName: ''
          };
        },
        // 选中角色数据刷新菜单树选中状态
        selectRowRole: function (row) {
          if (row) {
            this.filterText = '';
            this.filterAppText = '';
            this.ifselectData = true;
            this.roleGrid.currentRow = row;
            var param = {};
            if (this.activeName == 'padresource') {
              param = {
                objectType: this.select.showObjectFlag,
                objectId: row.roleId,
                resType: 'A',
                sysId: yufp.session.logicSys.id
              };
              this.refreshAppTree(param);
            } else {
              param = {
                objectType: this.select.showObjectFlag,
                objectId: row.roleId,
                resType: 'M,C',
                sysId: yufp.session.logicSys.id
              };
              this.$refs.orgTree.remoteData();
              this.refreshMenuTree(param);
            }
          } else {
            this.$message({
              message: '请选择一条数据',
              type: 'warning'
            });
          }
        },
        // 机构树点击事件
        orgClickFn: function (nodes) {
          let _this = this;
          if (nodes != null) {
            this.filterText = '';
            this.filterAppText = '';
            this.ifselectData = true;
            _this.orgGrid.nowNode = nodes;
            var param = {
              objectType: _this.select.showObjectFlag,
              objectId: nodes.orgId,
              resType: 'M,C',
              sysId: yufp.session.logicSys.id
            };
            _this.refreshMenuTree(param);
          } else {
            _this.$message({
              message: '请选择一个节点',
              type: 'warning'
            });
          }
        },

        // 用户查询
        queryUserFn: function () {
          this.$refs.userTable.remoteData({
            condition: JSON.stringify({
              orgId: this.userGrid.query.orgId ? this.userGrid.query.orgId : yufp.session.org.id,
              userInfo: this.userGrid.query.userInfo ? this.userGrid.query.userInfo : null,
              userSts: 'A'
            })
          });
          this.$refs.menuTree.setCheckedKeys([]);
          this.userGrid.currentRow = null;
        },
        // 用户查询重置
        resetUserFn: function () {
          this.userGrid.query = {
            userInfo: '',
            orgId: ''
          };
        },
        // 用户数据选中事件方法
        selectRowUser: function (row) {
          if (row) {
            this.filterText = '';
            this.filterAppText = '';
            this.ifselectData = true;
            this.userGrid.currentRow = row;
            var param = {
              objectType: this.showObjectFlag,
              objectId: row.userId,
              resType: 'M,C',
              sysId: yufp.session.logicSys.id
            };
            this.refreshMenuTree(param);
          } else {
            this.$message({
              message: '请选择一条数据',
              type: 'warning'
            });
          }
        },
        // 刷新菜单树
        refreshMenuTree: function (param) {
          let _this = this;
          _this.reSetFn(); // 重置
          _this.menuTree.loading = true;
          // 发起请求
          yufp.service.request({
            method: 'GET',
            url: backend.appOcaService + '/adminSmAuthteco/queryinfo',
            data: param,
            callback: function (code, message, response) {
              var infos = [];
              if (leafNodes.length == 0) {
                _this.getNodesWithoutChildren(_this.$refs.menuTree.data);
              }
              for (var i = 0; i < leafNodes.length; i++) {
                var node = leafNodes[i];
                for (var j = 0; j < response.data.length; j++) {
                  var d = response.data[j];
                  if (node['id'] == d['authresId']) {
                    infos.push(d);
                  }
                }
              }
              _this.resData = infos;
              var keys = [];
              for (var i = 0; i < infos.length; i++) {
                keys.push(infos[i].authresId);
              }
              _this.$refs.menuTree.setCheckedKeys(keys);
              _this.menuTree.loading = false;
              _this.nodeCheckNum = 0;
            }
          });
        },
        // 平铺应用节点
        getNodesWithoutChildren: function (data) {
          for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d == undefined || d['children'] == undefined) {
              continue;
            }
            if (d['children'].length == 0) {
              leafNodes.push(d);
            } else {
              var childern = d['children'];
              this.getNodesWithoutChildren(childern);
            }
          }
        },
        // 平铺应用节点
        getAppNodesWithoutChildren: function (data) {
          for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d == undefined || d['children'] == undefined) {
              continue;
            }
            if (d['children'].length == 0) {
              leafAppNodes.push(d);
            } else {
              var childern = d['children'];
              this.getAppNodesWithoutChildren(childern);
            }
          }
        },
        // 全选
        selectAllFn () {
          var nodes = this.$refs.menuTree.data;
          for (var s = 0; s < nodes.length; s++) {
            this.$refs.menuTree.setChecked(nodes[s].id, true, true);
          }
        },
        // 反选
        reSelectFn () {
          var checks = this.$refs.menuTree.getCheckedKeys();
          this.selectAllFn();
          for (var i = 0; i < checks.length; i++) {
            this.$refs.menuTree.setChecked(checks[i], false, false);
          }
        },
        // 重置
        reSetFn () {
          this.$refs.menuTree.setCheckedKeys([]);
        },
        // 保存菜单资源权限
        savePcAllInfoFn () {
          var _this = this;
          var objectType = _this.select.showObjectFlag;
          var objectId;
          var dataInfo = [];
          var ctrInfo = []; // 控制点数据
          var dataMap = {};
          if (objectType === 'R') { // 角色
            _this.checkObjSelected(_this.roleGrid.currentRow);
            objectId = this.roleGrid.currentRow.roleId;
          } else if (objectType === 'U') { // 用户
            _this.checkObjSelected(_this.userGrid.currentRow);
            objectId = _this.userGrid.currentRow.userId;
          } else if (objectType === 'G') { // 机构
            _this.checkObjSelected(_this.m_orgTree.nowNode);
            objectId = _this.orgGrid.nowNode.orgId;
          }
          if (objectId === null || objectType === '') {
            _this.$message({
              message: '请选择一条对象数据',
              type: 'warning'
            });
            return;
          }
          var checksNodes = _this.$refs.menuTree.getCheckedNodes();
          var checkHalfNodes = _this.$refs.menuTree.getHalfCheckedNodes();

          for (var i = 0; i < checksNodes.length; i++) {
            var data = {
              authRecoId: null,
              authobjId: objectId,
              authobjType: objectType,
              authresType: checksNodes[i].menuType,
              lastChgUsr: yufp.session.userId,
              sysId: yufp.session.logicSys.id,
              authresId: checksNodes[i].id,
              menuId: checksNodes[i].menuId
            };
            if (checksNodes[i].menuType === 'M') {
              dataInfo.push(data);
            } else {
              ctrInfo.push(data);
            }
          }
          for (var j = 0; j < checkHalfNodes.length; j++) {
            var data2 = {
              authRecoId: null,
              authobjId: objectId,
              authobjType: objectType,
              authresType: checkHalfNodes[j].menuType,
              lastChgUsr: yufp.session.userId,
              sysId: yufp.session.logicSys.id,
              authresId: checkHalfNodes[j].id,
              menuId: checkHalfNodes[j].menuId
            };
            if (checkHalfNodes[j].menuType === 'M') {
              dataInfo.push(data2);
            } else {
              ctrInfo.push(data2);
            }
          }
          dataMap.menuData = dataInfo;
          dataMap.ctrData = ctrInfo;
          if (dataInfo.length > 0 || ctrInfo.length > 0) {
            // 发起请求
            yufp.service.request({
              method: 'POST',
              timeout: 120000,
              url: backend.appOcaService + '/adminSmAuthteco/saveinfo',
              data: JSON.stringify(dataMap),
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                } else {
                  _this.$message({
                    message: '保存失败',
                    type: 'warning'
                  });
                }
              }
            });
          } else {
            _this.$confirm('此操作将删除该对象功能授权信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.appOcaService + '/api/adminsmauthteco/deletedatainfo',
                data: JSON.stringify({
                  authobjId: objectId,
                  sysId: yufp.session.logicSys.id,
                  authresType: ['M', 'C']
                }),
                callback: function (code, message, response) {
                  if (code == 0 && response.code == 0) {
                    _this.$message({
                      message: '操作成功',
                      type: 'success'
                    });
                  } else {
                    _this.$message({
                      message: '操作失败',
                      type: 'warning'
                    });
                  }
                }
              });
            }).catch(function () {
              return;
            });
          }
        },
        // 菜单树加节点样式 add by chenlin 20171229
        renderContent: function () {
          var createElement = arguments[0];
          var type = arguments[1].data.menuType;
          return createElement('span', [
            createElement('span', {
              attrs: {
                class: 'fox-treeMenuType' + type
              }
            }, type),
            createElement('span', arguments[1].data.label)
          ]);
        },
        // 授权树节点过滤
        filterNode: function (value, data) {
          if (!value) {
            return true;
          }
          return data.menuName.indexOf(value) !== -1;
        },

        // 是否选中对象
        checkObjSelected: function (row) {
          if (row === null || row === '') {
            this.$message({
              message: '请先选择一条对象进行授权',
              type: 'warning'
            });
            return;
          }
        },
        // 复制数据
        copyInfoFn: function () {
          if (this.select.sourObjectType === 'R') { // 角色
            if (this.roleGrid.currentRow == null) {
              this.$message({
                message: '请先选择一条待复制对象，然后点击复制',
                type: 'warning'
              });
              return;
            }
            this.copyGrid.dialogVisible = true;
            this.copyGrid.sourObjectId = this.roleGrid.currentRow.roleId;
            this.$nextTick(function () {
              this.$refs.roleTable1.remoteData();
            });
          } else if (this.select.sourObjectType === 'U') { // 用户
            if (this.userGrid.currentRow == null) {
              this.$message({
                message: '请先选择一条待复制对象，然后点击复制',
                type: 'warning'
              });
              return;
            }
            this.copyGrid.dialogVisible = true;
            this.copyGrid.sourObjectId = this.userGrid.currentRow.userId;
            this.$nextTick(function () {
              this.$refs.userTable1.remoteData();
            });
          } else if (this.select.sourObjectType === 'G') { // 机构
            if (this.orgGrid.nowNode == null || this.orgGrid.nowNode == '') {
              this.$message({
                message: '请先选择一条待复制对象，然后点击复制',
                type: 'warning'
              });
              return;
            }
            this.copyGrid.dialogVisible = true;
            this.copyGrid.sourObjectId = this.orgGrid.nowNode.orgId;
            this.$nextTick(function () {
              this.$refs.orgTree1.remoteData();
            });
          }
        },
        copyCheck: function () {
          var _this = this;
          if (_this.select.builObjectType === 'R') { // 角色
            if (_this.$refs.roleTable1.selections.length == 0) {
              _this.$message({
                message: '请先选择粘贴对象',
                type: 'warning'
              });
              return;
            }
            _this.copyGrid.builObjectId = _this.$refs.roleTable1.selections[0].roleId;
          } else if (_this.select.builObjectType === 'U') { // 用户
            if (_this.$refs.userTable1.selections.length == 0) {
              _this.$message({
                message: '请先选择粘贴对象',
                type: 'warning'
              });
              return;
            }
            _this.copyGrid.builObjectId = _this.$refs.userTable1.selections[0].userId;
          } else if (_this.select.builObjectType === 'G') { // 机构
            if (_this.orgTreeNodes == null) {
              _this.$message({
                message: '请先选择一条复制对象',
                type: 'warning'
              });
              return;
            }
            _this.copyGrid.builObjectId = _this.copyGrid.orgTreeNodes.orgId;
          }
          var param = {
            sourObjectType: _this.select.sourObjectType,
            sourObjectId: _this.copyGrid.sourObjectId,
            builObjectType: _this.select.builObjectType,
            builObjectId: _this.copyGrid.builObjectId,
            lastChgUsr: yufp.session.userId,
            sysId: yufp.session.logicSys.id
          };
          // 发起请求
          yufp.service.request({
            method: 'POST',
            url: backend.appOcaService + '/api/adminsmauthteco/savecopyinfo',
            data: JSON.stringify(param),
            callback: function (code, message, response) {
              _this.$message({
                message: '复制成功',
                type: 'success'
              });
              _this.copyGrid.dialogVisible = false;
            }
          });
        },
        // 复制时机构树点击事件
        orgClickFn1: function (nodes) {
          this.copyGrid.orgTreeNodes = nodes;
        },
        // 导出数据
        exportInfoFn: function () {
          var objectId = '',
            objectType = '';
          if (this.ifselectData) {
            if (this.select.showObjectFlag === 'R') { // 角色
              objectId = this.roleGrid.currentRow.roleId;
            } else if (this.select.showObjectFlag === 'U') { // 用户
              objectId = this.userGrid.currentRow.userId;
            } else if (this.select.showObjectFlag === 'G') { // 机构
              objectId = this.m_orgTree.nowNode.orgId;
            }
          }
          objectType = this.select.showObjectFlag;
          var resourceType = ['M', 'C'];
          var param = {
            objectId: objectId,
            objectType: objectType,
            resourceType: resourceType,
            sysId: yufp.session.logicSys.id
          };
          var params = {};
          params.url = backend.appOcaService + '/api/adminsmauthteco/export';
          params.url = yufp.service.getUrl(params);
          params.url += '?access_token=' + yufp.service.getToken();
          params.url += '&condition=' + encodeURI(JSON.stringify(param));
          window.open(params.url);
        },


        // 全选
        selectAllPadFn () {
          var nodes = this.$refs.appTree.data;
          for (var s = 0; s < nodes.length; s++) {
            this.$refs.appTree.setChecked(nodes[s].id, true, true);
          }
        },
        // 反选
        reSelectPadFn () {
          var checks = this.$refs.appTree.getCheckedKeys();
          this.selectAllPadFn();
          for (var i = 0; i < checks.length; i++) {
            this.$refs.appTree.setChecked(checks[i], false, false);
          }
        },
        // 重置
        reSetPadFn () {
          this.$refs.appTree.setCheckedKeys([]);
        },
        // 保存应用资源权限
        savePadAllInfoFn () {
          var _this = this;
          var objectType = _this.select.showObjectFlag;
          var objectId;
          var dataInfo = [];
          var ctrInfo = []; // 控制点数据
          var dataMap = {};
          if (objectType === 'R') { // 角色
            _this.checkObjSelected(_this.roleGrid.currentRow);
            objectId = this.roleGrid.currentRow.roleId;
          } else if (objectType === 'U') { // 用户
            _this.checkObjSelected(_this.userGrid.currentRow);
            objectId = _this.userGrid.currentRow.userId;
          } else if (objectType === 'G') { // 机构
            _this.checkObjSelected(_this.m_orgTree.nowNode);
            objectId = _this.orgGrid.nowNode.orgId;
          }
          if (objectId === null || objectType === '') {
            _this.$message({
              message: '请选择一条对象数据',
              type: 'warning'
            });
            return;
          }
          var checksNodes = _this.$refs.appTree.getCheckedNodes();
          var checkHalfNodes = _this.$refs.appTree.getHalfCheckedNodes();

          for (var i = 0; i < checksNodes.length; i++) {
            var data = {
              authRecoId: null,
              authobjId: objectId,
              authobjType: objectType,
              authresType: checksNodes[i].appType,
              lastChgUsr: yufp.session.userId,
              sysId: yufp.session.logicSys.id,
              authresId: checksNodes[i].id,
              menuId: checksNodes[i].menuId
            };
            if (checksNodes[i].appType === 'A') {
              dataInfo.push(data);
            } else {
              ctrInfo.push(data);
            }
          }
          for (var j = 0; j < checkHalfNodes.length; j++) {
            var data2 = {
              authRecoId: null,
              authobjId: objectId,
              authobjType: objectType,
              authresType: checkHalfNodes[j].appType,
              lastChgUsr: yufp.session.userId,
              sysId: yufp.session.logicSys.id,
              authresId: checkHalfNodes[j].id,
              menuId: checkHalfNodes[j].menuId
            };
            if (checkHalfNodes[j].appType === 'A') {
              dataInfo.push(data2);
            } else {
              ctrInfo.push(data2);
            }
          }
          dataMap.appData = dataInfo;
          dataMap.ctrData = ctrInfo;
          if (dataInfo.length > 0 || ctrInfo.length > 0) {
            // 发起请求
            yufp.service.request({
              method: 'POST',
              timeout: 120000,
              url: backend.appOcaService + '/api/adminsmauthteco/saveAppinfo',
              data: JSON.stringify(dataMap),
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                } else {
                  _this.$message({
                    message: '保存失败',
                    type: 'warning'
                  });
                }
              }
            });
          } else {
            // _this.$confirm('此操作将删除该对象功能授权信息, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning',
            //     center: true
            // }).then(function () {
            //     yufp.service.request({
            //         method: 'POST',
            //         url: backend.appOcaService + '/api/adminsmauthteco/deletedatainfo',
            //         data: JSON.stringify({
            //             authobjId: objectId,
            //             sysId: yufp.session.logicSys.id,
            //             authresType: ['M', 'C']
            //         }),
            //         callback: function (code, message, response) {
            //             if (code == 0 && response.code == 0) {
            //                 _this.$message({
            //                     message: '操作成功',
            //                     type: 'success'
            //                 });
            //             } else {
            //                 _this.$message({
            //                     message: '操作失败',
            //                     type: 'warning'
            //                 });
            //             }
            //         }
            //     });
            // }).catch(function () {
            //     return;
            // });
          }
        },
        // 菜单树加节点样式 add by chenlin 20171229
        renderAppContent: function () {
          var createElement = arguments[0];
          var type = arguments[1].data.appType;
          return createElement('span', [
            createElement('span', {
              attrs: {
                class: 'fox-treeMenuType' + type
              }
            }, type),
            createElement('span', arguments[1].data.label)
          ]);
        },
        // 应用授权树节点过滤
        filterAppNode: function (value, data) {
          if (!value) {
            return true;
          }
          return data.appName.indexOf(value) !== -1;
        }
      },
      // 加载后处理
      mounted: function () {
      },
      watch: {
        filterText: function (val) {
          val == '' ? this.btnContr.ifTreeButton = false : this.btnContr.ifTreeButton = true;
          this.$refs.menuTree.filter(val);
        }
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