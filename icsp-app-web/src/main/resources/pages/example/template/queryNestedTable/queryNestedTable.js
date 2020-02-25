/**
 * @created by helin3 on 2017-12-07
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——查询嵌套表格
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          queryFields: [
            { placeholder: '标题', field: 'id', type: 'input' },
            { placeholder: '类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' },
            { placeholder: '作者', field: 'author', type: 'input' }
          ],
          dataUrl: '/trade/example/list',
          tableColumns: [
            {
              type: 'expand',
              template: function () {
                return '<template scope="props">\
                                <el-table-x :max-height="200" data-url="/trade/example/list" \
                                :table-columns="[\
                                  { label: \'编码\', prop: \'id\' },\
                                  { label: \'名称\', prop: \'title\'},\
                                  { label: \'作者\', prop: \'author\'}\
                                ]"></el-table-x>\
                            </template>';
              }
            },
            { label: '编码', prop: 'id' },
            {
              label: '名称',
              prop: 'title',
              width: 260,
              sortable: true,
              resizable: true,
              template: function () {
                // 自定义渲染模板,里面的内容可以是原生HTML或element-ui，此处暂且仅支持事件监听，至于格式化内容请参考formatter方法
                // 关于如何配置click事件方法，
                // 1、固定写法：_$emit('custom-row-click', scope) ，其中custom-row-click是用于在组件内部触发事件方法，scope是传递的参数
                // 2、在el-table-x组件上通过配置监听：@custom-row-click="customRowClick" ，其中customRowClick是当前业务功能接收事件处理的方法
                return '<template scope="scope">\
                                    <a href="javascipt:void(0);" style="text-decoration:underline;" @click="_$emit(\'custom-row-click\', scope)">{{ scope.row.title }}</a>\
                                </template>';
              }
            },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '作者', prop: 'author', width: 110 },
            { label: '审核人', prop: 'auditor', width: 110 },
            { label: '阅读数', prop: 'pageviews', width: 100 },
            {
              label: '操作',
              width: 86,
              template: function () {
                return '<template scope="scope">\
                                <el-button type="text" size="small" @click="_$emit(\'custom-row-op\', scope, \'edit\')">编辑</el-button>\
                                <el-button type="text" size="small" @click="_$emit(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                            </template>';
              }
            }
          ]
        };
      },
      methods: {
        /**
         * 新增
         */
        createFn: function () {
          // TODO
          this.$alert('新增', '提示');
        },
        /**
         * 修改
         */
        editFn: function () {
          // TODO
          this.$alert('修改', '提示');
        },
        /**
         * 详情
         */
        detailFn: function () {
          // TODO
          this.$alert('详情', '提示');
        },
        /**
         * 删除
         */
        deleteFn: function () {
          // TODO
          this.$alert('删除', '提示');
        },
        /**
         * 自定义行触发的点击事件
         * @param scope 行数据对象
         */
        customRowClick: function (scope) {
          // 当前行号：scope.$index
          // 当前行数据：scope.row
          // 当前列对象：scope.column
          // TODO
          this.$alert('你选择的行ID值为：' + scope.row.id, '提示');
        },
        /**
         * 自定义触发的操作事件，事件类型
         * @param scope 行数据对象
         * @param op 操作类型：edit、delete
         */
        customRowOp: function (scope, op) {
          // 当前行号：scope.$index
          // 当前行数据：scope.row
          // 当前列对象：scope.column
          // TODO
          this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.id, '提示');
        }
      },
      mounted: function () {
        var _this = this;
        yufp.lookup.bind('NATIONALITY', function (data) {
          _this.typeOptions = data;
        });
      }
    });
  };
});