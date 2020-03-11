/**
 * @created by {{username}} on {{sys_date}}
 * @updated by
 * @description {{pageDesc}}
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (code, data, cite) {
    // vue data
    let vmData = {
      nodeTypeDic: yufp.lookup.find('HOST_TYPE', true),
      upload: {
        visible: false,
        data: {
          versionUploadUse: yufp.session.userId
        },
        rules: {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        fileList: [],
        action: '/api/bcmpSmVersion/uploadfile',
        headers: {
          'Authorization': 'Basic ' + yufp.service.getToken()
        }
      },
      formDisabled: true,
      saveBtnShow: true,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 表单数据
      formdata: {},
      dataUrl: backend.adminService + '/bcmpSmVersion/index',
      buttonName: '', // 弹出框提交按钮名称
      dialogVisible: false // 弹出框层是否可见
    };
    // 创建vue model
    const vm = new Vue({
      el: cite.el,
      // 数据
      data: vmData,
      // 计算属性
      computed: {
        uploadAction: function () {
          return yufp.service.getUrl({
            url: this.upload.action
          });
        }
      },
      // 方法
      methods: {
        // 展示文件上传面板
        showUpload: function () {
          var me = this;
          this.upload.visible = true;
          // this.upload.data.name = 'fox-update-package';
          this.upload.data.versionNum = me.formatTime('yyyyMMdd.hhmmss', new Date());
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
          if (suffix != 'jar' && suffix != 'war') {
            fileList.pop();
            this.$message('请选择jar或war文件！');
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
        },
        // 新增按钮事件
        addFn: function (data) {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.formdata.joinDt = new Date();
        },
        // 修改数据按钮
        modifyFn: function (viewData) {
          var _this = this;
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(viewData, _this.formdata);
          });
        },
        // 查看数据明细
        infoFn: function (viewData) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
            yufp.clone(viewData, _this.formdata);
          });
        },
        // 批量删除
        deleteFn: function (viewData) {
          var _this = this;
          this.$confirm('确定要删除【' + viewData.versionId + '】吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 调用删除提交服务
            var versionId = viewData.versionId;
            yufp.service.request({
              method: 'POST',
              name: backend.adminService + '/bcmpSmVersion/delete/' + versionId,
              callback: function (code, message, response) {
                if (code == '0' && response.code == '0') {
                  vm.$message({
                    message: '数据删除成功！'
                  });
                  _this.$refs['refTable'].remoteData();
                } else {
                  vm.$message({
                    message: '数据删除失败',
                    type: 'warning'
                  });
                }
              }
            });
          }).catch(function () { });
        },
        // 提交功能
        submitFn: function () {
          var _this = this;
          if (_this.viewType == 'ADD') {
            // 走添加接口
            this.addData();
          } else {
            // 走编辑接口
            this.editData();
          }
        },
        // 取消按钮
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          vm.roleNames = [];
          _this.$refs['refTable'].clearSelection();
        },
        // 新增保存
        addData: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/bcmpSmVersion/create',
            callback: function (code, message, response) {
              if (code === 0) {
                if (response.data.code == 2) {
                  vm.$message({
                    message: response.data.message,
                    type: 'warning'
                  });
                } else {
                  vm.$message({
                    message: '数据保存成功！'
                  });
                  _this.dialogVisible = false;
                  _this.$refs['refTable'].remoteData();
                  _this.$refs['refTable'].clearSelection();
                }
              } else {
                vm.$alert('服务端请求失败!' + message, '提示', {
                  confirmButtonText: '确定',
                  callback: function () { }
                });
              }
            }
          });
        },
        // 修改提交
        editData: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.lastChgUsr = yufp.session.userId;
          yufp.service.request({
            method: 'POST',
            data: model,
            name: backend.adminService + '/bcmpSmVersion/update',
            callback: function (code, message, response) {
              if (code === 0) {
                vm.$message({
                  message: '数据更新成功！'
                });
                _this.dialogVisible = false;
                _this.$refs['refTable'].remoteData();
                _this.$refs['refTable'].clearSelection();
              } else {
                vm.$alert('服务端请求失败!', '提示', {
                  confirmButtonText: '确定',
                  callback: function () { }
                });
              }
            }
          });
          this.$refs['refTable'].clearSelection();
        },
        // 弹出框状态控制
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.$nextTick(function () {
            _this.$refs['refForm'].resetFields();
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