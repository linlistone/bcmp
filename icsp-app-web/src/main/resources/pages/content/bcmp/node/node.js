/**
 * Created by 樊苏超 on 2018/05/01.
 */
define(function (require, exports) {
  var getinfoTimer;
  // 数据源
  var vmData = {
    ip: '',
    nodename: '',
    serverstatus: '',
    conncount: '',
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
    // 运行时间
    RUNNINGTIME: '',
    // 版本回退
    undeployDialogVisiable: false,
    unDeployFormData: {
      version: ''
    },
    undeployVersionList: [],
    // 回退步骤位置
    backstep: 0,
    backDetailPageVisible: false,
    // 数据库连接池信息
    dbpoolinfo: [],
    // 步骤位置
    step: '',
    filedev: [],
    activedthread: '',
    THREADCOUNT: '',
    DAEMONTHREADCOUNT: '',
    STARTEDTHREDCOUNT: '',
    classloadnumber: '',
    LoadedClassCount: '',
    uninstalledclassescount: '',
    JvmInputArguments: '',
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    // height: height,
    // 属性说明，实际使用时不需要此部分
    currClickNode: '',
    data2: [], // 机构树数据
    nodeKey: [],
    resultLogFiles: [],
    currentUrl: '',
    sawLogView: false,
    logMessage: ''
    // indexFlag:'',
  };
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var param = data;
    var status = param.serverstatus;
    var serverstatus = '';
    if (status == true) {
      serverstatus = '已启动';
    } else {
      serverstatus = '未启动';
    }
    // 创建virtual model
    var vm = yufp.custom.vue({
      el: cite.el,
      data: vmData,
      methods: {
        downloadLog: function (name) {
          let requestUrl = 'http://192.144.128.218:9391/FSdot' + vmData.currentUrl.substr(25) + '/' + name;
          yufp.service.requestHttp({
            name: requestUrl,
            callback: function (code, message, data) {
              if (code == 0) {
                vmData.sawLogView = true;
                vmData.logMessage = data;
              } else {
                this.$message({
                  message: '请求失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 获取日志文件目录
        getLogFiles: function (name, logType) {
          if (logType == '-2') {
            this.currentUrl = '';
          }
          yufp.service.request({
            id: 'getLogFiles',
            data: {
              name: name,
              type: logType,
              currentUrl: vmData.currentUrl
            },
            name: 'cm/node/getLogFiles',
            callback: function (code, message, data) {
              yufp.logger.debug(data);
              if (code == 0) {
                vmData.resultLogFiles = data.resultMaps;
                vmData.currentUrl = data.currentUrl;
              } else {
                this.$message({
                  message: '操作失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        // 版本部署
        releaseDeploy: function () {
          // 弹出版本部署对话框
          vmData.deployDialogVisiable = true;

          // 查询部署的版本
          var reqData = {
            type: 'deploy'
          };
          // 请求版本列表
          yufp.service.request({
            id: 'listVersion',
            data: reqData,
            name: 'cm/deploy/listVersion',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.versionList = data.versionList;
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
          // 弹出版本部署对话框
          vmData.undeployDialogVisiable = true;
          // 查询部署的版本
          var reqData = {
            type: 'rollbacker',
            ids: param.ip + '_' + param.nodename
          };
          // 请求版本列表
          yufp.service.request({
            id: 'listVersion',
            data: reqData,
            name: 'cm/deploy/listVersion',
            callback: function (code, message, data) {
              // 登录成功
              if (code == 0) {
                vmData.undeployVersionList = data.versionList;
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
          // 查询部署的版本
          var reqData = {
            ids: param.ip + '_' + param.nodename,
            needRestart: vmData.deployFormData.needRestart,
            userId: yufp.session.user.TELLER_ID,
            version: vmData.deployFormData.version
          };
          // 开始版本部署
          yufp.service.request({
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
          // 查询部署的版本
          var reqData = {
            ids: param.ip + '_' + param.nodename,
            userId: yufp.session.user.TELLER_ID,
            version: vmData.unDeployFormData.version
          };
          // 开始版本部署
          yufp.service.request({
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
          var obj = {};
          obj.hostip = param.ip;
          obj.nodeName = param.nodename;
          nodeList.push(obj);
          var reqData = {
            userId: yufp.session.user.TELLER_ID,
            list: nodeList
          };
          yufp.service.request({
            id: 'startNodes',
            data: reqData,
            name: 'cm/node/startNodes',
            callback: function (code, message, data) {
              if (code == 0) {
                vmData.serverstatus = '已启动';
                vm.$message({
                  message: '启动成功！'
                });
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
          var obj = {};
          obj.hostip = param.ip;
          obj.nodeName = param.nodename;
          nodeList.push(obj);

          var reqData = {
            userId: yufp.session.user.TELLER_ID,
            list: nodeList
          };

          yufp.service.request({
            id: 'stopNodes',
            data: reqData,
            name: 'cm/node/stopNodes',
            callback: function (code, message, data) {
              if (code == 0) {
                vmData.serverstatus = '未启动';
                vm.$message({
                  message: '停止成功！'
                });
              } else {
                this.$message({
                  message: '停止失败',
                  type: 'warning'
                });
              }
            }
          });
        },
        bindLabelInfo: function () {
          drawLabel('canvas_cpu', 'cpu');
          drawLabel('canvas_cache', 'cache');
          drawLabel('canvas_thread', 'thread');
        }
      },
      watch: {

      },
      // 界面加载成功
      mounted: function () {
        // this.bindLabelInfo();
        // this.getLogFiles('', '-2');
      }
    });

    // 画文字部分
    function drawLabel (id, type) {
      var domCan = document.getElementById(id);
      var g = domCan.getContext('2d');
      g.fillStyle = '#c30000'; // 文字填充颜色
      g.font = '1rem Adobe Ming Std';
      if (type == 'cpu') {
        g.fillText('CPU使用率：', 100, 20);
        // 初始Y轴绘制
        drawY(id, type);
      }
      if (type == 'cache') {
        g.fillText('内存使用率：', 100, 20);
        g.fillText('当前已使用：', 245, 20);
        g.fillText('总内存：', 400, 20);
      }
      if (type == 'thread') {
        g.fillText('—— 峰值：', 90, 20);
        g.fillStyle = '#66CD00';
        g.fillText('—— 当前线程：', 220, 20);
        g.fillText('守护线程：', 400, 20);
        g.fillText('已启动线程：', 520, 20);
        // 初始Y轴绘制
        drawY(id, type);
      }
    }
    // 绘制Y轴百
    function drawY (id, type, arr) {
      var domCan = document.getElementById(id);
      if (domCan == null) {
        return;
      }
      var height = domCan.height;
      var g = domCan.getContext('2d');
      // 清除原数据
      g.clearRect(0, 0, 30, height);
      // Y轴数值
      let yGroup = [];
      // cpu
      if (type == 'cpu') {
        if (arr && arr.length > 0) {
          // 动态获取百分比
          yGroup = getYPercent(arr);
        } else {
          yGroup = ['0', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'];
        }
      }
      // 内存
      if (type == 'cache') {
      }
      // 线程
      if (type == 'peekThread' || type == 'currentThread') {
        if (arr && arr.length > 0) {
          // 动态获取百分比
          yGroup = getYNum(arr);
        } else {
          yGroup = [0, 20, 40, 60, 80, 100];
        }
      }
      // 上下保留距离  上30px 下11.6px
      var ySpace = (height - 41.6) / (yGroup.length - 1);
      for (var i = 0; i < yGroup.length; i++) {
        g.fillStyle = '#fff'; // 文字填充颜色
        g.font = '0.7rem Adobe Ming Std';
        g.fillText(yGroup[i], 0, height - 11.6 - (ySpace * i));
      }
    }
    // 计算数组最大值
    function getArrayMax (arr) {
      // 先计算最大数值
      let max = 0;
      for (var i in arr) {
        let tampNum = parseFloat(arr[i]);
        if (tampNum > max) {
          max = tampNum;
        }
      }
      return max;
    }
    // 计算百分比向上取整
    function getPercentTenCeil (num) {
      num = parseFloat(num);
      if (isNaN(num)) {
        return 0;
      }
      if (num < 0 || num > 100) {
        return 0;
      }
      if (num < 5) {
        return 5;
      }
      if (num < 10) {
        return 10;
      }
      if (num < 20) {
        return 20;
      }
      if (num < 30) {
        return 30;
      }
      if (num < 40) {
        return 40;
      }
      if (num < 50) {
        return 50;
      }
      if (num < 60) {
        return 60;
      }
      if (num < 70) {
        return 70;
      }
      if (num < 80) {
        return 80;
      }
      if (num < 90) {
        return 90;
      }
      if (num < 100) {
        return 100;
      }
    }
    // 计算Y轴百分比数组
    function getYPercent (arr) {
      let max = getArrayMax(arr);
      let tenCeil = getPercentTenCeil(max);
      var yPercentArr = ['0', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
      let yPercent;
      switch (tenCeil) {
      case 5:
        yPercent = ['0', '5%'];
        break;
      case 10:
        yPercent = yPercentArr.slice(0, 2);
        break;
      case 20:
        yPercent = yPercentArr.slice(0, 3);
        break;
      case 30:
        yPercent = yPercentArr.slice(0, 4);
        break;
      case 40:
        yPercent = yPercentArr.slice(0, 5);
        break;
      case 50:
        yPercent = yPercentArr.slice(0, 6);
        break;
      case 60:
        yPercent = yPercentArr.slice(0, 7);
        break;
      case 70:
        yPercent = yPercentArr.slice(0, 8);
        break;
      case 80:
        yPercent = yPercentArr.slice(0, 9);
        break;
      case 90:
        yPercent = yPercentArr.slice(0, 10);
        break;
      case 100:
        yPercent = yPercentArr.slice(0, 11);
        break;
      }
      return yPercent;
    }

    // 计算数值向上取整
    function getNumCeil (num) {
      num = parseFloat(num);
      if (isNaN(num)) {
        return 0;
      }
      // num%4==0&&num%5==0
      while (num % 20 != 0) {
        num++;
      }
      return num;
    }

    // 计算Y轴数值数组
    function getYNum (arr) {
      let max = getArrayMax(arr);
      let num = getNumCeil(max);
      return [0, num / 5, num / 5 * 2, num / 5 * 3, num / 5 * 4, num];
    }

    // 画线
    function toDraw (arr, id, type) {
      drawY(id, type, arr || []);
      var domCan = document.getElementById(id);
      if (domCan == null) {
        return;
      }
      var width = domCan.width,
        height = domCan.height;
      var g = domCan.getContext('2d');
      g.lineJoin = 'round';
      // 清除线区
      g.clearRect(30, 30, width - 30, height - 30);

      if (type == 'currentThread') {
        toDraw(peekArray, 'canvas_thread', 'peekThread');
      }

      // 清空CPU使用百分比
      if (type == 'cpu') {
        g.clearRect(190, 0, 70, 30);
      }

      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = '#c30000';
      if (type == 'currentThread') {
        g.strokeStyle = '#66CD00';
      }
      g.fillStyle = '#c30000'; // 文字填充颜色
      g.font = '1rem Adobe Ming Std';
      // 设置注释文字
      if (type == 'cpu') {
        g.fillText(arr[arr.length - 1] + '%', 195, 20);
      }
      if (type == 'cache') {
        g.fillText(arr[arr.length - 1] + '%', 195, 20);
      }
      var xSpace = (width - 30) / 50; // 水平点的间隙像素
      // 绘制线条
      for (var i = 0; i < arr.length; i++) {
        var yValue = parseFloat(arr[i]); // 纵坐标值
        let yCeil;// y值上限
        var xLen = width - xSpace * (arr.length - 1 - i);
        var yPont = 0;
        if (type == 'cpu' || type == 'cache') {
          yCeil = getPercentTenCeil(getArrayMax(arr));
        }
        if (type == 'peekThread' || type == 'currentThread') {
          yCeil = getNumCeil(getArrayMax(arr));
        }
        // 上下保留距离 上30px 下11.6px
        yPont = height - 11.6 - (yValue / yCeil * (height - 41.6));
        // var m = xLen + ',' + yPont;
        // yufp.logger.debug(m);
        g.lineTo(xLen, yPont);
      }
      g.stroke();
      g.closePath();
    }
    function bindThreadData (id, peek, current, protect, started) {
      var domCan = document.getElementById(id);
      if (domCan == null) {
        return;
      }
      var g = domCan.getContext('2d');
      g.clearRect(170, 10, 30, 20);
      g.clearRect(330, 10, 30, 20);
      g.clearRect(480, 10, 30, 20);
      g.clearRect(620, 10, 30, 20);
      g.fillStyle = '#c30000'; // 文字填充颜色
      g.font = '1rem Adobe Ming Std';
      g.fillText(peek, 175, 20);
      g.fillStyle = '#66CD00'; // 文字填充颜色
      g.fillText(current, 340, 20);
      g.fillText(protect, 480, 20);
      g.fillText(started, 620, 20);
    }

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

    yufp.eventproxy.unbind('deploy');
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

    // 通过名称查询卡号
    var reqData = {
      hostip: param.ip,
      name: param.nodename
    };
    // 定时任务,每隔5秒刷新CPU，磁盘等信息
    var cpuData = [];
    var peekArray = [],
      currentArray = [];
    getinfoTimer = window.setInterval(function () {
      // 获取当前节点信息
      yufp.service.request({
        data: reqData,
        name: backend.bcmpService + '/cluster/getNodeDetailInfo',
        callback: function (code, message, data) {
          data = data.data;
          yufp.logger.debug(data);
          // 登录成功
          if (code == 0) {
            // CPU
            vmData.CPUUSAGE = data.CPUUSAGE; // CPU使用
            if (cpuData.length > 50) {
              cpuData.splice(0, 1);
            }
            cpuData.push(vmData.CPUUSAGE);
            // 测试,插入随机数
            // let randomNum = Math.random() * 100;
            // randomNum = randomNum.toFixed(2);
            // cpuData.push(randomNum);
            toDraw(cpuData, 'canvas_cpu', 'cpu');
            // 线程监控
            vmData.DAEMONTHREADCOUNT = data.DAEMONTHREADCOUNT; // daemon线程数
            vmData.PEEKTHREADCOUNT = data.PEEKTHREADCOUNT; //
            vmData.STARTEDTHREDCOUNT = data.STARTEDTHREDCOUNT; // 开始的线程数量
            vmData.THREADCOUNT = data.THREADCOUNT; // 线程数量
            bindThreadData('canvas_thread', vmData.PEEKTHREADCOUNT, vmData.THREADCOUNT, vmData.DAEMONTHREADCOUNT, vmData.STARTEDTHREDCOUNT);
            if (peekArray.length > 50) {
              peekArray.splice(0, 1);
            }
            peekArray.push(vmData.PEEKTHREADCOUNT);
            toDraw(peekArray, 'canvas_thread', 'peekThread');
            if (currentArray.length > 50) {
              currentArray.splice(0, 1);
            }
            currentArray.push(vmData.THREADCOUNT);
            toDraw(currentArray, 'canvas_thread', 'currentThread');
            // JVM监控
            vmData.JvmInputArguments = data.JvmInputArguments; // JVM参数
            vmData.LoadedClassCount = data.LoadedClassCount; // 已经加载的class数量
            if (data.RUNNINGTIME != undefined && data.RUNNINGTIME != '') {
              var h = parseInt(data.RUNNINGTIME / 3600000);
              var m = parseInt(data.RUNNINGTIME / 60000) - 60 * h;

              vmData.RUNNINGTIME = h + '小时' + m + '分钟';
            }
            vmData.TOTALMEMORY = data.TOTALMEMORY; // 总的内存
            // 文件系统
            vmData.filedev = data.PartitionState;
            // 数据库连接池
            vmData.dbpoolinfo = data.connpool;
          } else {
            this.$message({
              message: '请求节点信息失败',
              type: 'warning'
            });
          }
        }
      });
    }, 10000);
  };
  // 消息处理
  exports.onmessage = function (type, message) {
  };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {
    window.clearTimeout(getinfoTimer);
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