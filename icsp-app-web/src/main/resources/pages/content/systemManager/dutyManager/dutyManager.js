/**
 * Created by 樊苏超 20190613
 */
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var  idArr=[];//id 数组
        var idArrTmp=[];
        var selectedCount=0;//当前选中的最大数目
        var funcDataAll=[];//保存初始数据
        //创建virtual model
        var vmData={
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
            },
     //查询URL
     m_dutyTable: {
        searchform: {},
         //根据机构号查询用户服务
         dutyDataUrl: backend.appOcaService + `/api/adminsmduty/list`,
         //dutyDataUrl: backend.appOcaService + `/api/adminsmduty/querypage`,
    },
     /**查询条件区域定义*/
      m_query: {
        dutyCde: '', //金融机构代码
        dutyName: '', //金融机构名称
        dutySts: '', //状态
      },
      /**按钮区域定义*/
      m_btn: {
        createButton: true, // 新增按钮控制
        editButton: true, // 修改按钮控制
        deleteButton: true, // 删除按钮控制
        useButton: true, // 启用按钮控制
        unuseButton: true, // 停用按钮控制
        dutyButton: true, // 岗位用户按钮控制
      },
      /**表格区域定义*/
      m_table: {
        idArr: [], // 表格中选中数据 id 数组
        tableData: [], //表格中的数据
        pageSize: 10, //每页显示10条
        currentPage: 1, //当前页，从1开始
        m_total: undefined, //表格总行数
        dutyId:'',
        multipleSelection: [], //多选选择列表数据 obj
        multipleFuncSelection:[],//多选 选择列表数据
        visible:false,
      },
      /**弹出框属性域定义*/
    //   m_dialog: {
    //     isAddRole: true, //是否新增 true新增加 false 修改
    //     isAddRoledetail: true, //详细框内控制
    //     titleName: '', //弹出框标题
    //     buttonName: '', //弹出框提交按钮名称
    //     dialogFormVisible: false, //弹出框层是否可见
    //     m_addfuncLayer:false,//岗位用户弹窗
    //     pageSize: 10, //每页显示10条
    //     addfuncLayerVisible:false,//添加角色图层是否可见
    //     currentPage: 1, //当前页，从1开始
    //     m_total: undefined, //表格总行数
    //     m_funcData:[],//岗位用户弹窗数据
    //     m_querygang:{},//岗位搜索数据存放
    //     checkedfuncbuttonArr:[],//选中的功能数组
    //     activeName: ['1', '2'], // 默认显示name为1,2的金基础信息和扩展信息
    //     formDisabled: true, //弹出框是否可用
    //     extVisiable:true,//隐藏字段是否可见
    // },

        m_rules: { // 校验规则配置
            dutyCde: [
                { required: true, message: '必填项', trigger: 'blur' },
                {max: 33, message: '输入值过长', trigger: 'blur' }
            ],
            dutyName: [
                { required: true, message: '必填项',trigger: 'blur' },
                {max: 33, message: '输入值过长', trigger: 'blur' }
            ],
            orgName: [
                { required: true,message: '必填项', trigger: 'blur' }
            ],
            dutySts: [
                { required: true, message: '必填项', trigger: 'blur' }
            ]
        },
      

        /**树属性域定义*/
        m_tree: {
            orgTreeProps:{id:'orgId',label:'orgName',children:'children'},
            orgTreeData:[],
        },
     /**动态数据字典定义*/
        m_datasource: {
        datasource: {}, //数据字典项，用于动态下拉选项
        mapDatasource: {
            DATA_STS: {
                A: '1',
                W: '2',
                I: '123',
              },
        } //数据字典项，用于表格中翻译数据字典项
      },
             /**表单域定义*/
        // editForm:{
        // dutyCde:'',
        //  dutyName:'',
        //  orgName:'',
        //  dutySts:'',
        //  userName:'',
        //  lastChgDt:','
        // },

         //表单区定义
         m_duty: {
            formdata: {},
            viewType: 'DETAIL',
            viewTitle: fox.lookup.find('CRUD_TYPE', false),
            dialogVisible: false,
            formDisabled: false,
            saveBtnShow: true,
            hiddenItem: true,
            activeNames: ['1']  
        },

        /**岗位信息关联表单域定义*/
        m_user:{
            m_addfuncLayer: false,//岗位用户弹出框
            activeName:'user',
            searchform:{},//查询条件'
            dutyTableData: [], //选中关联岗位数据
        },
         // funcData:[],
       // visible:false,
        // funcbuttonArr: [//{ id: '1', label: '添加' },
       // ],
       // activeName: ['1','2'], // 默认显示name为1,2的金融机构信息和扩展信息
       // funcGroupOptions:[],
       //data: [],
      
        }
        var data = ['DATA_STS'];
        var vm =  new Vue({
            el: "#dutyManager",
            data:vmData ,
            computed:{
            //计算分页数据
            // getData: function () {
            //     //在这里处理分页
            //     var _tableData = vmData.m_table.tableData;
            //     var _pageSize = vmData.m_table.pageSize;
            //     var _currentPage = vmData.m_table.currentPage;
            //     var offset = (_currentPage - 1) * _pageSize;
            //     if (offset + _pageSize >= _tableData.length) {
            //     return _tableData.slice(offset, _tableData.length);
            //     } else {
            //     return _tableData.slice(offset, offset + _pageSize);
            //     }
            // }  
            },
            methods: {
                // 树的点击事件
                nodeClickFn: function (nodeData, node, self) {
                    var _this = this;
                    //设置查询的机构
                    _this.m_dutyTable.searchform.dutyId = nodeData.dutyId;
                    var condition = {
                        condition: {
                            belongorgId: nodeData.dutyId
                        }
                    };
                    //查询用户数据
                    _this.$refs['refTable'].remoteData(condition);
                    // vmData.m_tree.orgTreeCurrentData = data; //添加时用到
                    // if (vmData.funcForm.orgId) {
                    //     vm.m_dialog.orgVisible = false;
                    // };
                    // vmData.funcForm.orgId = data.orgCode;
                    // vmData.funcForm.orgName = data.orgName;
                    // this.queryUserInfo(data.orgCode);
                },
                 /**
                 * 岗位基本详情
                 */
                infoFn: function (viewData) {
                    var _this = this;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function () {
                        _this.$refs['refDutyForm'].resetFields();
                        fox.clone(viewData, _this.m_duty.formdata);
                    });
                },
                switchStatus: function (viewType, editable) {
                    var _this = this;
                    _this.m_duty.viewType = viewType;
                    _this.m_duty.saveBtnShow = editable;
                    _this.m_duty.dialogVisible = true;
                    _this.m_duty.formDisabled = !editable;
                    _this.m_duty.hiddenItem = editable; //隐藏字段
                },

                 //岗位关联信息按钮
                 openDutyFn() {
                    let _this = this;
                    let selections = this.$refs['refTable'].selections;
                    console.log('1111111111',selections)
                    if (selections.length == 0) {
                        vm.$message({
                            message: '请选择一条数据!',
                            type: 'warning'
                        });
                        return false;
                    }
                    //先要让弹出框背弹出来，之后refs才能取到对象 
                    vmData.m_user.m_addfuncLayer = true; //
                    let userName = selections[0].userName;
                    let dutyId = selections[0].dutyId;
                    _this.$nextTick(function () {
                        console.log('888888888888888888',userName)
                        //查询角色数据
                        _this.queryRoleInfo(userName,dutyId);
                        //默认显示用户角色信息
                        _this.m_user.activeName = 'user';
                    });
                },
            
                 //搜索岗位信息树数据
                 queryRoleInfo: function (userName,dutyId) {
                    let _this = this;
                    var conditions = {
                        "userName":userName,
                        "dutyId":dutyId,
                    }
                    var condition = JSON.stringify(conditions)
                    var reqData = {
                        condition,
                    };
                    fox.service.request({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: reqData,
                        name: backend.appOcaService + '/api/adminsmduty/userlist',
                        ///api/adminsmrole/querypage,/api/adminsmrole/roleuser
                        callback: function (code, message, data) {
                            // debugger;
                            if (code === 0) {
                                vmData.m_user.roleTableData = data.data;
                                // vm.m_table.m_total = data.total;
                                console.log('666666666666666666666666666',data)
                            } else {
                                vm.$alert('服务端请求失败!', '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },

                 // 弹出框按钮提交事件
                 submitFn: function () {
                    var _this = this;
                    if (_this.m_duty.viewType == 'ADD') {
                        //走添加接口
                        this.insertFn();
                    } else {
                        //走修改接口
                        this.updateFn();
                    }
                }, 
                //添加接口
                insertFn: function () {
                    var _this = this;
                    var model = {};
                    fox.clone(_this.m_duty.formdata, model);
                    console.log(model)
                    var validate = false;
                    _this.$refs.refDutyForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 向后台发送保存请求
                    model.lastChgUsr = fox.localsession.getUserInfo().userId;
                    fox.service.request({
                        method: 'POST',
                        data: model,
                        url: backend.appOcaService + `/api/adminsmduty/`,
                        callback: function (code, message, response) {
                            alert(code);
                            if (code === 0) {
                                if (response.data.code == 2) {
                                    vm.$message({
                                        message: response.data.message,
                                        type: 'warning'
                                    });
                                } else {
                                    _this.$message('数据保存成功!');
                                    _this.m_duty.dialogVisible = false;
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
                },

                //修改提交
                updateFn: function () {                   
                    var _this = this;
                    var model = {};
                    // model.lastChgUsr = fox.localsession.getUserInfo().userId;
                    fox.clone(_this.m_duty.formdata, model); 
                    var validate = false;
                    _this.$refs.refDutyForm.validate(function (valid) {
                        validate = valid;
                    });        
                    if (!validate) {
                        return;
                    };
                    //alert(model);
                    console.log('999999',model);
                    fox.service.request({ 
                    method: 'POST',
                    data: model,
                    url:backend.appOcaService + `/api/adminsmduty/update`, 
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
                                _this.m_duty.dialogVisible = false;
                                //重新查询，刷新列表数据
                                alert('重新查询数据')
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
                        if (row.dutySts !== 'A') {
                            id = id + ',' + row.dutyId;
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
                        name: backend.appOcaService + `/api/adminsmduty/usebatch`,
                        callback: function (code, message, response) {
                            //alert(code);
                            if (code === 0) {
                                vm.$message({
                                    message: "启用数据成功!"
                                });
                                _this.$refs['refTable'].remoteData();
                            } else {
                                vm.$alert("启用失败，请联系系统管理员", '提示', {
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
                        if (row.dutySts === 'A') {
                            id = id + ',' + row.dutyId;
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
                        name: backend.appOcaService + `/api/adminsmduty/unusebatch?id=${id}&userId=${lastChgUsr}`,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                vm.$message({
                                    message: "停用数据成功!"
                                });
                                _this.$refs['refTable'].remoteData();
                            } else {
                                vm.$alert("停用失败，请联系系统管理员", '提示', {
                                    confirmButtonText: '确定',
                                    callback: function () {}
                                });
                            }
                        }
                    })
                },
                
                 /**
                 * 用户基本取消
                 */
                cancelFn: function () {
                    var _this = this;
                    //重置表单数据
                    _this.$refs['refDutyForm'].resetFields();
                    _this.m_duty.dialogVisible = false;
                    _this.$refs['refTable'].clearSelection();
                },

                //添加用户
                addFn: function () {
                    var _this = this;
                    _this.switchStatus('ADD', true);
                    _this.$nextTick(function () {
                        _this.$refs['refDutyForm'].resetFields();
                        _this.m_duty.formdata.orgId = _this.m_dutyTable.searchform.orgId;
                        _this.m_duty.formdata.dutySts = 'W';
                    });
                },

                //用户修改
                modifyFn: function () {
                    var _this = this;
                    if (_this.$refs['refTable'].selections.length != 1) {
                        _this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    _this.switchStatus('EDIT', true);
                    var obj = _this.$refs['refTable'].selections[0];
                    console.log('1111111111111111111111111111111',obj)
                    _this.$nextTick(function () {
                        _this.$refs['refDutyForm'].resetFields();
                        fox.clone(obj, _this.m_duty.formdata);
                        console.log('66666666666666666666666666',_this.m_duty.formdata)
                    });
                },

                //批量删除
                deleteDataFn: function () {
                    let selections = this.$refs['refTable'].selections;
                    console.log('666666666666666666666666666666666',selections)
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
                    if (row.dutySts !== 'A') {
                        id = id + ',' + row.dutyId;
                        alert(id)
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
                        idArr.push(selections[i].dutyId);
                    }
                     console.log('123123212',idArr)
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
                        id:selectedList
                    }
                    console.log('333333333',params);
                    fox.service.request({
                    method: 'POST',
                    data:params,
                    name: backend.appOcaService + `/api/adminsmduty/batchdelete/${selectedList}`,
                    callback: function (code, message, response) {
                        if (code === 0) {
                            vm.$message({
                                message: "删除成功!",                    
                            });
                            vmData.m_table.multipleSelection = [];
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













         //初始化
        init:function() {
            // 注册功能要用到的数据字典 数据字典名称在数据字典中定义
           // var data = ['DATA_STS', 'SYS_TYPE'];
            // 动态加载数据字典项
            fox.lookup.datasource(data, function (data, mapDataSource) {
              vmData.m_datasource.datasource = data;
              vmData.m_datasource.mapDataSource = mapDataSource;
            });
          },   
        //查询表格数据
        queryDataFn: function () {
            //查询条件
            let _this = this;
            var conditions = {
                "dutyCde":vmData.m_query.dutyCde,
                "dutyName":vmData.m_query.dutyName,
                "dutySts":vmData.m_query.dutySts,
            }
            var condition = JSON.stringify(conditions);
            //查询条件
            var reqData = {
              condition,
              "page": vmData.m_table.currentPage,
              "size": vmData.m_table.pageSize
            };
            fox.service.request({
              type: "GET",
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              data: reqData,
              name: backend.appOcaService + `/api/adminsmduty/list`,
              callback: function (code, message, response) {
                if (code === 0) {
                    vmData.m_table.tableData = response.data;
                    vmData.m_table.m_total = response.total;
                } else {
                  vm.$alert("服务端请求失败", '提示', {
                    confirmButtonText: '确定',
                    callback: function () {}
                  });
                }
              }
            })
          },
         // 岗位用户弹窗搜索接口
        unsetFunDataSearch:function(){
         var conditions =  {
        loginCode:vm.m_dialog.m_querygang.loginCode,
        userName:vm.m_dialog.m_querygang.userName,
        userCode:vm.m_dialog.m_querygang.userCode,
        userSts:null,
        dutyId:vm.m_table.dutyId
        }
        var condition = JSON.stringify(conditions)
        //通过名称查询卡号
          var reqData = {
        condition,
        "page":vm.m_table.currentPage,
        "size":vm.m_table.pageSize
        };
        fox.service.request({
        type:"GET",
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        data: reqData,
        name: backend.appOcaService + `/api/adminsmduty/userlist`,
        callback: function (code, message, response) {
         // debugger;
        if (code === 0) {
        vm.m_dialog.m_total = response.total;
        vm.m_dialog.m_funcData=response.data;
         } else {
         vm.$alert('服务端请求失败!', '提示', {
         confirmButtonText: '确定',
        callback: function() {}
         });
         }
         }
         })
         },
         openType: function (type, enabled, active) {
         if (type == 'detail') {
              vmData.m_dialog.extVisiable = true;
              vmData.m_dialog.titleName = "详情";
            }
            //显示弹出框 
            vmData.m_dialog.dialogFormVisible = true;
          },
          //查看数据明细
        openDetailFn: function (viewData) {
            vm.resetAllData();
            vm.openType('detail', false, ['1', '2']);
            //给详情框赋值
            vmData.editForm = viewData;
          },
        // 岗位用户请求接口
        unsetFunData:function(dutyId){
            //vm.m_table.dutyId = dutyId
            var conditions =  {
                loginCode:vm.m_dialog.m_querygang.loginCode,
                userName:vm.m_dialog.m_querygang.userName,
                userCode:vm.m_dialog.m_querygang.userCode,
                userSts:null,
                dutyId:dutyId
            }
            var condition = JSON.stringify(conditions)
            //通过名称查询卡号
            var reqData = {
                condition,
                "page":vm.m_dialog.currentPage,
                "size":vm.m_dialog.pageSize
            };
            fox.service.request({
                type:"GET",
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                data: reqData,
                name: backend.appOcaService + `/api/adminsmduty/userlist`,
                callback: function (code, message, response) {
                    // debugger;
                    if (code === 0) {
                        vm.m_dialog.m_total = response.total;
                        vm.m_dialog.m_funcData=response.data;
                    } else {
                        vm.$alert('服务端请求失败!', '提示', {
                            confirmButtonText: '确定',
                            callback: function() {}
                        });
                    }
                }
            })
        },
        //重置搜索
        m_reset(){
            vmData.m_dialog.m_querygang = {};
        },
        // 下一页
        prevClick:function(pageIndex){
            vm.m_table.currentPage=pageIndex;
        },
        // 上一页
        nextClick:function(pageIndex){
            vm.m_table.currentPage=pageIndex;
        },
        // 下一页
        diaprevClick:function(pageIndex){
            vm.m_dialog.currentPage=pageIndex;
        },
        // 上一页
        dianextClick:function(pageIndex){
            vm.m_dialog.currentPage=pageIndex;
        },
        //页码改变事件
        diahandleSizeChange:function(size) {
            vm.m_dialog.pageSize = size
        },

        //当前页面改变事件
        diahandleCurrentChange:function(currentPage) {
            vm.m_dialog.currentPage =currentPage
        },
        //当前页面多选事件
        handleSelectionChange: function (val) {
            //处理多选操作
            vm.m_table.multipleFuncSelection = val;

        },
        //当前树点击事件
        // handleNodeClick(data, node, nodeWidget){
        //     vmData.editForm.orgName = data.orgName;
        //         if(vmData.editForm.belongOrgId == data.orgId){
        //             vmData.m_table.visible = false;//更改只有双击才能关掉
        //         }
        //         vmData.editForm.belongOrgId = data.orgId;
        //        // vmData.editForm.orgName = data.orgName;
        // },
        //tree的filter-node-method方法
        filterNode(){

        },
        //触发函数,
        getCanEdit:function(){
            return !this.m_dialog.isAddRole;
        },
        handleCheckedFuncChange:function(value){
            //  vmData.checkedfuncbuttonArr=value;//不需要赋值，两个是同步的
        },
        queryFunGroup:function(){

        },
        //取消按钮关闭窗口
        cancelvmData:function(){
            //清空数据
            vm.resetAllData();
            vmData.m_dialog.addfuncLayerVisible=false;
        },
        //添加上传
        addModulMethod:function(){
            this.$refs['editForm'].validate((valid) => {
                if (!valid) {
                  return false;
                }
            vm.editForm.lastChgUsr = JSON.parse(fox.sessionStorage.get("fox-SESSION-USER")).userId
            var reqData = vm.editForm
            fox.service.request({
                contentType:"application/json;charset=UTF-8",
                data: {
                    dutyCde: reqData.dutyCde
                  },
                type:"GET",
                name: backend.appOcaService + `/api/adminsmduty/checkdutycde`,
                callback: function (code, message, response) {
                        if(response > 0) {
                            vm.$message({message: '岗位代码重复！', type: 'warning'});
                        }else{
                            fox.service.request({
                                contentType:"application/json;charset=UTF-8",
                                data: reqData,
                                type:"POST",
                                name: backend.appOcaService + `/api/adminsmduty/`,
                                callback: function (code, message, response) {
                                    if (code === 0) {
                                        if(response.data.code == 2) {
                                            vm.$message({
                                                message: response.data.message,
                                                type: 'warning'
                                                });
                                        }else{
                                            vm.$alert('添加成功!', '提示', {
                                                confirmButtonText: '确定',
                                                callback: function() {
                                                    vm.resetAllData();
                                                    vmData.m_dialog.addfuncLayerVisible=false;
                                                    //重新查询，刷新列表数据
                                                    vm.queryDataFn();
                                                }
                                            });
                                        }
                                    } else {
                                        vm.$alert('服务端请求失败!', '提示', {
                                            confirmButtonText: '确定',
                                            callback: function() {}
                                        });
                
                                    }
                                }
                            });
                        }
                }
            });
        });
        },
        //编辑上传
        editModulMethod:function(){
            this.$refs['editForm'].validate((valid) => {
                if (!valid) {
                  return false;
                }
            vm.editForm.lastChgUsr = JSON.parse(fox.sessionStorage.get("fox-SESSION-USER")).userId;
            var reqData = vm.editForm;
                            fox.service.request({
                                contentType:"application/json;charset=UTF-8",
                                data: reqData,
                                type:"POST",
                                name: backend.appOcaService + `/api/adminsmduty/update`,
                                callback: function (code, message, response) {
                                    if (code === 0) {
                                        if(response.data.code == 2) {
                                            vm.$message({
                                                message: response.data.message,
                                                type: 'warning'
                                                });
                                        }else{
                                            vm.$alert('修改成功!', '提示', {
                                                confirmButtonText: '确定',
                                                callback: function() {
                                                    vm.resetAllData();
                                                    vmData.m_dialog.addfuncLayerVisible=false;
                                                    //重新查询，刷新列表数据
                                                    vm.queryDataFn();
                                                }
                                            });
                                        }
                                    } else {
                                        vm.$alert('服务端请求失败!', '提示', {
                                            confirmButtonText: '确定',
                                            callback: function() {}
                                        });

                                    }
                                }
                            });
        });
        },
        //添加和编辑时按钮对应相应功能
        submitvmData:function(){
            //vm.resetAllData();
            if(vmData.m_dialog.isAddRole){
                //走添加接口
                this.addModulMethod();
            }
            else{
                //走编辑接口
                this.editModulMethod();
            }
        },
        //取消选择
        resetChecked:function() {
            vmData.m_dialog.checkedfuncbuttonArr=[];
        },
        //清空editForm中数据
        resetAllData:function(){
            vm.editForm = {}
        },
        handleSelectionChange: function (val) {
            //处理多选操作
            vmData.m_table.multipleFuncSelection = val;

        },

        //页码改变事件
        handleSizeChange:function(size) {
            vmData.m_table.pageSize = size
            vm.queryDataFn();
            // console.log('rrrrrrrrrr',vmData.pageSize)
        },

        //当前页面改变事件
        handleCurrentChange:function(currentPage) {
            vmData.m_table.currentPage =currentPage
            vm.queryDataFn();
            // console.log('ddddddddd',vmData.m_table.currentPage)
        },

        //单行删除
        deleteSigleRow:function(index, row) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function(){
                vm.deleteFunData([row.dutyId]);
            });
        },
        //点击行选中
        clickRow: function(row){
        this.$refs.multipleTable.toggleRowSelection(row)
        },
        // 删除
        deleteFunData:function(idArr){
            var listArr=[];
            for(var i=0;i<idArr.length;i++){
                var rowid=idArr[i];
                listArr.push(rowid);
            }
            var funcList = listArr.join(',')
            fox.service.request({
                method: 'POST',
                data: {
                    id: funcList
                    },
                    name: backend.appOcaService + `/api/adminsmduty/deletebatch`,
                contentType:"application/json;charset=UTF-8",
                callback:function (code,message,data) {
                    if (code === 0) {
                        vm.$alert("删除成功", '提示', {
                            confirmButtonText: '确定',
                            callback: function() {
                                vmData.m_table.multipleFuncSelection=[];
                                vm.queryDataFn();
                            }
                        });


                    } else {
                        vm.$alert("删除失败，请联系系统管理员", '提示', {
                            confirmButtonText: '确定',
                            callback: function() {}
                        });

                    }
                }
            })
        },
        // 启用
        addFunData:function(idArr){
            var listArr=[];
            for(var i=0;i<idArr.length;i++){
                var rowid=idArr[i];
                listArr.push(rowid);
            }
            var lastChgUsr = JSON.parse(fox.sessionStorage.get("fox-SESSION-USER")).userId
            var funcList = listArr.join(',')
            fox.service.request({
                contentType:"application/json;charset=UTF-8",
                method: 'POST',
                data: {
                    id: funcList,
                    userId: lastChgUsr
                    },
                name: backend.appOcaService + `/api/adminsmduty/usebatch`,
                callback:function (code,message,response) {
                    if (code === 0) {
                        vm.$message({message:response.data.message});
                        vmData.m_table.multipleFuncSelection=[];
                        vm.queryDataFn();
                        // vm.$alert("启用成功", '提示', {
                        //     confirmButtonText: '确定',
                        //     callback: function() {
                        //         vmData.m_table.multipleFuncSelection=[];
                        //         vm.queryDataFn();
                        //     }
                        // });


                    } else {
                        vm.$alert("启用失败，请联系系统管理员", '提示', {
                            confirmButtonText: '确定',
                            callback: function() {}
                        });

                    }
                }
            })
        },
        // 停用
        stopFunData:function(idArr){
            var listArr=[];
            for(var i=0;i<idArr.length;i++){
                var rowid=idArr[i];
                listArr.push(rowid);
            }
            var lastChgUsr = JSON.parse(fox.sessionStorage.get("fox-SESSION-USER")).userId
            var funcList = listArr.join(',')
            fox.service.request({
                method: 'POST',
                contentType:"application/json;charset=UTF-8",
                data: {
                    id: funcList,
                    userId: lastChgUsr
                    },
                    name: backend.appOcaService + `/api/adminsmduty/unusebatch`,
                callback:function (code,message,response) {
                    if (code === 0) {
                        vm.$message({message:response.data.message});
                        vmData.m_table.multipleFuncSelection=[];
                        vm.queryDataFn();
                        // vm.$alert("停用成功", '提示', {
                        //     confirmButtonText: '确定',
                        //     callback: function() {
                        //         vmData.m_table.multipleFuncSelection=[];
                        //         vm.queryDataFn();
                        //     }
                        // });
                    } else {
                        vm.$alert("停用失败，请联系系统管理员", '提示', {
                            confirmButtonText: '确定',
                            callback: function() {}
                        });

                    }
                }
            })
        },
        //单行选中
        editSigleRow:function(index,row){
            var id=row.FUNC_ID;
            this.editMethod(id);
        },
        //创建
        createfunc:function(){
            vm.resetAllData();
            vm.editForm.dutySts = 'W';
            vmData.m_dialog.isAddRole=true;
            vmData.m_dialog.isAddRoledetail=true;
            vmData.m_dialog.addfuncLayerVisible=true;//让创建角色图层弹出来
            this.queryTreeMessge();
            vmData.m_dialog.titleName="创建";
            vmData.m_dialog.buttonName="保存";
        },
        //编辑
        editfunc:function(){
            if (vmData.m_table.multipleFuncSelection.length != 1) {
                vm.$message({
                    message: '请选择一条数据!',
                    type: 'warning'
                });
                return false;
                }

                for(var i in vmData.m_table.multipleFuncSelection){
                if (vmData.m_table.multipleFuncSelection[i].dutySts == 'A') {
                    vm.$message({message: '只能选择失效或待生效的数据', type: 'warning'});
                    return;
                    };
            }

            var data=vmData.m_table.multipleFuncSelection[0];
            this.editMethod(data);
        },
        //编辑函数
        editMethod:function(data){
            vm.resetAllData();
            vmData.m_dialog.isAddRole=false;
            vmData.m_dialog.isAddRoledetail=false;
            vmData.m_dialog.addfuncLayerVisible=true;//让创建角色图层弹出来
            this.queryTreeMessge();
            vmData.m_dialog.titleName="编辑";
            vmData.m_dialog.buttonName="更新";
            //给编辑框赋值
            vm.editForm = data;
            vm.queryDataFn();
        },
        //批量删除
        deletefunc:function(){
            if(vmData.m_table.multipleFuncSelection.length==0){//判断是否选择了内容
                vm.$alert("至少选择一项", '提示', {
                    confirmButtonText: '确定',
                    callback: function() {}
                });
                return;
            }
            for(var i in vmData.m_table.multipleFuncSelection){
                if (vmData.m_table.multipleFuncSelection[i].dutySts == 'A') {
                    vm.$message({message: '只能删除失效或待生效的数据', type: 'warning'});
                    return;
                    };
            }
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function(){
                    //开始删除
                    var idArr=[];
                    for(var i=0;i<vmData.m_table.multipleFuncSelection.length;i++){
                        idArr.push(vmData.m_table.multipleFuncSelection[i].dutyId);
                    }
                    vm.deleteFunData(idArr);
                }
            ).catch(function(){});
        },
        //启用
        usefunc:function(){
        if(vmData.m_table.multipleFuncSelection.length==0){
            vm.$alert("至少选择一项", '提示', {
                confirmButtonText: '确定',
                callback: function() {}
            });
            return;
        }
        for(var i in vmData.m_table.multipleFuncSelection){
            if (vmData.m_table.multipleFuncSelection[i].dutySts == 'A') {//判断生效状态
                vm.$message({message: '只能选择失效或待生效的数据', type: 'warning'});
                return;
                };
        }

        this.$confirm('确定要启用该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function(){
                //开始启用
                var idArr=[];
                for(var i=0;i<vmData.m_table.multipleFuncSelection.length;i++){
                    idArr.push(vmData.m_table.multipleFuncSelection[i].dutyId);
                }
                vm.addFunData(idArr);
            }
        ).catch(function(){});
    },
        //停用
        unusefunc:function(){
        if(vmData.m_table.multipleFuncSelection.length==0){
            vm.$alert("至少选择一项", '提示', {
                confirmButtonText: '确定',
                callback: function() {}
            });
            return;
        }
        for(var i in vmData.m_table.multipleFuncSelection){
            if (vmData.m_table.multipleFuncSelection[i].dutySts != 'A') {
                vm.$message({message: '只能选择生效的数据', type: 'warning'});
                return;
                };
        }
        
        this.$confirm('确定要停用吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function(){
                //开始删除
                var idArr=[];
                for(var i=0;i<vmData.m_table.multipleFuncSelection.length;i++){
                    idArr.push(vmData.m_table.multipleFuncSelection[i].dutyId);
                }
                vm.stopFunData(idArr);
            }
        ).catch(function(){});
    },
        //岗位用户
        unusefunUser:function(){
            if(vmData.m_table.multipleFuncSelection.length!= 1){
                vm.$alert("请选择一项", '提示', {
                    confirmButtonText: '确定',
                    callback: function() {}
                });
                return;
            }
            vm.m_dialog.m_addfuncLayer = true;
            vm.unsetFunData(vmData.m_table.multipleFuncSelection[0].dutyId);
        },
        resetData:function(){
            idArr=[];
            selectedCount=0;//选中的数组为0
            idArrTmp=[];
        },
        getStatusName:function(row,column){
            if(row.status=='1'){
                return "有效";
            }
            else{
                return "无效";
            }

        },

        /**
         * 重置
         */
        reset:function() {
            vmData.m_query = {};
            },

        //分页触发事件
        sizeChange:function(pageSize){
            vm.resetData();
        },
        currentChange:function(pageIndex){
            vmData.m_table.currentPage=pageIndex;
            //换页清空选择的数据
            vm.resetData();
        },
        //上一页
        // prevClick:function(pageIndex){
        //     vmData.m_table.currentPage=pageIndex;
        //     vm.resetData();
        // },
        // //下一页
        // nextClick:function(pageIndex){
        //     vmData.m_table.currentPage=pageIndex;
        //     vm.resetData();
        // },
        //获取结构树数据
        queryTreeMessge:function() {
            var reqData={
                userId: JSON.parse(fox.sessionStorage.get("fox-SESSION-USER")).userId,
                orgCode: 500,
                needFin: false,
                needManage: false,
                needDpt: false,
                orgLevel: "",
            }
            fox.service.request({
                type:"GET",
                data:reqData,
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                name: backend.appOcaService + `/api/util/getorgtree`,
                callback: function (code, message, response) {
                    // debugger;
                    if (code === 0) {
                        var orgInfo = formatData(response.data);
                        var root=[];
                        for (var i = 0; i < orgInfo.length; i++) {
                            orgInfo[i].children = [];  
                            if (orgInfo[i].upOrgId == '10000') {
                                root.push(orgInfo[i]);
                                orgInfo.splice(i, 1)
                                i--;
                            }
                        }
                        toTree(root, orgInfo);
                        console.log(root);
                        vm.m_tree.orgTreeData = root;
                    } else {
                        vm.$alert('服务端请求失败!', '提示', {
                            confirmButtonText: '确定',
                            callback: function() {}
                        });
                    }
                }
            })
        },
    },
    //挂载函数
    mounted: function(){
        var headers = {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Basic d2ViX2FwcDo="
        };
        this.init();
        this.queryDataFn();

    },
    });



        /*************************************  功能系列************************************/
        // var validateFuncMethod=function(rule, value, callback)  {
        //     var FuncID='';
        //     var FuncName='';
        //     var RouteID='',
        //     value=value.replace(/(^\s*)|(\s*$)/g, "");
        //     if(rule.field=='addfilterfuncId'){
        //         if(value==''){
        //             callback(new Error('功能编号不能为空'));
        //             return;
        //         }
        //         FuncID=value;
        //     }
        //     if(rule.field=='addfilterfuncName'){
        //         if(value==''){
        //             callback(new Error('功能名称不能为空'));
        //             return;
        //         }
        //         FuncName=value;
        //     }
        //     if(rule.field=='addfilterfuncRoute'){
        //         if(value==''){
        //             callback(new Error('路由ID不能为空'));
        //             return;
        //         }
        //         RouteID=value;
        //     }
        //     //编辑模式不进行网络校验
        //     if(!vm.m_dialog.isAddRole)
        //     {
        //         return  callback();
        //     }
        // };
    };

    //消息处理
    exports.onmessage = function (type, message) {

        
    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }





    /**************父子关系数据与树结构数据转换**********************/
    //树形结构转数组
    function formatData (arr){
        var returnArr = [];
        for(var key in arr){
            var obj = {
                orgName: arr[key].orgName,//机构名称
                orgId: arr[key].orgId,//机构代码
                upOrgId: arr[key].upOrgId,//上级机构
            }
            returnArr.push(obj);
        }
        return returnArr;
    }
     /**
         * 转换数据
         */
    function toTree(root,dataList){
            for (var i = 0; i < root.length; i++) {
                for (var j = 0; j < dataList.length; j++) {
                    if (dataList[j].upOrgId == root[i].orgId) {
                        root[i].children.push(dataList[j]);
                        dataList.splice(j, 1);
                        toTree(root[i].children, dataList);
                        j--;  
                    }
                }
            }
    
    }




});
