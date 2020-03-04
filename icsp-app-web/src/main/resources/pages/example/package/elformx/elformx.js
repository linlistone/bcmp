/**
 * Created by sunxiaojun on 2017/11/27.
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/YufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js'
],
function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: cite.el,
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: function () {
        var _this = this;
        return {
          groupFields: [{
            columnCount: 2,
            fields: [
              {label: 'input组件',
                field: 'input',
                type: 'input',
                focus: function (model, val) {
                  _this.$message({
                    showClose: true,
                    message: '恭喜你，focus方法调用成功！',
                    type: 'success'
                  });
                },
                rules: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]},
              {label: 'password组件', field: 'pasd', type: 'password', suffixIcon: 'el-icon-date'},
              {label: 'date组件',
                field: 'date',
                type: 'date',
                change: function (model, val) {
                  model.name = '222';
                }
              },
              {label: 'week组件', field: 'week', type: 'week'},
              {label: 'year组件', field: 'year', type: 'year'},
              {label: 'month组件', field: 'month', type: 'month'},
              {label: '自定义选择器',
                fields: 'custom',
                type: 'custom',
                is: 'yufp-demo-selector',
                rawValue: '0000',
                clickFn: function (value, model, args) {
                },
                selectFn: function (value, model, args) {

                }
              }, {label: '所属机构',
                field: 'orgId',
                type: 'custom',
                is: 'yufp-org-tree',
                param: {needDpt: true, needCheckbox: false}},
              {label: '用户', field: 'userId', type: 'custom', is: 'yufp-user-selector'}
            ]
          }, {
            columnCount: 1,
            fields: [
              {label: 'TextArea组件', field: 'context', type: 'textarea'},
              {label: 'Radio组件',
                field: 'radio',
                type: 'radio',
                optionButton: true,
                dataCode: 'NATIONALITY',
                change: function (val) {
                  yufp.logger.debug(val);
                }
              },
              {label: 'checkbox组件',
                field: 'check1',
                type: 'checkbox',
                min: 1,
                max: 3,
                dataUrl: 'trade/example/checkbox',
                change: function (val) {
                  yufp.logger.debug(val);
                }
              }
            ]
          }, {
            columnCount: 3,
            fields: [
              {label: 'datetime组件', field: 'datetime', type: 'datetime'},
              {label: 'datetimerange组件', field: 'datetimerange', type: 'datetimerange'},
              {label: 'daterange组件', field: 'daterange', type: 'daterange'},
              {label: 'time组件', field: 'time', type: 'time'},
              {label: 'timePicker组件', field: 'timePicker', type: 'timePicker', pickerOptions: '{ selectableRange: \'18:30:00 - 20:30:00\' }'},
              {label: 'select组件',
                field: 'select',
                type: 'select',
                dataCode: 'NATIONALITY',
                change: function (val) {
                  yufp.logger.debug(val);
                }
              }
            ]
          }],
          buttons: [
            {label: '提交',
              op: 'submit',
              type: 'primary',
              click: function (model, valid) {
                if (valid) {
                  _this.$alert('submit!', '提示');
                } else {
                  _this.$alert('error submit!', '提示');
                  return false;
                }
              }},
            {label: '重置',
              op: 'reset',
              click: function () {
                _this.$alert('重置回调!', '提示');
              }},
            {label: '普通按钮',
              click: function (model) {
                _this.$alert('普通按钮点击事件!', '提示');
              }}
          ]
        };
      },
      methods: {

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