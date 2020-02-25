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
      formDisabled: false
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
          var condition = {
            condition: {
              tableName: row.tableName
            }
          };
          _this.cutTableName = row.tableName;
          // 查询功能数据
          _this.$refs['refColumnTable'].remoteData(condition);
        },
        /** 代码生成 **/
        codeFn: function () {
          let selections = this.$refs['refTable'].selections;
          if (selections.length == 0) {
            this.$message({
              message: '请先选择要生成的数据表',
              type: 'warning'
            });
            return;
          }
          var tableNames = '';
          for (var i = 0; i < selections.length; i++) {
            var row = selections[i];
            tableNames = tableNames + ',' + row.tableName;
          }
          tableNames = tableNames.substr(1);
          var moduleName = this.queryForm.tableName;
          if (moduleName == '') {
            moduleName = 'generator';
          }
          var downloadUrl = backend.generatorService + '/generator/code?tables=' + tableNames;
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