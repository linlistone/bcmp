/**
 * @Created by 林立 20190906
 * @updated by
 * @description {{pageDesc}}
 */
define(function (require, exports) {

    //page加载完成后调用ready方法
    exports.ready = function (code, data, cite) {

        //vue data
        let vmData = {
            /** 网点树区域定义 */
            m_tree: {
                orgTreeProps: {
                    id: 'orgCode',
                    label: 'orgName',
                    children: 'children'
                },
                superOrgId: backend.superOrgId,
                orgTreeData: [], //机构树
                orgTreeCurrentData: '', //选中的条目
                orgTreeCurrentNode: '', //选中的树形Node
                orgName: '', //所属机构
                upOrgName: '', //所属上级机构
                orgHeight: window.screen.availHeight,
                orgTreeUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
                orgAsync: false,
                //机构树请求参数
                orgTreeParam: {},
            },
            m_linkage: {
                options: [{}],
                selectedOptions: [],
            },
            /**查询条件区域定义*/
            m_query: {
                dptCde: '', //部门代码
                dptName: '', //部门名称
                dptSts: '', //状态
                // belongOrgId:fox.localsession.org.id//所属机构id
                belongOrgId: "" //所属机构id
            },
            //按钮控制
            m_btn: {
                createButton: true, // 新增按钮控制
                editButton: true, // 修改按钮控制
                deleteButton: true, // 删除按钮控制
                useButton: true, // 启用按钮控制
                unuseButton: true, // 停用按钮控制
                dptUserButton: true //部门用户按钮
            },
            /**表格区域定义*/
            m_table: {
                dataUrl: backend.appOcaService + "/api/adminsmorg/querypage",
                searchform: {
                    unitOrgId: '',
                }, //查询条件
            },

            /**表单域定义*/
            formdata: {
                orgFullName: '', //机构全称
                orgSimpleName: '', //机构简称
                orgName: '', //机构名称
                orgCode: '', //机构代码
                checkOrgId: '',
                upOrgId: '', //上级机构
                orgType: '',
                orgCategory: '',
                instuId: '', //金融机构
                orgGrade: '', //机构层级
                orgSts: '', //状态
                zipCde: '', //邮编
                bankOrgId: '',
                financialLicense: '',
                businessLicense: '',
                contUsr: '', //联系人
                contDuty: '',
                contTel: '', //联系电话
                orgAddr: '', //地址
                area: '',
                orgGrade: '', //机构级别
            },
            viewType: 'DETAIL',
            viewTitle: fox.lookup.find('CRUD_TYPE', false),
            dialogVisible: false,
            formDisabled: false,
            saveBtnShow: true,
            hiddenItem: true,
            instuOptions: [],
            activeNames: ['1', '2'],
            upOrgTree: {
                visible: false,
                upOrgName: ''
            },
            rules: {
                //机构名称规则
                orgName: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: yufp.validator.speChar,
                        message: '输入信息包含特殊字符',
                        trigger: 'blur'
                    }
                ],
                //机构代码规则
                orgCode: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },
                    {
                        max: 10,
                        message: '最大长度不超过100个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: yufp.validator.speChar,
                        message: '输入信息包含特殊字符',
                        trigger: 'blur'
                    }

                ],
                //上级机构规则
                upOrgId: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                checkOrgId: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                //金融机构规则
                // instuId: [
                //     // {required: true, message: '必填项', trigger: 'change'}
                //     {
                //         required: true,
                //         message: '必填项',
                //         trigger: 'blur'
                //     }
                // ],
                //机构层级规则
                // orgGrade: [{
                //     required: true,
                //     message: '必填项',
                //     trigger: 'blur'
                // }],
                //邮编规则
                zipCde: [{
                        max: 6,
                        message: '最大长度不超过6个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: yufp.validator.postcode,
                        message: '请输入正确邮编',
                        trigger: 'blur'
                    }
                ],
                //联系人规则
                contUsr: [{
                    max: 100,
                    message: '最大长度不超过100个字符',
                    trigger: 'blur'
                }],
                //联系电话规则
                contTel: [{
                    validator: yufp.validator.mobile,
                    message: '请输入正确信息',
                    trigger: 'blur'
                }],
                //地址规则
                // orgAddr: [{
                //     max: 200,
                //     message: '最大长度不超过200个字符',
                //     trigger: 'blur'
                // }]
            },

        }

        // 注册功能要用到的数据字典 数据字典名称在数据字典中定义
        yufp.lookup.reg('DATA_STS', 'ORG_TYPE', 'ORG_CATEGORY');
        //创建vue model
        let vm = new Vue({
            el: '#orgInfo',
            //数据
            data: vmData,
            //计算属性
            computed: {

            },
            //方法
            methods: {
                handleChange: function (value) {
                    yufp.logger.info(value);
                },
                //查询三级联动数据
                Unite: function () {
                    var model = {};
                    fox.service.request({
                        method: 'get',
                        data: model,
                        url: backend.appOcaService + `/api/AdminSmLookUpUniteArea/select`,
                        callback: function (code, message, response) {
                            vm.m_linkage.options = response;
                        }
                    });
                },
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
                    _this.hiddenItem = editable; //隐藏字段
                },
                /**
                 * 取消
                 */
                cancelFn: function () {
                    var _this = this;
                    _this.formdata = {};
                    _this.dialogVisible = false;
                    _this.$refs['refTable'].clearSelection();
                },
                /**
                 * 新增按钮
                 */
                addFn: function () {
                    var _this = this;
                    // _this.m_linkage.options = [];
                    _this.m_linkage.selectedOptions = [];
                    _this.switchStatus('ADD', true);
                    //获取三级联动所有数据    
                    // vm.Unite();
                    _this.$nextTick(function () {
                        this.$refs['refForm'].resetFields();
                        _this.formdata.orgSts = 'W';
                        if (_this.m_tree.upOrgName != null && _this.m_tree.upOrgName != '') {
                            _this.formdata.upOrgId = _this.m_tree.upOrgId;
                            _this.formdata.upOrgName = _this.m_tree.upOrgName;
                            _this.formdata.orgGrade = parseInt(_this.m_tree.orgGrade) + 1 + "";
                            _this.formdata.instuId = _this.m_tree.instuId;
                        } else {
                            _this.formdata.orgGrade = 1 + 1 + "";
                            _this.formdata.upOrgId = fox.localsession.getUserInfo().ownOrg.orgId;
                            _this.formdata.upOrgName = fox.localsession.getUserInfo().ownOrg.orgName;
                            _this.formdata.instuId = _this.instuOptions[0].key;
                        }
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
                    // _this.m_linkage.options = [];
                    _this.m_linkage.selectedOptions = [];
                    _this.switchStatus('EDIT', true);
                    var obj = _this.$refs['refTable'].selections[0];
                    // console.log('---------', obj)

                    //给三级联动框赋值
                    _this.m_linkage.selectedOptions.push(obj.city)
                    _this.m_linkage.selectedOptions.push(obj.district)
                    _this.m_linkage.selectedOptions.push(obj.street)
                    //获取三级联动所有数据    
                    // _this.Unite();
                    _this.$nextTick(function () {
                        _this.$refs.refForm.resetFields();
                        fox.clone(obj, vmData.formdata);
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
                    model.sysId = backend.sysId;
                    model.lastChgUsr = fox.localsession.getUserInfo().userId;
                    //先默认写死 33——浙江
                    model.province = '33';
                    //市，区，街道
                    model.city = _this.m_linkage.selectedOptions[0]
                    model.district = _this.m_linkage.selectedOptions[1]
                    model.street = _this.m_linkage.selectedOptions[2]
                    fox.service.request({
                        method: 'POST',
                        data: model,
                        url: backend.appOcaService + `/api/adminsmorg/addorginfo`,
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
                                    //重新查询，刷新列表数据
                                    _this.$refs['refTable'].remoteData();
                                }
                            } else {
                                vm.$alert('服务端请求失败!\n' + message, '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    });
                    _this.$nextTick(function () {
                        _this.$refs['orgTree'].remoteData();
                    });
                },
                //修改提交
                updateFn: function () {
                    var _this = this;
                    var model = {};
                    fox.clone(_this.formdata, model);
                    console.log("++++++++++++++++++",_this.formdata,_this.$refs.refForm.formdata)
                    var validate = false;
                    _this.$refs.refForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    //先默认写死 33——浙江
                    model.province = '33';
                    //市，区，街道
                    model.city = _this.m_linkage.selectedOptions[0]
                    model.district = _this.m_linkage.selectedOptions[1]
                    model.street = _this.m_linkage.selectedOptions[2]
                    fox.service.request({
                        method: 'POST',
                        data: model,
                        url: backend.appOcaService + `/api/adminsmorg/update`,
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
                                    _this.dialogVisible = false;
                                    //重新查询，刷新列表数据
                                    _this.$refs['refTable'].remoteData();
                                    _this.$refs['refTable'].clearSelection();
                                    _this.$refs['orgTree'].remoteData();
                                    // _this.$nextTick(function () {
                                    // _this.$refs['orgTree'].remoteData();
                                    // });
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
                //批量删除
                deleteDataFn: function () {
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
                        if (row.orgSts !== 'A') {
                            id = id + ',' + row.orgId;
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
                        //开始删除
                        var idArr = [];
                        for (var i = 0; i < selections.length; i++) {
                            idArr.push(selections[i].orgId);
                        }
                        //调用删除提交服务
                        vm.deleteTableData(idArr);
                    }).catch(function () {});
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
                    var params = {
                        id: selectedList
                    }
                    fox.service.request({
                        method: 'POST',
                        data: params,
                        name: backend.appOcaService + `/api/adminsmorg/deletebatch?ids=${selectedList}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: response.data.message
                                });
                                vmData.m_table.multipleSelection = [];
                                _this.$refs['refTable'].remoteData();
                                _this.$refs['refTable'].clearSelection();
                            } else {
                                vm.$alert("删除失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                    _this.$nextTick(function () {
                        _this.$refs['orgTree'].remoteData();
                    });
                },
                //启用事件
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
                        if (row.orgSts !== 'A') {
                            id = id + ',' + row.orgId;
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
                        //开始启用
                        var idArr = [];
                        for (var i = 0; i < selections.length; i++) {
                            idArr.push(selections[i].orgId);
                        }
                        //调用启用提交服务
                        vm.useTableData(idArr);
                    }).catch(function () {});
                },
                // 启用提交
                useTableData: function (idArr) {
                    var _this = this;
                    var listArr = [];
                    for (var i = 0; i < idArr.length; i++) {
                        var rowid = idArr[i];
                        listArr.push(rowid);
                    }
                    var lastChgUsr = fox.localsession.getUserInfo().userId
                    var selectedList = ',' + listArr.join(',');
                    fox.service.request({
                        method: 'POST',
                        name: backend.appOcaService + `/api/adminsmorg/usebatch?ids=${selectedList}&lastChgUsr=${lastChgUsr}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: response.data.message
                                    // message: '启用成功'
                                });
                                _this.$refs['refTable'].remoteData();
                                _this.$refs['refTable'].clearSelection();
                            } else {
                                vm.$alert("启用失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    });
                },
                //停用事件
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
                        if (row.orgSts === 'A') {
                            id = id + ',' + row.orgId;
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
                        //开始停用
                        var idArr = [];
                        for (var i = 0; i < selections.length; i++) {
                            idArr.push(selections[i].orgId);
                        }
                        //调用停用提交服务
                        vm.unuseTableData(idArr);
                    }).catch(function () {});
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
                    var selectedList = listArr.join(',')
                    fox.service.request({
                        method: 'POST',
                        name: backend.appOcaService + `/api/adminsmorg/unusebatch?ids=${selectedList}&lastChgUsr=${lastChgUsr}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: response.data.message
                                });
                                _this.$refs['refTable'].remoteData();
                                _this.$refs['refTable'].clearSelection();
                            } else {
                                vm.$alert("停用失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    });
                },

                //树点击事件
                nodeClickFn: function (nodeData, node, self) {
                    var _this = this;
                    //设置查询的机构
                    _this.m_table.searchform.orgId = nodeData.orgId;
                    _this.m_tree.upOrgId = nodeData.orgId;
                    _this.m_tree.upOrgName = nodeData.orgName;
                    _this.m_tree.orgGrade = nodeData.orgGrade;
                    _this.m_tree.instuId = nodeData.instuId;
                    var condition = {
                        condition: {
                            unitOrgId: nodeData.orgCode
                        }
                    };
                    //查询用户数据
                    _this.$refs['refTable'].remoteData(condition);
                },
                //  上级机构选择，变更金融机构数据和机构层级
                selectFn: function (data, node, nodeWidget) {
                    var _this = this;
                    _this.$nextTick(function () {
                        vmData.formdata.upOrgName = data.orgName;
                        vmData.formdata.upOrgId = data.orgId;
                        //根据上级机构修改机构层级和金融机构
                        if (data.orgGrade == "") {
                            vmData.formdata.orgGrade = 1;
                        } else if (data.orgGrade == "1") {
                            vmData.formdata.orgGrade = parseInt(data.orgGrade) + 1 + "";
                            vmData.formdata.instuId = data.instuId;
                        } else {
                            vmData.formdata.orgGrade = parseInt(data.orgGrade) + 1 + "";
                            vmData.formdata.instuId = data.instuId;
                        }
                        if (vmData.formdata.upOrgId == data.orgId) {
                            vmData.upOrgTree.visible = false //更改只有双击才能确定并关掉
                        }
                    });
                },
                // 查询金融机构
                queryInstuFn: function () {
                    fox.service.request({
                        type: 'GET',
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        name: backend.appOcaService + '/api/adminsmorg/getinstuorg',
                        callback: function (code, message, response) {
                            if (code === 0 && response.code === 0) {
                                if (vmData.instuOptions.length > 0) {
                                    vmData.instuOptions.splice(0, vmData.instuOptions.length);
                                }
                                var instu = response.data;
                                for (var i = 0; i < instu.length; i++) {
                                    var option = {};
                                    option.key = instu[i].instuId;
                                    option.value = instu[i].instuName;
                                    vmData.instuOptions.push(option);
                                }
                            }
                        }
                    });
                },
            },
            //加载后处理
            mounted: function () {
                console.log('>>>>>>>>>>>',fox.localsession.getUserInfo())
                //页面初始化
                this.queryInstuFn();
                this.Unite();
            }
        });
    };


    //消息处理
    exports.onmessage = function (type, message, cite) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }


    // /***********************自定义校验器***********************/
    //     //邮编校验
    //     const isNum = (rule,value,callback)=>{
    //         var num = /^[0-9]*$/;
    //         if(!num.test(value)){
    //             callback(new Error("只能输入数字"));
    //         }else{
    //             callback();
    //         }
    //     }

    //     //特殊字符校验
    //     const speChar = (rule,value,callback)=>{
    //         var num = /^[a-zA-Z0-9]+$/;
    //         if(!num.test(value)){
    //             callback(new Error("不能包含特殊字符"));
    //         }else{
    //             callback();
    //         }
    //     }

});