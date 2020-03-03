/**
 * @created by helin3 2018-11-30
 * @updated by
 * @description Mock模拟入口配置
 */
define([
  './libs/mockjs/mock.min.js',
  './mocks/data/system.js',
  './mocks/data/admq.js',
  './mocks/data/maintable.js',
  './mocks/data/subtable.js',
  './mocks/data/uData.js'
],
function (require, exports) {
  var system = yufp.require.use('./mocks/data/system.js');
  var admq = yufp.require.use('./mocks/data/admq.js');
  var maintable = yufp.require.use('./mocks/data/maintable.js');
  var subtable = yufp.require.use('./mocks/data/subtable.js');
  var uData = yufp.require.use('./mocks/data/uData.js');

  var registerService = [
    // 连接后台服务时，请注释下述几行
    { url: backend.uaaService + '/oauth/token', method: 'POST', fn: system.loginFn },
    { url: backend.uaaService + '/api/logout', method: 'POST', fn: system.logoutFn },
    { url: backend.uaaService + '/api/session/info', method: 'GET', fn: system.sessionInfoFn },
    { url: backend.uaaService + '/api/account/menuandcontr', method: 'GET', fn: system.menuAndContrFn },
    { url: backend.uaaService + '/api/account/datacontr', method: 'GET', fn: system.dataContrFn },
    { url: backend.uaaService + '/api/account/password', method: 'GET', fn: system.passwordFn },
    { url: backend.uaaService + '/api/contr/url', method: 'GET', fn: system.contrUrlFn },

    { url: backend.appOcaService + '/api/adminsmlookupitem/weblist', method: 'GET', fn: system.lookupFn },
    { url: backend.appOcaService + '/api/userframeconfig/save', method: 'POST', fn: system.saveFn },
    { url: backend.appOcaService + '/api/userframeconfig/query', method: 'POST', fn: system.queryFn },


    // 小U测试信息
    {url: backend.ncmisAppCommonService + '/api/smodifydemo/selectSModifyDemoByParam', method: 'GET', fn: uData.getUList }, // 查询某一业务场景下单条数据的某一字段的留痕记录
    {url: backend.ncmisAppCommonService + '/api/smodifydemo/addSModifyDemo', method: 'GET', fn: uData.getUList }, // 新增留痕记录
    {url: backend.ncmisAppCommonService + '/api/smodifydemo/updateSModifyDemo', method: 'GET', fn: uData.getUList },
    {url: backend.ncmisAppCommonService + '/api/utrace/selectSModifyTraceWithPage', method: 'GET', fn: uData.contrUrlFn },
    {url: backend.ncmisAppCommonService + '/api/utrace/selectSModifyTrace', method: 'GET', fn: uData.getList },

    // 下述服务是纯模拟演示使用
    { url: '/trade/example/list', method: 'GET', fn: admq.getList },
    { url: '/trade/example/export', method: 'POST', fn: admq.exportExcel},
    { url: '/trade/example/getProgress', method: 'POST', fn: admq.getProgress},
    { url: '/trade/example/save', method: 'POST', fn: admq.save },
    { url: '/trade/example/delete', method: 'POST', fn: admq.deleteData },
    { url: '/trade/example/tree', method: 'GET', fn: admq.getTree },
    { url: '/trade/example/radio', method: 'GET', fn: admq.getRadio },
    { url: '/trade/example/checkbox', method: 'GET', fn: admq.getCheckbox },
    { url: '/trade/example/select', method: 'GET', fn: admq.getSlectList },
    { url: '/trade/example/cascader', method: 'GET', fn: admq.getCascader },
    { url: '/trade/cascader/getChild', method: 'GET', fn: admq.getChild },
    { url: '/trade/example/asynctree', method: 'GET', fn: admq.getTreeAsync },
    { url: '/example/templates/msform', method: 'GET', fn: maintable.getList },
    { url: '/example/templates/subtable', method: 'GET', fn: subtable.subList },
    { url: '/example/log/menu', method: 'POST', fn: admq.setLog },
    { url: '/trade/example/user', method: 'GET', fn: admq.getUser },
    { url: '/trade/example/role', method: 'GET', fn: admq.getOrle },
    { url: '/trade/example/duty', method: 'GET', fn: admq.getDuty },
    { url: '/trade/example/orgtree', method: 'GET', fn: admq.getOrgTree }
  ];

  var mock = function (url, method, fn) {
    method = (method && method.toLowerCase()) || 'post';
    var reg = new RegExp(url, '');
    Mock.mock(reg, method, fn);
  };

  Mock.setup({
    timeout: '350-600'
  });

  for (var i = 0; i < registerService.length; i++) {
    var rg = registerService[i];
    mock(rg.url, rg.method, rg.fn);
  }
}
);