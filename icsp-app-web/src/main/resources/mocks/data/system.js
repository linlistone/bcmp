/**
 * @created by helin3 2017-11-30
 * @updated by helin3 2018-01-17 代码按规范调整
 * @description 系统相关功能请求模拟
 */
define([
  './mocks/data/menuandcontrl.js'
],
function (require, exports) {
  /**
     * GET请求URL参数转换
     * @param url
     * @returns {{}}
     */
  var paramUrl2Obj = function (url) {
    var search = url.split('?')[1];
    if (!search) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  };

  /**
     * POST请求BODY参数转换
     * @param body
     * @returns {{}}
     */
  var paramBody2Obj = function (body) {
    if (!body) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  };
  var frameConfig = {
    menuModel: 'left',
    fontSize: 'large',
    themes: 'default'
  };
  /**
     * oauth认证获取token
     * @param config
     * @returns {{code: string}}
     */
  exports.loginFn = function (config) {
    var returnObj = {};
    try {
      var data = paramBody2Obj(config.body);
      if (data.username != 'admin' || data.password != 'admin') {
        returnObj.code = '9001';
        returnObj.message = '用户名或密码错误，请重新输入!';
      } else {
        returnObj.code = '0';
        returnObj.access_token = 'Basicd2ViX2FwcDo=';
      }
    } catch (e) {
      returnObj.code = '-1';
      returnObj.message = '系统错误，请联系系统管理员!';
    }
    return returnObj;
  };

  /**
     * 注销模拟
     * @param config
     */
  exports.logoutFn = function (config) {
    return {
      code: 0,
      message: 'logout success!'
    };
  };

  /**
     * 模拟会话信息
     * @param config
     * @returns
     */
  exports.sessionInfoFn = function (config) {
    var data = paramUrl2Obj(config.url);
    return {
      'userId': '40',
      'userName': 'YUFP',
      'userAvatar': null,
      'loginCode': 'admin',
      'loginTime': null,
      'roles': [
        { 'id': '7001', 'code': 'ADMIN', 'name': '系统管理员' }
      ],
      'dpt': { 'id': '133', 'code': '1001', 'name': '首席运营官' },
      'org': { 'id': '500', 'code': '500', 'name': '宇信金融集团' },
      'logicSys': { 'id': '203', 'code': '', 'name': '客户关系管理系统' },
      'instu': null,
      'upOrg': null,
      'upDpt': null,
      'dataContr': []
    };
  };

  /**
     * 模拟菜单、控制点数据
     * @returns {{menus, ctrls}}
     */
  exports.menuAndContrFn = function () {
    return {
      menus: demoMenus,
      ctrls: demoCtrls
    };
  };

  /**
     * 数据权限数据
     */
  exports.dataContrFn = function () {
    return demoDataContr;
  };

  /**
     * 密码加密
     */
  exports.passwordFn = function () {

  };

  /**
     * 查询全部控制点信息
     */
  exports.contrUrlFn = function () {
    return {};
  };

  /**
     * 模拟后台数据字典库
     * @type
     * @private
     */
  var allLookup = {
    USER_STATUS: [
      {key: '01', value: '正常'},
      {key: '02', value: '冻结'},
      {key: '03', value: '销户'}
    ],
    CUST_TYPE: [
      {key: '1', value: '零售'},
      {key: '2', value: '公司'}
    ],
    IDENT_TYPE: [
      {key: '1', value: '居民身份证'},
      {key: '2', value: '居民户口薄'},
      {key: '3', value: '组织机构代码'},
      {key: '4', value: '营业执照代码'}
    ],
    NATIONALITY: [
      { key: 'CN', value: '中国' },
      { key: 'US', value: '美国' },
      { key: 'JP', value: '日本' },
      { key: 'EU', value: '欧元区' }
    ],
    PUBLISH_STATUS: [
      { key: 'published', value: '草稿' },
      { key: 'draft', value: '已发布' },
      { key: 'deleted', value: '已删除' }
    ],
    BRANCH: [
      { key: 'c1001', value: '成都支行' }
    ],
    SUBRANCH: [
      { key: 'c100101', value: '高新支行' },
      { key: 'c100102', value: '天府三街支行' },
      { key: 'c100103', value: '天府五街支行' }
    ],
    EDUCATION_TYPE: [
      { key: '0', value: '博士' },
      { key: '1', value: '硕士' },
      { key: '2', value: '本科' },
      { key: '3', value: '大专' },
      { key: '4', value: '高中及以下' }
    ]
  };
    /**
     * 模拟后台数据字典
     * @param config
     * @returns {{data: {}}}
     */
  exports.lookupFn = function (config) {
    var param = paramUrl2Obj(config.url);
    var code = param.codeType;
    if (!code) {
      throw new Error('请求参数错误');
    }
    var codeArr = code.split(',');

    var returnObj = {};
    for (var i = 0, len = codeArr.length; i < len; i++) {
      var codeType = codeArr[i];
      returnObj[codeType] = allLookup[codeType] || [];
    }
    return {
      data: returnObj
    };
  };
  /**
   *模拟框架的配置保存
   */
  exports.saveFn = function (config) {
    var param = JSON.parse(config.body);
    return yufp.extend(true, frameConfig, param);
  };
  /**
   *模拟框架的配置查询
   */
  exports.queryFn = function () {
    return frameConfig;
  };
});