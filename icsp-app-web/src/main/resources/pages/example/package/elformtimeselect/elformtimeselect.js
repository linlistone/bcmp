/**
 * Created by sunxiaojun on 2017/11/24.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#elformtimeselect',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: function () {
        return {
          ruleForm: {
            time1: null,
            time2: null,
            time3: null,
            date1: null,
            date2: null,
            date3: null,
            date4: null
          },
          pickerOptions0: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          rules: {
            time1: [{required: true, message: '请输入活动名称', trigger: 'blur' }]
          }
        };
      },
      methods: {
        submitForm: function (formName) {
          var _this = this;
          _this.$refs[formName].validate(function (valid) {
            if (valid) {
              _this.$alert('submit!', '提示');
            } else {
              _this.$alert('error submit!', '提示');
              return false;
            }
          });
        },
        resetForm: function (formName) {
          this.$refs[formName].resetFields();
        },
        onchange: function () {
          this.$message({
            showClose: true,
            message: '恭喜你，onchange方法调用成功！',
            type: 'success'
          });
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