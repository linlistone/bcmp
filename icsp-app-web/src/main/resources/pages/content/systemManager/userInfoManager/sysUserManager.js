/**
 * @Created by 林立 20190706
 * @updated by  蒋信志 20190716
 * @description {{pageDesc}}
 */
define(function (require, exports) {

    //page加载完成后调用ready方法
    exports.ready = function (code, data, cite) {
        //vue data
        let vmData = {
            /**按钮区域定义*/
            m_btn: {
                createButton: true, // 新增按钮控制
                editButton: true, // 修改按钮控制
                deleteButton: true, // 删除按钮控制
                useButton: true, // 启用按钮控制
                unuseButton: true, // 停用按钮控制
                userRelButton: true, //用户关联信息按钮控制
                resetPwsButton: true, //重置密码按钮控制
            },
            /**表格区域定义*/
            m_table: {
                roleTableData: [], //选中关联用户数据
                dutyTableData: [], //选中关联岗位数据
            },
            m_pwd: {
                dialogVisible: false,
            },
            m_dialog: {},
            funcForm: {
                password: '',
                confirmPwd: '',
            },
            //机构树
            m_orgTree: {
                //机构树请求URL
                orgTreeUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
                //机构树请求参数
                orgTreeParam: {},
                //授权机构树请求参数
                orgAuthTreeParam: {},
                //权构树高度
                orgHeight: window.screen.availHeight,
                //机构树加载方式
                orgAsync: false,
                // 当前选中节点数据
                nowNode: null,
                superOrgId: backend.superOrgId,
            },
            //查询URL
            m_userTable: {
                searchform: {},
                //根据机构号查询用户服务
                userDataUrl: backend.appOcaService + `/api/adminsmuser/querypage`,
                //根据机构号查询角色服务
                roleDataUrl: backend.appOcaService + `/api/adminsmuser/querybyrolests`,
                //根据机构号查询岗位服务
                dutyDataUrl: backend.appOcaService + `/api/adminsmuser/querybyduty`,

            },
            /**用户信息表单域定义*/
            m_user: {
                uploadAction: yufp.service.getUrl({
                    url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()
                }),
                orgId: null,
                dptId: null,
                formdata: {},
                viewType: 'DETAIL',
                viewTitle: fox.lookup.find('CRUD_TYPE', false),
                dialogVisible: false,
                formDisabled: false,
                saveBtnShow: true,
                hiddenItem: true,
                activeNames: ['1'],
                imageUrl: '',
                stsOptions: {},
                userForm: {},
                userInfo: {},
                userOtherInfo: {},
                dptParams: {
                    dataUrl: backend.appOcaService + '/api/util/getdpt',
                    dataId: 'orgCode',
                    needCheckbox: false
                },
            },
            /**用户信息关联表单域定义*/
            m_role: {
                dialogVisible: false,
                saveBtnShow: true,
                activeName: 'role'
            },
            //表单规则
            m_rules: {
                //姓名规则
                userName: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
                //登录代码规则
                loginCode: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
                //密码规则
                userPassword: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
                //确认密码规则
                userPassword1: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
                //重置密码规则
                password: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
                //重置确认密码规则
                confirmPwd: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    }
                ],
            },
            roleOrg: '', //用户角色的输入的机构号
            orgTableData: [], //机构数据
            rowId: '', //机构监听id
            temporary: [], //用户角色临时数据
            // roleInfos: [],
        }
        // fox.lookup.reg('DATA_STS,SEX_TYPE,IDENT_TYPE,HIGHEST_EDU,RANK_LEVEL');
        //创建vue model
        const vm = new Vue({
            el: '#userInfo',
            //数据
            data: vmData,
            //计算属性
            computed: {},
            watch: {
                //监听向父组件传model值
                rowId: function (n, o) {
                    var _this = this;
                    // console.log('aaaaaa',_this.$refs['refRoleTable'].store.states.selection)
                    let selections = _this.$refs['refRoleTable'].selections;
                    let userId = _this.$refs['refTable'].selections[0].userId;
                    var lastChgUsr = fox.localsession.getUserInfo().userId;
                    if (o == null || o == '') {
                        o = n;
                    } else {
                        //删除缓存中该机构的数据
                        if (vm.temporary.length > 0) {
                            for (var a = 0; a < vm.temporary.length; a++) {
                                if (vm.temporary[a].orgId == o) {
                                    vm.temporary.splice(a, 1);
                                    a--;
                                }
                            }
                        }
                        //重新添加该机构相关角色数据
                        for (var i = 0; i < selections.length; i++) {
                            var data = {
                                orgId: o,
                                userId: userId,
                                lastChgUsr: lastChgUsr,
                                roleId: selections[i].roleId
                            };
                            vm.temporary.push(data);
                        }
                    }

                }
            },
            //方法
            methods: {
                //添加机构
                addOrg: function () {
                    let _this = this;
                    if (_this.roleOrg == null || _this.roleOrg == '') {
                        vm.$message({
                            message: '请输入机构号',
                            type: 'warning'
                        });
                    } else {
                        var id = _this.roleOrg;
                        if (_this.roleOrg != null) {
                            fox.service.request({
                                method: 'GET',
                                name: backend.appOcaService + `/api/adminsmorg/` + id,
                                callback: function (code, message, response) {
                                    if (response.data != null) {
                                        vm.orgTableData.push(response.data)
                                        vm.roleOrg = '';
                                    } else {
                                        vm.$message({
                                            message: '机构不存在',
                                            type: 'warning'
                                        });
                                    }
                                }
                            })
                        } else {
                            vm.$message({
                                message: '请输入机构号',
                                type: 'warning'
                            });
                        }
                    }
                },
                //删除机构
                delOrg: function () {
                    let _this = this;
                    var orgSelection = _this.$refs.refOrgRoleTable.selections;
                    if (orgSelection.length > 0) {
                        _this.$confirm('此操作将删除所选机构, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            if (orgSelection.length > 0) {
                                for (var i in vm.orgTableData) {
                                    for (var j in orgSelection) {
                                        if (orgSelection[j].orgId == vm.orgTableData[i].orgId) {
                                            vm.orgTableData.splice(i, 1);
                                            //删除缓存数据
                                            for (var k in vm.temporary) {
                                                if (vm.temporary[k].orgId == orgSelection[j].orgId) {
                                                    vm.temporary.splice(k, 1);
                                                }
                                            }
                                            vm.m_table.roleTableData.clearData();
                                        }
                                    }
                                }
                            }

                        }).catch(function () {
                            return;
                        });
                    } else {
                        _this.$message({
                            message: '请先选择要删除的机构',
                            type: 'warning'
                        });
                        return;
                    }
                    _this.$refs.refOrgRoleTable.clearSelection();
                },
                //根据机构查询角色
                queryRoleByOrg(row) {
                    let _this = this;
                    _this.rowId = row.orgId;
                    var tab = {
                        name: 'role'
                    };
                    _this.$nextTick(function () {
                        _this.queryRoleInfo(row.orgId);
                        _this.$refs['refRoleTable'].clearSelection();
                        _this.handleClick(tab);
                    });
                },
                handleAvatarSuccess: function (res, file) {
                    var url = fox.settings.ssl ? 'https://' : 'http://';
                    url += fox.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + res.data.filePath;
                    this.m_user.userForm.userAvatar = res.data.filePath;
                    this.m_user.imageUrl = fox.util.addTokenInfo(url);
                },
                beforeAvatarUpload: function (file) {
                    var _this = this;
                    if (!_this.$refs.userForm.formdata.userName) {
                        _this.$message({
                            message: '请先输入用户名',
                            type: 'warning'
                        });
                        return false;
                    }
                    var type = file.type;
                    var size = file.size / 1024 / 1024;
                    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg') {
                        this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (size > 2) {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return type && size;
                },
                //授权树点击事件 不作任何处理
                authTreeNodeClickFn: function (nodeData, node, self) {},
                //树点击事件
                nodeClickFn: function (nodeData, node, self) {
                    var _this = this;
                    _this.m_orgTree.nowNode = nodeData;
                    //设置查询的机构
                    _this.m_userTable.searchform.orgId = nodeData.orgId;
                    var condition = {
                        condition: {
                            orgId: nodeData.orgId
                        }
                    };
                    //查询用户数据
                    _this.$refs['refTable'].remoteData(condition);
                },
                //所属机构选择，变更部门树数据
                selectFn: function (code, data, arry) {
                    var _this = this;
                    var temp = yufp.clone(_this.m_user.dptParams);
                    temp.dataParams = {
                        orgId: code.orgId,
                        orgCode: code.orgId
                    };
                    _this.$refs['dptTree'].params = fox.clone(temp);
                },
                /**
                 * 用户基本控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _this = this;
                    _this.m_user.viewType = viewType;
                    _this.m_user.saveBtnShow = editable;
                    _this.m_user.dialogVisible = true;
                    _this.m_user.formDisabled = !editable;
                    _this.m_user.hiddenItem = editable; //隐藏字段
                    _this.m_user.imageUrl = '';
                    _this.m_user.userForm.userAvatar = null;

                },
                /**
                 * 用户基本取消
                 */
                cancelFn: function () {
                    var _this = this;
                    this.$refs.userForm.resetFields();
                    this.$refs.userInfo.resetFields();
                    this.$refs.userOtherInfo.resetFields();
                    _this.m_user.dialogVisible = false;
                    _this.$refs['refTable'].clearSelection();
                },
                /**
                 * 用户基本新增按钮
                 */
                addFn: function () {
                    var _this = this;
                    _this.switchStatus('ADD', true);
                    _this.m_user.activeName = ['1'];
                    _this.$nextTick(function () {
                        _this.$refs.userForm.resetFields();
                        _this.$refs.userInfo.resetFields();
                        _this.$refs.userOtherInfo.resetFields();
                        _this.m_user.userForm.userSts = 'A';
                        _this.m_user.userInfo.lastChgUsr = yufp.session.userId;
                        if (_this.m_orgTree.nowNode != null) {
                            _this.m_user.orgId = _this.m_orgTree.nowNode.orgId;
                        } else {
                            _this.m_user.orgId = yufp.session.org.code;
                        }
                        // 初始化部门树
                        var temp = yufp.clone(_this.m_user.dptParams);
                        if (_this.m_orgTree.nowNode == null) {
                            temp.dataParams = {
                                orgId: yufp.session.org.code,
                                orgCode: yufp.session.org.code
                            };
                        } else {
                            temp.dataParams = {
                                orgId: _this.m_orgTree.nowNode.orgId,
                                orgCode: _this.m_orgTree.nowNode.orgId
                            };
                        }
                        _this.$refs['dptTree'].params = fox.clone(temp);
                    });
                },
                /**
                 * 用户基本修改
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
                    rowData = _this.$refs['refTable'].selections[0];
                    var url = fox.settings.ssl ? 'https://' : 'http://';
                    url += fox.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + rowData.userAvatar;
                    _this.switchStatus('EDIT', false);
                    _this.$nextTick(function () {
                        _this.$refs['userForm'].resetFields();
                        _this.$refs['userInfo'].resetFields();
                        _this.$refs['userOtherInfo'].resetFields();
                        //fox.clone(viewData, _this.m_user.formdata);
                        // fox.extend(_this.$refs['userForm'].formdata, rowData);
                        // fox.extend(_this.$refs['userInfo'].formdata, rowData);
                        // fox.extend(_this.$refs['userOtherInfo'].formdata, rowData);
                        _this.extendUserInfo(_this.$refs['userForm'].formdata, rowData);
                        _this.extendUserInfo(_this.$refs['userInfo'].formdata, rowData);
                        _this.extendUserInfo(_this.$refs['userOtherInfo'].formdata, rowData);

                        if (rowData.userAvatar) {
                            _this.m_user.userForm.userAvatar = rowData.userAvatar;
                            _this.m_user.imageUrl = fox.util.addTokenInfo(url);
                        }
                    });
                },
                /**
                 * 用户基本详情
                 */
                infoFn: function (rowData) {
                    var _this = this;
                    var url = fox.settings.ssl ? 'https://' : 'http://';
                    url += fox.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + rowData.userAvatar;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function () {
                        _this.$refs['userForm'].resetFields();
                        _this.$refs['userInfo'].resetFields();
                        _this.$refs['userOtherInfo'].resetFields();
                        //fox.clone(viewData, _this.m_user.formdata);
                        _this.extendUserInfo(_this.$refs['userForm'].formdata, rowData);
                        _this.extendUserInfo(_this.$refs['userInfo'].formdata, rowData);
                        _this.extendUserInfo(_this.$refs['userOtherInfo'].formdata, rowData);
                        // yufp.extend(_this.$refs['userForm'].formdata, rowData);
                        // yufp.extend(_this.$refs['userInfo'].formdata, rowData);
                        // yufp.extend(_this.$refs['userOtherInfo'].formdata, rowData);
                        _this.m_user.orgId = rowData.orgId;
                        _this.m_user.dptId = rowData.dptId;
                        if (rowData.userAvatar) {
                            _this.m_user.userForm.userAvatar = rowData.userAvatar;
                            _this.m_user.imageUrl = fox.util.addTokenInfo(url);
                        }
                    });
                },
                //只克隆form表单存在的字段
                extendUserInfo: function (destData, srcData) {
                    for (var key in destData) {
                        if (srcData[key])
                            destData[key] = srcData[key];
                    }
                },
                // 弹出框按钮提交事件
                submitFn: function () {
                    var _this = this;
                    if (_this.m_user.viewType == 'ADD') {
                        //走添加接口
                        this.insertFn();
                    } else {
                        //走修改接口
                        this.updateFn();
                    }
                },
                /**
                 * 添加
                 */
                insertFn: function () {
                    var _this = this;
                    var userForm = _this.$refs.userForm;
                    var userInfo = _this.$refs.userInfo;
                    var userOtherInfo = _this.$refs.userOtherInfo;
                    var formValid = true;
                    var infoValid = true;
                    var otherInfoValid = true;
                    userForm.validate(function (valid) {
                        formValid = valid;
                    });
                    userInfo.validate(function (valid) {
                        infoValid = valid;
                    });
                    userOtherInfo.validate(function (valid) {
                        otherInfoValid = valid;
                    });
                    if (!formValid || !infoValid || !otherInfoValid) {
                        return;
                    }
                    var comitData = {};
                    delete _this.m_user.userInfo.userId;
                    if (_this.m_user.userInfo.userPassword !== _this.m_user.userInfo.userPassword1) {
                        _this.$message({
                            message: '确认密码和密码不一致',
                            type: 'warning'
                        });
                        return false;
                    }
                    fox.extend(comitData, _this.$refs.userForm.formdata);
                    fox.extend(comitData, _this.$refs.userInfo.formdata);
                    fox.extend(comitData, _this.$refs.userOtherInfo.formdata);
                    if (comitData.userId) {
                        delete comitData.userId;
                    }
                    comitData.orgId = _this.m_user.orgId;
                    comitData.dptTree = _this.m_user.dptTree;
                    comitData.lastChgUsr = fox.session.userId;
                    var encodePwd = this.encodePassword(_this.m_user.userInfo.userPassword);
                    debugger;
                    // 向后台发送保存请求
                    comitData.lastChgUsr = fox.localsession.getUserInfo().userId;
                    fox.service.request({
                        url: backend.uaaService + '/api/passwordcheck/checkpwd',
                        method: 'POST',
                        data: {
                            sysId: yufp.session.logicSys.id,
                            pwd: encodePwd,
                            userId: '',
                            passwordType: '2'
                        },
                        callback: function (code, message, response) {
                            if (response.code === '1001') {
                                comitData.userPassword = encodePwd;
                                delete comitData.userPassword1;
                                fox.service.request({
                                    method: 'POST',
                                    data: comitData,
                                    url: backend.appOcaService + `/api/adminsmuser/adduserinfo`,
                                    callback: function (code, message, response) {
                                        if (code === 0) {
                                            if (response.data.code == 2) {
                                                _this.$message({
                                                    message: response.data.message,
                                                    type: 'warning'
                                                });
                                            } else {
                                                _this.$message('数据保存成功!');
                                                _this.m_user.dialogVisible = false;
                                                //重新查询，刷新列表数据
                                                _this.$refs['refTable'].remoteData();
                                            }
                                        } else {
                                            _this.$alert('服务端请求失败!\n' + message, '提示', {
                                                confirmButtonText: '确定',
                                                callback: function () {}
                                            });
                                        }
                                    }
                                });
                            } else {
                                _this.$message({
                                    message: message.message,
                                    type: 'warning'
                                });
                                return false;
                            }
                        }
                    });
                },
                //修改提交
                updateFn: function () {
                    var _this = this;
                    var model = {};
                    fox.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refUserForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    model.orgId = _this.m_user.orgId;
                    model.dptTree = _this.m_user.dptTree;
                    fox.service.request({
                        method: 'POST',
                        data: model,
                        url: backend.appOcaService + `/api/adminsminstu/update`,
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
                                    //隐藏弹出框 
                                    _this.m_user.dialogVisible = false;
                                    //重新查询，刷新列表数据
                                    _this.$refs['refTable'].remoteData();
                                }
                            } else {
                                vm.$alert('服务端请求失败!', '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },

                //启用按钮
                useBatchFn() {
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
                        if (row.userSts !== 'A') {
                            id = id + ',' + row.userId;
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
                        //调用启用提交服务
                        vm.useTableData(id);
                    }).catch(function () {});
                },
                // 启用提交
                useTableData: function (id) {
                    var lastChgUsr = fox.localsession.getUserInfo().userId
                    fox.service.request({
                        type: 'POST',
                        data: {
                            id: id,
                            userId: lastChgUsr
                        },
                        name: backend.appOcaService + `/api/adminsmuser/usebatch?id=${id}&userId=${lastChgUsr}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: response.message
                                });
                                _this.$refs['refTable'].remoteData();
                            } else {
                                vm.$alert("删除失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                //停用按钮
                unUseBatchFn() {
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
                        if (row.userSts === 'A') {
                            id = id + ',' + row.userId;
                        } else {
                            this.$message({
                                message: '只能选择已生效的数据',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.$confirm('确定要停用该数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        //调用停用提交服务
                        vm.unUseTableData(id);
                    }).catch(function () {});
                },
                // 停用提交
                unUseTableData: function (id) {
                    var lastChgUsr = fox.localsession.getUserInfo().userId
                    fox.service.request({
                        type: 'POST',
                        data: {
                            id: id,
                            userId: lastChgUsr
                        },
                        name: backend.appOcaService + `/api/adminsmuser/unusebatch?id=${id}&userId=${lastChgUsr}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: response.message
                                });
                                _this.$refs['refTable'].remoteData();
                            } else {
                                vm.$alert("删除失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                //用户关联信息按钮
                openRoleFn() {
                    let _this = this;
                    _this.orgTableData = [];
                    _this.temporary = [];
                    let selections = this.$refs['refTable'].selections;
                    if (selections.length == 0) {
                        vm.$message({
                            message: '请选择一条数据!',
                            type: 'warning'
                        });
                        return false;
                    }
                    //先要让弹出框背弹出来，之后refs才能取到对象 
                    vmData.m_role.dialogVisible = true; //
                    let orgId = selections[0].orgId;
                    let userId = selections[0].userId;
                    var treeCondition = {
                        "orgCode": orgId,
                        "orgSts": 'A',
                    }

                    _this.orgAuthTreeParam = treeCondition;
                    if(_this.m_table.roleTableData.length>0){
                        _this.$refs.refRoleTable.clearData();
                    }

                    _this.$nextTick(function () {
                        _this.saveRoleInfo(userId);
                        //查询机构
                        _this.queryOrgInfo(userId);
                        //查询角色数据
                        // _this.queryRoleInfo(orgId);
                        //查岗位数据
                        _this.queryDutyInfo(orgId);
                        //查询授权机构树
                        _this.$refs['refAuthTree'].remoteData(treeCondition);
                        //默认显示用户角色信息
                        _this.m_role.activeName = 'role';
                        // var tab = {
                        //     name: 'role'
                        // };
                        // _this.handleClick(tab);
                    });


                },
                //保存修改之前的角色数据
                saveRoleInfo: function (userId) {
                    var conditions = {
                        "paramId": userId
                    };
                    var condition = JSON.stringify(conditions)
                    var param = {
                        condition,
                        page: 1,
                        size: 10000
                    };
                    fox.service.request({
                        type: 'GET',
                        data: param,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        name: backend.appOcaService + '/api/adminsmuser/queryuserrole',
                        callback: function (code, message, response) {
                            var infos = response.data;
                            for (var i in infos) {
                                var data = {
                                    orgId: infos[i].orgId,
                                    userId: userId,
                                    lastChgUsr: userId,
                                    roleId: infos[i].roleId
                                };
                                vm.temporary.push(data);
                            }
                        }
                    });
                },
                //用户关联信息
                handleClick: function (tab) {
                    var _this = this;
                    let selections = _this.$refs['refTable'].selections;
                    let userId = selections[0].userId;
                    var conditions = {
                        "paramId": userId
                    };
                    var condition = JSON.stringify(conditions)
                    var param = {
                        condition,
                        page: 1,
                        size: 10000
                    };
                    // console.log(tab.name)
                    if (tab.name === 'role') {
                        fox.service.request({
                            type: 'GET',
                            data: param,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            name: backend.appOcaService + '/api/adminsmuser/queryuserrole',
                            callback: function (code, message, response) {
                                // var infos = response.data;
                                var infos = vm.temporary;
                                for (var i in vm.m_table.roleTableData) {
                                    for (var j in infos) {
                                        if (vm.m_table.roleTableData[i].roleId == infos[j].roleId) {
                                            vm.$refs.refRoleTable.toggleRowSelection(vm.m_table.roleTableData[i], true)
                                        }
                                    }
                                }
                            }
                        });
                    } else if (tab.name === 'duty') {
                        fox.service.request({
                            type: 'GET',
                            data: param,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            name: backend.appOcaService + '/api/adminsmuser/queryuserduty',
                            callback: function (code, message, response) {
                                var infos = response.data;
                                for (var i in vm.m_table.dutyTableData) {
                                    for (var j in infos) {
                                        if (vm.m_table.dutyTableData[i].dutyId == infos[j].dutyId) {
                                            vm.$refs.refDutyTable.toggleRowSelection(vm.m_table.dutyTableData[i], true)
                                        }
                                    }
                                }
                            }
                        });
                    } else if (tab.name === 'auth') {
                        fox.service.request({
                            type: 'GET',
                            data: param,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            name: backend.appOcaService + '/api/adminsmuser/queryuserorg',
                            callback: function (code, message, response) {
                                var infos = response.data;
                                var keys = [];
                                for (var i = 0; i < infos.length; i++) {
                                    keys.push(infos[i].orgId);
                                }
                                vm.$refs.refAuthTree.setCheckedKeys(keys, true);
                                for (var i in vm.m_table.dutyTableData) {
                                    for (var j in infos) {
                                        if (vm.m_table.dutyTableData[i].dutyId == infos[j].dutyId) {
                                            vm.$refs.dutyTable.toggleRowSelection(vm.m_table.dutyTableData[i], true)
                                        }
                                    }
                                }
                            }
                        });
                    }
                },
                //搜索用户角色信息信息树数据
                queryRoleInfo: function (orgId) {
                    var reqData = {
                        "orgId": orgId
                    }
                    fox.service.request({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: reqData,
                        name: backend.appOcaService + '/api/adminsmuser/queryRoleByOrg',
                        callback: function (code, message, data) {
                            // debugger;
                            if (code === 0) {
                                vmData.m_table.roleTableData = data.data;

                                // for (var i in vm.m_table.roleTableData) {
                                //     for (var j in vm.temporary) {
                                //         if (vm.m_table.roleTableData[i].roleId == vm.temporary[j].roleId) {
                                //             vm.$refs.refRoleTable.toggleRowSelection(vm.m_table.roleTableData[i], true)
                                //         }
                                //     }
                                // }

                                // vm.m_table.m_total = data.total;
                            } else {
                                vm.$alert('服务端请求失败!', '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                //搜索用户角色信息信息树数据
                queryOrgInfo: function (userId) {
                    var reqData = {
                        "userId": userId
                    }
                    fox.service.request({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: reqData,
                        name: backend.appOcaService + '/api/adminsmuser/queryOrgInfo',
                        callback: function (code, message, data) {
                            // debugger;
                            if (code === 0) {
                                vmData.orgTableData = data.data;
                                // vm.m_table.m_total = data.total;
                            } else {
                                vm.$alert('服务端请求失败!', '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                //搜索用户岗位信息信息树数据
                queryDutyInfo: function (orgId) {
                    var reqData = {
                        "orgId": orgId
                    }
                    fox.service.request({
                        id: "queryFuncInfoList",
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: reqData,
                        name: backend.appOcaService + '/api/adminsmuser/querybyduty',
                        callback: function (code, message, response) {
                            // debugger;
                            if (code === 0) {
                                vmData.m_table.dutyTableData = response.data;
                                // vm.m_table.m_total = data.total;
                            } else {
                                vm.$alert('服务端请求失败!', '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                //保存(角色)
                saveRoleFn() {
                    var _this = this;
                    let selections = _this.$refs.refRoleTable.selections;
                    let userId = _this.$refs['refTable'].selections[0].userId;
                    var lastChgUsr = fox.localsession.getUserInfo().userId;
                    if (_this.$refs.refOrgRoleTable.selections.length > 0) {
                        let orgRoleId = _this.$refs.refOrgRoleTable.selections[0].orgId;
                        //删除缓存中该机构的数据
                        if (vm.temporary.length > 0) {
                            for (var a = 0; a < vm.temporary.length; a++) {
                                if (vm.temporary[a].orgId == orgRoleId) {
                                    vm.temporary.splice(a, 1);
                                    a--;
                                }
                            }
                        }
                        //重新添加该机构相关角色数据
                        for (var b = 0; b < selections.length; b++) {
                            var data = {
                                orgId: orgRoleId,
                                userId: userId,
                                lastChgUsr: lastChgUsr,
                                roleId: selections[b].roleId
                            };
                            vm.temporary.push(data);
                        }
                    }
                    // var commit = [];
                    // for (var i = 0; i < selections.length; i++) {
                    //     var data = {
                    //         userId: userId,
                    //         lastChgUsr: lastChgUsr,
                    //         roleId: selections[i].roleId
                    //     };
                    //     commit.push(data);
                    // }
                    fox.service.request({
                        type: 'POST',
                        name: backend.appOcaService + '/api/adminsmuser/saverole/' + userId,
                        data: JSON.stringify(vm.temporary),
                        callback: function (code, message, response) {
                            _this.$message({
                                message: '数据操作成功！'
                            });
                        }
                    });
                    vmData.m_role.dialogVisible = false;
                    vm.$refs['refTable'].clearSelection();
                },
                //保存(岗位)
                saveDutyFn() {
                    var _this = this;
                    let selections = this.$refs.refDutyTable.selections;
                    let userId = _this.$refs['refTable'].selections[0].userId;
                    var lastChgUsr = fox.localsession.getUserInfo().userId
                    var commit = [];
                    for (var i = 0; i < selections.length; i++) {
                        var data = {
                            userId: userId,
                            lastChgUsr: lastChgUsr,
                            dutyId: selections[i].dutyId
                        };
                        commit.push(data);
                    }
                    fox.service.request({
                        type: 'POST',
                        name: backend.appOcaService + '/api/adminsmuser/savepost/' + userId,
                        data: JSON.stringify(commit),
                        callback: function (code, message, response) {
                            _this.$message({
                                message: '数据操作成功！'
                            });
                        }
                    });
                    vmData.m_role.dialogVisible = false;
                    em.$refs['refTable'].clearSelection();
                },
                //保存(机构)
                saveOrgFn() {
                    var em = this;
                    var checks = em.$refs.refAuthTree.getCheckedKeys();
                    // console.log("aaaaaaa", checks)
                    var commit = [];
                    var userId = em.$refs['refTable'].selections[0].userId;
                    var lastChgUsr = fox.localsession.getUserInfo().userId
                    for (var i = 0; i < checks.length; i++) {
                        var data = {
                            userId: userId,
                            lastChgUsr: lastChgUsr,
                            orgId: checks[i]
                        };
                        commit.push(data);
                    }
                    fox.service.request({
                        type: 'POST',
                        contentType: "application/json;charset=UTF-8",
                        name: backend.appOcaService + '/api/adminsmuser/saveorg/' + userId,
                        data: JSON.stringify(commit),
                        callback: function (code, message, response) {
                            em.$message({
                                message: '数据操作成功！'
                            });
                        }
                    });
                    vmData.m_role.dialogVisible = false;
                    em.$refs['refTable'].clearSelection();
                },
                //=============================

                /*****************************按钮触发事件****************************************/
                // 重置密码按钮
                resetPassword: function () {
                    let selections = this.$refs['refTable'].selections;
                    if (selections.length != 1) {
                        vm.$message({
                            message: '请选择一条数据!',
                            type: 'warning'
                        });
                        return false;
                    }
                    // vmData.m_dialog.isAddRole = false;
                    // vmData.m_dialog.resetPasswordVisible = true; //让 重置密码图层弹出来
                    vmData.m_pwd.dialogVisible = true;
                },
                cancelPwd: function () {
                    let _this = this;
                    vmData.m_pwd.dialogVisible = false;
                    _this.m_pwd = {};
                    _this.$refs['refTable'].clearSelection();
                },
                //确认重置密码
                resetPwd: function () {
                    debugger;
                    var userId = this.$refs['refTable'].selections[0].userId;
                    var reqData = this.m_pwd;
                    var password = reqData.password;
                    var comfirmPwd = reqData.confirmPwd;
                    if (password == null || password == '' || comfirmPwd == null || comfirmPwd == '') {
                        this.$message('请输入必填项!', '提示');
                        return;
                    }
                    if (password != comfirmPwd) {
                        this.$message('两次输入密码不一致!', '提示');
                        return;
                    }
                    var encodePwd = this.encodePassword(password);
                    var me = this;
                    fox.service.request({
                        name: backend.uaaService + '/api/passwordcheck/checkpwd', // 校验密码策略
                        type: 'POST',
                        contentType: "application/json; charset=UTF-8",
                        data: {
                            sysId: fox.localsession.getUserInfo().logicSys.id,
                            pwd: encodePwd,
                            userId: userId,
                            passwordType: '2'
                        },
                        callback: function (code, message, response) {
                            if (code == "1001" && response.code === '1001') {
                                fox.service.request({
                                    name: backend.appOcaService + '/api/adminsmuser/resetpwd',
                                    type: 'POST',
                                    contentType: "application/json; charset=UTF-8",
                                    data: JSON.stringify({
                                        userId: userId,
                                        password: encodePwd,
                                        updateUser: fox.localsession.getUserInfo().userId
                                    }),
                                    callback: function (code, message, response) {
                                        if (code === 0) {
                                            me.$message({
                                                message: '密码修改成功！'
                                            }, 'success');
                                            me.m_dialog.resetPasswordVisible = false;
                                        } else {
                                            me.$message({
                                                message: '密码修改失败！请重试',
                                                type: 'warning'
                                            });
                                            return;
                                        }
                                    }
                                });
                            } else {
                                me.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                                return false;
                            }
                        }
                    });
                    this.cancelPwd();
                },
                // 登录密码加密
                encodePassword: function (pwd) {
                    var encrypt = new window.JSEncrypt();
                    encrypt.setPublicKey(fox.settings.RSAPublicKey);
                    var encryptPwd = encrypt.encrypt(pwd);
                    // var encodePwd = encodeURIComponent(encryptPwd);
                    return encryptPwd;
                },
                // //密码加密
                // encodePassword: function (pwd) {
                //     var encrypt = new window.JSEncrypt();
                //     encrypt.setPublicKey(fox.utils.prototype.getRSAPublicKey());
                //     return encrypt.encrypt(pwd);
                // },

            },
            //加载后处理
            mounted: function () {
                var _this = this;
                fox.lookup.bind('DATA_STS', function (data) {
                    _this.m_user.stsOptions = data;
                });
            }
        });
    };


    //消息处理
    exports.onmessage = function (type, message, cite) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }


    /**************父子关系数据与树结构数据转换**********************/
    function formatData(arr) {
        var returnArr = [];
        for (var key in arr) {
            var obj = {
                orgName: arr[key].orgName, //机构名称
                orgCode: arr[key].orgCode, //机构代码
                upOrgId: arr[key].upOrgId, //上级机构
                instuId: arr[key].instuId, //金融机构
                orgLevel: arr[key].orgLevel, //机构层级
            }
            returnArr.push(obj);
        }
        return returnArr;
    }

    function formatDptData(arr) {
        var returnArr = [];
        for (var key in arr) {
            var obj = {
                // orgName: arr[key].orgName,//机构名称
                // orgCode: arr[key].orgCode,//机构代码
                // upOrgId: arr[key].upOrgId,//上级机构
                // instuId: arr[key].instuId,//金融机构
                // orgLevel: arr[key].orgLevel,//机构层级
                dptName: arr[key].orgName, //部门名称
                dptCde: arr[key].orgCode, //部门代码
                // belongOrgId: arr[key].belongOrgId,//所属机构
            }
            returnArr.push(obj);
        }
        return returnArr;
    }
    /**
     * 转换数据
     */
    function toTree(root, dataList) {
        for (var i = 0; i < root.length; i++) {
            for (var j = 0; j < dataList.length; j++) {
                if (dataList[j].upOrgId == root[i].orgCode) {
                    root[i].children.push(dataList[j]);
                    dataList.splice(j, 1);
                    toTree(root[i].children, dataList);
                    j--;
                }
            }
        }

    }

});