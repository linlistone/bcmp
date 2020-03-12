/**
 * Created by 樊苏超 on 2018/05/01.
 */
define(['./custom/widgets/js/yufpServerstatus.js'], function (require, exports) {
  yufp.lookup.reg('FOX_NODETYPE');
  // 数据源
  var vmData = {
    nodeTypeDic: yufp.lookup.find('NODE_TYPE', true),
    nodeTypeMap: yufp.lookup.find('NODE_TYPE', false),
    showUploadSuccessMsgTag: false,
    queryNodeInfoInterval: {},
    serverstatuschecked: false,
    serverstatusdisabled: true,

    upload: {
      visible: false,
      data: {
        version: '',
        name: ''
      },
      rules: {
        required: true,
        message: '必填项',
        trigger: 'blur'
      },
      fileList: [],
      action: '/api/cluster/uploadfile',
      headers: {
        'Authorization': 'Basic ' + yufp.service.getToken()
      }
    },
    serverstatus: [],
    fileList: [],
    checkList: [],
    checked: false,
    // 节点信息
    nodeInfos: [],
    deployDialogVisiable: false,
    dialogFormVisible: false,
    deployFormData: {
      version: '',
      needRestart: ''
    },
    versionList: [],
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
        // 初始化服务节点
        initApplist: function () {
          this.nodeInfos.splice(0, this.nodeInfos.length);// 清空数组
          yufp.service.request({
            name: backend.bcmpService + '/bcmpSmNodeinfo/all',
            callback: (code, message, data) => {
              for (var i = 0; i < data.data.length; i++) {
                let rowdata = {};
                rowdata.nodeId = data.data[i].nodeId; // 节点id
                rowdata.nodename = data.data[i].nodeName; // 节点名称
                rowdata.nodetype = this.nodeTypeMap[data.data[i].nodeType]; // 节点类型
                rowdata.starttime = ''; // 启动时间
                rowdata.serverstatus = false; // 节点状态
                rowdata.isLink = data.data[i].isLink; // 连接数量
                rowdata.ip = data.data[i].hostIp;// ip
                rowdata.index = i + 1; // 节点索引
                rowdata.checked = false; // 节点索引
                rowdata.disabled = true;// 节点可用
                rowdata.applyPath = data.data[i].applyPath; // 部署路径
                this.nodeInfos.push(rowdata);
              }
              // 返回成功之后，再连接websocket
              this.connectSocket();
            }
          });
        },
        // 建立 WebSocket
        connectSocket: function () {
          var me = this;
          let wsUrl = yufp.settings.url + '/websocket/' + this.uuid();
          me.socketClient = new WebSocket('ws://' + wsUrl);
          me.socketClient.onopen = function (message) {
            yufp.logger.info('Connection open ...' + wsUrl);
          };
          me.socketClient.onmessage = function (message) {
            yufp.logger.info('Connection onmessage=' + message.data);
            me.onWebSocketMessage(message.data);
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
            me.queryNodeInfoStatus();
          };
          this.queryNodeInfoStatus();
          this.queryNodeInfoInterval = setInterval(queryNodeInfoFn, 1000 * 10);
        },
        // 节点点击事件
        viewNodeInfo: function (item, index) {
          var customKey = 'custom_' + new Date().getTime(); // 请以custom_前缀开头，并且全局唯一
          var routeId = 'cmnodeinfo'; // 模板示例->普通查询的路由ID
          // 数据
          let nodeInfo = {
            ip: item.ip,
            nodename: item.nodename,
            serverstatus: item.serverstatus,
            conncount: item.conncount
          }; // 传递的业务数据，可选配置
          yufp.bus.put('nodeinfo', 'param', data);
          // 添加新的标签页
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '查看节点', // 页签名称
            data: nodeInfo
          });
        },
        // 全选
        selectAll: function () {
          for (var i = 0; i < this.nodeInfos.length; i++) {
            this.nodeInfos[i].checked = !this.nodeInfos[i].checked;
          }
        },
        // 展示文件上传面板
        showUpload: function () {
          var me = this;
          this.upload.visible = true;
          // this.upload.data.name = 'fox-update-package';
          this.upload.data.version = me.formatTime('yyyyMMdd.hhmmss', new Date());
        },
        // 开启服务器
        startServer: function () {
          this.startOrshutdownNode('startAppBatch', '启动');
        },
        // 停止服务器
        stopServer: function () {
          this.startOrshutdownNode('shutdownAppBatch', '停止');
        },
        startOrshutdownNode: function (action, title) {
          var nodeList = [];
          for (var i = 0; i < vmData.nodeInfos.length; i++) {
            // 被选中状态才加入
            if (vmData.nodeInfos[i].checked) {
              if (vmData.nodeInfos[i].checked) {
                nodeList.push(vmData.nodeInfos[i]);
              }
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
            checkedNodeList: nodeList
          };
          yufp.service.request({
            method: 'POST',
            data: reqData,
            name: backend.bcmpService + '/cluster/' + action,
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: title + '命令发送成功！'
                });
              } else {
                this.$message({
                  message: title + '命令发送失败',
                  type: 'warning'
                });
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
        // 查询应用节点状态
        queryNodeInfoStatus: function () {
          yufp.service.request({
            method: 'get',
            name: backend.bcmpService + '/cluster/getNodesState',
            callback: function (code, message, response) {
              yufp.logger.debug('nodeInfoStatus code' + code + ' message' + message);
            }
          });
        },
        // 接收websocket返回信息
        onWebSocketMessage: function (message) {
          let nodeInfo = JSON.parse(message);
          let wsType = nodeInfo.wsType;
          let wsData = nodeInfo.wsData;
          let nodeId = nodeInfo.nodeId;
          if (wsType == 'nodestatus') {
            yufp.logger.info('nodeId[' + nodeId + '] nodestatus[' + wsData + ']');
            for (let i = 0; i < vmData.nodeInfos.length; i++) {
              let vnode = vmData.nodeInfos[i];
              if (nodeId == vnode.nodeId) {
                if (wsData == 'true') {
                  vmData.nodeInfos[i].serverstatus = true;
                  vmData.nodeInfos[i].disabled = false;
                } else {
                  vmData.nodeInfos[i].serverstatus = false;
                  vmData.nodeInfos[i].disabled = true;
                }
              }
            }
          }
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
        },
        closeUpload: function () {
          this.upload.visible = false;
          this.upload.fileList = [];
          // 修复：YUSP-168 应用登记-上传版本文件点击取消或右上角×，文件实际还是在上传
          // 关闭前取消上传
          this.abortUploading();
        },
        uploadFile: function () {
          // 增加上传前校验
          if (this.$refs.uploadList.uploadFiles.length == 0) {
            this.$message('请先选择文件!');
            return false;
          }
          this.$refs.uploadList.submit();
          this.btnUploadDisabled = true;
        },
        abortUploading: function () {
          // 修复：YUSP-168 应用登记-上传版本文件点击取消或右上角×，文件实际还是在上传
          // 取消上传文件
          this.upload.visible = false;
          this.$refs.uploadList.clearFiles();
          this.$refs.uploadList.abort();
          this.btnUploadDisabled = false;
          this.showUploadSuccessMsgTag = false;
        },
        // 上传之前验证文件
        fileChange: function (file, fileList) {
          var fileName = file.name;
          var suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
          if (suffix != 'jar' && suffix != 'war' && suffix != 'zip') {
            fileList.pop();
            this.$message('请选择jar,war或zip文件！');
          } else {
            if (fileList.length > 1) {
              fileList.pop();
              fileList[0] = file;
            }
          }
        },
        // 文件上传之前参数校验
        beforeUpload: function () {
          if (this.upload.data.name == '' || this.upload.data.version == '') {
            this.$message('请确认版本号已填写和服务名已有!');
            return false;
          }
        },
        // 上传成功回调函数
        handleAvatarSuccess: function (res, file) {
          if (res.code == '0') {
            this.$message({ message: '文件上传成功', type: 'success' });
            this.btnUploadDisabled = false;
            this.showUploadSuccessMsgTag = false;
            this.upload.visible = false;
            this.upload.fileList = [];
          } else {
            this.$message({ message: '上传文件失败' + res.message, type: 'warning' });
          }
        },
        onUploadProgress: function (event, file, fileList) {
          if (event.percent >= 100) {
            this.showUploadSuccessMsgTag = true;
          }
        },
        // 上传失败回调函数
        handleAvatarErr: function () {
          this.$message({ message: '上传文件失败', type: 'warning' });
          this.btnUploadDisabled = false;
          this.showUploadSuccessMsgTag = false;
        },
        formatTime: function (fmt, value) {
          var o = {
            'M+': value.getMonth() + 1, // 月份
            'd+': value.getDate(), // 日
            'h+': value.getHours(), // 小时
            'm+': value.getMinutes(), // 分
            's+': value.getSeconds(), // 秒
            'q+': Math.floor((value.getMonth() + 3) / 3), // 季度
            'S': value.getMilliseconds() // 毫秒
          };
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
          }
          return fmt;
        }
      },
      watch: {

      },
      computed: {
        uploadAction: function () {
          return yufp.service.getUrl({
            url: this.upload.action
          });
        }
      },
      // 界面加载成功
      mounted: function () {
        // 初始化服务节点
        this.initApplist();
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
