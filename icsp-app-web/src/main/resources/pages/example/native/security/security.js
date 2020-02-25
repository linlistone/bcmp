/**
 * Created by yourEmail on 2017/12/01.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var num = 0;
    yufp.custom.vue({
      el: '#example_security',
      data: {
        height: yufp.custom.viewSize().height - 100,
        checkbox: true,
        // dataUrl: '/samplemicroservice/api/customer/index',
        // dataUrl: '/loyweb/roleManagerQuery',
        dataUrl: '/api/customer/list',
        dataParams: {sort: 'custId desc'/* , condition: JSON.stringify({custName: '姓名5'})*/},
        tableColumns: [
          { label: '客户号', prop: 'custId', width: 110 },
          { label: '客户名称', prop: 'custName', width: 260, sortable: true, resizable: true },
          { label: '证件号', prop: 'identNo', width: 110},
          { label: '证件类型', prop: 'identType', width: 110 },
          { label: '创建日期', prop: 'createDate'}
        ],
        query: {
          title: '',
          type: ''
        }
      },
      methods: {
        sendUnloginFn: function () {
          var _this = this;
          var url = '/api/gateway/routes';
          yufp.service.request({
            url: url,
            method: 'get',
            callback: function (code, message, response) {
              _this.$message('请求正常返回-回调方法', '提示');
            }
          });
        },
        sendForbiddenFn: function () {
          var _this = this;
          var url = '/samplemicroservice/api/test/oauth/bus/testAuthority';
          yufp.service.request({
            url: url,
            method: 'get',
            callback: function (code, message, response) {
              _this.$message('请求正常返回-回调方法', '提示');
            }
          });
        },
        sendNotFoundFn: function () {
          var _this = this;
          var url = '/not/found/url';
          yufp.service.request({
            url: url,
            method: 'get',
            callback: function (code, message, response) {
              _this.$message('请求正常返回-回调方法', '提示');
            }
          });
        },
        addFn: function () {
          var _this = this;
          yufp.service.request({
            url: '/samplemicroservice/api/customer/create',
            method: 'post',
            data: {
              custName: '姓名：' + num++,
              custType: '02',
              identType: 'XD01001',
              identNo: '10001' + num
            },
            callback: function (code, message, response) {
              _this.$message('新增成功', '提示');
              _this.$refs.mytable.remoteData();
            }
          });
        },
        deleteFn: function () {
          this.$message('删除交易未实现', '提示');
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