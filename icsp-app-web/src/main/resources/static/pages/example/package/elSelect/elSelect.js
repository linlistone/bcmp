/**
 * Created by yumeng on 2017/11/25.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var height = yufp.custom.viewSize().height;
    // 创建virtual model
    yufp.custom.vue({
      el: '#el_select_x_demo',
      data: {
        height: height,
        selected: '',
        // 属性说明，实际使用时不需要此部分
        currClickNode: '',
        setSelected: '',
        setSelectedItem: '',
        options1: [{'key': 1, 'value': 'ssss'}],
        grid: {
          data1: [
            {name: 'multiple', remark: '是否支持多选', type: 'Boolean', option: '—', default: 'false'},
            {name: 'disabled', remark: '是否禁用组件', type: 'Boolean', option: '—', default: 'false'},
            {name: 'multiple-limit', remark: '现在多选对多输入个数', type: 'Number', option: '—', default: '0'},
            {name: 'size', remark: '输入框尺寸', type: 'String', option: '—', default: '—'},
            {name: 'name', remark: '组件名称', type: 'String', option: '—', default: 'el-select-x'},
            {name: 'clearable', remark: '单选时是否可以清空选项', type: 'Boolean', option: '—', default: 'true'},
            {name: 'placeholder', remark: '占位符', type: 'String', option: '—', default: '—'},
            {name: 'filterable', remark: '是否可搜索', type: 'Boolean', option: '—', default: 'true'}
          ],
          data2: [
            {name: 'getSelectdText', remark: '获取选中的label值', param: '—'},
            {name: 'getSelectdValue', remark: '获取选中的值', param: '—'},
            {name: 'setSelectdByItem', remark: '通过数字设置选中的值', param: 'item为下拉选项数组下标'},
            {name: 'setSelectdByValue', remark: '通过label设置选中的值', param: 'value为需要设置选中的下拉框的值'}
          ],
          data3: [
            {name: 'change', remark: 'change事件调用', param: 'val,选中的值'}
          ]
        }
      },
      methods: {
        showValFn: function (val) {
          this.$alert('change事件' + val);
        },
        getSelectdText: function () {
          this.$alert(this.$refs.mySelect.getSelectdText());
        },
        getSelectdValue: function () {
          this.$alert(this.$refs.mySelect.getSelectdValue());
        },
        resetSelect: function () {
          this.$refs.mySelect.clear();
        },
        setSelectdByValue: function () {
          this.$refs.mySelect.setSelectdByValue(this.setSelected);
        },
        setSelectdByItem: function () {
          this.$refs.mySelect.setSelectdByItem(this.setSelectedItem);
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