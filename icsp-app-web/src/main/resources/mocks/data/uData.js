define(function (require, exports) {
  var UList = [], List = [];
  // var count = 55;
  var count = 15;
  Mock.Random.increment(1000);
  var str = '';
  for (var i = 0; i < count; i++) {
    str = Mock.mock('@ctitle(8, 15)');
    UList.push(Mock.mock({
      seqid: '@increment(2)',
      usr_id: '@increment(2)',
      m_menu_id: '@increment(2)',
      m_pk_v: '@ctitle(8, 15)',
      org_id: '@increment(2)',
      m_field_id: 'orgName',
      m_field_nm: 'orgName',
      m_old_v: '@increment(2)',
      m_old_disp_v: '@increment(2)',
      m_new_v: '@increment(2)',
      m_new_disp_v: '@increment(2)',
      m_datetime: '@date'
    }));
    List.push(Mock.mock({
      'mPkV': 'WfiWorkflowOrgGroupWfiWorkflowOrgForm' + str,
      'pkvalue': str,
      'usrId': '@increment(2)',
      'mNewDispV': '@ctitle(8, 15)',
      'orgName': '@ctitle(8, 15)',
      'wfsign': '@ctitle(8, 15)',
      'wfname': '@ctitle(8, 15)',
      'applType': '@ctitle(8, 15)',
      'orgCode': '@ctitle(8, 15)',
      'remark': '@ctitle(8, 15)',
      'mFieldId': 'orgName',
      'mDatetime': '@ctitle(8, 15)',
      'mOldDispV': '@ctitle(8, 15)'
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
    return JSON.parse('{"' + decodeURIComponent(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  }
  exports.getList = function () {
    return {
      total: List.length,
      data: List
    };
  }
  exports.getUList = function (config) {
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
    return { test: 'test' };
  };
});

