/**
 * Created by 樊苏超 on 2018/05/01.
 */
define(['./custom/widgets/js/yufpServerstatus.js'], function (require, exports) {
  // 数据源
  var vmData = {
    queryNodeInfoInterval: {},
    serverstatuschecked: false,
    serverstatusdisabled: true,
    filterText: '',
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    serverstatus: [],
    fileList: [],
    fileList1: [{ name: 'I:\\nanhai_local.jks', size: '1' }],
    checkList: [],
    checked: false,
    fileUploadVisible: false,
    // 节点信息
    nodeInfos: [],
    deployDialogVisiable: false,
    dialogFormVisible: false,
    deployFormData: {
      version: '',
      needRestart: ''
    },
    version_list: [],
    options: [{
      value: 'true',
      label: '需要重启'
    }, {
      value: 'false',
      label: '不需要重启'
    }],
    // height: height,
    // 属性说明，实际使用时不需要此部分
    currClickNode: '',
    data2: [], // 机构树数据
    dialogFormVisible: false, // POPWindow
    step: '',
    // 版本回退
    undeployDialogVisiable: false,
    unDeployFormData: {
      version: ''
    },
    undeploy_version_list: [],
    // 回退步骤位置
    backstep: 0,
    backDetailPageVisible: false,
    // 图片上传调用的路径
    nodeKey: [],
    IMG_UPLOAD_URL: ''
  };
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    var vm = yufp.custom.vue({
      el: cite.el,
      data: vmData,
      methods: {

        // 全选
        selectAll: function () {
          for (var i = 0; i < this.nodeInfos.length; i++) {
            this.nodeInfos[i].checked = !this.nodeInfos[i].checked;
          }
        },
        // 节点点击事件
        tap: function (item, index) {
          var customKey = 'custom_nodeinfo'; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'cmnodeinfo'; // 模板示例->普通查询的路由ID
          // 数据
          var data = {
            ip: item.ip,
            nodename: item.nodename,
            serverstatus: item.serverstatus,
            conncount: item.conncount
          }; // 传递的业务数据，可选配置
          // yufp.bus.put('nodeinfo', 'param', data);
          // 添加新的标签页
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '查看节点', // 页签名称
            data: data
          });
        },


        nodeClickFn: function (nodeData, node, self) {
          this.currClickNode = nodeData.id + '|' + nodeData.label;
        },
        // 版本部署
        releaseDeploy: function () {
          var ids = '';
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              ids += vmData.nodeInfos[i].ip + '_' + vmData.nodeInfos[i].nodename + ';';
            }
          }
          if (ids.length == 0) {
            this.$message({
              message: '请先选择需要操作的应用服务',
              type: 'warning'
            });
            return;
          }
          // 弹出版本部署对话框
          vmData.deployDialogVisiable = true;

          // 查询部署的版本
          var reqData = {
            type: 'deploy'
          };
          // 请求版本列表
          yufp.service1.request({
            id: 'listVersion',
            data: reqData,
            name: 'cm/deploy/listVersion',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.version_list = data.version_list;
              } else {
                this.$message({
                  message: '查询部署列表失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 版本回退
        releaseUnDeploy: function () {
          var ids = '';
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              ids += vmData.nodeInfos[i].ip + '_' + vmData.nodeInfos[i].nodename + ';';
            }
          }
          if (ids.length == 0) {
            this.$message({
              message: '至少选中一台服务器进行操作',
              type: 'warning'
            });
            return;
          }
          // 弹出版本部署对话框
          vmData.undeployDialogVisiable = true;
          if (ids.indexOf(';') > 0) {
            ids = ids.substr(0, ids.length - 1);
          }
          // 查询部署的版本
          var reqData = {
            type: 'rollbacker',
            ids: ids
          };
          // 请求版本列表
          yufp.service1.request({
            id: 'listVersion',
            data: reqData,
            name: 'cm/deploy/listVersion',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.undeploy_version_list = data.version_list;
              } else {
                this.$message({
                  message: '查询部署列表失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 版本部署
        deploy: function () {
          var ids = '';
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              ids += vmData.nodeInfos[i].ip + '_' + vmData.nodeInfos[i].nodename + ';';
            }
          }
          if (ids.indexOf(';') > 0) {
            ids = ids.substr(0, ids.length - 1);
          }
          // 查询部署的版本
          var reqData = {
            ids: ids,
            needRestart: vmData.deployFormData.needRestart,
            userId: yufp.session.user.TELLER_ID,
            version: vmData.deployFormData.version
          };
          // 开始版本部署
          yufp.service1.request({
            id: 'listVersion',
            data: reqData,
            name: 'cm/deploy/startDeploy',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.deployDialogVisiable = false;
                vmData.dialogFormVisible = true;
              } else {
                this.$message({
                  message: '部署失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 版本回退
        unDeploy: function () {
          var ids = '';
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              ids += vmData.nodeInfos[i].ip + '_' + vmData.nodeInfos[i].nodename + ';';
            }
          }
          if (ids.indexOf(';') > 0) {
            ids = ids.substr(0, ids.length - 1);
          }
          // 查询部署的版本
          var reqData = {
            ids: ids,
            userId: yufp.session.user.TELLER_ID,
            version: vmData.unDeployFormData.version
          };
          // 开始版本部署
          yufp.service1.request({
            id: 'startUnDeploy',
            data: reqData,
            name: 'cm/deploy/startUnDeploy',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.undeployDialogVisiable = false;
                vmData.backDetailPageVisible = true;
              } else {
                this.$message({
                  message: '回退失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 开启服务器
        startServer: function () {
          var nodeList = [];
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              var obj = {};
              obj.hostip = vmData.nodeInfos[i].ip;
              obj.nodeName = vmData.nodeInfos[i].nodename;
              nodeList.push(obj);
            }
          }

          if (nodeList.length == 0) {
            this.$message({
              message: '至少选中一台服务器进行操作',
              type: 'warning'
            });
            return;
          }
          var reqData = {
            userId: yufp.session.user.TELLER_ID,
            list: nodeList
          };

          yufp.service1.request({
            id: 'startNodes',
            data: reqData,
            name: 'cm/node/startNodes',
            callback: function (code, message, data) {
              if (code == 0) {
                vm.$message({
                  message: '启动成功！'
                });
                for (var i = 0; i < vmData.nodeInfos.length; i++) {
                  // 被选中节点的服务状态改变
                  if (vmData.nodeInfos[i].checked) {
                    vmData.nodeInfos[i].serverstatus = true;
                    Vue.set(vmData.nodeInfos, i, vmData.nodeInfos[i]);
                  }
                }
              } else {
                this.$message({
                  message: '启动失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 停止服务器
        stopServer: function () {
          var nodeList = [];
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              var obj = {};
              obj.hostip = vmData.nodeInfos[i].ip;
              obj.nodeName = vmData.nodeInfos[i].nodename;
              nodeList.push(obj);
            }
          }
          if (nodeList.length == 0) {
            this.$message({
              message: '至少选中一台服务器进行操作',
              type: 'warning'
            });
            return;
          }
          var reqData = {
            userId: yufp.session.user.TELLER_ID,
            list: nodeList
          };

          yufp.service1.request({
            id: 'stopNodes',
            data: reqData,
            name: 'cm/node/stopNodes',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vm.$message({
                  message: '停止成功！'
                });
                for (var i = 0; i < vmData.nodeInfos.length; i++) {
                  // 被选中节点的服务状态改变
                  if (vmData.nodeInfos[i].checked) {
                    vmData.nodeInfos[i].serverstatus = false;
                    Vue.set(vmData.nodeInfos, i, vmData.nodeInfos[i]);
                  }
                }
              } else {
                this.$message({
                  message: '停止失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 版本文件上传服务器
        submitUpload: function () {
          this.$refs.upload.submit();
          // 上传文件
          // yufp.service1.uploadFile({
          //     id:"upload",
          //     name:"trade/file/upload",
          //     data:{
          //         file:"file",
          //         tellerId:999999,
          //         // fileList:vmData.fileList1,
          //     },
          //     callback:function(code,message,data){
          //         //请求成功
          //         if(code=="0"){
          //             fox.layer.open("文件上传成功 response:"+data);
          //         }else{
          //             fox.layer.open("文件上传失败 response:"+message);
          //         }
          //     }
          // });
        },

        handleRemove: function (file, fileList) {
          yufp.logger.info(file, fileList);
        },
        handlePreview: function (file) {
          yufp.logger.info(file);
        },
        beforeRemove: function (file, fileList) {
          return this.$confirm('确定移除 ${ file.name }？');
        },
        beforeUpload: function () {
          return true;
        },
        initApplist: function () {
          // 初始化服务节点
          let reqData = { page: 1, size: 9999 };
          yufp.service.request({
            data: reqData,
            name: backend.bcmpService + '/bcmpSmNodeinfo/index',
            callback: (code, message, data) => {
              for (var i = 0; i < data.data.length; i++) {
                let rowdata = {};
                rowdata.nodename = data.data[i].nodeName; // 节点名称
                rowdata.nodetype = data.data[i].nodeType; // 节点类型
                rowdata.starttime = ''; // 启动时间
                rowdata.serverstatus = false; // 节点状态
                rowdata.conncount = data.data[i].isLink; // 连接数量
                rowdata.ip = data.data[i].hostIp;// ip
                rowdata.index = i + 1; // 节点索引
                rowdata.checked = false; // 节点索引
                rowdata.disabled = true;// 节点可用
                this.nodeInfos.push(rowdata);
              }
            }
          });
        },
        uuid: function () {
          var s = [];
          var hexDigits = '0123456789abcdef';
          for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
          }
          s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
          s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
          s[8] = s[13] = s[18] = s[23] = '-';
          var uuid = s.join('');
          return uuid;
        },
        // 建立 WebSocket
        connectSocket: function () {
          var me = this;
          let clilentId = this.uuid();
          let wsUrl = yufp.settings.url + '/websocket/' + clilentId;
          me.socketClient = new WebSocket('ws://' + wsUrl);
          me.socketClient.onopen = function (message) {
            yufp.logger.info('Connection open ...' + wsUrl);
          };
          me.socketClient.onmessage = function (message) {
            yufp.logger.info('Connection onmessage ...' + message);
          };
          me.socketClient.onclose = function (message) {
            yufp.logger.info('Connection onclose ...');
            clearInterval(me.queryNodeInfoInterval);
          };
          me.socketClient.onerror = function (message) {
            me.$message({ message: '建立连接失败，请刷新请求', type: 'warning' });
            yufp.logger.info('Connection error ...');
            clearInterval(me.queryNodeInfoInterval);
          };
          let queryNodeInfoFn = function () {
            var nodeInfos = vmData.nodeInfos;
            for (var i = 0; i < vmData.nodeInfos.length; i++) {
              nodeInfos[i].disabled = !nodeInfos[i].disabled;
            }
          };
          this.queryNodeInfoInterval = setInterval(queryNodeInfoFn, 1000 * 5);
        },
        // 关闭 WebSocket
        closeSocket: function () {
          var me = this;
          if (me.term != null) {
            me.term.dispose();
            me.term = null;
          }
          if (me.socketClient != null) {
            me.socketClient.close();
            me.socketClient = null;
          }
        },
        // 重新连接
        reConnectSocket: function () {
          this.isRefreshConnection = true;
          this.closeSocket();
          this.connectSocket();
        }
      },
      watch: {
        filterText: function (val) {
          this.$refs.orgTree.filter(val);
        }
      },
      // 界面加载成功
      mounted: function () {
        // 初始化服务节点
        this.initApplist();
        // 创建websocket连接
        this.connectSocket();
      },
      // 销毁的时候
      destroyed: function () {
        yufp.logger.info('page destroyed ...');
        this.closeSocket();
      }
    });
    yufp.eventproxy.unbind('deploy');
    yufp.eventproxy.bind('deploy', function (content) {
      // 节点位置
      var action = content.action;
      // 节点状态
      var taskStatus = content.taskStatus;
      // 消息
      var detail = content.detail;
      addElementLi('parentUl', detail);
      // 准备阶段
      if (action == 'prepare') {
        // 完成准备阶段
      } else if (action == 'finishPrepare') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.step = '1';
        }
        // 上传成功
      } else if (action == 'transmit') {
        // 完成上传
      } else if (action == 'finishTransmit') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.step = '2';
        }
        // 解压文件
      } else if (action == 'uncompress') {
        // 完成解压文件
      } else if (action == 'finishUncompress') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.step = '3';
        }
        // 开始备份
      } else if (action == 'backup') {
        // 完成备份
      } else if (action == 'finishBackup') {
        // 更新成功
      } else if (action == 'update') {
        // 完成更新
      } else if (action == 'finishUpdate') {
        // 检验成功
      } else if (action == 'check') {
        // 校验完成
      } else if (action == 'finishCheck') {
        // 部署完成
      } else if (action == 'finish') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.step = '4';
        }
      }
    }, true);

    // 版本回退监听
    yufp.eventproxy.unbind('unDelopy');
    yufp.eventproxy.bind('unDelopy', function (content) {
      // 节点位置
      var action = content.action;
      // 节点状态
      var taskStatus = content.taskStatus;
      // 消息
      var detail = content.detail;
      addElementLi('backMsgPan', detail);
      // 准备阶段
      if (action == 'prepare') {
        // 完成准备阶段
      } else if (action == 'finishPrepare') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.backstep = '1';
        }
        // 停止服务器
      } else if (action == 'shutdown') {
        // 停止服务器
      } else if (action == 'finishShutdown') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.backstep = '2';
        }
        // 回退
      } else if (action == 'rollback') {
        // 回退成功
      } else if (action == 'finishRollback') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.backstep = '3';
        }
        // 开始启动
      } else if (action == 'startup') {
        // 开始启动
      } else if (action == 'finishStartup') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.backstep = '4';
        }
        // 部署完成
      } else if (action == 'check') {
        // 校验完成
      } else if (action == 'finishCheck') {
        // 部署完成
      } else if (action == 'finish') {
        // 01-节点成功
        if (taskStatus == '01') {
          vmData.backstep = '5';
        }
      }
    }, true);

    // 节点状态监听
    yufp.eventproxy.unbind('nodestatus');
    yufp.eventproxy.bind('nodestatus', function (content) {
      // IP
      var hostip = content.hostip;
      // 节点名称
      var nodeName = content.nodeName;
      // 节点状态 01-启动
      var status = content.status;
      if (status == '01') {
        var nodeInfos = vmData.nodeInfos;
        for (var i = 0; i < vmData.nodeInfos.length; i++) {
          var ip = nodeInfos[i].HOSTIP;
          if (hostip == ip) {
            nodeInfos[i].disabled = true;
          }
        }
      }
    }, true);
  };
  // 消息处理
  exports.onmessage = function (type, message) {
  };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {
  };
  function addElementLi (obj, msg) {
    var ul = document.getElementById(obj);
    // 添加 li
    var li = document.createElement('li');
    // 设置 li 属性，如 id
    li.setAttribute('id', 'newli');
    li.innerHTML = msg;
    ul.appendChild(li);
  }
});
