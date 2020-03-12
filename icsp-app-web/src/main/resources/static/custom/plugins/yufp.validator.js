/**
 * Created by jiangcheng on 2016/11/25.
 */
(function (yufp, window) {
  var validator = {
    /**
     * 数字验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'number': function (rule, value, callback) {
      var reg = /^\d+$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('数字类型错误'));
      } else {
        callback();
      }
    },
    /**
     * 年龄验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'age': function (rule, value, callback) {
      var reg = /^\d+$/;
      if (value && reg.test(value)) {
        var _age = parseInt(value);
        if (_age < 200) {
          callback();
        } else {
          callback(new Error('年龄不合法'));
        }
      } else if (value && !reg.test(value)) {
        callback(new Error('数字类型错误'));
      } else {
        callback();
      }
    },
    /**
     * 邮编验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'postcode': function (rule, value, callback) {
      var reg = /^[1-9]\d{5}$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('邮编格式不正确'));
      } else {
        callback();
      }
    },
    /**
     * ip验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'ip': function (rule, value, callback) {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('ip地址格式不正确'));
      } else {
        callback();
      }
    },
    /**
     * 固定电话和小灵通验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'telephone': function (rule, value, callback) {
      var reg = /(^\d{3}-\d{7,8}$)|(^\d{4}-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('固定电话或小灵通电话格式不正确'));
      } else {
        callback();
      }
    },
    /**
     * 手机号码验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'phone': function (rule, value, callback) {
      var reg = /(^\d{3}-1[3458][0-9]\d{8}$)|(^\d{2}-1[3458][0-9]\d{8}$)/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('固定电话格式不正确'));
      } else {
        callback();
      }
    },
    /**
     * 数字和字母验证，只能接受输入项为数字和字母
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'numberAndLetter': function (rule, value, callback) {
      var reg = /(^[A-Za-z0-9]+$)|([A-Za-z]+$)|([0-9]+$)/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('请输入数字和字母'));
      } else {
        callback();
      }
    },
    /**
     * 手机号码验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'mobile': function (rule, value, callback) {
      var reg = /^1[3-9][0-9]\d{8}$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('手机号码不正确'));
      } else {
        callback();
      }
    },
    /**
     * 身份证号码验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'IDCard': function (rule, value, callback) {
      if (!value) {
        callback();
      } else {
        var area = {
          11: '北京',
          12: '天津',
          13: '河北',
          14: '山西',
          15: '内蒙古',
          21: '辽宁',
          22: '吉林',
          23: '黑龙江',
          31: '上海',
          32: '江苏',
          33: '浙江',
          34: '安徽',
          35: '福建',
          36: '江西',
          37: '山东',
          41: '河南',
          42: '湖北',
          43: '湖南',
          44: '广东',
          45: '广西',
          46: '海南',
          50: '重庆',
          51: '四川',
          52: '贵州',
          53: '云南',
          54: '西藏',
          61: '陕西',
          62: '甘肃',
          63: '青海',
          64: '宁夏',
          65: '新疆',
          71: '台湾',
          81: '香港',
          82: '澳门',
          91: '国外'
        };
        var Y, JYM;
        var S, M;
        var idCardArray = [];
        idCardArray = value.split('');
        if (area[parseInt(value.substr(0, 2))] == null) {
          callback(new Error('身份证号码地区非法'));
        }
        var ereg;
        // 身份号码位数及格式检验
        switch (value.length) {
        case 15:
          if ((parseInt(value.substr(6, 2)) + 1900) % 4 == 0 ||
                            ((parseInt(value.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(value.
                              substr(6, 2)) + 1900) %
                                4 == 0)) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
          } else {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
          }
          if (ereg.test(value)) {
            callback();
          } else {
            callback(new Error('身份证号码出生日日期有误'));
          }
          break;
        case 18:
          // 18位身份号码检测
          // 出生日期的合法性检查
          // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
          // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          if (parseInt(value.substr(6, 4)) % 4 == 0 ||
                            (parseInt(value.substr(6, 4)) % 100 == 0 && parseInt(value.
                              substr(6, 4)) %
                                4 == 0)) {
            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
          } else {
            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
          }
          if (ereg.test(value)) { // 测试出生日期的合法性
            // 计算校验位
            S = ((parseInt(idCardArray[0]) + parseInt(idCardArray[10])) * 7) +
              ((parseInt(idCardArray[1]) + parseInt(idCardArray[11])) * 9) +
              ((parseInt(idCardArray[2]) + parseInt(idCardArray[12])) * 10) +
              ((parseInt(idCardArray[3]) + parseInt(idCardArray[13])) * 5) +
              ((parseInt(idCardArray[4]) + parseInt(idCardArray[14])) * 8) +
              ((parseInt(idCardArray[5]) + parseInt(idCardArray[15])) * 4) +
              ((parseInt(idCardArray[6]) + parseInt(idCardArray[16])) * 2) +
              (parseInt(idCardArray[7]) * 1) +
              (parseInt(idCardArray[8]) * 6) +
              (parseInt(idCardArray[9]) * 3);
            Y = S % 11;
            M = 'F';
            JYM = '10X98765432';
            M = JYM.substr(Y, 1);// 判断校验位
            if (M == idCardArray[17]) {
              callback();
            } else {
              callback(new Error('身份证号码末位校验位校验出错,请注意x的大小写'));
            }
          } else {
            callback(new Error('身份证号码出生日期有误'));
          }
          break;
        default:
          callback(new Error('身份证号码位数不对,应该为15位或是18位'));
          break;
        }
      }
    },
    /**
     * 是否为中文验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'isChnChar': function (rule, value, callback) {
      var reg = /[\u4E00-\u9FA5]/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('只能输入中文'));
      } else {
        callback();
      }
    },
    /**
     * 输入项收尾空格验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'trim': function (rule, value, callback) {
      if (value != value.trim()) {
        callback(new Error('输入项首尾有空格'));
      } else {
        callback();
      }
    },
    /**
     * 邮箱验证
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'email': function (rule, value, callback) {
      var reg = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('电子邮箱格式不正确'));
      } else {
        callback();
      }
    },
    /**
     * 小数验证，输入结果必须为小数
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'digit': function (rule, value, callback) {
      var reg = /^-?\d+(\.\d+)?$/g;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('请输入小数'));
      } else {
        callback();
      }
    },
    /**
     * 非零正整数
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'pInt': function (rule, value, callback) {
      var reg = /^\+?[1-9][0-9]*$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('请输入非零正整数'));
      } else {
        callback();
      }
    },
    /**
     * 0 整数和浮点数
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'gZero': function (rule, value, callback) {
      var reg = /^[+]?[0-9]*\d(\.\d+)?$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error('请输入非零正整数'));
      } else {
        callback();
      }
    },
    /**
     * 特殊字符
     * rule为form表单当前验证的filed对应的验证rule规则
     * value为当前输入框返回值
     * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
     * */
    'speChar': function (rule, value, callback) {
      var reg = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]');
      if (value && reg.test(value)) {
        callback(new Error('输入信息包含特殊字符'));
      } else {
        callback();
      }
    }
  };
  var hasDefine = typeof define === 'function';
  if (hasDefine) {
    // 定义模块
    define(validator);
    // 安装插件(兼容非模块的访问方式)
    window.yufp.validator = validator;
  } else {
    // 安装插件
    window.yufp.validator = validator;
  }
}(yufp, window));