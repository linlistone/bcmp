/**
 * @Created by   on 2020-3-1 17:06:47.
 * @updated by
 * @description 代理状态查询
 */
define(null, function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('HOST_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.bcmpService + '/agent/index',
          formdata: {},
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        // 重启代理服务
        rebootFn: function () {
          this.doAction('reboot', '重启');
        },
        // 停止代理服务
        shutdownFn: function () {
          this.doAction('shutdown', '停止');
        },
        doAction: function (action, msg) {
          var _this = this;
          let selections = _this.$refs['refTable'].selections;
          if (selections.length == 0) {
            this.$message({
              message: '请先选择要' + msg + '的代理服务',
              type: 'warning'
            });
            return;
          }
          var id = '';
          for (var i = 0; i < selections.length; i++) {
            var row = selections[i];
            if (row.agentInfo.rmiStatus == 'UP') {
              id = id + ',' + row.hostInfo.hostIp;
            } else {
              _this.$message({
                message: '只能' + msg + 'rmi在线的代理',
                type: 'warning'
              });
              return;
            }
          }
          _this.$confirm('确定要' + msg + '吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 开始删除
            var ipArr = [];
            for (var i = 0; i < selections.length; i++) {
              ipArr.push(selections[i].hostInfo.hostIp);
            }
            // 提交服务
            _this.rebootSubmit(ipArr, action, msg);
          }).catch(function () {
          });
        },
        // 提交
        rebootSubmit: function (ipArr, action, msg) {
          var _this = this;
          var listArr = [];
          for (var i = 0; i < ipArr.length; i++) {
            var rowid = ipArr[i];
            listArr.push(rowid);
          }
          var selectedList = listArr.join(',');
          yufp.service.request({
            method: 'POST',
            name: backend.bcmpService + `/agent/${action}Batch?ips=${selectedList}`,
            callback: function (code, message, response) {
              if (code === 0 && response.code == 0) {
                _this.$message({
                  message: msg + '命令发送成功！'
                });
                _this.$refs['refTable'].remoteData();
              } else {
                _this.$message({
                  showClose: true,
                  message: msg + '命令发送失败！' + response.message,
                  type: 'error'
                });
              }
            }
          });
        }
      }
    });
  };
});