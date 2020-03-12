/**
 * Created by sunxiaojun on 2017/11/23.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#elforminput',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: function () {
        return {
          ruleForm: {
            pass: '',
            checkPass: '',
            name: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        handleIconClick: function () {
          this.$message({
            showClose: true,
            message: '恭喜你，handleIconClick方法调用成功！',
            type: 'success'
          });
        },
        onfocus: function () {
          this.$message({
            showClose: true,
            message: '恭喜你，onfocus方法调用成功！',
            type: 'success'
          });
        },
        onblur: function () {
          this.$message({
            showClose: true,
            message: '恭喜你，onblur方法调用成功！',
            type: 'success'
          });
        },
        onclick: function () {
          this.$message({
            showClose: true,
            message: '恭喜你，onclick方法调用成功！',
            type: 'success'
          });
        },
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