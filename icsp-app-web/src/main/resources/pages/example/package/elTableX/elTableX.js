/**
 * Created by helin3 on 2017/11/26.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 注册该功能要用到的数据字典
    yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: '#el_table_x_demo',
      data: function () {
        var _this = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          checkbox: true,
          dataUrl: '/trade/example/list',
          dataParams: {},
          tableFilters: {
            statusFilter: function (value) {
              if (!value) {
                return '';
              }
              return yufp.lookup.convertKey('PUBLISH_STATUS', value);
            }
          },
          hideColumn: true,
          selectFlag: false,
          tableColumns: [
            { label: '编码', prop: 'id', sortable:'custom'},
            { label: '名称',
              prop: 'title',
              width: 260,
              sortable: true,
              resizable: true,
              template: function () {
              // 自定义渲染模板,里面的内容可以是原生HTML或element-ui，此处暂且仅支持事件监听，至于格式化内容请参考formatter方法
              // 关于如何配置click事件方法，
              // 1、固定写法：_$event('custom-row-click', scope) ，其中custom-row-click是用于在组件内部触发事件方法，scope是传递的参数
              // 2、在el-table-x组件上通过配置监听：@custom-row-click="customRowClick" ，其中customRowClick是当前业务功能接收事件处理的方法
                return '<templates scope="scope">\
                                <a href="javascipt:void(0);" style="text-decoration:underline;" @click="$emit(\'custom-row-click\', scope)">{{ scope.row.title }}</a>\
                            </templates>';
              } },
            { label: '标志',
              prop: 'flag',
              width: 110,
              renderHeader: function (createElement, data) {
                return createElement('span', [
                  createElement('el-checkbox',
                    {
                      style: 'margin-left: 5px;',
                      on: {
                        change: _this.changex
                      }
                    }), createElement('span', data.column.label)
                ]);
              },
              template: function () {
                return '<templates slot-scope="scope">\
                 <el-checkbox v-model="scope.row.selectFlag" @change="$emit(\'change\', scope)">{{scope.row.flag}}</el-checkbox>\
                 </templates>';
              }},
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY', hidden: true},
            { label: '参与人',
              headerAlign: 'center',
              children: [
                { label: '作者', prop: 'author', width: 110 },
                { label: '审核人', prop: 'auditor', width: 110 }
              ]
            },
            { label: '阅读数', prop: 'pageviews', width: 100},
            { label: '状态',
              prop: 'status',
              width: 80,
              dataCode: 'PUBLISH_STATUS',
              template: function () {
                return '<templates scope="scope">\
                                <el-tag :type="scope.row.status === \'deleted\' ? \'danger\' : \'success\'">{{ scope.row.status | statusFilter }}</el-tag>\
                            </templates>';
              }},
            { label: '操作',
              width: 160,
              fixed: 'right',
              template: function () {
                return '<templates scope="scope">\
                                <el-button size="small" @click="$emit(\'custom-row-op\', scope, \'edit\')">编辑</el-button>\
                                <el-button size="small" type="danger" @click="$emit(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                            </templates>';
              }}
          ]
        };
      },
      methods: {
        createFn: function () {
          this.$alert('新增操作', '提示');
        },
        editFn: function () {
          if (this.$refs.mytable.selections.length != 1) {
            this.$alert('请选择一条记录', '提示');
            return;
          }
          var id = this.$refs.mytable.selections[0].id;
          this.$alert('修改操作, 你选择的ID为：' + id, '提示');
        },
        deleteFn: function () {
          if (this.$refs.mytable.selections.length < 1) {
            this.$alert('请至少选择一条数据', '提示');
            return;
          }
          var id = [], selections = this.$refs.mytable.selections;
          for (var i = 0; i < selections.length; i++) {
            id.push(selections[i].id);
          }
          this.$alert('删除操作, 你选择的ID为：' + id.join(','), '提示');
        },
        customRowClick: function (scope) {
          // 当前行号：scope.$index
          // 当前行数据：scope.row
          // 当前列对象：scope.column
          this.$alert('你选择的行ID值为：' + scope.row.id, '提示');
        },
        customRowOp: function (scope, op) {
          // 当前行号：scope.$index
          // 当前行数据：scope.row
          // 当前列对象：scope.column
          this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.id, '提示');
        },
        changex: function (val) {
          // 注释为全选
          var tb = this.$refs.mytable;
          var data = tb.data;
          tb.data = [];
          for (var i = 0; i < data.length; i++) {
            data[i].selectFlag = !this.selectFlag;
            tb.data[i] = data[i];
          }
          this.selectFlag = !this.selectFlag;
        },
        change: function (scope) {
          this.$alert('复选框值为：' + scope.row.selectFlag);
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