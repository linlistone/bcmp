/**
 * @Created by 林立 20190906
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    var vmData = {
      queryForm: {
        tableName: ''
      },
      dataUrl: backend.generatorService + '/generator/tableList',
      columnDataUrl: backend.generatorService + '/generator/columnList',
      viewTitle: '代码生成',
      cutTableName: '',
      columnload: false,
      formDisabled: false,
      dialogVisible: false
    };
    // 注册功能要用到的数据字典 数据字典名称在数据字典中定义
    let vm = new Vue({
      el: cite.el,
      data: vmData,
      computed: {},
      methods: {
        /** 查询 **/
        queryFn: function () {
          var _this = this;
          var params = {
            condition: JSON.stringify({
              tableName: _this.queryForm.tableName
            })
          };
          _this.$nextTick(function () {
            _this.$refs['refTable'].remoteData(params);
          });
        },
        // 表格选择事件
        tableSelect: function (row) {
          let _this = this;
          _this.cutTableName = row;
        },
        codeFn: function (row) {
          let _this = this;
          _this.viewTitle = row.tableComment + '(' + row.tableName + ')';
          _this.cutTableName = row;
          _this.dialogVisible = true;
          // 查询功能数据
          var condition = {
            condition: {
              tableName: row.tableName
            }
          };
          _this.$nextTick(function () {
            _this.$refs['refColumnTable'].remoteData(condition);
            _this.$refs['refForm'].formdata.tradeType = 'single';
            _this.$refs['refForm'].formdata.createType = 'spring';
          });
        },
        cancelFn: function () {
          let _this = this;
          _this.dialogVisible = false;
        },
        /** 代码生成 **/
        qeneratorFn: function () {
          let _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var tableName = _this.cutTableName.tableName;
          var moduleName = _this.$refs['refForm'].formdata.moduleName;
          var tradeType = _this.$refs['refForm'].formdata.tradeType;
          var createType = _this.$refs['refForm'].formdata.createType;
          var downloadUrl = backend.generatorService + '/generator/code?tableName=' +
            tableName + '&moduleName=' + moduleName + '&tradeType=' + tradeType + '&createType=' + createType;
          yufp.util.download(downloadUrl);
        }

      },
      mounted: function () {
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