define(function (require, exports) {
  var List = [];
  // var count = 55;
  var count = 5;
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
      'LOCK|1': ['已', '未']
    }));
  }

  // var index = 5;
  // Mock.Random.increment(1000)
  // for (var i = 0; i < index; i++) {
  //     List[i].subdata = Mock.mock({
  //         id: '@increment(2)',
  //         title: '@ctitle(8, 15)',
  //         createAt: '@date',
  //         'status|1': ['published', 'draft', 'deleted'],
  //         pageviews: '@integer(300, 5000)',
  //         remark: '@ctitle(15, 100)',
  //         EVALUATION_PERIOD_ID: '@date',
  //         'OPEN_FLAG|1': ['O', 'N', 'C'],
  //         'MEASURE|1': ['已', '未'],
  //         'LOCK|1': ['已', '未']
  //     })
  // }

  function paramUrl2Obj (url) {
    var search = url.split('?')[1];
    if (!search) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  }

  function paramBody2Obj (body) {
    if (!body) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
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
    var id = reqData.id;
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
        return false
        ;
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

  exports.filterList = function () {
    return pageList;
  };

  exports.save = function () {
    return {test: 'test'};
  };
});

