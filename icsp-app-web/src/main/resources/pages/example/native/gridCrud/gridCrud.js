/**
 * Created by helin3 on 2017/11/16.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg("CUST_TYPE,IDENT_TYPE,NATIONALITY");
    yufp.lookup.reg('NATIONALITY');
    var parseTime = function (time, cFormat) {
      if (arguments.length === 0) {
        return null;
      }
      var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
      var date;
      if (typeof time === 'object') {
        date = time;
      } else {
        if (('' + time).length === 10) {
          time = parseInt(time) * 1000;
        };
        date = new Date(time);
      }
      var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
        var value = formatObj[key];
        if (key === 'a') {
          return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        };
        if (result.length > 0 && value < 10) {
          value = '0' + value;
        }
        return value || 0;
      });
      return timeStr;
    };
    // 创建virtual model
    yufp.custom.vue({
      el: '#example_gridcrud',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: {
        height: yufp.custom.viewSize().height - 160,
        mainGrid: {
          data: null,
          total: null,
          loading: false,
          currentRow: null,
          paging: {
            page: 1,
            size: 10
          },
          query: {
            title: '',
            createAt: '',
            type: ''
          }
        },
        typeOptions: [],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        dialogDisabled: true,
        temp: {
          id: undefined,
          importance: 0,
          remark: '',
          createAt: 0,
          title: '',
          type: '',
          status: 'published'
        },
        textMap: {
          update: '修改',
          create: '新增',
          detail: '详情'
        }
      },
      mounted: function () {
        var _this = this;
        yufp.lookup.bind('NATIONALITY', function (options) {
          _this.typeOptions = options;
        });
        this.queryMainGridFn();
      },
      filters: {
        statusFilter: function (status) {
          var statusMap = {
            published: 'success',
            draft: 'gray',
            deleted: 'danger'
          };
          return statusMap[status];
        },
        typeFilter: function (key) {
          return yufp.lookup.convertKey('NATIONALITY', key);
        }
      },
      methods: {
        startChangeFn: function (val) {
          this.mainGrid.paging.page = val;
          this.queryMainGridFn();
        },
        sizeChangeFn: function (val) {
          this.mainGrid.paging.page = 1;
          this.mainGrid.paging.size = val;
          this.queryMainGridFn();
        },
        rowClickFn: function (row) {
          this.mainGrid.currentRow = row;
        },
        queryMainGridFn: function () {
          var _this = this;
          _this.mainGrid.loading = false;
          var param = {
            page: _this.mainGrid.paging.page,
            size: _this.mainGrid.paging.size,
            condition: JSON.stringify({
              title: _this.mainGrid.query.title,
              createAt: _this.mainGrid.query.createAt ? parseTime(_this.mainGrid.query.createAt, '{y}-{m}-{d}') : '',
              type: _this.mainGrid.query.type
            })
          };
          // 发起请求
          yufp.service.request({
            method: 'GET',
            url: '/trade/example/list',
            data: param,
            callback: function (code, message, response) {
              _this.mainGrid.data = response.data;
              _this.mainGrid.total = response.total;
              _this.mainGrid.loading = false;
            }
          });
        },
        resetQueryCondFn: function () {
          this.mainGrid.paging = {
            page: 1,
            size: 10
          };
          this.mainGrid.query = {
            title: '',
            createAt: '',
            type: ''
          };
        },
        resetTempFn: function () {
          this.temp = {
            id: undefined,
            importance: 0,
            remark: '',
            createAt: 0,
            title: '',
            status: 'published',
            type: ''
          };
        },
        openCreateFn: function () {
          this.resetTempFn();
          this.dialogDisabled = false;
          this.dialogStatus = 'create';
          this.dialogFormVisible = true;
        },
        saveCreateFn: function () {
          this.temp.id = parseInt(Math.random() * 100) + 1024;
          this.temp.createAt = parseTime(new Date(), '{y}-{m}-{d}');
          this.temp.author = '原创作者';
          this.dialogFormVisible = false;
          // fetchSave(this.temp).then(response => {
          //         this.$notify({ title: '提示', message: '保存成功', type: 'success' })
          //     this.queryMainGridFn()
          // })
          // this.list.unshift(this.temp)
        },
        openEditFn: function () {
          if (!this.mainGrid.currentRow) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.temp = Object.assign({}, this.mainGrid.currentRow);
          this.dialogDisabled = false;
          this.dialogStatus = 'update';
          this.dialogFormVisible = true;
        },
        saveEditFn: function () {
          this.temp.createAt = parseTime(new Date(), '{y}-{m}-{d}');
          this.dialogFormVisible = false;
          // fetchSave(this.temp).then(response => {
          //         this.$notify({ title: '提示', message: '保存成功', type: 'success', duration: 2000 })
          //     this.queryMainGridFn()
          // })
        },
        openDetailFn: function () {
          if (!this.mainGrid.currentRow) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.temp = Object.assign({}, this.mainGrid.currentRow);
          this.dialogDisabled = true;
          this.dialogStatus = 'detail';
          this.dialogFormVisible = true;
        },
        handleExportFn: function () {

        },
        handleModifyStatus: function (row, status) {
          if (status === 'deleted') {
            // fetchDel({
            //         ids: row.id
            //     }).then(() => {
            //         this.$message({ message: '操作成功', type: 'success' })
            //     this.queryMainGridFn()
            // })
          } else {
            this.$message({message: '操作成功', type: 'success'});
            row.status = status;
          }
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {


  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});