/**
 * 业务工具类
 * created by helin3 2017-12-05
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.util = exports;
}(yufp, window, function (yufp, window, document) {
  var clipboard = null;
  /**
     * 业务工具类
     * @constructor
     */
  function Utils () {
    // 定义全局的vm对象，避免多次new Vue实例，造成内存泄漏
    this.globalVm = new Vue();
  }

  /**
     * 并发执行，等所有异步方法执行回调方法后，再统一回调
     * var a = function(callback) {
     *     setTimeout(callback, 1000);
     * };
     * var b = function(callback) {
     *     setTimeout(callback, 5000);
     * };
     * var c = function(callback) {
     *     setTimeout(callback, 3000);
     * };
     * yufp.util.parallelRequest(a, b, c, function(){
     *   // 所有异步方法执行完毕再调用
     *   yufp.logger.info(1);
     * });
     */
  Utils.prototype.parallelRequest = function () {
    if (arguments.length < 2) {
      yufp.logger.warn('方法参数个数不对');
    }
    var args = [], validFlag = true;
    for (var i = 0, len = arguments.length; i < len; i++) {
      var fn = arguments[i];
      if (typeof fn !== 'function') {
        validFlag = false;
        break;
      }
      args.push(fn);
    }
    if (!validFlag) {
      return;
    }
    var total = args.length - 1;
    var callback = args[total];
    var prEventName = 'parallel-req' + new Date().getTime();
    var prEvent = new CustomEvent(prEventName, {
      detail: { counter: total },
      bubbles: false,
      cancelable: false
    });
    document.body.addEventListener(prEventName, function (e) {
      if (e.detail && e.detail.counter === 0) {
        callback();
      }
    });
    var everyCallback = function () {
      var counter = prEvent.detail.counter;
      prEvent.detail.counter = --counter;
      document.body.dispatchEvent(prEvent);
    };
    for (var i = 0, len = args.length - 1; i < len; i++) {
      var fn = args[i];
      fn(everyCallback);
    }
  };

  /**
     *
     * @param time
     * @param format
     * @returns {*}
     */
  Utils.prototype.dateFormat = function (time, format) {
    if (arguments.length === 0) {
      return null;
    }
    format = format || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (('' + time).length === 10) {
        time = parseInt(time) * 1000
        ;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return timeStr;
  };

  /**
     *
     * 判断当前浏览器类型（仅ie返回版本号）
     * @author
     * @returns {name,version}
     */
  Utils.prototype.getExplorer = function () {
    var _name;
    var _version;
    var explorer = window.navigator.userAgent;
    var isIE = explorer.indexOf('compatible') > -1 && explorer.indexOf('MSIE') > -1;
    var isEdge = explorer.indexOf('Edge') > -1 && !isIE;
    var isIE11 = explorer.indexOf('Trident') > -1 && explorer.indexOf('rv:11.0') > -1;
    if (isIE) {
      _name = 'ie';
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      _version = reIE.test(explorer) ? parseFloat(RegExp['$1']) : -1;
    } else if (isEdge) {
      _name = 'edge';
    } else if (isIE11) {
      _name = 'ie';
      _version = 11;
    } else if (explorer.indexOf('Firefox') >= 0) {
      _name = 'firefox';
    } else if (explorer.indexOf('Chrome') >= 0) {
      _name = 'chrome';
    } else if (explorer.indexOf('Opera') >= 0) {
      _name = 'opera';
    } else if (explorer.indexOf('Safari') >= 0) {
      _name = 'safari';
    }
    return { name: _name, version: _version };
  };

  /**
     *
     * 判断当前浏览器类型
     * @param options  导出参数
     * options:{type:'table',ref:table_ref_obj}
     * type 导出类型为table  ref table对应的vue对象ref
     * options:{type:'json',data:{head:[],body:[]}}
     * type 导出类型为json自定义数据  data head为表头,body为数据
     * @author
     * @returns {*}
     */
  Utils.prototype.exportExcelByTable = function (options) {
    var tableRef = options.ref;
    var colums = tableRef.tableColumns;
    var tableColumns = colums.concat([]);
    var collectionHtml = tableRef.$el.getElementsByClassName('el-table__header-wrapper')[0].getElementsByTagName('tr');
    var rowspanIndex = 1;
    var maxrowspan = function (list, parList) {
      if (list && list instanceof Array == true) {
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          if (obj.children && obj.children instanceof Array == true) {
            obj.colspan = obj.children.length - 1;
            if (rowspanIndex < obj.children.length) {
              parList.map(function (obj_, index_) {
                if (obj.label != obj_.label) {
                  obj_.rowspan = (obj_.rowspan == undefined ? 0 : obj_.rowspan) + 1;
                }
              });
              rowspanIndex += 1;
            }
            maxrowspan(obj.children, obj.children, i);
          }
        }
      }
    };
    maxrowspan(tableColumns, tableColumns);
    var getMerge = function (obj, index, rownum, cellNum) {
      var merges_ = {
        s: {// s为开始
          c: 0, // 开始列
          r: 0// 开始取值范围
        },
        e: {// e结束
          c: 0, // 结束列
          r: 0// 结束范围
        }
      };
      if (obj.colspan == 0 && !cellNum) {
        merges_.s.c = index;
        merges_.e.c = index;
      } else if (obj.colspan == 0 && cellNum) {
        merges_.s.c = cellNum;
        merges_.e.c = cellNum;
      } else if (obj.colspan != 0 && !cellNum) {
        merges_.s.c = index;
        merges_.e.c = parseInt(index + obj.colspan);
      } else if (obj.colspan != 0 && cellNum) {
        merges_.s.c = cellNum;
        merges_.e.c = parseInt(cellNum + obj.colspan);
      }
      merges_.s.r = rownum;
      merges_.e.r = parseInt(rownum + obj.rowspan);
      return merges_;
    };


    var head = [];
    var merges = [];
    var headSheel = [];
    var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var rownum = 0;
    var rowspanIndex_ = 1;
    var addIndex = 0;
    var exportRule = function (list, parList, cellNum) {
      if (list && list instanceof Array == true) {
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          head.push(obj.label);
          obj.rowspan = obj.rowspan == undefined ? 0 : obj.rowspan;
          obj.colspan = obj.colspan == undefined ? 0 : obj.colspan;
          if (obj.children && obj.children instanceof Array == true) {
            headSheel.push(letter.charAt(parseInt(i + rownum)) + '1');
            var mg = getMerge(obj, i, rownum);
            merges.push(mg);
            rowspanIndex_ += 1;
            rownum = rownum + 1;
            addIndex = 0;
            exportRule(obj.children, obj.children, i);
            rownum = rownum - 1;
            addIndex = parseInt(obj.children.length - 1);
          } else {
            var mg = getMerge(obj, i + addIndex, rownum, cellNum + i);
            merges.push(mg);
            if (cellNum) {
              headSheel.push(letter.charAt(cellNum + i) + rowspanIndex_);
            } else {
              headSheel.push(letter.charAt(parseInt(i + rowspanIndex_ - 1)) + '1');
            }
          }
        }
      }
    };
    exportRule(tableColumns, tableColumns);
    // 获取列的字段名称
    var getColumnsName = function (name, tableColumns) {
      var key;
      for (var i = 0; i < tableColumns.length; i++) {
        if (tableColumns[i].children && tableColumns[i].children instanceof Array == true) {
          key = getColumnsName(name, tableColumns[i].children);
        } else {
          if (name == tableColumns[i].label && tableColumns[i].prop) {
            key = tableColumns[i].prop;
            break;
          }
        }
      }
      return key;
    };
    var headList_ = [];
    for (var i = 0; i < head.length; i++) {
      var key = getColumnsName(head[i], tableColumns);
      if (key) {
        headList_[headList_.length] = key;
      }
    }

    var getColumnsDataCode = function (column, tableColumns) {
      var code;
      for (var i = 0; i < tableColumns.length; i++) {
        if (tableColumns[i].children && tableColumns[i].children instanceof Array == true) {
          key = getColumnsName(column, tableColumns[i].children);
        } else {
          if (column == tableColumns[i].prop && tableColumns[i].prop) {
            code = tableColumns[i].dataCode;
            break;
          }
        }
      }
      return code;
    };
    var data = [];
    var tableData = [];
    if (options.importType == 'page') {
      tableData = tableRef.data;
    } else if (options.importType == 'selected') {
      tableData = tableRef.selections;
    } else if (options.importType == 'service') {
      yufp.service.request({
        url: options.url,
        async: false,
        data: options.param,
        method: options.method ? options.method : 'GET',
        callback: function (code, message, response) {
          if (options.jsonData) {
            var tmp = options.jsonData.split('.');
            var obj = response;
            for (var z = 0; z < tmp.length; z++) {
              if (!obj) {
                break;
              }
              obj = obj[tmp[z]];
            }
            tableData = obj;
          } else {
            tableData = response.data;
          }
        }
      });
    }
    for (var i = 0; i < tableData.length; i++) {
      var o = {};
      var rowData = tableData[i];
      for (var j = 0; j < headList_.length; j++) {
        var k = headList_[j];
        var code = getColumnsDataCode(k, tableColumns);
        if (code) {
          var val = yufp.lookup.convertKey(code, rowData[k]);
          o['' + k + ''] = val;
        } else {
          o['' + k + ''] = rowData[k];
        }
      }
      data.push(o);
    }

    for (var i = 1; i < collectionHtml.length; i++) {
      data.unshift({});
    }
    var wopts = { bookType: 'xlsx', bookSST: true, type: 'binary' };// 这里的数据是用来定义导出的格式类型
    var saveAs = function (obj, fileName) { // 当然可以自定义简单的下载文件实现方式
      var tmpa = document.createElement('a');
      tmpa.download = fileName || '下载';
      tmpa.href = URL.createObjectURL(obj); // 绑定a标签
      tmpa.click(); // 模拟点击实现下载
      setTimeout(function () { // 延时释放
        URL.revokeObjectURL(obj); // 用URL.revokeObjectURL()来释放这个object URL
      }, 100);
    };
    var s2ab = function (s) {
      if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF
          ;
        }
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) {
          buf[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
    };
    var wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    data = XLSX.utils.json_to_sheet(data);
    for (var i = 0; i < headSheel.length; i++) {
      data[headSheel[i]] = { t: 's', v: head[i] };
    }
    data['!merges'] = merges;
    wb.Sheets['Sheet1'] = data;
    saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' }), options.fileName + '.' + (wopts.bookType == 'biff2' ? 'xls' : wopts.bookType));
    tableRef = colums = tableColumns = collectionHtml = maxrowspan = exportRule = getColumnsName = getColumnsDataCode = saveAs = s2ab = options = null;
  };

  Utils.prototype.array2tree = function (data, options) {
    var _options = { id: 'id', pid: 'parentId', root: '0' };
    yufp.extend(_options, options || {});
    var idField = _options.id, pidField = _options.pid;
    var root, children = [];
    if (typeof _options.root === 'object') {
      root = _options.root;
    } else {
      var tempObj = {};
      tempObj[idField] = _options.root;
      root = tempObj;
    }
    var rId = '' + root[idField];
    for (var i = 0, len = data.length; i < len; i++) {
      var d = data[i];
      if (rId === '' + d[idField]) {
        root = d;
      } else if (rId === '' + d[pidField]) {
        children.push(d);
      }
    }
    root.id = root[idField];
    children = root.children ? root.children.concat(children) : children;
    root.children = children;
    for (var i = 0, len = root.children.length; i < len; i++) {
      _options.root = root.children[i];
      root.children[i] = this.array2tree(data, _options);
    }
    return root;
  };

  /** 根据数组和对应属性返回满足el-tree的树形数据,
     *id: 对应id,
     *pid: 对应pid,
     *label: 对应展示字段,
     *root: 如果值为空或不存在则计算
     */
  Utils.prototype.genTree = function (data, attr) {
    var root = {};
    if (data == null || data.length == 0) {
      return [];
    }
    if (attr.root == null || attr.root == undefined || attr.root == '') {
      var getRootData = function (data, attributes) {
        var _root = {};
        _root = data[0];
        for (var k = 1; k < data.length; k++) {
          var i = 1;
          for (; i < data.length; i++) {
            if (data[i][attributes.id] == _root[attributes.pid]) {
              _root = data[i];
              break;
            }
          }
          if (i == data.length - 1) {
            break;
          }
        }
        return _root;
      };

      root.id = getRootData(data, attr)[attr.pid];
    } else if (typeof attr.root == 'object') {
      var root = attr.root;
      root.id = root[attr.id] === undefined ? root.id : root[attr.id];
      root.pid = root[attr.pid] === undefined ? root.pid : root[attr.pid];
      root.label = root[attr.label] === undefined ? root.label : root[attr.label];
    } else {
      for (var i in data) {
        if (data[i][attr.id] == attr.root) {
          root.id = data[i][attr.pid];
          break;
        }
      }
      root.id = root.id == undefined ? attr.root : root.id;
    }

    var genTreeData = function (data, attr) {
      var ckey = {},
        pkey = {};

      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        row.id = row[attr.id];
        row.pid = row[attr.pid];
        row.label = row[attr.label];
        row.children = [];

        ckey[row.id] = row;
        if (pkey[row.pid]) {
          pkey[row.pid].push(row);
        } else {
          pkey[row.pid] = [row];
        }

        var c = pkey[row.id];
        if (c) {
          row.children = c.concat();
        }

        var p = ckey[row.pid];
        if (p) {
          p.children.push(row);
        }
      }
      return pkey;
    };

    if (root.label) {
      root.children = genTreeData(data, attr)[root.id];
      return [root];
    }
    return genTreeData(data, attr)[root.id];
  };

  // 实现对象的深度克隆
  Utils.prototype.clone = function (obj) {
    var result = {};
    if (typeof obj == 'object') {
      var _this = this;
      var objClone = function (o) {
        var t = {};
        for (var k in o) {
          var copy = o[k];
          if (typeof copy == 'object') {
            t[k] = _this.objClone(copy);
          } else {
            t[k] = o[k];
          }
        }
        return t;
      };
      result = objClone(obj);
    } else {
      yufp.logger.error('clone方法目前只支持对象!');
    }
    return result;
  };

  /**
     * 为url添加token信息
     * @param url
     * @returns {string}
     */
  Utils.prototype.addTokenInfo = function (url) {
    var token = 'access_token=';
    var _url = '';
    if (url == null || url == '') {
      return _url;
    }

    if (!url.indexOf(token) > -1) {
      _url = url + (url.indexOf('?') > -1 ? '&' : '?') + token + yufp.service.getToken();
    }
    return _url;
  };

  Utils.prototype.download = function (url) {
    if (url) {
      if (url.indexOf('http') <= -1) {
        // 当不包含http时拼接gateway地址
        url = yufp.service.getUrl({
          url: url
        });
      }
    } else {
      this.$message('必须设置请求url!', '警告');
    }
    // url添加token
    url = this.addTokenInfo(url);
    // 模拟a标签进行下载
    var a = document.createElement('a');
    a.href = url;
    a.click();
  };


  /**
     * @created by zhangkun6
     * @updated by 2018/01/14
     * @description 数字金额格式化(千分位)
     */
  Utils.prototype.moneyFormatter = function (money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * num：保留几位小数
      * */
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(num) + '';
    var l = money.split('.')[0].split('').reverse(), r = money.split('.')[1];
    var t = '', i;
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  };

  /**
     * @created by zhangkun6
     * @updated by 2018/05/03
     * @description 数值百分比显示
     */
  Utils.prototype.toPercent = function (money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * num：保留几位小数
      * */
    // num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat(money + '') + '%';
    return money;
  };

  /**
     * @created by zhangkun6
     * @updated by 2018/01/14
     * @description 数字金额转汉字金额
     */
  Utils.prototype.moneyToUpper = function (money) {
    /*
      * 参数说明：
      * money：要转化的数字
      * */
    // 汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 基本单位
    var cnIntRadice = ['', '拾', '佰', '仟'];
    // 对应整数部分扩展单位
    var cnIntUnits = ['', '万', '亿', '兆'];
    // 对应小数部分单位
    var cnDecUnits = ['角', '分', '毫', '厘'];
    // 整数金额时后面跟的字符
    var cnInteger = '整';
    // 整型完以后的单位
    var cnIntLast = '元';
    // 最大处理的数字
    var maxNum = 999999999999999.9999;
    // 金额整数部分
    var integerNum;
    // 金额小数部分
    var decimalNum;
    // 输出的中文金额字符串
    var chineseStr = '';
    // 分离金额后用的数组，预定义
    var parts;
    if (money == '') {
      return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      // 超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    // 转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          // 归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  };

  /**
     * @created by zhangkun6
     * @updated by 2018/01/19
     * @description 汉字金额转数字金额
     */
  Utils.prototype.upperToMoney = function (upper) {
    /*
            * 参数说明：
            * upper：要转化的汉字
         */
    // 金额数值
    var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // 汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 对应单位的乘积
    var upperMap = [10, 100, 1000];
    // 基本单位
    var cnIntRadice = ['拾', '佰', '仟'];
    // 对应整数部分扩展单位
    // var cnIntUnits = ['万', '亿', '兆'];
    // 对应小数部分单位乘积
    var cnDecMap = [0.1, 0.01];
    // 对应小数部分单位
    var cnDecUnits = ['角', '分'];
    // 金额整数部分
    var integerNum;
    // 金额小数部分
    var decimalNum;
    // 输出的数字金额字符串
    var moneyNum;
    // 金额单位亿之前的数值数组
    var maxArray = [];
    // 金额单位亿和万之间的数值数组
    var middleArray = [];
    // 金额单位万和元之间的数值数组
    var minArray = [];

    var part = upper.split('元');
    integerNum = part[0];
    decimalNum = part[1].split('');
    if (integerNum.indexOf('亿') !== -1) {
      maxArray = integerNum.split('亿')[0].split('');
      if (integerNum.indexOf('万') !== -1) {
        middleArray = integerNum.split('亿')[1].split('万')[0].split('');
        minArray = integerNum.split('亿')[1].split('万')[1].split('');
      } else {
        minArray = integerNum.split('亿')[1].split('');
      }
    } else if (integerNum.indexOf('万') !== -1) {
      middleArray = integerNum.split('万')[0].split('');
      minArray = integerNum.split('万')[1].split('');
    } else {
      minArray = integerNum.split('');
    }
    var getNum = function (upArray, cnNums, cnRadice, numArray, map) {
      var length = upArray.length;
      var num = 0;
      var sum = 0;
      for (var i = 0; i < length; i++) {
        var index = cnNums.indexOf(upArray[i]);
        var _index = cnRadice.indexOf(upArray[i]);
        if (index !== -1) {
          num += numArray[index];
          if (i == (length - 1)) {
            sum += num;
          }
        }
        if (_index !== -1) {
          num *= map[_index];
          sum += num;
          num = 0;
        }
      }
      return sum;
    };
    var maxSum = getNum(maxArray, cnNums, cnIntRadice, num, upperMap);
    var middleSun = getNum(middleArray, cnNums, cnIntRadice, num, upperMap);
    var minSun = getNum(minArray, cnNums, cnIntRadice, num, upperMap);
    var cesSum = getNum(decimalNum, cnNums, cnDecUnits, num, cnDecMap);
    moneyNum = (maxSum * 100000000) + (middleSun * 10000) + minSun + cesSum;
    return moneyNum;
  };

  // 菜单访问日志工具
  Utils.prototype.logInfo = function (log, url) {
    if (yufp.settings.debugModel) {
      return false;
    }
    yufp.service.request({
      url: url,
      method: 'post',
      data: log,
      callback: function (code, msg, response) {
        if (code !== 0 || !response) {
          yufp.logger.warn('日志上传失败');
        }
      }
    });
  };

  // 图标集合
  Utils.prototype.icons = function () {
    return ['el-icon-yx-yewu1', 'el-icon-yx-sxsq1', 'el-icon-yx-shouxin1', 'el-icon-yx-chart-1', 'el-icon-yx-chart-2', 'el-icon-yx-chart-3', 'el-icon-yx-flow-1', 'el-icon-yx-flow-2', 'el-icon-yx-flow-3', 'el-icon-yx-menu-1', 'el-icon-yx-menu-2', 'el-icon-yx-menu-3', 'el-icon-yx-menu-4', 'el-icon-yx-msg-1', 'el-icon-yx-msg-2', 'el-icon-yx-msg-3', 'el-icon-yx-msg-4', 'el-icon-yx-switch-1', 'el-icon-yx-switch-2', 'el-icon-yx-switch-3', 'el-icon-yx-themes-1', 'el-icon-yx-themes-2', 'el-icon-yx-themes-3', 'el-icon-yx-themes-4', 'el-icon-yx-home', 'el-icon-yx-home2', 'el-icon-yx-home3', 'el-icon-yx-office', 'el-icon-yx-newspaper', 'el-icon-yx-pencil', 'el-icon-yx-pencil2', 'el-icon-yx-quill', 'el-icon-yx-pen', 'el-icon-yx-blog', 'el-icon-yx-eyedropper', 'el-icon-yx-droplet', 'el-icon-yx-paint-format', 'el-icon-yx-image', 'el-icon-yx-images', 'el-icon-yx-camera', 'el-icon-yx-headphones', 'el-icon-yx-music', 'el-icon-yx-play', 'el-icon-yx-film', 'el-icon-yx-video-camera', 'el-icon-yx-dice', 'el-icon-yx-pacman', 'el-icon-yx-spades', 'el-icon-yx-clubs', 'el-icon-yx-diamonds', 'el-icon-yx-bullhorn', 'el-icon-yx-connection', 'el-icon-yx-podcast', 'el-icon-yx-feed', 'el-icon-yx-mic', 'el-icon-yx-book', 'el-icon-yx-books', 'el-icon-yx-library', 'el-icon-yx-file-text', 'el-icon-yx-profile', 'el-icon-yx-file-empty', 'el-icon-yx-files-empty', 'el-icon-yx-file-text2', 'el-icon-yx-file-picture', 'el-icon-yx-file-music', 'el-icon-yx-file-play', 'el-icon-yx-file-video', 'el-icon-yx-file-zip', 'el-icon-yx-copy', 'el-icon-yx-paste', 'el-icon-yx-stack', 'el-icon-yx-folder', 'el-icon-yx-folder-open', 'el-icon-yx-folder-plus', 'el-icon-yx-folder-minus', 'el-icon-yx-folder-download', 'el-icon-yx-folder-upload', 'el-icon-yx-price-tag', 'el-icon-yx-price-tags', 'el-icon-yx-barcode', 'el-icon-yx-qrcode', 'el-icon-yx-ticket', 'el-icon-yx-cart?', 'el-icon-yx-coin-dollar', 'el-icon-yx-coin-euro', 'el-icon-yx-coin-pound', 'el-icon-yx-coin-yen', 'el-icon-yx-credit-card', 'el-icon-yx-calculator', 'el-icon-yx-lifebuoy', 'el-icon-yx-phone', 'el-icon-yx-phone-hang-up', 'el-icon-yx-address-book', 'el-icon-yx-envelop', 'el-icon-yx-pushpin', 'el-icon-yx-location', 'el-icon-yx-location2', 'el-icon-yx-compass', 'el-icon-yx-compass2', 'el-icon-yx-map', 'el-icon-yx-map2', 'el-icon-yx-history', 'el-icon-yx-clock', 'el-icon-yx-clock2', 'el-icon-yx-alarm', 'el-icon-yx-bell', 'el-icon-yx-stopwatch', 'el-icon-yx-calendar', 'el-icon-yx-printer', 'el-icon-yx-keyboard', 'el-icon-yx-display', 'el-icon-yx-laptop', 'el-icon-yx-mobile', 'el-icon-yx-mobile2', 'el-icon-yx-tablet', 'el-icon-yx-tv', 'el-icon-yx-drawer', 'el-icon-yx-drawer2', 'el-icon-yx-box-add', 'el-icon-yx-box-remove', 'el-icon-yx-download', 'el-icon-yx-upload', 'el-icon-yx-floppy-disk', 'el-icon-yx-drive', 'el-icon-yx-database', 'el-icon-yx-undo', 'el-icon-yx-redo', 'el-icon-yx-undo2', 'el-icon-yx-redo2', 'el-icon-yx-forward', 'el-icon-yx-reply', 'el-icon-yx-bubble', 'el-icon-yx-bubbles', 'el-icon-yx-bubbles2', 'el-icon-yx-bubble2', 'el-icon-yx-bubbles3', 'el-icon-yx-bubbles4', 'el-icon-yx-user', 'el-icon-yx-users', 'el-icon-yx-user-plus', 'el-icon-yx-user-minus', 'el-icon-yx-user-check', 'el-icon-yx-user-tie', 'el-icon-yx-quotes-left', 'el-icon-yx-quotes-right', 'el-icon-yx-hour-glass', 'el-icon-yx-spinner', 'el-icon-yx-spinner2', 'el-icon-yx-spinner3', 'el-icon-yx-spinner4', 'el-icon-yx-spinner5', 'el-icon-yx-spinner6', 'el-icon-yx-spinner7', 'el-icon-yx-spinner8', 'el-icon-yx-spinner9', 'el-icon-yx-spinner10', 'el-icon-yx-spinner11', 'el-icon-yx-binoculars', 'el-icon-yx-search', 'el-icon-yx-zoom-in', 'el-icon-yx-zoom-out', 'el-icon-yx-enlarge', 'el-icon-yx-shrink', 'el-icon-yx-enlarge2', 'el-icon-yx-shrink2', 'el-icon-yx-key', 'el-icon-yx-key2', 'el-icon-yx-lock', 'el-icon-yx-unlocked', 'el-icon-yx-wrench', 'el-icon-yx-equalizer', 'el-icon-yx-equalizer2', 'el-icon-yx-cog', 'el-icon-yx-cogs', 'el-icon-yx-hammer', 'el-icon-yx-magic-wand', 'el-icon-yx-aid-kit', 'el-icon-yx-bug', 'el-icon-yx-pie-chart', 'el-icon-yx-stats-dots', 'el-icon-yx-stats-bars', 'el-icon-yx-stats-bars2', 'el-icon-yx-trophy', 'el-icon-yx-gift', 'el-icon-yx-glass', 'el-icon-yx-glass2', 'el-icon-yx-mug', 'el-icon-yx-spoon-knife', 'el-icon-yx-leaf', 'el-icon-yx-rocket', 'el-icon-yx-meter', 'el-icon-yx-meter2', 'el-icon-yx-hammer2', 'el-icon-yx-fire', 'el-icon-yx-lab', 'el-icon-yx-magnet', 'el-icon-yx-bin', 'el-icon-yx-bin2', 'el-icon-yx-briefcase', 'el-icon-yx-airplane', 'el-icon-yx-truck', 'el-icon-yx-road', 'el-icon-yx-accessibility', 'el-icon-yx-target', 'el-icon-yx-shield', 'el-icon-yx-power', 'el-icon-yx-switch', 'el-icon-yx-power-cord', 'el-icon-yx-clipboard', 'el-icon-yx-list-numbered', 'el-icon-yx-list', 'el-icon-yx-list2', 'el-icon-yx-tree', 'el-icon-yx-menu', 'el-icon-yx-menu2', 'el-icon-yx-menu3', 'el-icon-yx-menu4', 'el-icon-yx-cloud', 'el-icon-yx-cloud-download', 'el-icon-yx-cloud-upload', 'el-icon-yx-cloud-check', 'el-icon-yx-download2', 'el-icon-yx-upload2', 'el-icon-yx-download3', 'el-icon-yx-upload3', 'el-icon-yx-sphere', 'el-icon-yx-earth', 'el-icon-yx-link', 'el-icon-yx-flag', 'el-icon-yx-attachment', 'el-icon-yx-eye', 'el-icon-yx-eye-plus', 'el-icon-yx-eye-minus', 'el-icon-yx-eye-blocked', 'el-icon-yx-bookmark', 'el-icon-yx-bookmarks', 'el-icon-yx-sun', 'el-icon-yx-contrast', 'el-icon-yx-brightness-contrast', 'el-icon-yx-star-empty', 'el-icon-yx-star-half', 'el-icon-yx-star-full', 'el-icon-yx-heart', 'el-icon-yx-heart-broken', 'el-icon-yx-man', 'el-icon-yx-woman', 'el-icon-yx-man-woman', 'el-icon-yx-happy', 'el-icon-yx-happy2', 'el-icon-yx-smile', 'el-icon-yx-smile2', 'el-icon-yx-tongue', 'el-icon-yx-tongue2', 'el-icon-yx-sad', 'el-icon-yx-sad2', 'el-icon-yx-wink', 'el-icon-yx-wink2', 'el-icon-yx-grin', 'el-icon-yx-grin2', 'el-icon-yx-cool', 'el-icon-yx-cool2', 'el-icon-yx-angry', 'el-icon-yx-angry2', 'el-icon-yx-evil', 'el-icon-yx-evil2', 'el-icon-yx-shocked', 'el-icon-yx-shocked2', 'el-icon-yx-baffled', 'el-icon-yx-baffled2', 'el-icon-yx-confused', 'el-icon-yx-confused2', 'el-icon-yx-neutral', 'el-icon-yx-neutral2', 'el-icon-yx-hipster', 'el-icon-yx-hipster2', 'el-icon-yx-wondering', 'el-icon-yx-wondering2', 'el-icon-yx-sleepy', 'el-icon-yx-sleepy2', 'el-icon-yx-frustrated', 'el-icon-yx-frustrated2', 'el-icon-yx-crying', 'el-icon-yx-crying2', 'el-icon-yx-point-up', 'el-icon-yx-point-right', 'el-icon-yx-point-down', 'el-icon-yx-point-left', 'el-icon-yx-warning', 'el-icon-yx-notification', 'el-icon-yx-question', 'el-icon-yx-plus', 'el-icon-yx-minus', 'el-icon-yx-info', 'el-icon-yx-cancel-circle', 'el-icon-yx-blocked', 'el-icon-yx-cross', 'el-icon-yx-checkmark', 'el-icon-yx-checkmark2', 'el-icon-yx-spell-check', 'el-icon-yx-enter', 'el-icon-yx-exit', 'el-icon-yx-play2', 'el-icon-yx-pause', 'el-icon-yx-stop', 'el-icon-yx-previous', 'el-icon-yx-next', 'el-icon-yx-backward', 'el-icon-yx-forward2', 'el-icon-yx-play3', 'el-icon-yx-pause2', 'el-icon-yx-stop2', 'el-icon-yx-backward2', 'el-icon-yx-forward3', 'el-icon-yx-first', 'el-icon-yx-last', 'el-icon-yx-previous2', 'el-icon-yx-next2', 'el-icon-yx-eject', 'el-icon-yx-volume-high', 'el-icon-yx-volume-medium', 'el-icon-yx-volume-low', 'el-icon-yx-volume-mute', 'el-icon-yx-volume-mute2', 'el-icon-yx-volume-increase', 'el-icon-yx-volume-decrease', 'el-icon-yx-loop', 'el-icon-yx-loop2', 'el-icon-yx-infinite', 'el-icon-yx-shuffle', 'el-icon-yx-arrow-up-left', 'el-icon-yx-arrow-up', 'el-icon-yx-arrow-up-right', 'el-icon-yx-arrow-right', 'el-icon-yx-arrow-down-right', 'el-icon-yx-arrow-down', 'el-icon-yx-arrow-down-left', 'el-icon-yx-arrow-left', 'el-icon-yx-arrow-up-left2', 'el-icon-yx-arrow-up2', 'el-icon-yx-arrow-up-right2', 'el-icon-yx-arrow-right2', 'el-icon-yx-arrow-down-right2', 'el-icon-yx-arrow-down2', 'el-icon-yx-arrow-down-left2', 'el-icon-yx-arrow-left2', 'el-icon-yx-circle-up', 'el-icon-yx-circle-right', 'el-icon-yx-circle-down', 'el-icon-yx-circle-left', 'el-icon-yx-tab', 'el-icon-yx-move-up', 'el-icon-yx-move-down', 'el-icon-yx-sort-alpha-asc', 'el-icon-yx-sort-alpha-desc', 'el-icon-yx-sort-numeric-asc', 'el-icon-yx-sort-numberic-desc', 'el-icon-yx-sort-amount-asc', 'el-icon-yx-sort-amount-desc', 'el-icon-yx-command', 'el-icon-yx-shift', 'el-icon-yx-ctrl', 'el-icon-yx-opt', 'el-icon-yx-checkbox-checked', 'el-icon-yx-checkbox-unchecked', 'el-icon-yx-radio-checked', 'el-icon-yx-radio-checked2', 'el-icon-yx-radio-unchecked', 'el-icon-yx-crop', 'el-icon-yx-make-group', 'el-icon-yx-ungroup', 'el-icon-yx-scissors', 'el-icon-yx-filter', 'el-icon-yx-font', 'el-icon-yx-ligature', 'el-icon-yx-ligature2', 'el-icon-yx-text-height', 'el-icon-yx-text-width', 'el-icon-yx-font-size', 'el-icon-yx-bold', 'el-icon-yx-underline', 'el-icon-yx-italic', 'el-icon-yx-strikethrough', 'el-icon-yx-omega', 'el-icon-yx-sigma', 'el-icon-yx-page-break', 'el-icon-yx-superscript', 'el-icon-yx-subscript', 'el-icon-yx-superscript2', 'el-icon-yx-subscript2', 'el-icon-yx-text-color', 'el-icon-yx-pagebreak', 'el-icon-yx-clear-formatting', 'el-icon-yx-table', 'el-icon-yx-table2', 'el-icon-yx-insert-template', 'el-icon-yx-pilcrow', 'el-icon-yx-ltr', 'el-icon-yx-rtl', 'el-icon-yx-section', 'el-icon-yx-paragraph-left', 'el-icon-yx-paragraph-center', 'el-icon-yx-paragraph-right', 'el-icon-yx-paragraph-justify', 'el-icon-yx-indent-increase', 'el-icon-yx-indent-decrease', 'el-icon-yx-share', 'el-icon-yx-new-tab', 'el-icon-yx-embed', 'el-icon-yx-embed2', 'el-icon-yx-terminal', 'el-icon-yx-share2', 'el-icon-yx-mail', 'el-icon-yx-mail2', 'el-icon-yx-mail3', 'el-icon-yx-mail4', 'el-icon-yx-amazon', 'el-icon-yx-google', 'el-icon-yx-google2', 'el-icon-yx-google3', 'el-icon-yx-google-plus', 'el-icon-yx-google-plus2', 'el-icon-yx-google-plus3', 'el-icon-yx-hangouts', 'el-icon-yx-google-drive', 'el-icon-yx-facebook', 'el-icon-yx-facebook2', 'el-icon-yx-instagram', 'el-icon-yx-whatsapp', 'el-icon-yx-spotify', 'el-icon-yx-telegram', 'el-icon-yx-twitter', 'el-icon-yx-vine', 'el-icon-yx-vk', 'el-icon-yx-renren', 'el-icon-yx-sina-weibo', 'el-icon-yx-rss', 'el-icon-yx-rss2', 'el-icon-yx-youtube', 'el-icon-yx-youtube2', 'el-icon-yx-twitch', 'el-icon-yx-vimeo', 'el-icon-yx-vimeo2', 'el-icon-yx-lanyrd', 'el-icon-yx-flickr', 'el-icon-yx-flickr2', 'el-icon-yx-flickr3', 'el-icon-yx-flickr4', 'el-icon-yx-dribbble', 'el-icon-yx-behance', 'el-icon-yx-behance2', 'el-icon-yx-deviantart', 'el-icon-yx-500px', 'el-icon-yx-steam', 'el-icon-yx-steam2', 'el-icon-yx-dropbox', 'el-icon-yx-onedrive', 'el-icon-yx-github', 'el-icon-yx-npm', 'el-icon-yx-basecamp', 'el-icon-yx-trello', 'el-icon-yx-wordpress', 'el-icon-yx-joomla', 'el-icon-yx-ello', 'el-icon-yx-blogger', 'el-icon-yx-blogger2', 'el-icon-yx-tumblr', 'el-icon-yx-tumblr2', 'el-icon-yx-yahoo', 'el-icon-yx-yahoo2', 'el-icon-yx-tux', 'el-icon-yx-appleinc', 'el-icon-yx-finder', 'el-icon-yx-android', 'el-icon-yx-windows', 'el-icon-yx-windows8', 'el-icon-yx-soundcloud', 'el-icon-yx-soundcloud2', 'el-icon-yx-skype', 'el-icon-yx-reddit', 'el-icon-yx-hackernews', 'el-icon-yx-wikipedia', 'el-icon-yx-linkedin', 'el-icon-yx-linkedin2', 'el-icon-yx-lastfm', 'el-icon-yx-lastfm2', 'el-icon-yx-delicious', 'el-icon-yx-stumbleupon', 'el-icon-yx-stumbleupon2', 'el-icon-yx-stackoverflow', 'el-icon-yx-pinterest', 'el-icon-yx-pinterest2', 'el-icon-yx-xing', 'el-icon-yx-xing2', 'el-icon-yx-flattr', 'el-icon-yx-foursquare', 'el-icon-yx-yelp', 'el-icon-yx-paypal', 'el-icon-yx-chrome', 'el-icon-yx-firefox', 'el-icon-yx-IE', 'el-icon-yx-edge', 'el-icon-yx-safari', 'el-icon-yx-opera', 'el-icon-yx-file-pdf', 'el-icon-yx-file-openoffice', 'el-icon-yx-file-word'];
  };

  var utils = new Utils();

  /**
   * 日期默认格式
   * @returns {*}
   */
  Date.prototype.toJSON = function () {
    return utils.dateFormat(this, '{y}-{m}-{d}');
  };
  /**
   * 复制功能
   */
  Utils.prototype.setClipBoardData = function (dom, str, success, err) {
    var func = function () {
      if (clipboard == null) {
        clipboard = new window.ClipboardJS(dom, {
          // 通过target指定要复印的节点
          text: function () {
            return str;
          }
        });
      }
      clipboard.on('success', function (e) {
        if (success && yufp.type(success) == 'function') {
          success(e);
        }
      });
      clipboard.on('error', function (e) {
        if (err && yufp.type(err) == 'function') {
          err(e);
        }
      });
    };
    if (clipboard == null) {
      yufp.require.require('./libs/clipboard/clipboard.min.js', func);
    } else {
      func();
    }
  };

  return utils;
}));