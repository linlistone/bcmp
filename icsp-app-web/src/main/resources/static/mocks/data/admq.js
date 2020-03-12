define([
  './mocks/data/orgTreeData.js',
  './mocks/data/orgOrgTree.js',
  './mocks/data/roleByUser.js',
  './mocks/data/userData.js',
  './mocks/data/dutyByUser.js'
], function (require, exports) {
  var List = [];
  var count = 55;

  Mock.Random.increment(1000);
  for (var i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: '@increment(2)',
      title: '@ctitle(8, 15)',
      createAt: '@date',
      author: '@cname',
      auditor: '@cname',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft', 'deleted'],
      pageviews: '@integer(300, 5000)',
      remark: '@ctitle(15, 100)',
      EVALUATION_PERIOD_ID: '@date',
      'OPEN_FLAG|1': ['O', 'N', 'C'],
      'MEASURE|1': ['已', '未'],
      'LOCK|1': ['已', '未'],
      'flag|1': [true, false],
      loginCode: '@zip',
      userName: '@cname',
      'gender|1': ['01', '02'],
      certNo: '@natural',
      deadline: '@date',
      userEmail: '@email',
      entrantsDate: '@date'
    }));
  }

  function paramUrl2Obj(url) {
    var search = url.split('?')[1];
    if (!search) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  }

  function paramBody2Obj(body) {
    if (!body) {
      return {};
    }
    return JSON.parse(body);
  }

  exports.getList = function (config) {
    // var reqData = paramBody2Obj(config.body)
    var reqData = paramUrl2Obj(config.url);
    var page = reqData.page;
    var size = reqData.size;
    var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
    var createAt = condition.createAt;
    var type = condition.type;
    var title = condition.title;
    var sort = condition.sort;
    // var { condition, page = 1, size = 20 } = param2Obj(config.url)
    // var { createAt, type, title, sort } = JSON.parse(condition)


    var mockList = List.filter(function (item) {
      if (createAt && item.createAt !== createAt) {
        return false;
      }
      if (type && item.type !== type) {
        return false;
      }
      if (title && item.title.indexOf(title) < 0) {
        return false;
      }
      return true;
    });
    if (sort === '-id') {
      mockList = mockList.reverse();
    }
    var pageList = [];
    if (page && size) {
      pageList = mockList.filter(function (item, index) {
        return index < size * page && index >= size * (page - 1);
      });
    } else {
      pageList = mockList;
    }
    return {
      total: mockList.length,
      data: pageList
    };
  };

  exports.getTree = function () {
    return orgTreeData;
  };

  /**
     * 修改与新增
     * @param config
     * @returns {{code: number}}
     */
  exports.save = function (config) {
    var temp = paramBody2Obj(config.body);
    temp.id = !temp.id ? Math.floor(Math.random() * 1000 + 10000) : temp.id;
    var updateFlag = false;
    for (var i = List.length - 1; i >= 0; i--) {
      var v = List[i];
      if (v.id === temp.id) {
        var index = List.indexOf(v);
        List.splice(index, 1, temp);
        updateFlag = true;
        break;
      }
    }
    if (!updateFlag) {
      List.unshift(temp);
    }
    return {
      code: 0
    };
  };

  /**
     * 批量删除
     * @param config
     * @returns {{code: string}}
     */
  exports.deleteData = function (config) {
    var temp = paramBody2Obj(config.body);
    var ids = temp.ids.split(',');
    for (var i = List.length - 1; i >= 0; i--) {
      var v = List[i];
      for (var j = ids.length - 1; j >= 0; j--) {
        var id = ids[j];
        if (v.id === Number(id)) {
          var index = List.indexOf(v);
          List.splice(index, 1);
          ids.splice(j, 1);
          break;
        }
      }
    }
    return {
      code: '0'
    };
  };


  var selectList = [];
  var count1 = 10;
  for (var i = 0; i < count1; i++) {
    selectList.push(Mock.mock({
      key: '@id',
      value: '@ctitle(2, 4)'
    }));
  }

  exports.getSlectList = function () {
    return {
      count: selectList.length,
      data: selectList
    };
  };


  var cascaderList = [];
  var count2 = 10;
  for (var i = 0; i < count2; i++) {
    cascaderList.push(Mock.mock({
      value: '@ctitle(2, 4)',
      label: '@ctitle(2, 4)',
      'children|1-10': [{
        value: '@ctitle(2, 4)',
        label: '@ctitle(2, 4)',
        'children|1-10': [{
          value: '@ctitle(2, 4)',
          label: '@ctitle(2, 4)'
        }]
      }]
    }));
  }

  exports.getCascader = function () {
    return {
      responseCode: '0',
      json: {
        count: cascaderList.length,
        data: cascaderList
      }
    };
  };

  var radioList = [];
  Mock.Random.province();
  for (var i = 0; i < 3; i++) {
    radioList.push(Mock.mock({
      key: '@integer(0,50)',
      value: '@province'
    }));
  }
  exports.getRadio = function () {
    return {
      json: {
        data: radioList
      }
    };
  };

  var checkList = [];
  Mock.Random.province();
  // Mock.Random.integer();
  for (var i = 0; i < 5; i++) {
    checkList.push(Mock.mock({
      key: '@integer(0,50)',
      value: '@province'
    }));
  }
  exports.getCheckbox = function () {
    return {
      data: checkList
    };
  };

  var cascaderList = [];
  var count2 = 10;
  for (var i = 0; i < count2; i++) {
    cascaderList.push(Mock.mock({
      value: '@ctitle(2, 4)',
      label: '@ctitle(2, 4)',
      'children|1-10': [{
        value: '@ctitle(2, 4)',
        label: '@ctitle(2, 4)',
        'children|1-10': [{
          value: '@ctitle(2, 4)',
          label: '@ctitle(2, 4)'
        }]
      }]
    }));
  }
  exports.getChild = function () {
    return {
      responseCode: '0',
      json: {
        count: cascaderList.length,
        data: cascaderList
      }
    };
  };

  var Child = [];
  var count3 = 3;
  for (var i = 0; i < count3; i++) {
    Child.push(Mock.mock({
      value: '@ctitle(2, 4)',
      label: '@ctitle(2, 4)',
      children: []
    }));
  }

  exports.getChild = function () {
    return {
      responseCode: '0',
      json: {
        count: Child.length,
        data: Child
      }
    };
  };


  var asyncTree = [];

  exports.getTreeAsync = function (config) {
    var reqData = paramUrl2Obj(config.url);
    var unitid = reqData.UNITID;
    var superUnitId = reqData.SUPERUNITID || reqData.UNITID;
    var treeList = orgTreeData.data.filter(function (item) {
      if (!superUnitId && item.UNITID == unitid) {
        // 加载根
        return true;
      } else if (item.SUPERUNITID == superUnitId) {
        return true;
      } else {
        return false;
      }
    });
    return {
      total: treeList.length,
      data: treeList
    };
  };
  exports.getUser = function () {
    return userData;
  };

  exports.getOrle = function () {
    return roleByUser;
  };

  exports.getDuty = function () {
    return dutyByUser;
  };

  exports.getOrgTree = function () {
    return orgTree;
  };

  var logList = [];
  exports.setLog = function (config) {
    var temp = paramBody2Obj(config.body);
    logList.push(temp);
  };

  exports.exportExcel = function () {
    return {
      data: {
        id: Mock.mock({
          'id|1-100': 100
        }).id
      }
    };
  };


  Mock.Random.extend({
    percentage: function (date) {
      var percentageList = [20, 40, 50, 60, 80, 100];
      return this.pick(percentageList);
    }
  });

  exports.getProgress = function () {
    return {
      data: {
        percentage: Mock.Random.percentage()
      }
    };
  };
});