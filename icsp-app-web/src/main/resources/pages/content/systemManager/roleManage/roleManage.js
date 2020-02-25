/**
 * Created by 樊苏超 20190613
 */
define([
    './custom/widgets/js/yufpTemplateSelector.js' // 数据权限模板选择器  add by chenlin
], function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var idArr = []; //id 数组
        var idArrTmp = [];
        var selectedCount = 0; //当前选中的最大数目
        var funcDataAll = []; //保存初始数据
        //创建virtual model
        var vmData = {
            /**按钮区域定义*/
            m_btn: {
                createButton: true, // 新增按钮控制
                editButton: true, // 修改按钮控制
                deleteButton: true, // 删除按钮控制
                useButton: true, // 启用按钮控制
                unuseButton: true, // 停用按钮控制
                AuthButton: true, // 权限按钮控制
            },
            // //机构树
            // m_orgTree: {
            //     //机构树请求URL
            //     orgTreeUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
            //     //机构树请求参数
            //     orgTreeParam: {},
            //     //授权机构树请求参数
            //     orgAuthTreeParam: {},
            //     //权构树高度
            //     orgHeight: window.screen.availHeight,
            //     //机构树加载方式
            //     orgAsync: false,
            // },
            //查询URL
            m_roleUrl: {
                searchform: {},
                //根据机构号查询用户服务
                roleDataUrl: backend.appOcaService + '/api/adminsmrole/querypage',
                userDataUrl: backend.appOcaService + '/api/adminsmrole/roleuser',
                authUrl: backend.appOcaService + '/api/adminsmrole/roleauth',
            },
            m_rules: {
                roleCode: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                roleName: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                orgName: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                roleSts: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                modId: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
            },
            //==================
            dialogStatus: '',
            formDisabled: false,
            dialogFormVisible: false, // from弹窗
            dialogGridVisible: false, // 编辑列表弹窗
            dialogDisabled: true,
            orgId: '',
            nowNode: {},
            mainGrid: {
                authTable: [],
                query: {
                    orgId: '',
                    roleCode: '',
                    roleName: '',
                    roleSts: '',
                    orgType: '',
                }
            },
            userGrid: {
                data: null,
                total: null,
                loading: true,
                multipleSelection: [],
                query: {
                    loginCode: '',
                    userName: '',
                    userCode: '',
                    userSts: ''
                }
            },
            //表单区定义
            m_role: {
                formdata: {},
                viewType: 'DETAIL',
                viewTitle: fox.lookup.find('CRUD_TYPE', false),
                dialogVisible: false,
                formDisabled: false,
                saveBtnShow: true,
                hiddenItem: true,
                activeNames: ['1', '2'],
                dialogGridVisible: false, //权限用户弹窗  
                authDialogVisible: false, //默认权限弹窗
                titleName: '', //弹出框标题
                m_funcDataFn: [],
                m_funcDataList: [],
                authvalue: '',
                busModOptions: []
            },

        };
        var data = ['DATA_STS'];
        var vm = new Vue({
            el: "#roleManage",
            data: vmData,
            computed: {

            },
            methods: {
                queryBusMod: function () {
                    var _this = this;
                    let reqData = {};
                    //查询所有模块数据 ，显示为下接框
                    fox.service.request({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: reqData,
                        name: backend.appOcaService + `/api/adminsmfuncmod/querymod`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                response.data.forEach(element => {
                                    var mod = {
                                        key: element.modId,
                                        value: element.modName
                                    }
                                    _this.m_role.busModOptions.push(mod);
                                });
                            }
                        }
                    })
                },
                // 点击树查询
                nodeClickFn: function (node, obj, nodeComp) {
                    if (node != '') {
                        this.orgId = node.id;
                        this.nowNode = node;
                        this.mainGrid.query.orgId = node.orgCode;
                        this.mainGrid.query.orgType = node.orgType;
                        this.queryMainGridFn();
                    }
                },
                //角色查询请求
                queryMainGridFn: function () {
                    var _this = this;
                    var param = {
                        condition: JSON.stringify({
                            // orgId: _this.mainGrid.query.orgId ? _this.mainGrid.query.orgId : fox.localsession.getUserInfo().ownOrg.orgId,
                            roleCode: _this.mainGrid.query.roleCode ? _this.mainGrid.query.roleCode : '',
                            roleName: _this.mainGrid.query.roleName ? _this.mainGrid.query.roleName : '',
                            roleSts: _this.mainGrid.query.roleSts ? _this.mainGrid.query.roleSts : '',
                            orgType: _this.mainGrid.query.orgType ? _this.mainGrid.query.orgType : ''
                        })
                    };
                    _this.$refs.roletable.remoteData(param);
                },
                //重置
                resetFn: function () {
                    var _this = this;
                    _this.$refs.roleQueryFrom.resetFields();
                },
                // 新增面板弹出
                openCreateFn: function () {
                    var _this = this;
                    _this.userGrid.query.roleId = '';
                    _this.switchStatus('ADD', true);
                    this.$nextTick(function () {
                        _this.$refs.roleForm.resetFields(); // 重置form
                        _this.$refs.roleForm.formdata.roleSts = 'W';
                        _this.$refs.roleForm.formdata.orgId = _this.orgId;
                    });
                },
                //提交
                submitFn: function () {
                    var _this = this;
                    var validate = false;
                    _this.$refs.roleForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    if (_this.m_role.viewType == 'ADD') {
                        this.insertFn();
                    } else {
                        this.updateFn();
                    }
                },
                //插入数据
                insertFn: function () {
                    var _this = this;
                    var roleForm = _this.$refs.roleForm;
                    var comitData = {};
                    // 新增时保存
                    delete roleForm.formdata.roleId;
                    fox.service.request({
                        method: 'GET',
                        url: backend.appOcaService + '/api/adminsmrole/createcheckrolecode',
                        data: {
                            roleCode: roleForm.formdata.roleCode
                        },
                        callback: function (code, message, response) {
                            if (response > 0) {
                                _this.$message({
                                    message: '角色代码重复！',
                                    type: 'warning'
                                });
                            } else {
                                fox.extend(comitData, roleForm.formdata);
                                comitData.roleCode = roleForm.formdata.roleCode;
                                comitData.roleName = roleForm.formdata.roleName;
                                // comitData.orgId = roleForm.formdata.orgId;
                                comitData.lastChgUsr = fox.localsession.getUserInfo().userId;
                                fox.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/createrole',
                                    data: comitData,
                                    callback: function (code, message, response) {
                                        _this.m_role.dialogVisible = false;
                                        _this.$message({
                                            message: '数据保存成功！'
                                        });
                                        _this.queryMainGridFn();
                                    }
                                });
                            }
                        }
                    });
                },
                //更新数据
                updateFn: function () {
                    var _this = this;
                    var roleForm = _this.$refs.roleForm;
                    var comitData = {};
                    // 修改时保存
                    fox.service.request({
                        method: 'GET',
                        url: backend.appOcaService + '/api/adminsmrole/editcheckrolecode',
                        data: {
                            roleCode: roleForm.formdata.roleCode,
                            roleId: roleForm.formdata.roleId
                        },
                        callback: function (code, message, response) {
                            if (response > 0) {
                                _this.$message({
                                    message: '角色代码重复！',
                                    type: 'warning'
                                });
                            } else {
                                yufp.extend(comitData, roleForm.formdata);
                                comitData.roleCode = roleForm.formdata.roleCode;
                                comitData.roleName = roleForm.formdata.roleName;
                                // comitData.orgId = roleForm.formdata.orgId;
                                comitData.lastChgUsr = fox.localsession.getUserInfo().userId;
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/editrole',
                                    data: comitData,
                                    callback: function (code, message, response) {
                                        console.log("aaaaaaaaa", response.data)
                                        _this.m_role.dialogVisible = false;
                                        if (response.data.num > 0) {
                                            _this.$message({
                                                message: '数据保存成功！'
                                            });
                                        }else{
                                            _this.$message({
                                                message: '数据保存失败！'
                                            });
                                        }
                                        _this.queryMainGridFn();
                                    }
                                });
                            }
                        }
                    });
                },
                //取消
                cancelFn: function () {
                    var _this = this;
                    _this.m_role.dialogVisible = false;
                    _this.$refs['roletable'].clearSelection();
                },
                //修改 
                modifyFn: function () {
                    if (this.$refs.roletable.selections.length != 1) {
                        this.$message({
                            message: '请选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    if (this.$refs.roletable.selections[0].roleSts == 'A') {
                        this.$message({
                            message: '只能选择失效和待生效的数据',
                            type: 'warning'
                        });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        fox.extend(this.$refs.roleForm.formdata, this.$refs.roletable.selections[0]);
                    });
                },
                //查看
                infoFn: function (viewData) {
                    var _this = this;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function () {
                        _this.$refs['roleForm'].resetFields();
                        fox.clone(viewData, _this.$refs.roleForm.formdata);
                    });
                },
                //删除
                deleteFn: function () {
                    var _this = this;
                    if (this.$refs.roletable.selections.length > 0) {
                        var id = '';
                        for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                            var row = this.$refs.roletable.selections[i];
                            if (row.roleSts != 'A') {
                                id = id + ',' + row.roleId;
                            } else {
                                _this.$message({
                                    message: '只能删除待生效或失效的数据',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                        this.$confirm('此操作将删除该角色信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            fox.service.request({
                                method: 'POST',
                                url: backend.appOcaService + '/api/adminsmrole/deletebatch',
                                data: {
                                    ids: id
                                },
                                callback: function (code, message, response) {
                                    if (code == '0' && response.code == 0) {
                                        _this.$message({
                                            message: response.data.message
                                        });
                                        _this.queryMainGridFn();
                                    }
                                }
                            });
                        }).catch(function () {
                            return;
                        });
                    } else {
                        _this.$message({
                            message: '请先选择要删除的数据',
                            type: 'warning'
                        });
                        return;
                    }
                },
                //启用
                useFn: function () {
                    var _this = this;
                    if (this.$refs.roletable.selections.length > 0) {
                        var id = '';
                        var userId = fox.localsession.getUserInfo().userId;
                        for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                            var row = this.$refs.roletable.selections[i];
                            if (row.roleSts === 'W' || row.roleSts === 'I') {
                                id = id + ',' + row.roleId;
                            } else {
                                _this.$message({
                                    message: '只能选择失效或待生效的数据',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                        this.$confirm('此操作将启用该角色, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            yufp.service.request({
                                method: 'POST',
                                url: backend.appOcaService + '/api/adminsmrole/usebatch',
                                data: {
                                    id: id,
                                    userId: userId
                                },
                                callback: function (code, message, response) {
                                    _this.$message({
                                        message: response.data
                                    });
                                    _this.queryMainGridFn();
                                }
                            });
                        });
                    } else {
                        this.$message({
                            message: '请先选择要生效的数据',
                            type: 'warning'
                        });
                        return;
                    }
                },
                //停用
                unUseFn: function () {
                    var _this = this;
                    var userId = fox.localsession.getUserInfo().userId;
                    if (this.$refs.roletable.selections.length > 0) {
                        var id = '';
                        for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                            var row = this.$refs.roletable.selections[i];
                            if (row.roleSts === 'A') {
                                id = id + ',' + row.roleId;
                            } else {
                                this.$message({
                                    message: '只能选择生效的数据',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                        this.$confirm('此操作将停用该角色, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            yufp.service.request({
                                method: 'POST',
                                url: backend.appOcaService + '/api/adminsmrole/unusebatch',
                                data: {
                                    id: id,
                                    userId: userId
                                },
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        _this.$message({
                                            message: response.data.message
                                        });
                                        _this.queryMainGridFn();
                                    }
                                }
                            });
                        });
                    } else {
                        this.$message({
                            message: '请先选择要停用的数据',
                            type: 'warning'
                        });
                        return;
                    }
                },
                // //角色用户
                openRoleUserFn: function () {
                    if (this.$refs.roletable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    this.m_role.dialogGridVisible = true;
                    this.queryUserGridFn();
                },
                queryUserGridFn: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        var param = {
                            condition: JSON.stringify({
                                loginCode: _this.$refs.userQuery.formdata.loginCode ? _this.$refs.userQuery.formdata.loginCode : null,
                                userName: _this.$refs.userQuery.formdata.userName ? _this.$refs.userQuery.formdata.userName : null,
                                userCode: _this.$refs.userQuery.formdata.userCode ? _this.$refs.userQuery.formdata.userCode : null,
                                userSts: _this.$refs.userQuery.formdata.userSts ? _this.$refs.userQuery.formdata.userSts : null,
                                roleId: _this.$refs.roletable.selections[0].roleId
                            })
                        };
                        _this.$refs.userTable.remoteData(param);
                    });
                },
                resetUserFn: function () {
                    _this.$refs.userQuery.resetFields();
                },
                //默认权限 
                openRoleAuthFn: function () {
                    if (this.$refs.roletable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    this.m_role.authDialogVisible = true;
                    this.queryUserAuthFn();
                    this.$nextTick(function () {
                        this.$refs.authAddTable.data = '';
                        this.$refs.demoSelector.selectedVal = '';
                    });
                },
                queryUserAuthFn: function () { // 查询默认权限
                    var _this = this;
                    this.$nextTick(function () {
                        var param = {
                            condition: JSON.stringify({
                                roleId: _this.$refs.roletable.selections[0].roleId ? _this.$refs.roletable.selections[0].roleId : null
                            })
                        };
                        _this.$refs.authTable.remoteData(param);
                    });
                },
                // 选择数据加入待确认列表
                selectFn: function (a, b) {
                    var authAddList = [];
                    authAddList.push({
                        authTmplName: b.authTmplName,
                        sqlString: b.sqlString,
                        lastChgUsr: b.lastChgUsr,
                        lastChgDt: b.lastChgDt
                    });
                    this.$refs.authAddTable.data = authAddList;
                },
                saveUserAuth: function () { // 保存、修改默认权限
                    if (this.yourVal == '') {
                        this.$message({
                            message: '请先选择权限模板！',
                            type: 'warning'
                        });
                        return;
                    }
                    var _this = this;
                    var length = this.$refs.authTable.tabledata.length;
                    var params = {
                        sysId: fox.localsession.getUserInfo().sysId, // 逻辑系统id
                        lastChgUsr: fox.localsession.getUserInfo().userId, // 用户id
                        authobjId: this.$refs.roletable.selections[0].roleId, // 角色id
                        authresId: this.yourVal // 模板id
                    };
                    if (length > 0) {
                        _this.$confirm('此操作将使待确认模板替换默认模板,是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            fox.service.request({
                                method: 'POST',
                                url: backend.appOcaService + '/api/adminsmrole/updateroleauth',
                                data: {
                                    authId: _this.$refs.authTable.tabledata[0].authId,
                                    userId: fox.localsession.getUserInfo().userId, // 用户id
                                    authTmplId: _this.yourVal // 模板id
                                },
                                callback: function (code, message, response) {
                                    _this.$message({
                                        message: '默认权限设置修改成功！'
                                    });
                                    _this.m_role.authDialogVisible = false;
                                    _this.$refs.authAddTable.data = '';
                                    _this.$refs.demoSelector.selectedVal = '';
                                    _this.queryMainGridFn();
                                }
                            });
                        }).catch(function () {
                            return;
                        });
                    } else {
                        fox.service.request({
                            method: 'POST',
                            url: backend.appOcaService + '/api/adminsmrole/saveroleauth',
                            data: params,
                            callback: function (code, message, response) {
                                _this.$message({
                                    message: '默认权限设置新增成功！'
                                });
                                _this.m_role.authDialogVisible = false;
                                _this.$refs.authAddTable.data = '';
                                _this.$refs.demoSelector.selectedVal = '';
                                _this.queryMainGridFn();
                            }
                        });
                    }
                },
                // 取消选择
                selectCancel: function () {
                    this.$refs.authAddTable.data = '';
                    this.$refs.demoSelector.selectedVal = '';
                },
                cleanAuthFn: function () {
                    var _this = this;
                    debugger;
                    _this.$confirm('此操作将清除默认权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function () {
                        fox.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmrole/cleanroleauth',
                            data: {
                                authId: _this.$refs.authTable.tabledata[0].authId
                            },
                            callback: function (code, message, response) {
                                _this.m_role.authDialogVisible = false;
                                _this.queryUserAuthFn();
                                _this.$message({
                                    message: '默认权限设置修改成功！'
                                });
                            }
                        });
                    });
                },
                // 默认权限 end
                switchStatus: function (viewType, editable) {
                    var _this = this;
                    _this.m_role.viewType = viewType;
                    _this.m_role.saveBtnShow = editable;
                    _this.m_role.dialogVisible = true;
                    _this.m_role.formDisabled = !editable;
                    _this.m_role.hiddenItem = editable; //隐藏字段
                },
            },
            mounted: function () {
                this.queryBusMod();
            }
        });
    };

    //消息处理
    exports.onmessage = function (type, message) {


    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});