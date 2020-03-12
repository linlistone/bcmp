/**
 * Created by liucheng3 on 2018/06/27.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#el_combo_table_demo',
      data: {
        height: yufp.custom.viewSize().height - 100,
        singleSelected: '',
        multipSelected: [],
        dataUrl: '/trade/example/list',
        dataParams: {},
        tableColumns: [
          { label: '编码', prop: 'id' },
          { label: '名称', prop: 'title', width: 260, sortable: true, resizable: true },
          { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY', hidden: true }
        ],

        grid: {
          data1: [
            { name: 'multiple', remark: '是否支持多选', type: 'Boolean', option: '—', default: 'false' },
            { name: 'disabled', remark: '是否禁用组件', type: 'Boolean', option: '—', default: 'false' },
            { name: 'clearable', remark: '是否可以清空选项', type: 'Boolean', option: '—', default: 'true' },
            { name: 'placeholder', remark: '占位符', type: 'String', option: '—', default: '—' },
            { name: 'data-id', remark: 'ID字段，也是下拉框的value字段', type: 'String', option: '—', default: 'id' },
            { name: 'data-label', remark: '文本字段，也是下拉框的label字段', type: 'String', option: '—', default: 'label' },
            { name: 'data-url', remark: '查询URL', type: 'String', option: '—', default: '—' },
            { name: 'table-columns', remark: '属性列配置', type: 'array', option: '—', default: '—' },
            { name: 'base-params', remark: '固定参数（不会随着动态参数变化而变化）', type: 'object', option: '—', default: '—' }

          ],
          data2: [
            { name: 'getSelectedObjs', remark: '获取选中行的数据对象，多选时返回数据对象数组，单选返回选中的数据对象', param: '-' },
            { name: 'deleteSelected', remark: '清空所有选中行', param: '-' },
            { name: 'selectedLabel', remark: '获取组件label值', param: '-' }
          ],
          data3: [
            { name: 'change', remark: '选中值发生变化时触发', param: 'val,选中的值' },
            { name: 'visible-change', remark: '下拉框出现/隐藏时触发', param: 'v出现则为 true，隐藏则为 false' },
            { name: 'clear', remark: '可清空的模式下用户点击清空按钮时触发', param: '-' }
          ]
        }
      },
      methods: {
        getSelectdValue: function () {
          this.$alert(JSON.stringify(this.singleSelected));
        },
        getSelectdText: function () {
          this.$alert(this.$refs.myTableSelect.selectedLabel);
        },
        getSelectdObjs: function () {
          this.$alert(JSON.stringify(this.$refs.myTableSelect.getSelectedObjs()));
        },
        resetSelect: function () {
          this.$refs.myTableSelect.clear();
        },

        getSelectdValue2: function () {
          this.$alert(JSON.stringify(this.multipSelected));
        },
        getSelectdText2: function () {
          this.$alert(this.$refs.myTableSelect2.selectedLabel);
        },
        getSelectdObjs2: function () {
          this.$alert(JSON.stringify(this.$refs.myTableSelect2.getSelectedObjs()));
        },
        resetSelect2: function () {
          this.$refs.myTableSelect2.clear();
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